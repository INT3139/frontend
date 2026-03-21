import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
  TRAINING_PRODUCT_RECORD_MAP,
  type TrainingProductRecord,
} from '@/schemas/academic-cv/training-products';
import { EDUCATION_LEVEL_MAP } from '@/schemas/education-level';
import { APPROVAL_STATUS } from '@/schemas/personnel-cv/approval';
import { Edit, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { ApprovalStatusBadge } from '../../ApprovalStatusBadge';
import { CustomEmpty } from '../../CustomEmpty';
import { CustomTablePagination } from '../../CustomTablePagination';
import { EditTrainingProductForm } from './EditTrainingProductForm';

const TRAINING_PRODUCTS_TABLE_HEADERS = [
  'Thao tác',
  'STT',
  ...Object.values(TRAINING_PRODUCT_RECORD_MAP),
];

const PAGE_SIZE = 12;

export function TrainingProductsTable({
  data: tableData,
  profileId,
  selectedIds,
  onSelectedIdsChange,
  onUpdate,
}: {
  data: TrainingProductRecord[];
  profileId: number;
  selectedIds: number[];
  onSelectedIdsChange: (ids: number[]) => void;
  onUpdate: (index: number, updatedRecord: TrainingProductRecord) => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState<TrainingProductRecord | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const totalPages = Math.ceil(tableData.length / PAGE_SIZE) || 1;

  const paginatedData = tableData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = tableData
        .map((item) => item.id)
        .filter((id): id is number => id !== undefined);
      onSelectedIdsChange(allIds);
    } else {
      onSelectedIdsChange([]);
    }
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    if (checked) {
      onSelectedIdsChange([...selectedIds, id]);
    } else {
      onSelectedIdsChange(selectedIds.filter((item) => item !== id));
    }
  };
  return (
    <div className="flex flex-col gap-8 border p-2">
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-center">
              Chỉnh sửa thông tin Sản phẩm đào tạo
            </DialogTitle>
            <DialogDescription className="sr-only"></DialogDescription>
          </DialogHeader>
          <div className="-mr-2 max-h-[80vh] w-full overflow-x-hidden overflow-y-auto px-2">
            {selectedRecord && (
              <EditTrainingProductForm
                profileId={profileId}
                initialData={selectedRecord}
                onSubmitSuccess={(updatedRecord) => {
                  if (selectedIndex !== null) {
                    onUpdate(selectedIndex, updatedRecord);
                  }
                  setIsEditDialogOpen(false);
                }}
                renderActions={(isSubmitting, canSubmit) => (
                  <>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant={'secondary'}
                        disabled={isSubmitting}
                      >
                        Đóng
                      </Button>
                    </DialogClose>
                    <Button type="submit" disabled={isSubmitting || !canSubmit}>
                      {isSubmitting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Xác nhận
                    </Button>
                  </>
                )}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={
                  tableData.length > 0 &&
                  selectedIds.length === tableData.length
                }
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            {TRAINING_PRODUCTS_TABLE_HEADERS.map((header) => (
              <TableHead
                key={header}
                className={cn('text-center whitespace-normal', {
                  'max-w-20 min-w-20': header !== '' && header !== 'STT',
                  'max-w-16 min-w-16': header === '' || header === 'STT',
                })}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedData.map((trainingProduct, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  checked={
                    trainingProduct.id
                      ? selectedIds.includes(trainingProduct.id)
                      : false
                  }
                  onCheckedChange={(checked) => {
                    if (trainingProduct.id) {
                      handleSelectOne(trainingProduct.id, !!checked);
                    }
                  }}
                />
              </TableCell>
              <TableCell>
                {trainingProduct.approvalStatus === APPROVAL_STATUS.PENDING ? (
                  <div className="flex justify-center">
                    <Button
                      size="icon-sm"
                      variant="outline"
                      className="border-0 bg-transparent shadow-none"
                      onClick={() => {
                        const actualIndex =
                          index + (currentPage - 1) * PAGE_SIZE;
                        setSelectedIndex(actualIndex);
                        setSelectedRecord(trainingProduct);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit />
                    </Button>
                  </div>
                ) : null}
              </TableCell>
              <TableCell className="text-center">
                {index + (currentPage - 1) * PAGE_SIZE + 1}
              </TableCell>
              <TableCell>
                <div className="flex justify-center">
                  <ApprovalStatusBadge
                    status={trainingProduct.approvalStatus}
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">
                {trainingProduct.studentName}
              </TableCell>
              <TableCell className="max-w-80 min-w-80 text-wrap whitespace-normal">
                {trainingProduct.thesisTitle}
              </TableCell>
              <TableCell className="max-w-50 min-w-50 text-wrap whitespace-normal">
                {trainingProduct.assignment}
              </TableCell>
              <TableCell className="text-center">
                {EDUCATION_LEVEL_MAP[trainingProduct.educationLevel]}
              </TableCell>
              <TableCell className="text-center">
                {trainingProduct.startTime}
              </TableCell>
              <TableCell className="text-center">
                {trainingProduct.endTime}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {paginatedData.length === 0 && <CustomEmpty />}

      <CustomTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

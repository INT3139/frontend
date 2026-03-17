import { HeaderWrapper } from '@/components/main/HeaderWrapper';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { APPROVAL_STATUS } from '@/schemas/personnel-cv/approval';
import { AWARD_SCOPES_MAP } from '@/schemas/personnel-cv/award-scope';
import {
  COMMENDATION_RECORD_MAP,
  type CommendationRecord,
} from '@/schemas/personnel-cv/commendation';
import {
  Check,
  CircleOff,
  Download,
  Edit,
  Loader2,
  PlusCircle,
} from 'lucide-react';
import { useState } from 'react';
import { ApprovalStatusBadge } from '../ApprovalStatusBadge';
import { CustomTablePagination } from '../CustomTablePagination';
import { AddCommendationForm } from './AddCommendationForm';

const COMMENDATION_TABLE_HEADERS = [
  'Thao tác',
  'STT',
  ...Object.values(COMMENDATION_RECORD_MAP),
];

const PAGE_SIZE = 6;

export function CommendationsTable({
  data: initialData,
}: {
  data: CommendationRecord[];
}) {
  const [tableData, setTableData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const totalPages = Math.ceil(tableData.length / PAGE_SIZE) || 1;

  const paginatedData = tableData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <HeaderWrapper title="Khen thưởng">
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4" /> Thêm mới
            </Button>
          </DialogTrigger>
          <Button>
            <Download className="h-4 w-4" /> Xuất lý lịch
          </Button>
        </HeaderWrapper>

        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-center">
              Thêm thông tin Khen thưởng
            </DialogTitle>
            <DialogDescription className="sr-only"></DialogDescription>
          </DialogHeader>
          <div className="-mr-2 max-h-[80vh] w-full overflow-x-hidden overflow-y-auto px-2">
            <AddCommendationForm
              onSubmitSuccess={(values) => {
                const newRecord: CommendationRecord = {
                  approvalStatus: APPROVAL_STATUS.PENDING,
                  decisionNumber: values.decisionNumber || '',
                  decisionDate: values.decisionDate,
                  awardScope: values.awardScope,
                  awardName: values.awardName,
                  content: values.content,
                  academicYear: values.academicYear || '',
                  isHighestLevel: false,
                  attachmentUrl: values.attachment
                    ? URL.createObjectURL(values.attachment as File)
                    : null,
                };
                setTableData([newRecord, ...tableData]);
                setIsDialogOpen(false);
              }}
              renderActions={(isSubmitting) => (
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
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Xác nhận
                  </Button>
                </>
              )}
            />
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col gap-8 border border-t-0 p-2">
        <Table>
          <TableHeader>
            <TableRow>
              {COMMENDATION_TABLE_HEADERS.map((header) => (
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
            {paginatedData.map((commendation, index) => (
              <TableRow key={index}>
                <TableCell>
                  {commendation.approvalStatus === APPROVAL_STATUS.PENDING ? (
                    <div className="flex justify-center">
                      <Button
                        size="icon-sm"
                        variant="outline"
                        className="border-0 bg-transparent shadow-none"
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
                    <ApprovalStatusBadge status={commendation.approvalStatus} />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {commendation.decisionNumber}
                </TableCell>
                <TableCell className="text-center">
                  {commendation.decisionDate}
                </TableCell>
                <TableCell className="text-center">
                  {AWARD_SCOPES_MAP[commendation.awardScope]}
                </TableCell>
                <TableCell className="max-w-80 min-w-80 text-wrap whitespace-normal">
                  {commendation.awardName}
                </TableCell>
                <TableCell className="max-w-80 min-w-80 text-wrap whitespace-normal">
                  {commendation.content}
                </TableCell>
                <TableCell className="text-center">
                  {commendation.academicYear}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    {commendation.isHighestLevel && <Check />}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {paginatedData.length === 0 && (
          <Empty className="md:pt-0">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CircleOff />
              </EmptyMedia>
              <EmptyTitle className="text-base">Không có dữ liệu</EmptyTitle>
            </EmptyHeader>
          </Empty>
        )}

        <CustomTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

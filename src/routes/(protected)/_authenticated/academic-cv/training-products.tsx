import { CustomErrorComponent } from '@/components/main/CustomErrorComponent';
import { CustomPendingComponent } from '@/components/main/CustomPendingComponent';
import { AddTrainingProductForm } from '@/components/main/academic-cv/TrainingProducts/AddTrainingProductForm';
import { TrainingProductsTable } from '@/components/main/academic-cv/TrainingProducts/TrainingProductsTable';
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
import { Field } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { profileQueryOptions } from '@/hooks/use-profile';
import { type TrainingProductRecord } from '@/schemas/academic-cv/training-products';
import { EDUCATION_LEVEL_MAP } from '@/schemas/education-level';
import { APPROVAL_STATUS_MAP } from '@/schemas/personnel-cv/approval';
import { services } from '@/services/api';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  Download,
  Funnel,
  Loader2,
  PlusCircle,
  Search,
  Trash,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute(
  '/(protected)/_authenticated/academic-cv/training-products',
)({
  component: RouteComponent,
  errorComponent: CustomErrorComponent,
  pendingComponent: CustomPendingComponent,
});

function RouteComponent() {
  const { data: profile } = useSuspenseQuery(profileQueryOptions);

  const { data: initialData } = useSuspenseQuery({
    queryKey: ['training-products', profile.id],
    queryFn: () => services.getTrainingProducts(profile.id),
  });

  return <InnerComponent profileId={profile.id} initialData={initialData} />;
}

function InnerComponent({
  profileId,
  initialData,
}: {
  profileId: number;
  initialData: TrainingProductRecord[];
}) {
  const [tableData, setTableData] =
    useState<TrainingProductRecord[]>(initialData);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [filters, setFilters] = useState({
    approvalStatus: 'all',
    educationLevel: 'all',
    yearFrom: '',
    yearTo: '',
  });

  const filteredData = useMemo(() => {
    return tableData.filter((item) => {
      if (searchKeyword) {
        const lowerKeyword = searchKeyword.toLowerCase();
        const matchesKeyword =
          item.studentName.toLowerCase().includes(lowerKeyword) ||
          item.thesisTitle.toLowerCase().includes(lowerKeyword) ||
          (item.assignment?.toLowerCase().includes(lowerKeyword) ?? false);
        if (!matchesKeyword) return false;
      }

      if (
        filters.approvalStatus !== 'all' &&
        item.approvalStatus !== filters.approvalStatus
      ) {
        return false;
      }

      if (
        filters.educationLevel !== 'all' &&
        item.educationLevel !== filters.educationLevel
      ) {
        return false;
      }

      if (filters.yearFrom && item.startTime) {
        const itemYear = parseInt(item.startTime.split('/')[1]);
        if (itemYear < parseInt(filters.yearFrom)) return false;
      }

      if (filters.yearTo && item.endTime) {
        const itemYear = parseInt(item.endTime.split('/')[1]);
        if (itemYear > parseInt(filters.yearTo)) return false;
      }

      return true;
    });
  }, [tableData, searchKeyword, filters]);

  return (
    <div className="flex flex-col gap-4 p-6">
      <SectionHeader
        title={'Sản phẩm đào tạo'}
        profileId={profileId}
        resultCount={filteredData.length}
        selectedIds={selectedIds}
        tableData={tableData}
        onAddSuccess={(newRecord) => {
          setTableData([newRecord, ...tableData]);
        }}
        onDeleteSuccess={(ids: number[]) => {
          setTableData(tableData.filter((item) => !ids.includes(item.id!)));
          setSelectedIds([]);
        }}
        onSearch={setSearchKeyword}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <TrainingProductsTable
        data={filteredData}
        profileId={profileId}
        selectedIds={selectedIds}
        onSelectedIdsChange={setSelectedIds}
        onUpdate={(index, updatedRecord) => {
          const newData = [...tableData];
          // Find the actual index in the base data based on the filtered item's ID
          const originalIndex = tableData.findIndex(
            (item) => item.id === filteredData[index].id,
          );
          if (originalIndex !== -1) {
            newData[originalIndex] = updatedRecord;
          }
          setTableData(newData);
        }}
      />
    </div>
  );
}

function SectionHeader({
  title,
  profileId,
  resultCount,
  selectedIds,
  tableData,
  onAddSuccess,
  onDeleteSuccess,
  onSearch,
  filters,
  onFiltersChange,
}: {
  title: string;
  profileId: number;
  resultCount: number;
  selectedIds: number[];
  tableData: TrainingProductRecord[];
  onAddSuccess: (values: TrainingProductRecord) => void;
  onDeleteSuccess: (ids: number[]) => void;
  onSearch: (keyword: string) => void;
  filters: {
    approvalStatus: string;
    educationLevel: string;
    yearFrom: string;
    yearTo: string;
  };
  onFiltersChange: (filters: {
    approvalStatus: string;
    educationLevel: string;
    yearFrom: string;
    yearTo: string;
  }) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [tempKeyword, setTempKeyword] = useState('');

  const selectedRecords = tableData.filter((item) =>
    selectedIds.includes(item.id!),
  );

  const pendingRecords = selectedRecords.filter(
    (item) => item.approvalStatus === 'pending',
  );
  const otherRecords = selectedRecords.filter(
    (item) => item.approvalStatus !== 'pending',
  );

  const { mutate: deleteMany, isPending } = useMutation({
    mutationFn: async () => {
      const deletedIds: number[] = [];
      // For pending: actually delete
      for (const record of pendingRecords) {
        if (record.id) {
          await services.deleteTrainingProduct(profileId, record.id);
          deletedIds.push(record.id);
        }
      }
      return deletedIds;
    },
    onSuccess: (deletedIds) => {
      toast.success('Thao tác thành công!');
      onDeleteSuccess(deletedIds);
      setIsDeleteDialogOpen(false);
    },
    onError: (err) => {
      if (import.meta.env.DEV) console.error(err);
      toast.error('Đã xảy ra lỗi khi thực hiện thao tác');
    },
  });

  const handleAddSuccess = (newRecord: TrainingProductRecord) => {
    onAddSuccess(newRecord);
    setIsOpen(false);
  };
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-accent-foreground text-lg font-bold uppercase">
        {title}
      </h2>
      <div className="flex flex-row gap-2">
        <Field orientation="horizontal">
          <InputGroup className="max-w-xs">
            <InputGroupInput
              placeholder="Nhập từ khóa..."
              value={tempKeyword}
              onChange={(e) => setTempKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch(tempKeyword)}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
          <Button onClick={() => onSearch(tempKeyword)}>Tìm kiếm</Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant={'outline'}>
                <Funnel />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="leading-none font-medium italic">Bộ lọc</h4>
                </div>
                <div className="grid gap-4">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label className="text-sm leading-none font-medium">
                      Trạng thái
                    </label>
                    <div className="col-span-2">
                      <Select
                        value={filters.approvalStatus}
                        onValueChange={(v) =>
                          onFiltersChange({ ...filters, approvalStatus: v })
                        }
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả</SelectItem>
                          {Object.entries(APPROVAL_STATUS_MAP).map(
                            ([key, value]) => (
                              <SelectItem key={key} value={key}>
                                {value}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label className="text-sm leading-none font-medium">
                      Trình độ
                    </label>
                    <div className="col-span-2">
                      <Select
                        value={filters.educationLevel}
                        onValueChange={(v) =>
                          onFiltersChange({ ...filters, educationLevel: v })
                        }
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Chọn trình độ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả</SelectItem>
                          {Object.entries(EDUCATION_LEVEL_MAP).map(
                            ([key, value]) => (
                              <SelectItem key={key} value={key}>
                                {value}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label className="text-sm leading-none font-medium">
                      Từ năm
                    </label>
                    <InputGroupInput
                      className="col-span-2 h-8"
                      placeholder="YYYY"
                      value={filters.yearFrom}
                      onChange={(e) =>
                        onFiltersChange({
                          ...filters,
                          yearFrom: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label className="text-sm leading-none font-medium">
                      Đến năm
                    </label>
                    <InputGroupInput
                      className="col-span-2 h-8"
                      placeholder="YYYY"
                      value={filters.yearTo}
                      onChange={(e) =>
                        onFiltersChange({ ...filters, yearTo: e.target.value })
                      }
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="h-8"
                    onClick={() =>
                      onFiltersChange({
                        approvalStatus: 'all',
                        educationLevel: 'all',
                        yearFrom: '',
                        yearTo: '',
                      })
                    }
                  >
                    Xóa tất cả
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </Field>

        <div className="flex flex-row items-center gap-2">
          <Button disabled>Đề xuất</Button>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4" /> Thêm mới
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Thêm thông tin Sản phẩm đào tạo
                </DialogTitle>
                <DialogDescription className="sr-only"></DialogDescription>
              </DialogHeader>
              <div className="-mr-2 max-h-[80vh] w-full overflow-x-hidden overflow-y-auto px-2">
                <AddTrainingProductForm
                  profileId={profileId}
                  onSubmitSuccess={handleAddSuccess}
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

          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant={'outline'} disabled={selectedIds.length === 0}>
                <Trash className="h-4 w-4" /> Xóa
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center">Xác nhận xóa</DialogTitle>
                <DialogDescription className="text-accent-foreground text-left font-normal">
                  <div className="mb-2 text-center font-medium">
                    {otherRecords.length > 0
                      ? `Bạn đang chọn ${selectedRecords.length} mục.`
                      : `Bạn có chắc chắn muốn xóa ${selectedRecords.length} mục đã chọn?`}
                  </div>

                  <div className="max-h-60 space-y-4 overflow-y-auto pr-2 text-xs sm:text-sm">
                    {pendingRecords.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-destructive font-semibold underline">
                          Mục "Đang chờ" (Sẽ xóa trực tiếp):
                        </div>
                        <ul className="list-inside list-disc space-y-1">
                          {pendingRecords.map((item) => (
                            <li key={item.id} className="text-wrap">
                              <span className="text-foreground font-medium">
                                {item.studentName}:
                              </span>{' '}
                              <span className="italic">{item.thesisTitle}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {otherRecords.length > 0 && (
                      <div className="space-y-2">
                        <div className="font-semibold underline">
                          Mục "Đã duyệt/Từ chối" (Sẽ gửi yêu cầu xóa):
                        </div>
                        <ul className="list-inside list-disc space-y-1">
                          {otherRecords.map((item) => (
                            <li key={item.id} className="text-wrap">
                              <span className="text-foreground font-medium">
                                {item.studentName}:
                              </span>{' '}
                              <span className="italic">{item.thesisTitle}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 flex justify-center gap-4">
                <DialogClose asChild>
                  <Button variant="outline" disabled={isPending}>
                    Hủy bỏ
                  </Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  disabled={isPending}
                  onClick={() => deleteMany()}
                >
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Xác nhận
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant={'outline'}>
            <Download className="h-4 w-4" /> Xuất Excel
          </Button>
        </div>
      </div>

      <span className="text-muted-foreground text-sm italic">
        {resultCount} kết quả
      </span>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApprovalStatusBadge } from '@/components/main/ApprovalStatusBadge';
import { HeaderWrapper } from '@/components/main/HeaderWrapper';
import { AddWorkHistoryForm } from '@/components/main/WorkHistory/AddWorkHistoryForm';
import { TabNavigation } from '@/components/main/personel-cv/TabNavigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  WORK_HISTORY_RECORD,
  WORK_HISTORY_RECORD_MAP,
  type WorkHistoryRecord,
} from '@/schemas/personnel-cv/work-history';
import { getMyProfile } from '@/services/api/profile';
import {
  createWorkHistory,
  deleteWorkHistory,
  getWorkHistory,
  updateWorkHistory,
} from '@/services/api/work-history';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Download, Edit, PlusCircle, RotateCcw, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/work-history',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<WorkHistoryRecord | null>(
    null,
  );

  const tabs = [
    'Quá trình công tác chính quyền',
    'Quá trình hoạt động Đảng',
    'Quá trình hoạt động Công Đoàn',
    'Quá trình hoạt động Đoàn',
    'Quá trình hoạt động Quân ngũ - Tổ chức chính trị khác',
  ];

  const queryClient = useQueryClient();

  // Map tab index to historyType
  const historyTypes: WorkHistoryRecord['historyType'][] = [
    'chinh_quyen',
    'dang',
    'cong_doan',
    'doan',
    'quan_ngu_chinh_tri',
  ];

  const { data: profile } = useQuery({
    queryKey: ['profile', 'me'],
    queryFn: getMyProfile,
  });

  const { data: allWorkHistory = [] } = useQuery({
    queryKey: ['workHistory', profile?.id],
    queryFn: () => getWorkHistory(profile?.id as number),
    enabled: !!profile?.id,
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<WorkHistoryRecord>) =>
      createWorkHistory(profile?.id as number, {
        ...data,
        historyType: historyTypes[activeTab],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workHistory', profile?.id] });
      setIsDialogOpen(false);
      toast.success('Thêm mới thành công');
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<WorkHistoryRecord>) =>
      updateWorkHistory(
        profile?.id as number,
        editingRecord?.id as string,
        data,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workHistory', profile?.id] });
      setIsDialogOpen(false);
      setEditingRecord(null);
      toast.success('Cập nhật thành công');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (subId: string) =>
      deleteWorkHistory(profile?.id as number, subId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workHistory', profile?.id] });
      toast.success('Xóa thành công');
    },
  });

  const currentTableData = allWorkHistory.filter(
    (item: WorkHistoryRecord) => item.historyType === historyTypes[activeTab],
  );

  return (
    <div className="flex flex-col">
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingRecord(null);
        }}
      >
        {/* Header */}
        <HeaderWrapper title="Quá trình công tác, hoạt động Đảng - Đoàn thể">
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4" /> Thêm mới
            </Button>
          </DialogTrigger>
          <Button
            variant="outline"
            onClick={() =>
              queryClient.invalidateQueries({
                queryKey: ['workHistory', profile?.id],
              })
            }
          >
            <RotateCcw className="h-4 w-4" /> Cập nhật
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4" /> Xuất lý lịch
          </Button>
        </HeaderWrapper>

        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-center">
              {editingRecord ? 'Chỉnh sửa' : 'Thêm'} quá trình hoạt động
            </DialogTitle>
            <DialogDescription className="sr-only"></DialogDescription>
          </DialogHeader>
          <div className="max-h-[80vh] overflow-y-auto px-1">
            <AddWorkHistoryForm
              initialValues={editingRecord || undefined}
              onSubmitSuccess={(values) => {
                if (editingRecord) {
                  updateMutation.mutate(values);
                } else {
                  createMutation.mutate(values);
                }
              }}
              renderActions={(isSubmitting) => (
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setIsDialogOpen(false);
                      setEditingRecord(null);
                    }}
                    disabled={isSubmitting}
                  >
                    Hủy
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Đang lưu...' : 'Xác nhận'}
                  </Button>
                </div>
              )}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Tabs */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Table Content */}
      <div className="p-4">
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-24 text-center font-semibold text-gray-800">
                  Thao tác
                </TableHead>
                <TableHead className="w-16 text-center font-semibold text-gray-800">
                  STT
                </TableHead>
                <TableHead className="w-28 text-center font-semibold text-gray-800">
                  {WORK_HISTORY_RECORD_MAP[WORK_HISTORY_RECORD.FROM]}
                </TableHead>
                <TableHead className="w-28 text-center font-semibold text-gray-800">
                  {WORK_HISTORY_RECORD_MAP[WORK_HISTORY_RECORD.TO]}
                </TableHead>
                <TableHead className="font-semibold text-gray-800">
                  {WORK_HISTORY_RECORD_MAP[WORK_HISTORY_RECORD.UNIT]}
                </TableHead>
                <TableHead className="font-semibold text-gray-800">
                  {WORK_HISTORY_RECORD_MAP[WORK_HISTORY_RECORD.ROLE]}
                </TableHead>
                <TableHead className="font-semibold text-wrap whitespace-normal text-gray-800">
                  {WORK_HISTORY_RECORD_MAP[WORK_HISTORY_RECORD.TYPE]}
                </TableHead>
                <TableHead className="w-32 text-center font-semibold text-gray-800">
                  Trạng thái
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTableData.length > 0 ? (
                currentTableData.map(
                  (row: WorkHistoryRecord, index: number) => (
                    <TableRow key={row.id}>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                            onClick={() => {
                              setEditingRecord(row);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => {
                              if (
                                confirm(
                                  'Bạn có chắc chắn muốn xóa bản ghi này?',
                                )
                              ) {
                                deleteMutation.mutate(row.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell className="text-center">
                        {row[WORK_HISTORY_RECORD.FROM]}
                      </TableCell>
                      <TableCell className="text-center">
                        {row[WORK_HISTORY_RECORD.TO] || '---'}
                      </TableCell>
                      <TableCell className="font-medium text-gray-800">
                        {row[WORK_HISTORY_RECORD.UNIT]}
                      </TableCell>
                      <TableCell>
                        {row[WORK_HISTORY_RECORD.ROLE] || '---'}
                      </TableCell>
                      <TableCell>
                        {row[WORK_HISTORY_RECORD.TYPE] || '---'}
                      </TableCell>
                      <TableCell className="text-center">
                        <ApprovalStatusBadge
                          status={
                            row[WORK_HISTORY_RECORD.APPROVAL_STATUS] as any
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ),
                )
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center text-gray-500"
                  >
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

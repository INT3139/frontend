import { ApprovalStatusBadge } from '@/components/main/ApprovalStatusBadge';
import { HeaderWrapper } from '@/components/main/HeaderWrapper';
import { AddTrainingForm } from '@/components/main/Training/AddTrainingForm';
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
import { cn } from '@/lib/utils';
import { APPROVAL_STATUS } from '@/schemas/personnel-cv/approval';
import {
  TRAINING_RECORD,
  TRAINING_RECORD_MAP,
  type TrainingRecord,
} from '@/schemas/personnel-cv/training';
import { createFileRoute } from '@tanstack/react-router';
import { Download, Edit, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/training',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeTopTab, setActiveTopTab] = useState(0);
  const [activeBottomTab, setActiveBottomTab] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const topTabs = ['Trình độ chuyên môn', 'Học hàm'];
  const bottomTabs = [
    'Đào tạo, bồi dưỡng dài hạn - cấp văn bằng',
    'Đào tạo, bồi dưỡng ngắn hạn - cấp chứng chỉ',
    'Đào tạo, bồi dưỡng ngoại ngữ',
    'Đào tạo, bồi dưỡng tin học',
  ];

  const [tableData, setTableData] = useState<TrainingRecord[]>([
    {
      id: 1,
      [TRAINING_RECORD.FROM]: '9/1998',
      [TRAINING_RECORD.TO]: '7/2002',
      [TRAINING_RECORD.LEVEL]: 'Cử nhân',
      [TRAINING_RECORD.PLACE]: 'Khoa CN, ĐHQGHN',
      [TRAINING_RECORD.MAJOR]: 'CNTT',
      [TRAINING_RECORD.FORMAT]: 'Chính quy',
      [TRAINING_RECORD.FIELD]: 'Khoa học công nghệ - kỹ thuật',
      [TRAINING_RECORD.STUDYING]: '',
      [TRAINING_RECORD.STATUS]: '',
      [TRAINING_RECORD.APPROVAL_STATUS]: APPROVAL_STATUS.APPROVED,
    },
    {
      id: 2,
      [TRAINING_RECORD.FROM]: '9/2004',
      [TRAINING_RECORD.TO]: '9/2006',
      [TRAINING_RECORD.LEVEL]: 'Thạc sĩ',
      [TRAINING_RECORD.PLACE]: 'Viện KH&CN Tiên Tiến Nhật Bản',
      [TRAINING_RECORD.MAJOR]: 'CNTT',
      [TRAINING_RECORD.FORMAT]: 'Chính quy',
      [TRAINING_RECORD.FIELD]: 'Khoa học công nghệ - kỹ thuật',
      [TRAINING_RECORD.STUDYING]: '',
      [TRAINING_RECORD.STATUS]: '',
      [TRAINING_RECORD.APPROVAL_STATUS]: APPROVAL_STATUS.APPROVED,
    },
    {
      id: 3,
      [TRAINING_RECORD.FROM]: '9/2006',
      [TRAINING_RECORD.TO]: '9/2009',
      [TRAINING_RECORD.LEVEL]: 'Tiến sĩ',
      [TRAINING_RECORD.PLACE]: 'Viện KH&CN Tiên Tiến Nhật Bản',
      [TRAINING_RECORD.MAJOR]: 'CNTT',
      [TRAINING_RECORD.FORMAT]: 'Chính quy',
      [TRAINING_RECORD.FIELD]: 'Khoa học công nghệ - kỹ thuật',
      [TRAINING_RECORD.STUDYING]: '',
      [TRAINING_RECORD.STATUS]: '',
      [TRAINING_RECORD.APPROVAL_STATUS]: APPROVAL_STATUS.APPROVED,
    },
  ]);

  return (
    <div className="flex flex-col">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* Header */}
        <HeaderWrapper title="Học hàm, trình độ chuyên môn">
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4" /> Thêm mới
            </Button>
          </DialogTrigger>
          <Button variant="outline">
            <Download className="h-4 w-4" /> Xuất lý lịch
          </Button>
        </HeaderWrapper>

        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center">
              Thêm thông tin đào tạo, bồi dưỡng
            </DialogTitle>
            <DialogDescription className="sr-only"></DialogDescription>
          </DialogHeader>
          <div className="max-h-[80vh] overflow-y-auto px-1">
            <AddTrainingForm
              onSubmitSuccess={(values) => {
                const newRecord: TrainingRecord = {
                  id: Date.now(),
                  ...values,
                  [TRAINING_RECORD.APPROVAL_STATUS]: APPROVAL_STATUS.PENDING,
                  [TRAINING_RECORD.FROM]: values[TRAINING_RECORD.FROM],
                  [TRAINING_RECORD.TO]: values[TRAINING_RECORD.TO] || '',
                  [TRAINING_RECORD.LEVEL]: values[TRAINING_RECORD.LEVEL],
                  [TRAINING_RECORD.PLACE]: values[TRAINING_RECORD.PLACE],
                  [TRAINING_RECORD.MAJOR]: values[TRAINING_RECORD.MAJOR] || '',
                  [TRAINING_RECORD.FORMAT]:
                    values[TRAINING_RECORD.FORMAT] || '',
                  [TRAINING_RECORD.FIELD]: values[TRAINING_RECORD.FIELD] || '',
                  [TRAINING_RECORD.STUDYING]:
                    values[TRAINING_RECORD.STUDYING] || '',
                  [TRAINING_RECORD.STATUS]:
                    values[TRAINING_RECORD.STATUS] || '',
                };
                setTableData([newRecord, ...tableData]);
                setIsDialogOpen(false);
              }}
              renderActions={(isSubmitting) => (
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setIsDialogOpen(false)}
                    disabled={isSubmitting}
                  >
                    Hủy
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    Xác nhận
                  </Button>
                </div>
              )}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Top Tabs */}
      <TabNavigation
        tabs={topTabs}
        activeTab={activeTopTab}
        onTabChange={setActiveTopTab}
      />

      {/* Info Grid */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-1 gap-x-12 gap-y-4 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-4">
            <InfoRow label="Trình độ giáo dục phổ thông" value="12/12" />
            <InfoRow label="Trình độ chuyên môn cao nhất" value="Tiến sĩ" />
            <InfoRow label="Ghi chú" value="" />
          </div>
          {/* Right Column */}
          <div className="space-y-4">
            <InfoRow label="Quản lý nhà nước" value="Không có" />
            <InfoRow label="Lý luận chính trị" value="Sơ cấp" />
            <InfoRow label="Trình độ ngoại ngữ" value="Tiếng Anh" />
            <InfoRow label="Trình độ tin học" value="Tiến sĩ" />
          </div>
        </div>
      </div>

      <div className="mt-4">
        {/* Bottom Tabs */}
        <TabNavigation
          tabs={bottomTabs}
          activeTab={activeBottomTab}
          onTabChange={setActiveBottomTab}
        />

        {/* Table Content */}
        <div className="p-4">
          <div className="overflow-hidden rounded-md border text-sm">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-24 text-center font-semibold text-gray-800">
                    Thao tác
                  </TableHead>
                  <TableHead className="w-24 text-center font-semibold text-gray-800">
                    {TRAINING_RECORD_MAP[TRAINING_RECORD.FROM]}
                  </TableHead>
                  <TableHead className="w-24 text-center font-semibold text-gray-800">
                    {TRAINING_RECORD_MAP[TRAINING_RECORD.TO]}
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800">
                    {TRAINING_RECORD_MAP[TRAINING_RECORD.LEVEL]}
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800">
                    {TRAINING_RECORD_MAP[TRAINING_RECORD.PLACE]}
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800">
                    {TRAINING_RECORD_MAP[TRAINING_RECORD.MAJOR]}
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800">
                    {TRAINING_RECORD_MAP[TRAINING_RECORD.FORMAT]}
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800">
                    {TRAINING_RECORD_MAP[TRAINING_RECORD.FIELD]}
                  </TableHead>
                  <TableHead className="w-24 text-center font-semibold text-gray-800">
                    {TRAINING_RECORD_MAP[TRAINING_RECORD.STUDYING]}
                  </TableHead>
                  <TableHead className="w-32 text-center font-semibold text-gray-800">
                    {TRAINING_RECORD_MAP[TRAINING_RECORD.APPROVAL_STATUS]}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeBottomTab === 0 && tableData.length > 0 ? (
                  tableData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {row[TRAINING_RECORD.FROM]}
                      </TableCell>
                      <TableCell className="text-center">
                        {row[TRAINING_RECORD.TO] || '---'}
                      </TableCell>
                      <TableCell className="font-medium text-gray-800">
                        {row[TRAINING_RECORD.LEVEL]}
                      </TableCell>
                      <TableCell>{row[TRAINING_RECORD.PLACE]}</TableCell>
                      <TableCell>
                        {row[TRAINING_RECORD.MAJOR] || '---'}
                      </TableCell>
                      <TableCell>
                        {row[TRAINING_RECORD.FORMAT] || '---'}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {row[TRAINING_RECORD.FIELD]}
                      </TableCell>
                      <TableCell className="text-center">
                        {row[TRAINING_RECORD.STUDYING] || '---'}
                      </TableCell>
                      <TableCell className="text-center">
                        <ApprovalStatusBadge
                          status={row[TRAINING_RECORD.APPROVAL_STATUS]}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={10}
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
    </div>
  );
}

function InfoRow({
  label,
  value,
  className,
}: {
  label: string;
  value: string | number;
  className?: string;
}) {
  return (
    <div className={cn('flex items-start border-b py-2', className)}>
      <span className="w-80 shrink-0 font-semibold tracking-wider">
        {label}
      </span>
      <span className="flex-1 leading-relaxed">{value || '---'}</span>
    </div>
  );
}

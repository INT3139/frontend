import { ApprovalStatusBadge } from '@/components/main/ApprovalStatusBadge';
import { HeaderWrapper } from '@/components/main/HeaderWrapper';
import { AddTrainingForm } from '@/components/main/Training/AddTrainingForm';
import { EditAcademicInfoForm } from '@/components/main/Training/EditAcademicInfoForm';
import { TabNavigation } from '@/components/main/personel-cv/TabNavigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
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
import { APPROVAL_STATUS } from '@/schemas/personnel-cv/approval';
import {
  EDUCATION_TYPE_MAP,
  TRAINING_RECORD,
  TRAINING_RECORD_MAP,
} from '@/schemas/personnel-cv/education';
import type {
  EducationType,
  TrainingRecord,
} from '@/schemas/personnel-cv/education';
import type { Profile } from '@/schemas/profile';
import {
  createProfileEducation,
  deleteProfileEducation,
  getMyProfile,
  getProfileEducation,
  updateProfile,
  updateProfileEducation,
} from '@/services/api/profile';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Download, Edit, Loader2, PlusCircle, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/education',
)({
  component: RouteComponent,
});

const ACADEMIC_DEGREE_MAP: Record<string, string> = {
  bachelor: 'Cử nhân',
  master: 'Thạc sĩ',
  phd: 'Tiến sĩ',
};

const ACADEMIC_TITLE_MAP: Record<string, string> = {
  gs: 'Giáo sư',
  pgs: 'Phó giáo sư',
};

const POLITICAL_THEORY_MAP: Record<string, string> = {
  'sơ cấp': 'Sơ cấp',
  'trung cấp': 'Trung cấp',
  'cao cấp': 'Cao cấp',
};

function RouteComponent() {
  const queryClient = useQueryClient();
  const [activeTopTab, setActiveTopTab] = useState(0);
  const [activeBottomTab, setActiveBottomTab] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<TrainingRecord | null>(
    null,
  );
  const [isEditAcademicInfoDialogOpen, setIsEditAcademicInfoDialogOpen] =
    useState(false);

  const topTabs = ['Trình độ chuyên môn', 'Học hàm'];
  const bottomTabsSpecs: EducationType[] = [
    'degree',
    'certificate',
    'foreign_lang',
    'it',
  ];
  const bottomTabs = bottomTabsSpecs.map((type) => EDUCATION_TYPE_MAP[type]);

  const activeEduType = bottomTabsSpecs[activeBottomTab];

  // Queries
  const { data: profile } = useQuery({
    queryKey: ['profile', 'me'],
    queryFn: getMyProfile,
  });

  const profileId = profile?.id?.toString();

  const { data: educationRecords = [], isLoading } = useQuery({
    queryKey: ['profile', profileId, 'education'],
    queryFn: () => getProfileEducation(profileId!),
    enabled: !!profileId,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: (data: Omit<TrainingRecord, 'id'>) =>
      createProfileEducation(profileId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile', profileId, 'education'],
      });
      setIsDialogOpen(false);
      toast.success('Thêm mới thành công');
    },
    onError: () => toast.error('Thêm mới thất bại'),
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<TrainingRecord>) =>
      updateProfileEducation(profileId!, editingRecord?.id ?? '', data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile', profileId, 'education'],
      });
      setIsDialogOpen(false);
      setEditingRecord(null);
      toast.success('Cập nhật thành công');
    },
    onError: () => toast.error('Cập nhật thất bại'),
  });

  const deleteMutation = useMutation({
    mutationFn: (subId: string) => deleteProfileEducation(profileId!, subId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile', profileId, 'education'],
      });
      toast.success('Xóa thành công');
    },
    onError: () => toast.error('Xóa thất bại'),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: Partial<Profile>) =>
      updateProfile(Number(profileId), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
      setIsEditAcademicInfoDialogOpen(false);
      toast.success('Cập nhật chuyên môn thành công');
    },
    onError: () => toast.error('Cập nhật thất bại'),
  });

  // Filtered data for current tab
  const filteredData = useMemo(() => {
    return educationRecords.filter(
      (record) => record.eduType === activeEduType,
    );
  }, [educationRecords, activeEduType]);

  const handleEdit = (record: TrainingRecord) => {
    setEditingRecord(record);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bản ghi này?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleAddNew = () => {
    setEditingRecord(null);
    setIsDialogOpen(true);
  };

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
        <HeaderWrapper title="Học hàm, trình độ chuyên môn">
          <div className="flex gap-2">
            <Button onClick={handleAddNew}>
              <PlusCircle className="h-4 w-4" /> Thêm mới
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4" /> Xuất lý lịch
            </Button>
          </div>
        </HeaderWrapper>

        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center">
              {editingRecord ? 'Cập nhật' : 'Thêm'} thông tin đào tạo, bồi dưỡng
            </DialogTitle>
            <DialogDescription className="sr-only"></DialogDescription>
          </DialogHeader>
          <div className="max-h-[80vh] overflow-y-auto px-1">
            <AddTrainingForm
              eduType={activeEduType}
              initialValues={editingRecord || {}}
              onSubmitSuccess={(values) => {
                if (editingRecord) {
                  updateMutation.mutate(values as Partial<TrainingRecord>);
                } else {
                  createMutation.mutate(values as Omit<TrainingRecord, 'id'>);
                }
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
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
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

      <div className="mt-4 flex justify-end px-4">
        <Button
          variant="outline"
          onClick={() => setIsEditAcademicInfoDialogOpen(true)}
        >
          <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa thông tin
        </Button>
      </div>

      {/* Info Grid */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-1 gap-x-12 gap-y-4 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-4">
            <InfoRow
              label="Trình độ giáo dục phổ thông"
              value={profile?.eduLevelGeneral}
            />
            <InfoRow
              label="Trình độ chuyên môn cao nhất"
              value={
                profile?.academicDegree
                  ? ACADEMIC_DEGREE_MAP[profile.academicDegree]
                  : '---'
              }
            />
            <InfoRow
              label="Học hàm"
              value={
                profile?.academicTitle
                  ? ACADEMIC_TITLE_MAP[profile.academicTitle]
                  : '---'
              }
            />
          </div>
          {/* Right Column */}
          <div className="space-y-4">
            <InfoRow
              label="Quản lý nhà nước"
              value={profile?.stateManagement}
            />
            <InfoRow
              label="Lý luận chính trị"
              value={
                profile?.politicalTheory
                  ? POLITICAL_THEORY_MAP[profile.politicalTheory]
                  : '---'
              }
            />
            <InfoRow
              label="Trình độ ngoại ngữ"
              value={profile?.foreignLangLevel}
            />
            <InfoRow label="Trình độ tin học" value={profile?.itLevel} />
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
                  <TableHead className="w-32 text-center font-semibold text-gray-800">
                    Từ ngày
                  </TableHead>
                  <TableHead className="w-32 text-center font-semibold text-gray-800">
                    Đến ngày
                  </TableHead>

                  {activeEduType === 'degree' && (
                    <TableHead className="font-semibold text-gray-800">
                      {TRAINING_RECORD_MAP[TRAINING_RECORD.DEGREE_LEVEL]}
                    </TableHead>
                  )}

                  {(activeEduType === 'certificate' ||
                    activeEduType === 'it') && (
                    <TableHead className="font-semibold text-gray-800">
                      {TRAINING_RECORD_MAP[TRAINING_RECORD.CERT_NAME]}
                    </TableHead>
                  )}

                  {activeEduType === 'foreign_lang' && (
                    <>
                      <TableHead className="font-semibold text-gray-800">
                        {TRAINING_RECORD_MAP[TRAINING_RECORD.LANG_NAME]}
                      </TableHead>
                      <TableHead className="font-semibold text-gray-800">
                        {TRAINING_RECORD_MAP[TRAINING_RECORD.LANG_LEVEL]}
                      </TableHead>
                    </>
                  )}

                  <TableHead className="font-semibold text-gray-800">
                    {TRAINING_RECORD_MAP[TRAINING_RECORD.INSTITUTION]}
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800">
                    {TRAINING_RECORD_MAP[TRAINING_RECORD.MAJOR]}
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800">
                    {TRAINING_RECORD_MAP[TRAINING_RECORD.TRAINING_FORM]}
                  </TableHead>
                  <TableHead className="w-24 text-center font-semibold text-gray-800">
                    {TRAINING_RECORD_MAP[TRAINING_RECORD.IS_STUDYING]}
                  </TableHead>
                  <TableHead className="w-32 text-center font-semibold text-gray-800">
                    {TRAINING_RECORD_MAP[TRAINING_RECORD.APPROVAL_STATUS]}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={10} className="h-32 text-center">
                      <div className="flex items-center justify-center gap-2 text-gray-500">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Đang tải dữ liệu...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredData.length > 0 ? (
                  filteredData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                            onClick={() => handleEdit(row)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleDelete(row.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {row.fromDate || '---'}
                      </TableCell>
                      <TableCell className="text-center">
                        {row.toDate || '---'}
                      </TableCell>

                      {activeEduType === 'degree' && (
                        <TableCell className="font-medium text-gray-800">
                          {row.degreeLevel || '---'}
                        </TableCell>
                      )}

                      {(activeEduType === 'certificate' ||
                        activeEduType === 'it') && (
                        <TableCell className="font-medium text-gray-800">
                          {row.certName || '---'}
                        </TableCell>
                      )}

                      {activeEduType === 'foreign_lang' && (
                        <>
                          <TableCell className="font-medium text-gray-800">
                            {row.langName || '---'}
                          </TableCell>
                          <TableCell className="font-medium text-gray-800">
                            {row.langLevel || '---'}
                          </TableCell>
                        </>
                      )}

                      <TableCell>{row.institution}</TableCell>
                      <TableCell>{row.major || '---'}</TableCell>
                      <TableCell>{row.trainingForm || '---'}</TableCell>
                      <TableCell className="text-center">
                        {row.isStudying ? (
                          <span className="text-blue-600">Đang học</span>
                        ) : (
                          '---'
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <ApprovalStatusBadge
                          status={
                            row.approvalStatus || APPROVAL_STATUS.APPROVED
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={12}
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

      <Dialog
        open={isEditAcademicInfoDialogOpen}
        onOpenChange={setIsEditAcademicInfoDialogOpen}
      >
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-center">
              Chỉnh sửa Học hàm, trình độ chuyên môn
            </DialogTitle>
            <DialogDescription className="sr-only"></DialogDescription>
          </DialogHeader>
          <div className="max-h-[80vh] overflow-y-auto px-1">
            {profile && (
              <EditAcademicInfoForm
                initialValues={profile}
                onSubmitSuccess={(values) => {
                  updateProfileMutation.mutate(values as Partial<Profile>);
                }}
                renderActions={(isSubmitting) => (
                  <>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setIsEditAcademicInfoDialogOpen(false)}
                      disabled={isSubmitting}
                    >
                      Hủy
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
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
    </div>
  );
}

function InfoRow({
  label,
  value,
  className,
}: {
  label: string;
  value: string | number | null | undefined;
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

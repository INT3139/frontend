import { HeaderWrapper } from '@/components/main/HeaderWrapper';
import { EditProfileDialog } from '@/components/personnel-cv/EditProfileDialog';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { type Profile } from '@/schemas/profile';
import { getMyProfile, updateProfile } from '@/services/api/profile';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Download, Edit, RotateCcw } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/',
)({
  component: RouteComponent,
});

const MARITAL_STATUS_MAP: Record<string, string> = {
  single: 'Độc thân',
  married: 'Đã kết hôn',
  divorced: 'Đã ly hôn',
  widowed: 'Góa',
};

function RouteComponent() {
  const queryClient = useQueryClient();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', 'me'],
    queryFn: getMyProfile,
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<Profile>) =>
      updateProfile(profile?.id as number, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
    },
  });

  if (isLoading) {
    return <div className="p-8 text-center">Đang tải thông tin...</div>;
  }

  if (!profile) {
    return (
      <div className="p-8 text-center">Không tìm thấy thông tin nhân sự.</div>
    );
  }

  return (
    <div className="flex flex-col">
      <HeaderWrapper title="Thông tin nhân sự">
        <Button variant="outline" onClick={() => setIsEditOpen(true)}>
          <Edit className="h-4 w-4" /> Chỉnh sửa
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ['profile', 'me'] })
          }
        >
          <RotateCcw className="h-4 w-4" /> Cập nhật
        </Button>
        <Button>
          <Download className="h-4 w-4" /> Xuất lý lịch
        </Button>
      </HeaderWrapper>

      <div className="px-4 py-6">
        <div className="grid grid-cols-1 gap-x-12 gap-y-4 lg:grid-cols-2">
          {/* Top Left */}
          <div className="space-y-4">
            <InfoRow label="Số CMND/CCCD" value={profile.idNumber} />
            <InfoRow label="Ngày cấp" value={profile.idIssuedDate} />
            <InfoRow label="Nơi cấp" value={profile.idIssuedBy} />
            <InfoRow label="SĐT cơ quan" value={profile.phoneWork} />
            <InfoRow label="SĐT nhà riêng" value={profile.phoneHome} />
            <InfoRow
              label="Trạng thái làm việc"
              value={
                profile.employmentStatus === 'active'
                  ? 'Đang công tác'
                  : profile.employmentStatus
              }
            />
            <InfoRow
              label="Loại cán bộ"
              value={
                profile.staffType === 'lecturer'
                  ? 'Giảng viên'
                  : profile.staffType === 'researcher'
                    ? 'Nghiên cứu viên'
                    : 'Chuyên viên'
              }
            />
          </div>

          {/* Top Right */}
          <div className="space-y-4">
            <InfoRow
              label="Trạng thái hồ sơ"
              value={
                profile.profileStatus === 'approved'
                  ? 'Đã duyệt'
                  : profile.profileStatus === 'pending_review'
                    ? 'Chờ duyệt'
                    : 'Bản nháp'
              }
            />
            <InfoRow label="Email VNU" value={profile.emailVnu} />
            <InfoRow label="Email cá nhân" value={profile.emailPersonal} />
            <InfoRow label="Quốc tịch" value={profile.nationality} />
            <InfoRow label="Dân tộc" value={profile.ethnicity} />
            <InfoRow label="Tôn giáo" value={profile.religion} />
            <InfoRow label="Tên gọi khác" value={profile.nickName} />
          </div>
        </div>

        <div className="my-8 border-t border-gray-100"></div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-4 lg:grid-cols-2">
          {/* Bottom Left */}
          <div className="space-y-4">
            <InfoRow
              label="Đối tượng chính sách"
              value={profile.policyObject}
            />
            <InfoRow label="Số BHXH" value={profile.insuranceNumber} />
            <InfoRow
              label="Ngày tham gia BHXH"
              value={profile.insuranceJoinedAt}
            />
            <InfoRow
              label="Tình trạng hôn nhân"
              value={
                profile.maritalStatus
                  ? MARITAL_STATUS_MAP[profile.maritalStatus]
                  : ''
              }
            />
          </div>

          {/* Bottom Right */}
          <div className="space-y-4">
            <InfoRow label="Hộ chiếu" value={profile.passportNumber} />
            <InfoRow label="Ngày cấp" value={profile.passportIssuedAt} />
            <InfoRow label="Nơi cấp" value={profile.passportIssuedBy} />
            <InfoRow label="Học vị" value={profile.academicDegree} />
            <InfoRow label="Học hàm" value={profile.academicTitle} />
          </div>
        </div>

        {/* Address Table */}
        <div className="mt-10 overflow-hidden rounded-md border">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-48 font-semibold"></TableHead>
                <TableHead className="font-semibold text-gray-800">
                  Số nhà/Đường
                </TableHead>
                <TableHead className="font-semibold text-gray-800">
                  Xã/Phường
                </TableHead>
                <TableHead className="font-semibold text-gray-800">
                  Huyện/Quận
                </TableHead>
                <TableHead className="font-semibold text-gray-800">
                  Tỉnh/Thành phố
                </TableHead>
                <TableHead className="font-semibold text-gray-800">
                  Quốc gia
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AddressTableRow
                label="Quê quán"
                address={profile.addrHometown}
              />
              <AddressTableRow
                label="Nơi sinh"
                address={profile.addrBirthplace}
              />
              <AddressTableRow
                label="Hộ khẩu thường trú"
                address={profile.addrPermanent}
              />
              <AddressTableRow
                label="Nơi ở hiện nay"
                address={profile.addrCurrent}
              />
            </TableBody>
          </Table>
        </div>
      </div>

      <EditProfileDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        profile={profile}
        onSubmit={async (data) => {
          await updateMutation.mutateAsync(data);
        }}
      />
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
      <span className="w-60 shrink-0 font-semibold tracking-wider">
        {label}
      </span>
      <span className="flex-1 leading-relaxed">{value || '---'}</span>
    </div>
  );
}

function AddressTableRow({
  label,
  address,
}: {
  label: string;
  address?: {
    street: string | null;
    ward: string | null;
    district: string | null;
    province: string | null;
    country: string | null;
  } | null;
}) {
  return (
    <TableRow>
      <TableCell className="font-semibold text-gray-700">{label}</TableCell>
      <TableCell>{address?.street || '---'}</TableCell>
      <TableCell>{address?.ward || '---'}</TableCell>
      <TableCell>{address?.district || '---'}</TableCell>
      <TableCell>{address?.province || '---'}</TableCell>
      <TableCell>{address?.country || '---'}</TableCell>
    </TableRow>
  );
}

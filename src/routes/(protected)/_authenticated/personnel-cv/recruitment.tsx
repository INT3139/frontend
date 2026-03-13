import { InfoRow } from '@/components/main/personel-cv/InfoRow';
import { PageHeader } from '@/components/main/personel-cv/PageHeader';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/recruitment',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-full justify-center font-sans">
      <div className="flex w-full max-w-[1400px] min-w-0 flex-col bg-white shadow-sm">
        {/* Header */}
        <PageHeader title="Thông tin tuyển dụng" />

        {/* Content */}
        <div className="flex-1 p-6 md:p-8">
          <div className="max-w-4xl space-y-5">
            <InfoRow label="Cơ quan, đơn vị tuyển dụng" value="" />
            <InfoRow label="Ngày tuyển dụng" value="" />
            <InfoRow label="Hình thức trả lương" value="" />
            <InfoRow label="Nghề nghiệp trước khi được tuyển dụng" value="" />
            <InfoRow label="Năm vào ngành giáo dục" value="" />
            <InfoRow label="Ngày bắt đầu vào ĐHQGHN" value="" />
            <InfoRow label="Thâm niên công tác" value="" />
            <InfoRow label="Công việc đã làm lâu nhất" value="" />
            <InfoRow label="Nhóm vị trí việc làm" value="" />
            <InfoRow label="Vị trí việc làm cấp ĐHQGHN" value="" />
            <InfoRow label="Vị trí việc làm cấp đơn vị" value="" />
            <InfoRow label="Công việc chính được giao" value="" />
            <InfoRow label="Sở trường công tác" value="" />
            <InfoRow label="Ghi chú" value="" />
          </div>
        </div>
      </div>
    </div>
  );
}

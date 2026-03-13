import { InfoRow } from '@/components/main/personel-cv/InfoRow';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { createFileRoute } from '@tanstack/react-router';
import { ChevronDown, Download, RefreshCw } from 'lucide-react';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/other',
)({
  component: OtherInformationScreen,
});

function OtherInformationScreen() {
  return (
    <div className="flex min-h-screen justify-center font-sans">
      <div className="flex w-full flex-col border border-gray-200 bg-white shadow-sm">
        <div className="bg-vnu-bg-light flex items-center justify-between border-b border-gray-200 p-3">
          <h1 className="text-vnu-green ml-2 text-base font-bold uppercase md:text-lg">
            Thông tin khác
          </h1>
          <div className="flex gap-2">
            <button className="bg-vnu-yellow flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-yellow-500">
              <RefreshCw className="h-4 w-4" />
              Cập nhật
            </button>
            <button className="bg-vnu-teal flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-teal-700">
              <Download className="h-4 w-4" />
              Xuất lý lịch
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-4 p-6 md:p-8">
          <Collapsible
            className="group rounded-md border border-gray-200 bg-white shadow-sm"
            defaultOpen
          >
            <CollapsibleTrigger className="flex w-full items-center gap-2 p-4 font-semibold text-gray-800 uppercase transition-colors hover:bg-gray-50">
              <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              Đặc điểm lịch sử bản thân
            </CollapsibleTrigger>
            <CollapsibleContent className="border-t border-gray-100 p-4 pt-2">
              <div className="space-y-4">
                <InfoRow label="Khai rõ tiền án, tiền sự" value="" />
                <InfoRow label="Bản thân làm việc cho chế độ cũ" value="" />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible
            className="group rounded-md border border-gray-200 bg-white shadow-sm"
            defaultOpen
          >
            <CollapsibleTrigger className="flex w-full items-center gap-2 p-4 font-semibold text-gray-800 uppercase transition-colors hover:bg-gray-50">
              <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              Quan hệ với nước ngoài
            </CollapsibleTrigger>
            <CollapsibleContent className="border-t border-gray-100 p-4 pt-2">
              <div className="space-y-4">
                <InfoRow
                  label="Tham gia hoặc quan hệ với tổ chức chính trị nào ở nước ngoài"
                  value=""
                />
                <InfoRow label="Có thân nhân" value="" />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible
            className="group rounded-md border border-gray-200 bg-white shadow-sm"
            defaultOpen
          >
            <CollapsibleTrigger className="flex w-full items-center gap-2 p-4 font-semibold text-gray-800 uppercase transition-colors hover:bg-gray-50">
              <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              Hoàn cảnh kinh tế gia đình
            </CollapsibleTrigger>
            <CollapsibleContent className="border-t border-gray-100 p-4 pt-4">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <InfoRow label="Lương" value="" />
                  <InfoRow label="Nhà ở" value="" />
                  <InfoRow label="Đất ở" value="" />
                </div>

                <div className="space-y-4">
                  <InfoRow label="Các nguồn khác" value="" />
                  <InfoRow label="Tổng diện tích sử dụng" value="" />
                  <InfoRow label="Đất tự mua" value="" />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}

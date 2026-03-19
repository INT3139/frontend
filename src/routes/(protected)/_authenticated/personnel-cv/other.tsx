import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { createFileRoute } from '@tanstack/react-router';
import { ChevronDown, Download, Edit, Save, X } from 'lucide-react';
import React, { useState } from 'react';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/other',
)({
  component: OtherInformationScreen,
});

// ==========================================
// COMPONENT: INFO ROW (Tham khảo từ salary.tsx)
// ==========================================
function InfoRow({
  label,
  value,
  isEditing,
  onChange,
  name,
}: {
  label: string;
  value: string;
  isEditing?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}) {
  return (
    <div className="flex items-start py-2 text-sm">
      <div className="w-72 shrink-0 font-semibold text-gray-700 md:w-80">
        {label}
      </div>
      <div className="w-6 shrink-0 text-gray-600">:</div>
      <div className="flex-1 text-gray-800">
        {isEditing ? (
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:border-[#008a70] focus:outline-none"
          />
        ) : (
          <span className="break-words">{value || '---'}</span>
        )}
      </div>
    </div>
  );
}

function OtherInformationScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [otherInfo, setOtherInfo] = useState({
    khaiRoTienAn: '',
    lamViecCheDoCu: '',
    quanHeToChucNuocNgoai: '',
    thanNhanNuocNgoai: '',
    luong: '',
    nhaO: '',
    datO: '',
    nguonKhac: '',
    tongDienTich: '',
    datTuMua: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOtherInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Dữ liệu Thông tin khác:', otherInfo);
    setIsEditing(false);
  };

  return (
    <div className="flex min-h-screen justify-center font-sans">
      <div className="flex w-full flex-col border border-gray-200 bg-white shadow-sm">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-[#f0f9f6] p-3">
          <h1 className="ml-2 text-base font-bold text-[#008a70] uppercase md:text-lg">
            Thông tin khác
          </h1>
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 rounded bg-[#f5b027] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-yellow-500"
                >
                  <Edit className="h-4 w-4" />
                  Cập nhật
                </button>
                <button className="flex items-center gap-2 rounded bg-[#008a70] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-teal-700">
                  <Download className="h-4 w-4" />
                  Xuất lý lịch
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 rounded bg-gray-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-600"
                >
                  <X className="h-4 w-4" />
                  Hủy
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded bg-[#008a70] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
                >
                  <Save className="h-4 w-4" />
                  Lưu
                </button>
              </>
            )}
          </div>
        </div>

        {/* NỘI DUNG */}
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
                <InfoRow
                  label="Khai rõ tiền án, tiền sự"
                  name="khaiRoTienAn"
                  value={otherInfo.khaiRoTienAn}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                />
                <InfoRow
                  label="Bản thân làm việc cho chế độ cũ (Cơ quan, đơn vị, địa điểm, chức danh, thời gian làm việc?)"
                  name="lamViecCheDoCu"
                  value={otherInfo.lamViecCheDoCu}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                />
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
                  label="Tham gia hoặc quan hệ với các tổ chức chính trị, kinh tế, xã hội nào ở nước ngoài"
                  name="quanHeToChucNuocNgoai"
                  value={otherInfo.quanHeToChucNuocNgoai}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                />
                <InfoRow
                  label="Có thân nhân ở nước ngoài? Họ làm gì?"
                  name="thanNhanNuocNgoai"
                  value={otherInfo.thanNhanNuocNgoai}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                />
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
              <div className="grid grid-cols-1 gap-x-16 gap-y-4 lg:grid-cols-2">
                <div className="space-y-4">
                  <InfoRow
                    label="Lương"
                    name="luong"
                    value={otherInfo.luong}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                  <InfoRow
                    label="Nhà ở"
                    name="nhaO"
                    value={otherInfo.nhaO}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                  <InfoRow
                    label="Đất ở"
                    name="datO"
                    value={otherInfo.datO}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-4">
                  <InfoRow
                    label="Các nguồn khác"
                    name="nguonKhac"
                    value={otherInfo.nguonKhac}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                  <InfoRow
                    label="Tổng diện tích sử dụng"
                    name="tongDienTich"
                    value={otherInfo.tongDienTich}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                  <InfoRow
                    label="Đất tự mua"
                    name="datTuMua"
                    value={otherInfo.datTuMua}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}

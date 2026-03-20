import { ApprovalStatusBadge } from '@/components/main/ApprovalStatusBadge';
import { CustomTablePagination } from '@/components/main/CustomTablePagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  APPROVAL_STATUS,
  type ApprovalStatus,
} from '@/schemas/personnel-cv/approval';
import { type FamilyRecord } from '@/schemas/personnel-cv/family';
import { services } from '@/services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Check, Edit, Loader2, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/family',
)({
  component: FamilyScreen,
});

// Sử dụng FamilyRecord từ src/schemas/personnel-cv/family.ts
// Nên ta ẩn type nội bộ này. type ApprovalStatus vẫn lấy từ file gốc.
type LocalFamilyRecord = FamilyRecord & {
  isEditing?: boolean;
  trangThai: ApprovalStatus | string;
};

function FamilyRow({
  item,
  index,
  onEdit,
  onSave,
  onDelete,
  onChange,
}: {
  item: LocalFamilyRecord;
  index: number;
  onEdit: (id: number) => void;
  onSave: (id: number) => void;
  onDelete: (id: number) => void;
  onChange: (id: number, field: keyof LocalFamilyRecord, value: string) => void;
}) {
  const id = item.id as number;

  return (
    <tr className="border-b text-sm transition-colors hover:bg-gray-50 [&>td]:py-2">
      <td className="w-24 border-r p-2 text-center">
        <div className="flex items-center justify-center gap-2">
          {item.isEditing ? (
            <button
              onClick={() => onSave(id)}
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-green-100 text-green-600 transition-colors hover:bg-green-200"
            >
              <Check className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => onEdit(id)}
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-blue-100 text-blue-600 transition-colors hover:bg-blue-200"
            >
              <Edit className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            onClick={() => onDelete(id)}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-red-100 text-red-600 transition-colors hover:bg-red-200"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </td>
      <td className="w-12 border-r p-2 text-center">{index + 1}</td>
      <td className="border-r p-2 font-medium">
        {item.isEditing ? (
          <input
            className="w-full border-b border-gray-300 outline-none focus:border-[#008a70]"
            value={item.quanHe}
            onChange={(e) => onChange(id, 'quanHe', e.target.value)}
            placeholder="VD: Cha đẻ"
          />
        ) : (
          item.quanHe
        )}
      </td>
      <td className="border-r p-2 font-medium">
        {item.isEditing ? (
          <input
            className="w-full border-b border-gray-300 outline-none focus:border-[#008a70]"
            value={item.hoTen}
            onChange={(e) => onChange(id, 'hoTen', e.target.value)}
          />
        ) : (
          item.hoTen
        )}
      </td>
      <td className="w-24 border-r p-2 text-center">
        {item.isEditing ? (
          <input
            className="w-full border-b border-gray-300 text-center outline-none focus:border-[#008a70]"
            value={item.namSinh}
            onChange={(e) => onChange(id, 'namSinh', e.target.value)}
          />
        ) : (
          item.namSinh
        )}
      </td>
      <td className="border-r p-2">
        {item.isEditing ? (
          <input
            className="w-full border-b border-gray-300 outline-none focus:border-[#008a70]"
            value={item.queQuan}
            onChange={(e) => onChange(id, 'queQuan', e.target.value)}
          />
        ) : (
          item.queQuan
        )}
      </td>
      <td className="border-r p-2">
        {item.isEditing ? (
          <input
            className="w-full border-b border-gray-300 outline-none focus:border-[#008a70]"
            value={item.ngheNghiep}
            onChange={(e) => onChange(id, 'ngheNghiep', e.target.value)}
          />
        ) : (
          item.ngheNghiep
        )}
      </td>
      <td className="p-2">
        <div className="flex justify-center">
          {item.isEditing ? (
            <select
              className="rounded border border-gray-300 p-1 text-xs outline-none focus:border-[#008a70]"
              value={item.trangThai}
              onChange={(e) =>
                onChange(id, 'trangThai', e.target.value as ApprovalStatus)
              }
            >
              <option value={APPROVAL_STATUS.APPROVED}>Đã duyệt</option>
              <option value={APPROVAL_STATUS.PENDING}>Đang chờ duyệt</option>
              <option value={APPROVAL_STATUS.REJECTED}>Từ chối</option>
            </select>
          ) : (
            <ApprovalStatusBadge status={item.trangThai} />
          )}
        </div>
      </td>
    </tr>
  );
}

function FamilyScreen() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['family'],
    queryFn: services.getFamilyInfo,
  });

  const updateMutation = useMutation({
    mutationFn: services.updateFamilyInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['family'] });
    },
  });

  const [myFamily, setMyFamily] = useState<LocalFamilyRecord[]>([]);
  const [inLawFamily, setInLawFamily] = useState<LocalFamilyRecord[]>([]);
  const [prevData, setPrevData] = useState(data);

  if (data !== prevData) {
    setPrevData(data);
    if (data) {
      setMyFamily(data.myFamily as LocalFamilyRecord[]);
      setInLawFamily(data.inLawFamily as LocalFamilyRecord[]);
    }
  }

  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(Math.max(myFamily.length, 1) / PAGE_SIZE);

  const paginatedData = myFamily.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // Handlers for My Family
  const handleAddMyFamily = () => {
    const newItem = {
      id: Date.now(),
      quanHe: '',
      hoTen: '',
      namSinh: '',
      queQuan: '',
      ngheNghiep: '',
      trangThai: APPROVAL_STATUS.PENDING,
      isEditing: true,
    };
    const newList = [...myFamily, newItem];
    setMyFamily(newList);
    const newTotalPages = Math.ceil(newList.length / PAGE_SIZE) || 1;
    setCurrentPage(newTotalPages);
  };
  const handleEditMyFamily = (id: number) =>
    setMyFamily(
      myFamily.map((item) =>
        item.id === id ? { ...item, isEditing: true } : item,
      ),
    );
  const handleSaveMyFamily = (id: number) => {
    const newMyFamily = myFamily.map((item) =>
      item.id === id ? { ...item, isEditing: false } : item,
    );
    setMyFamily(newMyFamily);
    updateMutation.mutate({ myFamily: newMyFamily, inLawFamily });
  };
  const handleDeleteMyFamily = (id: number) => {
    const newMyFamily = myFamily.filter((item) => item.id !== id);
    setMyFamily(newMyFamily);
    updateMutation.mutate({ myFamily: newMyFamily, inLawFamily });
  };
  const handleChangeMyFamily = (
    id: number,
    field: keyof LocalFamilyRecord,
    value: string,
  ) =>
    setMyFamily(
      myFamily.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );

  // Handlers for In-Law Family
  const handleAddInLawFamily = () => {
    setInLawFamily([
      {
        id: Date.now(),
        quanHe: '',
        hoTen: '',
        namSinh: '',
        queQuan: '',
        ngheNghiep: '',
        trangThai: APPROVAL_STATUS.PENDING,
        isEditing: true,
      },
      ...inLawFamily,
    ]);
  };
  const handleEditInLawFamily = (id: number) =>
    setInLawFamily(
      inLawFamily.map((item) =>
        item.id === id ? { ...item, isEditing: true } : item,
      ),
    );
  const handleSaveInLawFamily = (id: number) => {
    const newInLawFamily = inLawFamily.map((item) =>
      item.id === id ? { ...item, isEditing: false } : item,
    );
    setInLawFamily(newInLawFamily);
    updateMutation.mutate({ myFamily, inLawFamily: newInLawFamily });
  };
  const handleDeleteInLawFamily = (id: number) => {
    const newInLawFamily = inLawFamily.filter((item) => item.id !== id);
    setInLawFamily(newInLawFamily);
    updateMutation.mutate({ myFamily, inLawFamily: newInLawFamily });
  };
  const handleChangeInLawFamily = (
    id: number,
    field: keyof LocalFamilyRecord,
    value: string,
  ) =>
    setInLawFamily(
      inLawFamily.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );

  if (isLoading)
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-[#008a70]" />
      </div>
    );
  if (error) {
    if (import.meta.env.DEV) console.error(error);
    return <div className="p-4 text-red-500">Đã xảy ra lỗi tải dữ liệu!</div>;
  }

  return (
    <div className="min-h-screen space-y-10 bg-white p-4 font-sans">
      {/* Về bản thân */}
      <Card className="rounded-none border-none bg-transparent shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-4">
          <CardTitle className="text-sm leading-none font-bold text-[#008a70] uppercase md:text-base">
            VỀ BẢN THÂN: CHA, MẸ, VỢ (HOẶC CHỒNG)
          </CardTitle>
          <button
            onClick={handleAddMyFamily}
            className="flex items-center gap-2 rounded bg-[#f5b027] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-yellow-500"
          >
            <Plus className="h-4 w-4" /> Thêm mới
          </button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-md border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-max border-collapse text-left text-sm">
                <thead className="border-t-2 border-t-[#008a70] bg-gray-50/50 hover:bg-gray-50/50">
                  <tr className="[&>th]:h-10 [&>th]:text-xs [&>th]:font-bold [&>th]:text-gray-700">
                    <th className="border-r px-2 text-center">Thao tác</th>
                    <th className="border-r px-2 text-center">STT</th>
                    <th className="border-r px-2">Quan hệ</th>
                    <th className="border-r px-2">Họ tên</th>
                    <th className="border-r px-2 text-center">Năm sinh</th>
                    <th className="border-r px-2">Quê quán</th>
                    <th className="border-r px-2">Nghề nghiệp</th>
                    <th className="px-2 text-center">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => (
                    <FamilyRow
                      key={item.id}
                      item={item}
                      index={(currentPage - 1) * PAGE_SIZE + index}
                      onEdit={handleEditMyFamily}
                      onSave={handleSaveMyFamily}
                      onDelete={handleDeleteMyFamily}
                      onChange={handleChangeMyFamily}
                    />
                  ))}
                  {paginatedData.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-4 text-center text-gray-500">
                        Chưa có dữ liệu.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-end border-t bg-gray-50/30 py-2 pr-4">
                <CustomTablePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bên vợ / chồng */}
      <Card className="mt-8 rounded-none border-none bg-transparent shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-4">
          <CardTitle className="text-sm leading-none font-bold text-[#008a70] uppercase md:text-base">
            BÊN VỢ (HOẶC CHỒNG)
          </CardTitle>
          <button
            onClick={handleAddInLawFamily}
            className="flex items-center gap-2 rounded bg-[#f5b027] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-yellow-500"
          >
            <Plus className="h-4 w-4" /> Thêm mới
          </button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-md border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-max border-collapse text-left text-sm">
                <thead className="border-t-2 border-t-[#008a70] bg-gray-50/50 hover:bg-gray-50/50">
                  <tr className="[&>th]:h-10 [&>th]:text-xs [&>th]:font-bold [&>th]:text-gray-700">
                    <th className="border-r px-2 text-center">Thao tác</th>
                    <th className="border-r px-2 text-center">STT</th>
                    <th className="border-r px-2">Quan hệ</th>
                    <th className="border-r px-2">Họ tên</th>
                    <th className="border-r px-2 text-center">Năm sinh</th>
                    <th className="border-r px-2">Quê quán</th>
                    <th className="border-r px-2">Nghề nghiệp</th>
                    <th className="px-2 text-center">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {inLawFamily.map((item, index) => (
                    <FamilyRow
                      key={item.id}
                      item={item}
                      index={index}
                      onEdit={handleEditInLawFamily}
                      onSave={handleSaveInLawFamily}
                      onDelete={handleDeleteInLawFamily}
                      onChange={handleChangeInLawFamily}
                    />
                  ))}
                  {inLawFamily.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-4 text-center text-gray-500">
                        Chưa có dữ liệu.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

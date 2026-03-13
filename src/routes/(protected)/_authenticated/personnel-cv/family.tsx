import { CustomTablePagination } from '@/components/main/CustomTablePagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
  APPROVAL_STATUS,
  APPROVAL_STATUS_MAP,
} from '@/schemas/personnel-cv/approval';
import { createFileRoute } from '@tanstack/react-router';
import { Edit, Plus } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/family',
)({
  component: FamilyScreen,
});

function FamilyScreen() {
  const myFamily = [
    {
      id: 1,
      quanHe: 'Ông nội',
      hoTen: 'Nguyễn Ông Nội',
      namSinh: '1936',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Nông dân',
      trangThai: APPROVAL_STATUS.APPROVED,
    },
    {
      id: 2,
      quanHe: 'Bà nội',
      hoTen: 'Trần Bà Nội',
      namSinh: '1940',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Nông dân',
      trangThai: APPROVAL_STATUS.APPROVED,
    },
    {
      id: 3,
      quanHe: 'Ông ngoại',
      hoTen: 'Nguyễn Ông Ngoại',
      namSinh: '1939',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Nông dân',
      trangThai: APPROVAL_STATUS.APPROVED,
    },
    {
      id: 4,
      quanHe: 'Bà ngoại',
      hoTen: 'Lê Bà Ngoại',
      namSinh: '1944',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Nông dân',
      trangThai: APPROVAL_STATUS.APPROVED,
    },
    {
      id: 5,
      quanHe: 'Bố đẻ',
      hoTen: 'Nguyễn Bố',
      namSinh: '1963',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Công nhân',
      trangThai: APPROVAL_STATUS.PENDING,
    }, // Để 1 cái PENDING test màu vàng
    {
      id: 6,
      quanHe: 'Mẹ đẻ',
      hoTen: 'Nguyễn Thị M',
      namSinh: '1966',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Công nhân',
      trangThai: APPROVAL_STATUS.APPROVED,
    },
    {
      id: 7,
      quanHe: 'Anh trai',
      hoTen: 'Nguyễn Thanh Độ',
      namSinh: '1985',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Kinh doanh',
      trangThai: APPROVAL_STATUS.APPROVED,
    },
    {
      id: 8,
      quanHe: 'Vợ',
      hoTen: 'Nguyễn Thị B',
      namSinh: '1988',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Giáo viên',
      trangThai: APPROVAL_STATUS.APPROVED,
    },
    {
      id: 9,
      quanHe: 'Con trai',
      hoTen: 'Nguyễn Sói',
      namSinh: '2013',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Học sinh',
      trangThai: APPROVAL_STATUS.APPROVED,
    },
    {
      id: 10,
      quanHe: 'Con gái',
      hoTen: 'Nguyễn Cừu',
      namSinh: '2016',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Học sinh',
      trangThai: APPROVAL_STATUS.APPROVED,
    },
    {
      id: 11,
      quanHe: 'Em gái',
      hoTen: 'Nguyễn Thị G',
      namSinh: '1995',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Kế toán',
      trangThai: APPROVAL_STATUS.APPROVED,
    },
    {
      id: 12,
      quanHe: 'Anh rể',
      hoTen: 'Trần Văn T',
      namSinh: '1990',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Kỹ sư',
      trangThai: APPROVAL_STATUS.APPROVED,
    },
  ];

  const inLawFamily = [
    {
      id: 1,
      quanHe: 'Bố vợ',
      hoTen: 'Nguyễn Bố Vợ',
      namSinh: '1960',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Nông dân',
      trangThai: APPROVAL_STATUS.APPROVED,
    },
    {
      id: 2,
      quanHe: 'Mẹ vợ',
      hoTen: 'Nguyễn Mẹ Vợ',
      namSinh: '1965',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Nông dân',
      trangThai: APPROVAL_STATUS.PENDING,
    },
  ];

  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(myFamily.length / PAGE_SIZE);

  const paginatedData = myFamily.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="min-h-screen space-y-10 bg-white p-4">
      <Card className="rounded-none border-none bg-transparent shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
          <CardTitle className="text-sm leading-none font-bold text-green-700 uppercase">
            VỀ BẢN THÂN: CHA, MẸ, VỢ (HOẶC CHỒNG)
          </CardTitle>
          <Button
            size="sm"
            className="h-8 border-none bg-yellow-500 text-xs text-white hover:bg-yellow-600"
          >
            <Plus className="mr-1 h-3 w-3" /> Thêm mới
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-md border border-gray-200">
            <div className="overflow-x-auto">
              <Table className="min-w-max">
                <TableHeader className="border-t-2 border-t-green-600 bg-gray-50/50 hover:bg-gray-50/50">
                  <TableRow className="[&>th]:h-10 [&>th]:text-xs [&>th]:font-bold [&>th]:text-gray-700">
                    <TableHead className="w-[60px] border-r text-center">
                      Thao tác
                    </TableHead>
                    <TableHead className="w-[50px] border-r text-center">
                      STT
                    </TableHead>
                    <TableHead className="border-r">Quan hệ</TableHead>
                    <TableHead className="border-r">Họ tên</TableHead>
                    <TableHead className="border-r text-center">
                      Năm sinh
                    </TableHead>
                    <TableHead className="border-r">Quê quán</TableHead>
                    <TableHead className="border-r">Nghề nghiệp</TableHead>
                    <TableHead className="text-center">Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-sm">
                  {paginatedData.map((item, index) => (
                    <TableRow
                      key={item.id}
                      className="border-b hover:bg-gray-50 [&>td]:py-1"
                    >
                      <TableCell className="border-r text-center">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-green-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell className="border-r text-center">
                        {(currentPage - 1) * PAGE_SIZE + index + 1}
                      </TableCell>
                      <TableCell className="border-r font-medium">
                        {item.quanHe}
                      </TableCell>
                      <TableCell className="border-r font-medium">
                        {item.hoTen}
                      </TableCell>
                      <TableCell className="border-r text-center">
                        {item.namSinh}
                      </TableCell>
                      <TableCell className="border-r">{item.queQuan}</TableCell>
                      <TableCell className="border-r">
                        {item.ngheNghiep}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <Badge
                            variant="outline"
                            className={cn('border-0 px-3 font-normal', {
                              'bg-green-100 text-green-700 hover:bg-green-100':
                                item.trangThai === APPROVAL_STATUS.APPROVED,
                              'bg-yellow-100 text-yellow-700 hover:bg-yellow-100':
                                item.trangThai === APPROVAL_STATUS.PENDING,
                              'bg-red-100 text-red-700 hover:bg-red-100':
                                item.trangThai === APPROVAL_STATUS.REJECTED,
                            })}
                          >
                            {APPROVAL_STATUS_MAP[item.trangThai]}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
      <Card className="mt-8 rounded-none border-none bg-transparent shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
          <CardTitle className="text-sm leading-none font-bold text-green-700 uppercase">
            BÊN VỢ (HOẶC CHỒNG)
          </CardTitle>
          <Button
            size="sm"
            className="h-8 border-none bg-yellow-500 text-xs text-white hover:bg-yellow-600"
          >
            <Plus className="mr-1 h-3 w-3" /> Thêm mới
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-md border border-gray-200">
            <div className="overflow-x-auto">
              <Table className="min-w-max">
                <TableHeader className="border-t-2 border-t-green-600 bg-gray-50/50 hover:bg-gray-50/50">
                  <TableRow className="[&>th]:h-10 [&>th]:text-xs [&>th]:font-bold [&>th]:text-gray-700">
                    <TableHead className="w-[60px] border-r text-center">
                      Thao tác
                    </TableHead>
                    <TableHead className="w-[50px] border-r text-center">
                      STT
                    </TableHead>
                    <TableHead className="border-r">Quan hệ</TableHead>
                    <TableHead className="border-r">Họ tên</TableHead>
                    <TableHead className="border-r text-center">
                      Năm sinh
                    </TableHead>
                    <TableHead className="border-r">Quê quán</TableHead>
                    <TableHead className="border-r">Nghề nghiệp</TableHead>
                    <TableHead className="text-center">Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-sm">
                  {inLawFamily.map((item, index) => (
                    <TableRow
                      key={item.id}
                      className="border-b hover:bg-gray-50 [&>td]:py-1"
                    >
                      <TableCell className="border-r text-center">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-green-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell className="border-r text-center">
                        {index + 1}
                      </TableCell>
                      <TableCell className="border-r font-medium">
                        {item.quanHe}
                      </TableCell>
                      <TableCell className="border-r font-medium">
                        {item.hoTen}
                      </TableCell>
                      <TableCell className="border-r text-center">
                        {item.namSinh}
                      </TableCell>
                      <TableCell className="border-r">{item.queQuan}</TableCell>
                      <TableCell className="border-r">
                        {item.ngheNghiep}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <Badge
                            variant="outline"
                            className={cn('border-0 px-3 font-normal', {
                              'bg-green-100 text-green-700 hover:bg-green-100':
                                item.trangThai === APPROVAL_STATUS.APPROVED,
                              'bg-yellow-100 text-yellow-700 hover:bg-yellow-100':
                                item.trangThai === APPROVAL_STATUS.PENDING,
                              'bg-red-100 text-red-700 hover:bg-red-100':
                                item.trangThai === APPROVAL_STATUS.REJECTED,
                            })}
                          >
                            {APPROVAL_STATUS_MAP[item.trangThai]}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

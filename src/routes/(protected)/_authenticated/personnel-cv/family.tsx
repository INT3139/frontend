import { createFileRoute } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight, Edit, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '../../../../components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../components/ui/table';

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
      trangThai: 'Đã mất',
    },
    {
      id: 2,
      quanHe: 'Bà nội',
      hoTen: 'Trần Bà Nội',
      namSinh: '1940',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Nông dân',
      trangThai: 'Đã mất',
    },
    {
      id: 3,
      quanHe: 'Ông ngoại',
      hoTen: 'Nguyễn Ông Ngoại',
      namSinh: '1939',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Nông dân',
      trangThai: 'Đã mất',
    },
    {
      id: 4,
      quanHe: 'Bà ngoại',
      hoTen: 'Lê Bà Ngoại',
      namSinh: '1944',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Nông dân',
      trangThai: 'Đã mất',
    },
    {
      id: 5,
      quanHe: 'Bố đẻ',
      hoTen: 'Nguyễn Bố',
      namSinh: '1963',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Công nhân',
      trangThai: 'Còn sống',
    },
    {
      id: 6,
      quanHe: 'Mẹ đẻ',
      hoTen: 'Nguyễn Thị M',
      namSinh: '1966',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Công nhân',
      trangThai: 'Còn sống',
    },
    {
      id: 7,
      quanHe: 'Anh trai',
      hoTen: 'Nguyễn Thanh Độ',
      namSinh: '1982',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Kinh doanh',
      trangThai: 'Còn sống',
    },
    {
      id: 8,
      quanHe: 'Em gái',
      hoTen: 'Nguyễn Thị G',
      namSinh: '1988',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Kế toán',
      trangThai: 'Còn sống',
    },
    {
      id: 9,
      quanHe: 'Em gái',
      hoTen: 'Nguyễn Thị H',
      namSinh: '1991',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Kế toán',
      trangThai: 'Còn sống',
    },
    {
      id: 10,
      quanHe: 'Vợ',
      hoTen: 'Nguyễn Thị B',
      namSinh: '1988',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Giáo viên',
      trangThai: 'Còn sống',
    },
    {
      id: 11,
      quanHe: 'Con trai',
      hoTen: 'Nguyễn Sói',
      namSinh: '2013',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Học sinh',
      trangThai: 'Còn sống',
    },
    {
      id: 12,
      quanHe: 'Con gái',
      hoTen: 'Nguyễn Cừu',
      namSinh: '2015',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Học sinh',
      trangThai: 'Còn sống',
    },
    {
      id: 13,
      quanHe: 'Con trai',
      hoTen: 'Nguyễn Văn T',
      namSinh: '2017',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Học sinh',
      trangThai: 'Còn sống',
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
      trangThai: 'Còn sống',
    },
    {
      id: 2,
      quanHe: 'Mẹ vợ',
      hoTen: 'Nguyễn Mẹ Vợ',
      namSinh: '1965',
      queQuan: 'Cao Bằng',
      ngheNghiep: 'Nông dân',
      trangThai: 'Còn sống',
    },
  ];

  const rowsPerPage = 10;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  return (
    <div className="p-4 space-y-10 bg-white min-h-screen">
      <Card className="border-none shadow-none rounded-none bg-transparent">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
          <CardTitle className="text-green-700 font-bold text-sm uppercase leading-none">
            VỀ BẢN THÂN: CHA, MẸ, VỢ (HOẶC CHỒNG)
          </CardTitle>
          <Button
            size="sm"
            className="bg-yellow-500 hover:bg-yellow-600 text-white border-none h-8 text-xs"
          >
            <Plus className="w-3 h-3 mr-1" /> Thêm mới
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border border-gray-200 rounded-md">
            <div className="overflow-x-auto">
              <Table className="min-w-max">
                <TableHeader className="border-t-2 border-t-green-600 bg-white hover:bg-transparent">
                  <TableRow className="[&>th]:text-black [&>th]:font-bold [&>th]:text-xs">
                    <TableHead className="w-15 text-center border-r">
                      Thao tác
                    </TableHead>
                    <TableHead className="w-12.5 text-center border-r">
                      STT
                    </TableHead>
                    <TableHead className="border-r">Quan hệ</TableHead>
                    <TableHead className="border-r">Họ tên</TableHead>
                    <TableHead className="text-center border-r">
                      Năm sinh
                    </TableHead>
                    <TableHead className="border-r">Quê quán</TableHead>
                    <TableHead className="border-r">Nghề nghiệp</TableHead>
                    <TableHead className="text-center">Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xs">
                  {myFamily.slice(startIndex, endIndex).map((item, index) => (
                    <TableRow
                      key={item.id}
                      className="hover:bg-gray-50 border-b"
                    >
                      <TableCell className="text-center border-r">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-green-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell className="text-center border-r">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell className="border-r">{item.quanHe}</TableCell>
                      <TableCell className="border-r">{item.hoTen}</TableCell>
                      <TableCell className="text-center border-r">
                        {item.namSinh}
                      </TableCell>
                      <TableCell className="border-r">{item.queQuan}</TableCell>
                      <TableCell className="border-r">
                        {item.ngheNghiep}
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] ${item.trangThai === 'Còn sống' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                        >
                          {item.trangThai}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {myFamily.length > rowsPerPage && (
              <div className="py-1 border-t bg-gray-50/50 flex justify-center pr-4">
                <Pagination className="mx-0 w-auto">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        className={
                          startIndex === 0
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setStartIndex(Math.max(0, startIndex - rowsPerPage));
                          setEndIndex(
                            Math.max(rowsPerPage, endIndex - rowsPerPage),
                          );
                        }}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        className={
                          endIndex >= myFamily.length
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setStartIndex(startIndex + rowsPerPage);
                          setEndIndex(endIndex + rowsPerPage);
                        }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </PaginationLink>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-none rounded-none bg-transparent mt-8">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
          <CardTitle className="text-green-700 font-bold text-sm uppercase leading-none">
            BÊN VỢ (HOẶC CHỒNG)
          </CardTitle>
          <Button
            size="sm"
            className="bg-yellow-500 hover:bg-yellow-600 text-white border-none h-8 text-xs"
          >
            <Plus className="w-3 h-3 mr-1" /> Thêm mới
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border border-gray-200 rounded-md">
            <div className="overflow-x-auto">
              <Table className="min-w-max">
                <TableHeader className="border-t-2 border-t-green-600 bg-white hover:bg-transparent">
                  <TableRow className="[&>th]:text-black [&>th]:font-bold [&>th]:text-xs">
                    <TableHead className="w-15 text-center border-r">
                      Thao tác
                    </TableHead>
                    <TableHead className="w-12.5 text-center border-r">
                      STT
                    </TableHead>
                    <TableHead className="border-r">Quan hệ</TableHead>
                    <TableHead className="border-r">Họ tên</TableHead>
                    <TableHead className="text-center border-r">
                      Năm sinh
                    </TableHead>
                    <TableHead className="border-r">Quê quán</TableHead>
                    <TableHead className="border-r">Nghề nghiệp</TableHead>
                    <TableHead className="text-center">Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xs">
                  {inLawFamily.map((item, index) => (
                    <TableRow
                      key={item.id}
                      className="hover:bg-gray-50 border-b"
                    >
                      <TableCell className="text-center border-r">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-green-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell className="text-center border-r">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium border-r">
                        {item.quanHe}
                      </TableCell>
                      <TableCell className="font-medium border-r">
                        {item.hoTen}
                      </TableCell>
                      <TableCell className="text-center border-r">
                        {item.namSinh}
                      </TableCell>
                      <TableCell className="border-r">{item.queQuan}</TableCell>
                      <TableCell className="border-r">
                        {item.ngheNghiep}
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] ${item.trangThai === 'Còn sống' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                        >
                          {item.trangThai}
                        </span>
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

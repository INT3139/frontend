import { Edit, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export default function ContractHistory() {
  const contracts = [
    {
      id: 1,
      soHD: '83',
      loaiHD: 'Hợp đồng lao động không xác định thời hạn',
      ngayHieuLuc: '11/03/2026',
      ngayHetHan: '',
      donVi: '',
      isCurrent: true,
      congViec: '',
      doiTuong: '',
      ngayBHXH: '',
    },
  ];

  return (
    <div className="p-4 space-y-10 bg-white">
      <Card className="border-none shadow-none rounded-none bg-transparent">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
          <CardTitle className="text-green-700 font-bold text-sm uppercase leading-none">
            QUÁ TRÌNH KÝ HỢP ĐỒNG
          </CardTitle>
          <Button
            size="sm"
            className="bg-yellow-500 hover:bg-yellow-600 text-white border-none h-8 text-xs"
          >
            <Plus className="w-3 h-3 mr-1" /> Thêm mới
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto border-b">
            <Table className="min-w-max border-x">
              <TableHeader className="border-t-2 border-t-green-600 bg-white hover:bg-transparent">
                <TableRow className="[&>th]:text-black [&>th]:font-bold [&>th]:text-xs">
                  <TableHead className="w-[60px] text-center">
                    Thao tác
                  </TableHead>
                  <TableHead className="w-[50px] text-center">STT</TableHead>
                  <TableHead>Số hợp đồng</TableHead>
                  <TableHead>Loại hợp đồng</TableHead>
                  <TableHead>Ngày hiệu lực</TableHead>
                  <TableHead>Ngày hết hiệu lực</TableHead>
                  <TableHead>Đơn vị tuyển</TableHead>
                  <TableHead className="text-center">HĐ hiện tại</TableHead>
                  <TableHead>Công việc đảm nhận</TableHead>
                  <TableHead>Đối tượng</TableHead>
                  <TableHead>Ngày đóng BHXH</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-xs">
                {contracts.map((item, index) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-green-700"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="font-medium">{item.soHD}</TableCell>
                    <TableCell>{item.loaiHD}</TableCell>
                    <TableCell>{item.ngayHieuLuc}</TableCell>
                    <TableCell>{item.ngayHetHan}</TableCell>
                    <TableCell>{item.donVi}</TableCell>
                    <TableCell className="text-center">
                      <input
                        type="checkbox"
                        checked={item.isCurrent}
                        readOnly
                        className="accent-green-600 h-3 w-3"
                      />
                    </TableCell>
                    <TableCell>{item.congViec}</TableCell>
                    <TableCell>{item.doiTuong}</TableCell>
                    <TableCell>{item.ngayBHXH}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-none rounded-none bg-transparent">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
          <CardTitle className="text-green-700 font-bold text-sm uppercase leading-none">
            QUÁ TRÌNH KÉO DÀI THỜI GIAN LÀM CÔNG TÁC CHUYÊN MÔN
          </CardTitle>
          <Button
            size="sm"
            className="bg-yellow-500 hover:bg-yellow-600 text-white border-none h-8 text-xs"
          >
            <Plus className="w-3 h-3 mr-1" /> Thêm mới
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto border-b">
            <Table className="min-w-max border-x">
              <TableHeader className="border-t-2 border-t-green-600 bg-white">
                <TableRow className="[&>th]:text-black [&>th]:font-bold [&>th]:text-xs">
                  <TableHead className="w-[60px] text-center">
                    Thao tác
                  </TableHead>
                  <TableHead className="w-[50px] text-center">STT</TableHead>
                  <TableHead>Số quyết định</TableHead>
                  <TableHead>Ngày ký</TableHead>
                  <TableHead>Thời gian kéo dài</TableHead>
                  <TableHead>Ngày bắt đầu</TableHead>
                  <TableHead>Ngày kết thúc</TableHead>
                  <TableHead>Đơn vị sử dụng</TableHead>
                  <TableHead>Chức danh (chức vụ)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-xs italic text-muted-foreground">
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

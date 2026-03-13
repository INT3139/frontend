import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
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
import {
  EMULATION_TITLE_RECORD_MAP,
  type EmulationTitleRecord,
} from '@/schemas/personnel-cv/emulation-title';
import { Check, CircleOff, PencilLine, Play, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { CustomTablePagination } from '../CustomTablePagination';
import { HeaderWrapper } from '../HeaderWrapper';

const EMULATION_TITLE_TABLE_HEADERS = [
  '',
  'Thao tác',
  'STT',
  ...Object.values(EMULATION_TITLE_RECORD_MAP),
];

const PAGE_SIZE = 6;

export function EmulationTitlesTable({
  data,
}: {
  data: EmulationTitleRecord[];
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const paginatedData = data.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  return (
    <div>
      <HeaderWrapper title="Danh hiệu thi đua">
        <Button>
          <PlusCircle className="h-4 w-4" /> Thêm mới
        </Button>
      </HeaderWrapper>

      <div className="flex flex-col gap-8 border border-t-0 border-gray-400 p-2">
        <Table>
          <TableHeader>
            <TableRow>
              {EMULATION_TITLE_TABLE_HEADERS.map((header) => (
                <TableHead
                  key={header}
                  className={cn('text-center whitespace-normal', {
                    'max-w-20 min-w-20': header !== '' && header !== 'STT',
                    'max-w-16 min-w-16': header === '' || header === 'STT',
                  })}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.slice(0, 6).map((emulationTitle, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex justify-center">
                    <Button
                      size="icon-sm"
                      variant="outline"
                      className="border-0 bg-transparent shadow-none"
                    >
                      <Play />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <Button
                      size="icon-sm"
                      variant="outline"
                      className="border-0 bg-transparent shadow-none"
                    >
                      <PencilLine />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <Badge
                      className={cn('px-3', {
                        'bg-green-200 text-green-700':
                          emulationTitle.approval_status ===
                          APPROVAL_STATUS.APPROVED,
                        'bg-yellow-200 text-yellow-700':
                          emulationTitle.approval_status ===
                          APPROVAL_STATUS.PENDING,
                        'bg-red-200 text-red-700':
                          emulationTitle.approval_status ===
                          APPROVAL_STATUS.REJECTED,
                      })}
                    >
                      {APPROVAL_STATUS_MAP[emulationTitle.approval_status]}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {emulationTitle.decision_number}
                </TableCell>
                <TableCell className="text-center">
                  {emulationTitle.decision_date}
                </TableCell>
                <TableCell className="max-w-72 min-w-72 text-wrap whitespace-normal">
                  {emulationTitle.title_name}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    {emulationTitle.is_highest_level && <Check />}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {paginatedData.length === 0 && (
          <Empty className="md:pt-0">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CircleOff />
              </EmptyMedia>
              <EmptyTitle className="text-base">Không có dữ liệu</EmptyTitle>
            </EmptyHeader>
          </Empty>
        )}

        <CustomTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

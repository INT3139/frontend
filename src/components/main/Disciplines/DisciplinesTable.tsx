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
  DISCIPLINE_RECORD_MAP,
  type DisciplineRecord,
} from '@/schemas/personnel-cv/discipline';
import { Check, CircleOff, PencilLine, Play, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { ApprovalStatusBadge } from '../ApprovalStatusBadge';
import { CustomTablePagination } from '../CustomTablePagination';
import { HeaderWrapper } from '../HeaderWrapper';

const DISCIPLINE_TABLE_HEADERS = [
  '',
  'Thao tác',
  'STT',
  ...Object.values(DISCIPLINE_RECORD_MAP),
];

const PAGE_SIZE = 6;

export function DisciplinesTable({ data }: { data: DisciplineRecord[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const paginatedData = data.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div>
      <HeaderWrapper title="Kỷ luật">
        <Button>
          <PlusCircle className="h-4 w-4" /> Thêm mới
        </Button>
      </HeaderWrapper>

      <div className="flex flex-col gap-8 border border-t-0 p-2">
        <Table>
          <TableHeader>
            <TableRow>
              {DISCIPLINE_TABLE_HEADERS.map((header) => (
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
            {paginatedData.slice(0, 6).map((discipline, index) => (
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
                    <ApprovalStatusBadge status={discipline.approvalStatus} />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {discipline.decisionNumber}
                </TableCell>
                <TableCell className="text-center">
                  {discipline.decisionDate}
                </TableCell>
                <TableCell className="max-w-72 min-w-72 text-wrap whitespace-normal">
                  {discipline.disciplineName}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    {discipline.isHighestLevel && <Check />}
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

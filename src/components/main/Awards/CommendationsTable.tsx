import { HeaderWrapper } from '@/components/main/HeaderWrapper';
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
import { AWARD_SCOPES_MAP } from '@/schemas/personnel-cv/award-scope';
import {
  COMMENDATION_RECORD_MAP,
  type CommendationRecord,
} from '@/schemas/personnel-cv/commendation';
import {
  Check,
  CircleOff,
  Download,
  PencilLine,
  Play,
  PlusCircle,
} from 'lucide-react';
import { useState } from 'react';
import { ApprovalStatusBadge } from '../ApprovalStatusBadge';
import { CustomTablePagination } from '../CustomTablePagination';

const COMMENDATION_TABLE_HEADERS = [
  '',
  'Thao tác',
  'STT',
  ...Object.values(COMMENDATION_RECORD_MAP),
];

const PAGE_SIZE = 6;

export function CommendationsTable({ data }: { data: CommendationRecord[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const paginatedData = data.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div>
      <HeaderWrapper title="Khen thưởng">
        <Button>
          <PlusCircle className="h-4 w-4" /> Thêm mới
        </Button>
        <Button>
          <Download className="h-4 w-4" /> Xuất lý lịch
        </Button>
      </HeaderWrapper>

      <div className="flex flex-col gap-8 border border-t-0 border-gray-400 p-2">
        <Table>
          <TableHeader>
            <TableRow>
              {COMMENDATION_TABLE_HEADERS.map((header) => (
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
            {paginatedData.map((commendation, index) => (
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
                    <ApprovalStatusBadge
                      status={commendation.approval_status}
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {commendation.decision_number}
                </TableCell>
                <TableCell className="text-center">
                  {commendation.decision_date}
                </TableCell>
                <TableCell className="text-center">
                  {AWARD_SCOPES_MAP[commendation.award_scope]}
                </TableCell>
                <TableCell className="max-w-80 min-w-80 text-wrap whitespace-normal">
                  {commendation.award_name}
                </TableCell>
                <TableCell className="max-w-80 min-w-80 text-wrap whitespace-normal">
                  {commendation.content}
                </TableCell>
                <TableCell className="text-center">
                  {commendation.academic_year}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    {commendation.is_highest_level && <Check />}
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

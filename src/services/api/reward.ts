import { removeFirstSlash } from '@/lib/remove-first-slash';
import type { ApprovalStatus } from '@/schemas/personnel-cv/approval';
import type { AwardScope } from '@/schemas/personnel-cv/award-scope';
import {
  COMMENDATION_RECORD,
  type CommendationRecord,
} from '@/schemas/personnel-cv/commendation';
import type { DisciplineRecord } from '@/schemas/personnel-cv/discipline';
import type { EmulationTitleRecord } from '@/schemas/personnel-cv/emulation-title';
import apiClient from '@/services/api-client';
import { ENDPOINTS } from '../endpoints';

export type GetAwardsAndDisciplinesResponse = {
  status: string;
  data: {
    commendations: CommendationRecord[];
    emulation_titles: EmulationTitleRecord[];
    disciplines: DisciplineRecord[];
  };
};

export const getAwardsAndDisciplines = async (): Promise<
  GetAwardsAndDisciplinesResponse['data']
> => {
  const response = await apiClient
    .get(removeFirstSlash(ENDPOINTS.reward.me))
    .json<GetAwardsAndDisciplinesResponse>();

  return response.data;
};

//-------------------//

// Backend-specific types
type BackendAwardLevel = 'co_so' | 'dhqg' | 'bo' | 'chinh_phu' | 'nha_nuoc';
type BackendStatus = 'pending' | 'approved' | 'rejected';

interface BackendCommendationRecord {
  id: number;
  createdAt: string;
  profileId: number;
  decisionNumber: string | null;
  decisionDate: string | null;
  awardLevel: BackendAwardLevel;
  awardName: string;
  content: string | null;
  academicYear: string | null;
  isHighestAward: boolean;
  status: BackendStatus;
  attachmentId: number | null;
}

const AWARD_LEVEL_MAP: Record<string, BackendAwardLevel> = {
  grassroots: 'co_so',
  institutional: 'dhqg',
  ministerial: 'bo',
  national: 'nha_nuoc',
};

const BACKEND_LEVEL_TO_SCOPE: Record<BackendAwardLevel, AwardScope> = {
  co_so: 'grassroots',
  dhqg: 'institutional',
  bo: 'ministerial',
  chinh_phu: 'national',
  nha_nuoc: 'national',
};

export type CreateCommendationRequest = Omit<
  CommendationRecord,
  | typeof COMMENDATION_RECORD.APPROVAL_STATUS
  | typeof COMMENDATION_RECORD.IS_HIGHEST_LEVEL
  | typeof COMMENDATION_RECORD.ATTACHMENT_URL
> & {
  attachment?: File;
  isAcademicYear?: boolean;
};

export const createCommendation = async (
  record: CreateCommendationRequest,
): Promise<CommendationRecord> => {
  let academicYear = record.academicYear || null;
  if (record.isAcademicYear && academicYear && /^\d{4}$/.test(academicYear)) {
    const year = parseInt(academicYear, 10);
    academicYear = `${year}-${year + 1}`;
  }

  // Transform FE to BE
  const payload = {
    decisionNumber: record.decisionNumber || null,
    decisionDate: record.decisionDate
      ? record.decisionDate.split('/').reverse().join('-')
      : null,
    awardLevel: AWARD_LEVEL_MAP[record.awardScope] || 'co_so',
    awardName: record.awardName,
    content: record.content || null,
    academicYear,
    isHighestAward: false,
    status: 'pending',
    attachmentId: null,
  };

  const response = await apiClient
    .post(removeFirstSlash(ENDPOINTS.reward.commendation), {
      json: payload,
    })
    .json<BackendCommendationRecord>();

  // Transform BE to FE
  return {
    approvalStatus: response.status as ApprovalStatus,
    decisionNumber: response.decisionNumber || undefined,
    decisionDate: response.decisionDate
      ? response.decisionDate.split('-').reverse().join('/')
      : '',
    awardScope: BACKEND_LEVEL_TO_SCOPE[response.awardLevel],
    awardName: response.awardName,
    content: response.content || '',
    academicYear: response.academicYear || undefined,
    isHighestLevel: response.isHighestAward,
    attachmentUrl: null,
  };
};

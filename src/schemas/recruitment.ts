import { z } from 'zod';

export const RecruitmentInfoSchema = z.object({
  id: z.number().optional(),
  profileId: z.number().optional(),
  recruitingUnitId: z.number().nullable(),
  recruitmentDate: z.string().nullable(),
  salaryForm: z.string().nullable(),
  previousOccupation: z.string().nullable(),
  eduSectorStartYear: z.number().nullable(),
  vnuStartDate: z.string().nullable(),
  workSeniorityYears: z.string().nullable(), // Numeric in DB, usually string in JSON
  longestJob: z.string().nullable(),
  jobGroup: z.string().nullable(),
  jobPositionVnu: z.string().nullable(),
  jobPositionUnit: z.string().nullable(),
  mainAssignedWork: z.string().nullable(),
  workUnitCount: z.number().nullable(),
  notes: z.string().nullable(),
});

export type RecruitmentInfo = z.infer<typeof RecruitmentInfoSchema>;

export const RecruitmentContractSchema = z.object({
  id: z.number(),
  profileId: z.number(),
  contractNumber: z.string().nullable(),
  contractType: z.string(),
  startDate: z.string(),
  endDate: z.string().nullable(),
  recruitingUnitId: z.number().nullable(),
  currentContract: z.boolean(),
  assignedWork: z.string().nullable(),
  policyObject: z.string().nullable(),
  insuranceJoinedAt: z.string().nullable(),
  salaryGrade: z.string().nullable(),
  status: z.string(),
  signedAt: z.string().nullable(),
});

export type RecruitmentContract = z.infer<typeof RecruitmentContractSchema>;

export const RecruitmentDataSchema = z.object({
  info: RecruitmentInfoSchema.nullable(),
  contracts: z.array(RecruitmentContractSchema),
});

export type RecruitmentData = z.infer<typeof RecruitmentDataSchema>;

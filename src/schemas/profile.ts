import { z } from 'zod';

export const AddressSchema = z.object({
  street: z.string().nullable(),
  ward: z.string().nullable(),
  district: z.string().nullable(),
  province: z.string().nullable(),
  country: z.string().nullable(),
});

export type Address = z.infer<typeof AddressSchema>;

export const ProfileSchema = z.object({
  id: z.number(),
  userId: z.number(),
  unitId: z.number().nullable(),

  emailVnu: z.string().nullable(),
  emailPersonal: z.string().nullable(),

  phoneWork: z.string().nullable(),
  phoneHome: z.string().nullable(),

  dateOfBirth: z.string().nullable(), // YYYY-MM-DD
  gender: z.enum(['Nam', 'Nữ', 'Khác']).nullable(),

  idNumber: z.string().nullable(),
  idIssuedDate: z.string().nullable(),
  idIssuedBy: z.string().nullable(),

  nationality: z.string().default('Việt Nam'),
  ethnicity: z.string().nullable(),
  religion: z.string().nullable(),

  maritalStatus: z
    .enum(['single', 'married', 'divorced', 'widowed'])
    .nullable(),
  policyObject: z.string().nullable(),
  nickName: z.string().nullable(),

  passportNumber: z.string().nullable(),
  passportIssuedAt: z.string().nullable(),
  passportIssuedBy: z.string().nullable(),

  insuranceNumber: z.string().nullable(),
  insuranceJoinedAt: z.string().nullable(),

  addrHometown: AddressSchema.nullable(),
  addrBirthplace: AddressSchema.nullable(),
  addrPermanent: AddressSchema.nullable(),
  addrCurrent: AddressSchema.nullable(),

  academicDegree: z.enum(['bachelor', 'master', 'phd']).nullable(),
  academicTitle: z.enum(['gs', 'pgs']).nullable(),

  eduLevelGeneral: z.string().nullable(),
  stateManagement: z.string().nullable(),
  politicalTheory: z.enum(['sơ cấp', 'trung cấp', 'cao cấp']).nullable(),

  foreignLangLevel: z.string().nullable(),
  itLevel: z.string().nullable(),

  staffType: z.enum(['lecturer', 'researcher', 'staff']),
  employmentStatus: z.enum(['active', 'retired', 'resigned', 'transferred']),

  joinDate: z.string().nullable(),
  retireDate: z.string().nullable(),

  profileStatus: z.enum(['draft', 'pending_review', 'approved']),

  recruitment: z
    .object({
      info: z
        .object({
          id: z.number().optional(),
          profileId: z.number().optional(),
          recruitingUnitId: z.number().nullable(),
          recruitmentDate: z.string().nullable(),
          salaryForm: z.string().nullable(),
          previousOccupation: z.string().nullable(),
          eduSectorStartYear: z.number().nullable(),
          vnuStartDate: z.string().nullable(),
          workSeniorityYears: z.string().nullable(),
          longestJob: z.string().nullable(),
          jobGroup: z.string().nullable(),
          jobPositionVnu: z.string().nullable(),
          jobPositionUnit: z.string().nullable(),
          mainAssignedWork: z.string().nullable(),
          workUnitCount: z.number().nullable(),
          notes: z.string().nullable(),
        })
        .nullable(),
      contracts: z.array(
        z.object({
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
        }),
      ),
    })
    .nullable()
    .optional(),
});

export type Profile = z.infer<typeof ProfileSchema>;

// TODO: replace with full profile type
export type PartialProfile = {
  userId: number;
  emailVnu: string;
  fullName: string;
};

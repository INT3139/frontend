/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  WORK_HISTORY_RECORD,
  WORK_HISTORY_RECORD_MAP,
  type WorkHistoryRecord,
} from '@/schemas/personnel-cv/work-history';
import { useForm } from '@tanstack/react-form';
import * as z from 'zod';

const formSchema = z.object({
  [WORK_HISTORY_RECORD.FROM]: z
    .string()
    .min(1, 'Không được để trống!')
    .nullable()
    .refine((val) => !val || /^\d{2}\/\d{4}$/.test(val), 'Định dạng mm/yyyy'),
  [WORK_HISTORY_RECORD.TO]: z
    .string()
    .nullable()
    .refine((val) => !val || /^\d{2}\/\d{4}$/.test(val), 'Định dạng mm/yyyy'),
  [WORK_HISTORY_RECORD.UNIT]: z.string().min(1, 'Không được để trống!'),
  [WORK_HISTORY_RECORD.ROLE]: z.string().nullable(),
  [WORK_HISTORY_RECORD.TYPE]: z.string().nullable(),
});

interface AddWorkHistoryFormProps {
  renderActions?: (isSubmitting: boolean) => React.ReactNode;
  onSubmitSuccess?: (values: z.infer<typeof formSchema>) => void;
  initialValues?: Partial<WorkHistoryRecord>;
}

// Helper to convert mm/yyyy to YYYY-MM-DD
const toApiDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return null;
  const [month, year] = dateStr.split('/');
  return `${year}-${month}-01`;
};

// Helper to convert YYYY-MM-DD to mm/yyyy
const fromApiDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  return `${month}/${year}`;
};

export function AddWorkHistoryForm({
  renderActions,
  onSubmitSuccess,
  initialValues,
}: AddWorkHistoryFormProps) {
  const form = useForm({
    defaultValues: {
      [WORK_HISTORY_RECORD.FROM]: fromApiDate(
        initialValues?.[WORK_HISTORY_RECORD.FROM],
      ),
      [WORK_HISTORY_RECORD.TO]: fromApiDate(
        initialValues?.[WORK_HISTORY_RECORD.TO],
      ),
      [WORK_HISTORY_RECORD.UNIT]:
        initialValues?.[WORK_HISTORY_RECORD.UNIT] || '',
      [WORK_HISTORY_RECORD.ROLE]:
        initialValues?.[WORK_HISTORY_RECORD.ROLE] || '',
      [WORK_HISTORY_RECORD.TYPE]:
        initialValues?.[WORK_HISTORY_RECORD.TYPE] || '',
    } as any,
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      const apiData = {
        ...value,
        [WORK_HISTORY_RECORD.FROM]: toApiDate(value[WORK_HISTORY_RECORD.FROM]),
        [WORK_HISTORY_RECORD.TO]: toApiDate(value[WORK_HISTORY_RECORD.TO]),
      };
      onSubmitSuccess?.(apiData as any);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field
          name={WORK_HISTORY_RECORD.FROM}
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name} required>
                {WORK_HISTORY_RECORD_MAP[WORK_HISTORY_RECORD.FROM]} (mm/yyyy)
              </FieldLabel>
              <Input
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="01/2000"
              />
              {field.state.meta.errors && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        />

        <form.Field
          name={WORK_HISTORY_RECORD.TO}
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>
                {WORK_HISTORY_RECORD_MAP[WORK_HISTORY_RECORD.TO]} (mm/yyyy)
              </FieldLabel>
              <Input
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="01/2005"
              />
              {field.state.meta.errors && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        />

        <form.Field
          name={WORK_HISTORY_RECORD.UNIT}
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name} required>
                {WORK_HISTORY_RECORD_MAP[WORK_HISTORY_RECORD.UNIT]}
              </FieldLabel>
              <Input
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        />

        <form.Field
          name={WORK_HISTORY_RECORD.ROLE}
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>
                {WORK_HISTORY_RECORD_MAP[WORK_HISTORY_RECORD.ROLE]}
              </FieldLabel>
              <Input
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        />

        <form.Field
          name={WORK_HISTORY_RECORD.TYPE}
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>
                {WORK_HISTORY_RECORD_MAP[WORK_HISTORY_RECORD.TYPE]}
              </FieldLabel>
              <Input
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        />
      </FieldGroup>

      {renderActions && (
        <div className="mt-6 flex justify-center gap-4">
          {renderActions(form.state.isSubmitting)}
        </div>
      )}
    </form>
  );
}

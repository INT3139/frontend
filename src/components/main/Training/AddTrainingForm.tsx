import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  EDUCATION_TYPES,
  TRAINING_RECORD,
  TRAINING_RECORD_MAP,
} from '@/schemas/personnel-cv/education';
import type { EducationType } from '@/schemas/personnel-cv/education';
import { useForm } from '@tanstack/react-form';
import * as z from 'zod';

const formSchema = z.object({
  [TRAINING_RECORD.EDU_TYPE]: z.enum(EDUCATION_TYPES),
  [TRAINING_RECORD.FROM_DATE]: z.string().nullable().optional(),
  [TRAINING_RECORD.TO_DATE]: z.string().nullable().optional(),
  [TRAINING_RECORD.DEGREE_LEVEL]: z.string().nullable().optional(),
  [TRAINING_RECORD.INSTITUTION]: z.string().nullable().optional(),
  [TRAINING_RECORD.MAJOR]: z.string().nullable().optional(),
  [TRAINING_RECORD.TRAINING_FORM]: z.string().nullable().optional(),
  [TRAINING_RECORD.FIELD]: z.string().nullable().optional(),
  [TRAINING_RECORD.IS_STUDYING]: z.boolean(),
  [TRAINING_RECORD.CERT_NAME]: z.string().nullable().optional(),
  [TRAINING_RECORD.LANG_NAME]: z.string().nullable().optional(),
  [TRAINING_RECORD.LANG_LEVEL]: z.string().nullable().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddTrainingFormProps {
  eduType: EducationType;
  renderActions?: (isSubmitting: boolean) => React.ReactNode;
  onSubmitSuccess?: (values: FormValues) => void;
  initialValues?: Partial<FormValues>;
}

export function AddTrainingForm({
  eduType,
  renderActions,
  onSubmitSuccess,
  initialValues,
}: AddTrainingFormProps) {
  const form = useForm({
    defaultValues: {
      [TRAINING_RECORD.EDU_TYPE]: eduType,
      [TRAINING_RECORD.FROM_DATE]:
        initialValues?.[TRAINING_RECORD.FROM_DATE] || '',
      [TRAINING_RECORD.TO_DATE]: initialValues?.[TRAINING_RECORD.TO_DATE] || '',
      [TRAINING_RECORD.DEGREE_LEVEL]:
        initialValues?.[TRAINING_RECORD.DEGREE_LEVEL] || '',
      [TRAINING_RECORD.INSTITUTION]:
        initialValues?.[TRAINING_RECORD.INSTITUTION] || '',
      [TRAINING_RECORD.MAJOR]: initialValues?.[TRAINING_RECORD.MAJOR] || '',
      [TRAINING_RECORD.TRAINING_FORM]:
        initialValues?.[TRAINING_RECORD.TRAINING_FORM] || '',
      [TRAINING_RECORD.FIELD]: initialValues?.[TRAINING_RECORD.FIELD] || '',
      [TRAINING_RECORD.IS_STUDYING]:
        initialValues?.[TRAINING_RECORD.IS_STUDYING] ?? false,
      [TRAINING_RECORD.CERT_NAME]:
        initialValues?.[TRAINING_RECORD.CERT_NAME] || '',
      [TRAINING_RECORD.LANG_NAME]:
        initialValues?.[TRAINING_RECORD.LANG_NAME] || '',
      [TRAINING_RECORD.LANG_LEVEL]:
        initialValues?.[TRAINING_RECORD.LANG_LEVEL] || '',
    } as FormValues,
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      onSubmitSuccess?.(value);
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
        <div className="grid grid-cols-2 gap-4">
          <form.Field
            name={TRAINING_RECORD.FROM_DATE}
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name} required>
                  {TRAINING_RECORD_MAP[TRAINING_RECORD.FROM_DATE]}
                </FieldLabel>
                <Input
                  id={field.name}
                  type="date"
                  value={field.state.value || ''}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )}
          />
          <form.Subscribe
            selector={(state) => state.values[TRAINING_RECORD.IS_STUDYING]}
            children={(isStudying) => (
              <form.Field
                name={TRAINING_RECORD.TO_DATE}
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      {TRAINING_RECORD_MAP[TRAINING_RECORD.TO_DATE]}
                    </FieldLabel>
                    <Input
                      id={field.name}
                      type="date"
                      value={field.state.value || ''}
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={isStudying}
                    />
                  </Field>
                )}
              />
            )}
          />
        </div>

        <form.Field
          name={TRAINING_RECORD.IS_STUDYING}
          children={(field) => (
            <div className="flex items-center gap-2 py-2">
              <input
                id={field.name}
                type="checkbox"
                checked={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.checked);
                  if (e.target.checked) {
                    form.setFieldValue(TRAINING_RECORD.TO_DATE, null);
                  }
                }}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <FieldLabel htmlFor={field.name} className="mb-0">
                {TRAINING_RECORD_MAP[TRAINING_RECORD.IS_STUDYING]}
              </FieldLabel>
            </div>
          )}
        />

        {eduType === 'degree' && (
          <form.Field
            name={TRAINING_RECORD.DEGREE_LEVEL}
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name} required>
                  {TRAINING_RECORD_MAP[TRAINING_RECORD.DEGREE_LEVEL]}
                </FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value || ''}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Cử nhân, Thạc sĩ, Tiến sĩ..."
                />
              </Field>
            )}
          />
        )}

        {(eduType === 'certificate' || eduType === 'it') && (
          <form.Field
            name={TRAINING_RECORD.CERT_NAME}
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name} required>
                  {TRAINING_RECORD_MAP[TRAINING_RECORD.CERT_NAME]}
                </FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value || ''}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          />
        )}

        {eduType === 'foreign_lang' && (
          <div className="grid grid-cols-2 gap-4">
            <form.Field
              name={TRAINING_RECORD.LANG_NAME}
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name} required>
                    {TRAINING_RECORD_MAP[TRAINING_RECORD.LANG_NAME]}
                  </FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value || ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            />
            <form.Field
              name={TRAINING_RECORD.LANG_LEVEL}
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name} required>
                    {TRAINING_RECORD_MAP[TRAINING_RECORD.LANG_LEVEL]}
                  </FieldLabel>
                  <Select
                    value={field.state.value || ''}
                    onValueChange={(val) => field.handleChange(val)}
                  >
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder="Chọn trình độ" />
                    </SelectTrigger>
                    <SelectContent>
                      {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((lvl) => (
                        <SelectItem key={lvl} value={lvl}>
                          {lvl}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
          </div>
        )}

        <form.Field
          name={TRAINING_RECORD.INSTITUTION}
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name} required>
                {TRAINING_RECORD_MAP[TRAINING_RECORD.INSTITUTION]}
              </FieldLabel>
              <Input
                id={field.name}
                value={field.state.value || ''}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <form.Field
            name={TRAINING_RECORD.MAJOR}
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  {TRAINING_RECORD_MAP[TRAINING_RECORD.MAJOR]}
                </FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value || ''}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          />
          <form.Field
            name={TRAINING_RECORD.TRAINING_FORM}
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  {TRAINING_RECORD_MAP[TRAINING_RECORD.TRAINING_FORM]}
                </FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value || ''}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Chính quy, Tại chức..."
                />
              </Field>
            )}
          />
        </div>

        <form.Field
          name={TRAINING_RECORD.FIELD}
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>
                {TRAINING_RECORD_MAP[TRAINING_RECORD.FIELD]}
              </FieldLabel>
              <Input
                id={field.name}
                value={field.state.value || ''}
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

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  TRAINING_RECORD,
  TRAINING_RECORD_MAP,
} from '@/schemas/personnel-cv/training';
import { useForm } from '@tanstack/react-form';
import * as z from 'zod';

const formSchema = z.object({
  [TRAINING_RECORD.FROM]: z.string().min(1, 'Không được để trống!'),
  [TRAINING_RECORD.TO]: z.string().optional(),
  [TRAINING_RECORD.LEVEL]: z.string().min(1, 'Không được để trống!'),
  [TRAINING_RECORD.PLACE]: z.string().min(1, 'Không được để trống!'),
  [TRAINING_RECORD.MAJOR]: z.string().optional(),
  [TRAINING_RECORD.FORMAT]: z.string().optional(),
  [TRAINING_RECORD.FIELD]: z.string().optional(),
  [TRAINING_RECORD.STUDYING]: z.string().optional(),
  [TRAINING_RECORD.STATUS]: z.string().optional(),
});

interface AddTrainingFormProps {
  renderActions?: (isSubmitting: boolean) => React.ReactNode;
  onSubmitSuccess?: (values: z.infer<typeof formSchema>) => void;
  initialValues?: Partial<z.infer<typeof formSchema>>;
}

export function AddTrainingForm({
  renderActions,
  onSubmitSuccess,
  initialValues,
}: AddTrainingFormProps) {
  const form = useForm({
    defaultValues: {
      [TRAINING_RECORD.FROM]: initialValues?.[TRAINING_RECORD.FROM] || '',
      [TRAINING_RECORD.TO]: initialValues?.[TRAINING_RECORD.TO] || '',
      [TRAINING_RECORD.LEVEL]: initialValues?.[TRAINING_RECORD.LEVEL] || '',
      [TRAINING_RECORD.PLACE]: initialValues?.[TRAINING_RECORD.PLACE] || '',
      [TRAINING_RECORD.MAJOR]: initialValues?.[TRAINING_RECORD.MAJOR] || '',
      [TRAINING_RECORD.FORMAT]: initialValues?.[TRAINING_RECORD.FORMAT] || '',
      [TRAINING_RECORD.FIELD]: initialValues?.[TRAINING_RECORD.FIELD] || '',
      [TRAINING_RECORD.STUDYING]:
        initialValues?.[TRAINING_RECORD.STUDYING] || '',
      [TRAINING_RECORD.STATUS]: initialValues?.[TRAINING_RECORD.STATUS] || '',
    } as z.infer<typeof formSchema>,
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
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
            name={TRAINING_RECORD.FROM}
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name} required>
                  {TRAINING_RECORD_MAP[TRAINING_RECORD.FROM]}
                </FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="MM/YYYY"
                />
                {field.state.meta.errors && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )}
          />
          <form.Field
            name={TRAINING_RECORD.TO}
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  {TRAINING_RECORD_MAP[TRAINING_RECORD.TO]}
                </FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="MM/YYYY"
                />
              </Field>
            )}
          />
        </div>

        <form.Field
          name={TRAINING_RECORD.LEVEL}
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name} required>
                {TRAINING_RECORD_MAP[TRAINING_RECORD.LEVEL]}
              </FieldLabel>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        />

        <form.Field
          name={TRAINING_RECORD.PLACE}
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name} required>
                {TRAINING_RECORD_MAP[TRAINING_RECORD.PLACE]}
              </FieldLabel>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors && (
                <FieldError errors={field.state.meta.errors} />
              )}
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
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          />
          <form.Field
            name={TRAINING_RECORD.FORMAT}
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  {TRAINING_RECORD_MAP[TRAINING_RECORD.FORMAT]}
                </FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
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
                value={field.state.value}
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

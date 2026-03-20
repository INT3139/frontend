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
import type { Profile } from '@/schemas/profile';
import { useForm } from '@tanstack/react-form';
import * as z from 'zod';

const formSchema = z.object({
  eduLevelGeneral: z.string().nullable().optional(),
  academicDegree: z.enum(['bachelor', 'master', 'phd']).nullable().optional(),
  academicTitle: z.enum(['gs', 'pgs']).nullable().optional(),
  stateManagement: z.string().nullable().optional(),
  politicalTheory: z
    .enum(['sơ cấp', 'trung cấp', 'cao cấp'])
    .nullable()
    .optional(),
  foreignLangLevel: z.string().nullable().optional(),
  itLevel: z.string().nullable().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EditAcademicInfoFormProps {
  initialValues: Partial<Profile>;
  onSubmitSuccess: (values: FormValues) => void;
  renderActions: (isSubmitting: boolean) => React.ReactNode;
}

export function EditAcademicInfoForm({
  initialValues,
  onSubmitSuccess,
  renderActions,
}: EditAcademicInfoFormProps) {
  const form = useForm({
    defaultValues: {
      eduLevelGeneral: initialValues.eduLevelGeneral || '',
      academicDegree: initialValues.academicDegree || null,
      academicTitle: initialValues.academicTitle || null,
      stateManagement: initialValues.stateManagement || '',
      politicalTheory: initialValues.politicalTheory || null,
      foreignLangLevel: initialValues.foreignLangLevel || '',
      itLevel: initialValues.itLevel || '',
    } as FormValues,
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      onSubmitSuccess(value);
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
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Cột trái */}
          <div className="space-y-4">
            <form.Field
              name="eduLevelGeneral"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Trình độ giáo dục phổ thông
                  </FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value || ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="VD: 12/12"
                  />
                  {field.state.meta.errors && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            />
            <form.Field
              name="academicDegree"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Trình độ chuyên môn cao nhất
                  </FieldLabel>
                  <Select
                    value={field.state.value || ''}
                    onValueChange={(val) =>
                      field.handleChange(
                        val as 'bachelor' | 'master' | 'phd' | null,
                      )
                    }
                  >
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder="Chọn trình độ..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bachelor">Cử nhân</SelectItem>
                      <SelectItem value="master">Thạc sĩ</SelectItem>
                      <SelectItem value="phd">Tiến sĩ</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <form.Field
              name="academicTitle"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Học hàm</FieldLabel>
                  <Select
                    value={field.state.value || ''}
                    onValueChange={(val) =>
                      field.handleChange(val as 'gs' | 'pgs' | null)
                    }
                  >
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder="Chọn học hàm..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gs">Giáo sư</SelectItem>
                      <SelectItem value="pgs">Phó giáo sư</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
          </div>

          {/* Cột phải */}
          <div className="space-y-4">
            <form.Field
              name="stateManagement"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Quản lý nhà nước</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value || ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="VD: Chuyên viên"
                  />
                </Field>
              )}
            />
            <form.Field
              name="politicalTheory"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Lý luận chính trị
                  </FieldLabel>
                  <Select
                    value={field.state.value || ''}
                    onValueChange={(val) =>
                      field.handleChange(
                        val as 'sơ cấp' | 'trung cấp' | 'cao cấp' | null,
                      )
                    }
                  >
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder="Chọn mức..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sơ cấp">Sơ cấp</SelectItem>
                      <SelectItem value="trung cấp">Trung cấp</SelectItem>
                      <SelectItem value="cao cấp">Cao cấp</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <form.Field
              name="foreignLangLevel"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Trình độ ngoại ngữ
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
              name="itLevel"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Trình độ tin học</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value || ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            />
          </div>
        </div>
      </FieldGroup>

      {renderActions && (
        <div className="mt-6 flex justify-center gap-4">
          {renderActions(form.state.isSubmitting)}
        </div>
      )}
    </form>
  );
}

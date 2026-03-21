import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { isValidDate } from '@/lib/date';
import {
  TRAINING_PRODUCT_RECORD,
  TRAINING_PRODUCT_RECORD_MAP,
  type TrainingProductRecord,
} from '@/schemas/academic-cv/training-products';
import {
  EDUCATION_LEVEL,
  EDUCATION_LEVEL_MAP,
  type EducationLevel,
} from '@/schemas/education-level';
import { APPROVAL_STATUS } from '@/schemas/personnel-cv/approval';
import { updateTrainingProduct } from '@/services/api/training-product';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { isAfter, parse } from 'date-fns';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z
  .object({
    [TRAINING_PRODUCT_RECORD.APPROVAL_STATUS]: z.enum(
      Object.values(APPROVAL_STATUS),
    ),
    [TRAINING_PRODUCT_RECORD.STUDENT_NAME]: z
      .string()
      .min(1, 'Vui lòng nhập tên học viên'),
    [TRAINING_PRODUCT_RECORD.THESIS_TITLE]: z
      .string()
      .min(5, 'Tên khóa luận/luận văn/luận án phải có ít nhất 5 ký tự')
      .max(500, 'Tên khóa luận/luận văn/luận án không được vượt quá 500 ký tự'),
    [TRAINING_PRODUCT_RECORD.ASSIGNMENT]: z.string().optional(),
    [TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL]: z.enum(
      Object.values(EDUCATION_LEVEL),
    ),
    [TRAINING_PRODUCT_RECORD.START_TIME]: z
      .string()
      .min(1, 'Vui lòng nhập thời gian bắt đầu')
      .pipe(
        z
          .string()
          .regex(/^\d{2}\/\d{4}$/, 'Vui lòng sử dụng định dạng: MM/YYYY!')
          .refine((val) => isValidDate(val, 'MM/yyyy'), {
            message: 'Tháng/năm không hợp lệ!',
          })
          .refine((val) => parseInt(val.split('/')[1], 10) >= 1900, {
            message: 'Năm bắt đầu phải từ 1900 trở lên!',
          }),
      ),
    [TRAINING_PRODUCT_RECORD.END_TIME]: z
      .string()
      .min(1, 'Vui lòng nhập thời gian kết thúc')
      .pipe(
        z
          .string()
          .regex(/^\d{2}\/\d{4}$/, 'Vui lòng sử dụng định dạng: MM/YYYY!')
          .refine((val) => isValidDate(val, 'MM/yyyy'), {
            message: 'Tháng/năm không hợp lệ!',
          }),
      ),
  })
  .refine(
    (data) => {
      try {
        const startStr = data[TRAINING_PRODUCT_RECORD.START_TIME];
        const endStr = data[TRAINING_PRODUCT_RECORD.END_TIME];
        if (!startStr || !endStr) return true;

        const start = parse(startStr, 'MM/yyyy', new Date());
        const end = parse(endStr, 'MM/yyyy', new Date());

        return isAfter(end, start);
      } catch {
        return false;
      }
    },
    {
      message: 'Thời gian kết thúc phải sau thời gian bắt đầu!',
      path: [TRAINING_PRODUCT_RECORD.END_TIME],
    },
  );

interface EditTrainingProductFormProps {
  initialData: TrainingProductRecord;
  profileId: number;
  renderActions?: (
    isSubmitting: boolean,
    canSubmit: boolean,
  ) => React.ReactNode;
  onSubmitSuccess?: (values: TrainingProductRecord) => void;
}

export function EditTrainingProductForm({
  initialData,
  profileId,
  renderActions,
  onSubmitSuccess,
}: EditTrainingProductFormProps) {
  const { mutate } = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      if (!initialData.id) throw new Error('Missing ID');
      return updateTrainingProduct(profileId, initialData.id, data);
    },
    onSuccess: (_, values) => {
      toast.success('Cập nhật sản phẩm đào tạo thành công!');
      onSubmitSuccess?.({ ...values, id: initialData.id });
    },
    onError: (err) => {
      if (import.meta.env.DEV) console.error(err);
      toast.error('Đã xảy ra lỗi khi cập nhật sản phẩm đào tạo');
    },
  });

  const form = useForm({
    defaultValues: {
      [TRAINING_PRODUCT_RECORD.APPROVAL_STATUS]:
        initialData[TRAINING_PRODUCT_RECORD.APPROVAL_STATUS],
      [TRAINING_PRODUCT_RECORD.STUDENT_NAME]:
        initialData[TRAINING_PRODUCT_RECORD.STUDENT_NAME],
      [TRAINING_PRODUCT_RECORD.THESIS_TITLE]:
        initialData[TRAINING_PRODUCT_RECORD.THESIS_TITLE],
      [TRAINING_PRODUCT_RECORD.ASSIGNMENT]:
        initialData[TRAINING_PRODUCT_RECORD.ASSIGNMENT] || '',
      [TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL]:
        initialData[TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL],
      [TRAINING_PRODUCT_RECORD.START_TIME]:
        initialData[TRAINING_PRODUCT_RECORD.START_TIME],
      [TRAINING_PRODUCT_RECORD.END_TIME]:
        initialData[TRAINING_PRODUCT_RECORD.END_TIME],
    } as z.infer<typeof formSchema>,
    validators: {
      onChangeAsyncDebounceMs: 500,
      onChangeAsync: formSchema,
    },
    onSubmit: async ({ value }) => {
      mutate(value);
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
          name={TRAINING_PRODUCT_RECORD.STUDENT_NAME}
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !!field.state.meta.errors.length;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} required>
                  {
                    TRAINING_PRODUCT_RECORD_MAP[
                      TRAINING_PRODUCT_RECORD.STUDENT_NAME
                    ]
                  }
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Nhập tên học viên"
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <form.Field
          name={TRAINING_PRODUCT_RECORD.THESIS_TITLE}
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !!field.state.meta.errors.length;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} required>
                  {
                    TRAINING_PRODUCT_RECORD_MAP[
                      TRAINING_PRODUCT_RECORD.THESIS_TITLE
                    ]
                  }
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Nhập tên khóa luận/luận văn/luận án"
                    rows={3}
                    aria-invalid={isInvalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.state.value.length}/500
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <form.Field
          name={TRAINING_PRODUCT_RECORD.ASSIGNMENT}
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !!field.state.meta.errors.length;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  {
                    TRAINING_PRODUCT_RECORD_MAP[
                      TRAINING_PRODUCT_RECORD.ASSIGNMENT
                    ]
                  }
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Nhập nhiệm vụ/đề tài"
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <form.Field
          name={TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL}
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !!field.state.meta.errors.length;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} required>
                  {
                    TRAINING_PRODUCT_RECORD_MAP[
                      TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL
                    ]
                  }
                </FieldLabel>
                <Select
                  name={field.name}
                  value={field.state.value}
                  onValueChange={(val) =>
                    field.handleChange(val as EducationLevel)
                  }
                >
                  <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                    <SelectValue placeholder="Chọn trình độ đào tạo" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {Object.entries(EDUCATION_LEVEL_MAP).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <form.Field
            name={TRAINING_PRODUCT_RECORD.START_TIME}
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !!field.state.meta.errors.length;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name} required>
                    {
                      TRAINING_PRODUCT_RECORD_MAP[
                        TRAINING_PRODUCT_RECORD.START_TIME
                      ]
                    }
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="MM/YYYY"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name={TRAINING_PRODUCT_RECORD.END_TIME}
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !!field.state.meta.errors.length;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name} required>
                    {
                      TRAINING_PRODUCT_RECORD_MAP[
                        TRAINING_PRODUCT_RECORD.END_TIME
                      ]
                    }
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="MM/YYYY"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </div>
      </FieldGroup>

      <form.Subscribe
        selector={(state) => [
          state.canSubmit,
          state.isDirty,
          state.isSubmitting,
        ]}
        children={([canSubmit, isDirty, isSubmitting]) => (
          <>
            {renderActions && (
              <div className="mt-6 flex gap-4 sm:justify-center">
                {renderActions(isSubmitting, canSubmit && isDirty)}
              </div>
            )}
          </>
        )}
      />
    </form>
  );
}

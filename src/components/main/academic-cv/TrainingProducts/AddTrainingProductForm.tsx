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
import { isAfterDate, isFutureDate, isValidDate } from '@/lib/date';
import {
  TRAINING_PRODUCT_RECORD,
  TRAINING_PRODUCT_RECORD_MAP,
} from '@/schemas/academic-cv/training-products';
import {
  EDUCATION_LEVEL,
  EDUCATION_LEVEL_MAP,
  type EducationLevel,
} from '@/schemas/education-level';
import { APPROVAL_STATUS } from '@/schemas/personnel-cv/approval';
import { addTrainingProduct } from '@/services/api/training-product';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z
  .object({
    [TRAINING_PRODUCT_RECORD.APPROVAL_STATUS]: z.enum(
      Object.values(APPROVAL_STATUS),
    ),
    [TRAINING_PRODUCT_RECORD.STUDENT_NAME]: z
      .string()
      .trim()
      .min(1, 'Vui lòng nhập tên học viên'),
    [TRAINING_PRODUCT_RECORD.THESIS_TITLE]: z
      .string()
      .trim()
      .refine(
        (v) => v.replace(/\s/g, '').length >= 10,
        'Phải có ít nhất 10 ký tự (không tính khoảng trắng)',
      )
      .refine(
        (v) => v.replace(/\s/g, '').length <= 500,
        'Không được vượt quá 500 ký tự (không tính khoảng trắng)',
      ),
    [TRAINING_PRODUCT_RECORD.ASSIGNMENT]: z.string().trim().optional(),
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
          })
          .refine((val) => !isFutureDate(val, 'MM/yyyy'), {
            message: 'Thời gian không được ở tương lai!',
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
          })
          .refine((val) => parseInt(val.split('/')[1], 10) >= 1900, {
            message: 'Năm bắt đầu phải từ 1900 trở lên!',
          })
          .refine((val) => !isFutureDate(val, 'MM/yyyy'), {
            message: 'Thời gian không được ở tương lai!',
          }),
      ),
  })
  .refine(
    (data) => {
      const startStr = data[TRAINING_PRODUCT_RECORD.START_TIME];
      const endStr = data[TRAINING_PRODUCT_RECORD.END_TIME];
      if (!startStr || !endStr) return true;

      return isAfterDate(endStr, startStr, 'MM/yyyy');
    },
    {
      message: 'Thời gian kết thúc phải sau thời gian bắt đầu!',
      path: [TRAINING_PRODUCT_RECORD.END_TIME],
    },
  );

interface AddTrainingProductFormProps {
  profileId: number;
  renderActions?: (isSubmitting: boolean) => React.ReactNode;
  onSubmitSuccess?: (values: z.infer<typeof formSchema>) => void;
}

export function AddTrainingProductForm({
  profileId,
  renderActions,
  onSubmitSuccess,
}: AddTrainingProductFormProps) {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) =>
      addTrainingProduct(profileId, data),
    onSuccess: (data, values) => {
      toast.success('Thêm sản phẩm đào tạo thành công!');
      onSubmitSuccess?.({ ...values, ...data });
    },
    onError: () => {
      toast.error('Đã xảy ra lỗi khi thêm sản phẩm đào tạo');
    },
  });

  const form = useForm({
    defaultValues: {
      [TRAINING_PRODUCT_RECORD.APPROVAL_STATUS]: APPROVAL_STATUS.PENDING,
      [TRAINING_PRODUCT_RECORD.STUDENT_NAME]: '',
      [TRAINING_PRODUCT_RECORD.THESIS_TITLE]: '',
      [TRAINING_PRODUCT_RECORD.ASSIGNMENT]: '',
      [TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL]: EDUCATION_LEVEL.MASTER,
      [TRAINING_PRODUCT_RECORD.START_TIME]: '',
      [TRAINING_PRODUCT_RECORD.END_TIME]: '',
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

      {renderActions && (
        <div className="mt-6 flex gap-4 sm:justify-center">
          {renderActions(isPending)}
        </div>
      )}
    </form>
  );
}

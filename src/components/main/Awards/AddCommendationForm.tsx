import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
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
import { isFutureDate, isValidDate } from '@/lib/date';
import { cn } from '@/lib/utils';
import {
  AWARD_SCOPES,
  AWARD_SCOPES_MAP,
} from '@/schemas/personnel-cv/award-scope';
import {
  COMMENDATION_RECORD,
  COMMENDATION_RECORD_MAP,
} from '@/schemas/personnel-cv/commendation';
import { services } from '@/services/api';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';
import { DatePickerInput } from '../DatePickerInput';

const formSchema = z.object({
  [COMMENDATION_RECORD.DECISION_NUMBER]: z.string().optional(),

  [COMMENDATION_RECORD.DECISION_DATE]: z
    .string()
    .min(1, 'Không được để trống!')
    .pipe(
      z
        .string()
        .regex(
          /^\d{2}\/\d{2}\/\d{4}$/,
          'Vui lòng sử dụng định dạng: dd/mm/yyyy!',
        ),
    )
    .pipe(
      z.string().refine((value) => isValidDate(value) && !isFutureDate(value), {
        message: 'Ngày không hợp lệ hoặc lớn hơn hiện tại!',
      }),
    )
    .pipe(
      z.string().refine((value) => parseInt(value.split('/')[2], 10) >= 1900, {
        message: 'Năm quyết định phải từ 1900 trở lên!',
      }),
    ),

  [COMMENDATION_RECORD.AWARD_SCOPE]: z.enum(Object.values(AWARD_SCOPES)),

  [COMMENDATION_RECORD.AWARD_NAME]: z
    .string()
    .trim()
    .refine((v) => v.replace(/\s/g, '').length >= 10, {
      message:
        'Tên khen thưởng phải có ít nhất 10 ký tự (không tính khoảng trắng)',
    })
    .refine((v) => v.replace(/\s/g, '').length <= 100, {
      message:
        'Tên khen thưởng không được vượt quá 100 ký tự (không tính khoảng trắng)',
    }),

  [COMMENDATION_RECORD.CONTENT]: z
    .string()
    .trim()
    .refine((v) => v.replace(/\s/g, '').length >= 10, {
      message: 'Nội dung phải có ít nhất 10 ký tự (không tính khoảng trắng)',
    })
    .refine((v) => v.replace(/\s/g, '').length <= 200, {
      message:
        'Nội dung không được vượt quá 200 ký tự (không tính khoảng trắng)',
    }),

  [COMMENDATION_RECORD.ACADEMIC_YEAR]: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const year = parseInt(val, 10);
        const currentYear = new Date().getFullYear();
        return /^\d{4}$/.test(val) && year >= 1900 && year <= currentYear;
      },
      {
        message: 'Năm phải có định dạng YYYY (từ 1900 đến nay).',
      },
    ),
  isAcademicYear: z.boolean(),

  attachment: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 20 * 1024 * 1024,
      'Kích thước file tối đa là 20MB',
    )
    .refine(
      (file) =>
        !file ||
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'application/pdf',
      'Chỉ hỗ trợ file ảnh (JPG, PNG) hoặc PDF',
    )
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddCommendationFormProps {
  renderActions?: (isSubmitting: boolean) => React.ReactNode;
  onSubmitSuccess?: (values: FormValues) => void;
}

function ImagePreview({ file }: { file: File }) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imgElement = imgRef.current;
    if (!file || !imgElement) return;

    const objectUrl = URL.createObjectURL(file);
    imgElement.src = objectUrl;

    return () => {
      URL.revokeObjectURL(objectUrl);
      imgElement.src = '';
    };
  }, [file]);

  return (
    <div className="text-foreground mt-2 flex justify-center text-sm">
      <img
        ref={imgRef}
        alt="Preview"
        className="mt-2 max-h-40 rounded-md border object-contain shadow-sm"
      />
    </div>
  );
}

export function AddCommendationForm({
  renderActions,
  onSubmitSuccess,
}: AddCommendationFormProps) {
  const { mutate, isPending } = useMutation({
    mutationFn: (record: FormValues) => services.createCommendation(record),
    onSuccess: (_, value) => {
      onSubmitSuccess?.(value);
      toast.success('Thêm thông tin Khen thưởng thành công!');
    },
  });

  const form = useForm({
    defaultValues: {
      [COMMENDATION_RECORD.DECISION_NUMBER]: '',
      [COMMENDATION_RECORD.DECISION_DATE]: '',
      [COMMENDATION_RECORD.AWARD_SCOPE]: AWARD_SCOPES.GRASSROOTS,
      [COMMENDATION_RECORD.AWARD_NAME]: '',
      [COMMENDATION_RECORD.CONTENT]: '',
      [COMMENDATION_RECORD.ACADEMIC_YEAR]: '',
      isAcademicYear: false,
    } as FormValues,
    validators: {
      onChangeAsyncDebounceMs: 500,
      onChangeAsync: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (import.meta.env.DEV) {
        console.log(value);
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      mutate(value);
    },
  });

  return (
    <form
      onKeyDown={(e) => {
        if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
          e.preventDefault();
        }
      }}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field
          name={COMMENDATION_RECORD.DECISION_NUMBER}
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  {COMMENDATION_RECORD_MAP[COMMENDATION_RECORD.DECISION_NUMBER]}
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <form.Field
          name={COMMENDATION_RECORD.DECISION_DATE}
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !!field.state.meta.errors.length;

            return (
              <DatePickerInput
                isInvalid={isInvalid}
                fieldName={field.name}
                fieldValue={field.state.value}
                fieldErrors={field.state.meta.errors}
                label={
                  COMMENDATION_RECORD_MAP[COMMENDATION_RECORD.DECISION_DATE]
                }
                onChange={(val) => field.handleChange(val)}
                onBlur={field.handleBlur}
                required
              />
            );
          }}
        />

        <form.Field
          name={COMMENDATION_RECORD.AWARD_SCOPE}
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  {COMMENDATION_RECORD_MAP[COMMENDATION_RECORD.AWARD_SCOPE]}
                </FieldLabel>
                <Select
                  name={field.name}
                  value={field.state.value}
                  onValueChange={(val) =>
                    field.handleChange(val as typeof field.state.value)
                  }
                >
                  <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {[...Object.values(AWARD_SCOPES)].map((item) => (
                      <SelectItem key={item} value={item}>
                        {AWARD_SCOPES_MAP[item]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <form.Field
          name={COMMENDATION_RECORD.AWARD_NAME}
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} required>
                  {COMMENDATION_RECORD_MAP[COMMENDATION_RECORD.AWARD_NAME]}
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <form.Field
          name={COMMENDATION_RECORD.CONTENT}
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} required>
                  {COMMENDATION_RECORD_MAP[COMMENDATION_RECORD.CONTENT]}
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Nhập nội dung khen thưởng"
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={isInvalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.state.value.length}/200 ký tự
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription></FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <form.Subscribe
          selector={(state) => state.values.isAcademicYear}
          children={(isAcademicYear) => (
            <form.Field
              name={COMMENDATION_RECORD.ACADEMIC_YEAR}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !!field.state.meta.errors.length;
                const value = field.state.value || '';
                const startYear = value;
                const endYear = /^\d{4}$/.test(startYear)
                  ? (parseInt(startYear, 10) + 1).toString()
                  : '';

                return (
                  <Field data-invalid={isInvalid}>
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor={field.name}>
                        {
                          COMMENDATION_RECORD_MAP[
                            COMMENDATION_RECORD.ACADEMIC_YEAR
                          ]
                        }
                      </FieldLabel>
                      <div className="bg-muted flex rounded-md p-1">
                        <button
                          type="button"
                          onClick={() => {
                            field.form.setFieldValue('isAcademicYear', false);
                          }}
                          className={`rounded-sm px-4 py-1 text-xs ${!isAcademicYear ? 'bg-background text-foreground border' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                          Năm
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            field.form.setFieldValue('isAcademicYear', true);
                          }}
                          className={`rounded-sm px-4 py-1 text-xs transition-colors ${isAcademicYear ? 'bg-background text-foreground border' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                          Năm học
                        </button>
                      </div>
                    </div>
                    <InputGroup>
                      <InputGroupInput
                        id={field.name}
                        type="number"
                        placeholder="YYYY"
                        value={startYear}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                        }}
                        onPaste={(e) => {
                          const pasteData = e.clipboardData.getData('text');
                          if (!/^\d*$/.test(pasteData)) {
                            e.preventDefault();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (['e', 'E', '+', '-', '.'].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                        min={1900}
                        max={new Date().getFullYear()}
                      />
                      {isAcademicYear && (
                        <InputGroupAddon
                          align="inline-end"
                          className="border-l p-2 px-4"
                        >
                          <InputGroupText className="text-muted-foreground space-x-2">
                            <span className="text-xs">—</span>
                            <span>{endYear}</span>
                          </InputGroupText>
                        </InputGroupAddon>
                      )}
                    </InputGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          )}
        />

        <form.Field
          name={'attachment'}
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const file = field.state.value as File | undefined;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} className="cursor-pointer">
                  File đính kèm
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="file"
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    field.handleChange(selectedFile || undefined);
                  }}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                  className={cn(
                    'cursor-pointer file:cursor-pointer',
                    'pl-4 file:mr-4 file:border-r file:pr-4',
                  )}
                />
                <FieldDescription className="text-right">
                  Định dạng: JPG, PNG, PDF | Tối đa: 20MB
                </FieldDescription>
                {file && file.type?.startsWith('image/') && (
                  <ImagePreview file={file} />
                )}
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>

      {renderActions && (
        <div className="mt-6 flex gap-4 sm:justify-center">
          {renderActions(isPending)}
        </div>
      )}
    </form>
  );
}

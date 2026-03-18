import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { type RecruitmentInfo } from '@/schemas/recruitment';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';

interface EditRecruitmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: RecruitmentInfo | null;
  onSubmit: (data: Partial<RecruitmentInfo>) => Promise<void>;
}

export function EditRecruitmentDialog({
  open,
  onOpenChange,
  data,
  onSubmit,
}: EditRecruitmentDialogProps) {
  const form = useForm({
    defaultValues: {
      recruitmentDate: data?.recruitmentDate || '',
      salaryForm: data?.salaryForm || '',
      previousOccupation: data?.previousOccupation || '',
      eduSectorStartYear: data?.eduSectorStartYear || undefined,
      vnuStartDate: data?.vnuStartDate || '',
      workSeniorityYears: data?.workSeniorityYears || '',
      longestJob: data?.longestJob || '',
      jobGroup: data?.jobGroup || '',
      jobPositionVnu: data?.jobPositionVnu || '',
      jobPositionUnit: data?.jobPositionUnit || '',
      mainAssignedWork: data?.mainAssignedWork || '',
      workUnitCount: data?.workUnitCount || undefined,
      notes: data?.notes || '',
    } as Partial<RecruitmentInfo>,
    onSubmit: async ({ value }) => {
      try {
        await onSubmit(value);
        toast.success('Cập nhật thông tin tuyển dụng thành công');
        onOpenChange(false);
      } catch {
        toast.error('Cập nhật thông tin tuyển dụng thất bại');
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin tuyển dụng</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6 py-4"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <form.Field
              name="recruitmentDate"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Ngày tuyển dụng</FieldLabel>
                  <Input
                    id={field.name}
                    type="date"
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            />
            <form.Field
              name="salaryForm"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Hình thức trả lương
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
              name="previousOccupation"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Nghề nghiệp trước khi tuyển dụng
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
              name="eduSectorStartYear"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Năm vào ngành giáo dục
                  </FieldLabel>
                  <Input
                    id={field.name}
                    type="number"
                    value={field.state.value ?? ''}
                    onChange={(e) =>
                      field.handleChange(
                        e.target.value ? parseInt(e.target.value) : undefined,
                      )
                    }
                  />
                </Field>
              )}
            />
            <form.Field
              name="vnuStartDate"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Ngày bắt đầu vào ĐHQGHN
                  </FieldLabel>
                  <Input
                    id={field.name}
                    type="date"
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            />
            <form.Field
              name="workSeniorityYears"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Thâm niên công tác
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
              name="longestJob"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Công việc đã làm lâu nhất
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
              name="jobGroup"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Nhóm vị trí việc làm
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
              name="jobPositionVnu"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Vị trí việc làm cấp ĐHQGHN
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
              name="jobPositionUnit"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Vị trí việc làm cấp đơn vị
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
              name="mainAssignedWork"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Công việc chính được giao
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
              name="notes"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Ghi chú</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            />
          </div>

          <div className="flex justify-end gap-3 border-t pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={form.state.isSubmitting}>
              {form.state.isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

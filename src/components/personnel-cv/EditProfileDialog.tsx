import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type Profile } from '@/schemas/profile';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: Profile;
  onSubmit: (data: Partial<Profile>) => Promise<void>;
}

function AddressSection({
  form,
  name,
  title,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  name: string;
  title: string;
}) {
  return (
    <div className="space-y-4">
      <h3 className="border-b pb-2 text-lg font-semibold">{title}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        <form.Field
          name={`${name}.street`}
          children={(field: {
            name: string;
            state: { value: string };
            handleChange: (val: string) => void;
          }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Số nhà/Đường</FieldLabel>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        />
        <form.Field
          name={`${name}.ward`}
          children={(field: {
            name: string;
            state: { value: string };
            handleChange: (val: string) => void;
          }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Xã/Phường</FieldLabel>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        />
        <form.Field
          name={`${name}.district`}
          children={(field: {
            name: string;
            state: { value: string };
            handleChange: (val: string) => void;
          }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Huyện/Quận</FieldLabel>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        />
        <form.Field
          name={`${name}.province`}
          children={(field: {
            name: string;
            state: { value: string };
            handleChange: (val: string) => void;
          }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Tỉnh/Thành phố</FieldLabel>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        />
        <form.Field
          name={`${name}.country`}
          children={(field: {
            name: string;
            state: { value: string };
            handleChange: (val: string) => void;
          }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Quốc gia</FieldLabel>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        />
      </div>
    </div>
  );
}

type AddressValues = {
  street: string;
  ward: string;
  district: string;
  province: string;
  country: string;
};

type ProfileFormValues = {
  idNumber: string;
  idIssuedDate: string;
  idIssuedBy: string;
  phoneWork: string;
  phoneHome: string;
  emailPersonal: string;
  nationality: string;
  ethnicity: string;
  religion: string;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  nickName: string;
  policyObject: string;
  passportNumber: string;
  passportIssuedAt: string;
  passportIssuedBy: string;
  insuranceNumber: string;
  addrHometown: AddressValues;
  addrBirthplace: AddressValues;
  addrPermanent: AddressValues;
  addrCurrent: AddressValues;
};

const emptyAddress: AddressValues = {
  street: '',
  ward: '',
  district: '',
  province: '',
  country: 'Việt Nam',
};

export function EditProfileDialog({
  open,
  onOpenChange,
  profile,
  onSubmit,
}: EditProfileDialogProps) {
  const form = useForm({
    defaultValues: {
      idNumber: profile.idNumber || '',
      idIssuedDate: profile.idIssuedDate || '',
      idIssuedBy: profile.idIssuedBy || '',
      phoneWork: profile.phoneWork || '',
      phoneHome: profile.phoneHome || '',
      emailPersonal: profile.emailPersonal || '',
      nationality: profile.nationality || 'Việt Nam',
      ethnicity: profile.ethnicity || '',
      religion: profile.religion || '',
      maritalStatus: (['single', 'married', 'divorced', 'widowed'].includes(
        profile.maritalStatus as string,
      )
        ? profile.maritalStatus
        : 'single') as ProfileFormValues['maritalStatus'],
      nickName: profile.nickName || '',
      policyObject: profile.policyObject || '',
      passportNumber: profile.passportNumber || '',
      passportIssuedAt: profile.passportIssuedAt || '',
      passportIssuedBy: profile.passportIssuedBy || '',
      insuranceNumber: profile.insuranceNumber || '',
      addrHometown: { ...emptyAddress, ...(profile.addrHometown || {}) },
      addrBirthplace: { ...emptyAddress, ...(profile.addrBirthplace || {}) },
      addrPermanent: { ...emptyAddress, ...(profile.addrPermanent || {}) },
      addrCurrent: { ...emptyAddress, ...(profile.addrCurrent || {}) },
    } as ProfileFormValues,
    onSubmit: async ({ value }) => {
      try {
        await onSubmit(value);
        toast.success('Cập nhật thông tin thành công');
        onOpenChange(false);
      } catch {
        toast.error('Cập nhật thông tin thất bại');
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin nhân sự</DialogTitle>
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
            {/* THÔNG TIN ĐỊNH DANH */}
            <div className="space-y-4">
              <h3 className="border-b pb-2 text-lg font-semibold">
                Thông tin định danh
              </h3>
              <form.Field
                name="idNumber"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'Bắt buộc nhập số CMND/CCCD';
                    if (!/^[0-9]{12}$/.test(value))
                      return 'CCCD phải bao gồm đúng 12 chữ số';
                    return undefined;
                  },
                }}
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      Số CMND/CCCD <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={
                        field.state.meta.errors.length ? 'border-red-500' : ''
                      }
                    />
                    {field.state.meta.errors.length > 0 && (
                      <span className="text-sm text-red-500">
                        {field.state.meta.errors.join(', ')}
                      </span>
                    )}
                  </Field>
                )}
              />
              <form.Field
                name="idIssuedDate"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'Vui lòng chọn ngày cấp';
                    const selectedDate = new Date(value);
                    const today = new Date();
                    if (selectedDate > today)
                      return 'Ngày cấp không thể ở tương lai';
                    return undefined;
                  },
                }}
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      Ngày cấp <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      type="date"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={
                        field.state.meta.errors.length ? 'border-red-500' : ''
                      }
                    />
                    {field.state.meta.errors.length > 0 && (
                      <span className="text-sm text-red-500">
                        {field.state.meta.errors.join(', ')}
                      </span>
                    )}
                  </Field>
                )}
              />
              <form.Field
                name="idIssuedBy"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Nơi cấp</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              />
            </div>

            {/* THÔNG TIN LIÊN LẠC */}
            <div className="space-y-4">
              <h3 className="border-b pb-2 text-lg font-semibold">
                Thông tin liên lạc
              </h3>
              <form.Field
                name="phoneWork"
                validators={{
                  onChange: ({ value }) => {
                    if (value && !/^0[0-9]{9}$/.test(value))
                      return 'SĐT phải bắt đầu bằng số 0 và có đúng 10 số';
                    return undefined;
                  },
                }}
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>SĐT cơ quan</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={
                        field.state.meta.errors.length ? 'border-red-500' : ''
                      }
                    />
                    {field.state.meta.errors.length > 0 && (
                      <span className="text-sm text-red-500">
                        {field.state.meta.errors.join(', ')}
                      </span>
                    )}
                  </Field>
                )}
              />
              <form.Field
                name="phoneHome"
                validators={{
                  onChange: ({ value }) => {
                    if (value && !/^0[0-9]{9}$/.test(value))
                      return 'SĐT phải bắt đầu bằng số 0 và có đúng 10 số';
                    return undefined;
                  },
                }}
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>SĐT nhà riêng</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={
                        field.state.meta.errors.length ? 'border-red-500' : ''
                      }
                    />
                    {field.state.meta.errors.length > 0 && (
                      <span className="text-sm text-red-500">
                        {field.state.meta.errors.join(', ')}
                      </span>
                    )}
                  </Field>
                )}
              />
              <form.Field
                name="emailPersonal"
                validators={{
                  onChange: ({ value }) => {
                    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                      return 'Email không đúng định dạng';
                    return undefined;
                  },
                }}
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email cá nhân</FieldLabel>
                    <Input
                      id={field.name}
                      type="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={
                        field.state.meta.errors.length ? 'border-red-500' : ''
                      }
                    />
                    {field.state.meta.errors.length > 0 && (
                      <span className="text-sm text-red-500">
                        {field.state.meta.errors.join(', ')}
                      </span>
                    )}
                  </Field>
                )}
              />
            </div>

            {/* THÔNG TIN CÁ NHÂN */}
            <div className="space-y-4">
              <h3 className="border-b pb-2 text-lg font-semibold">
                Thông tin cá nhân
              </h3>
              <form.Field
                name="nationality"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'Vui lòng điền Quốc tịch' : undefined,
                }}
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      Quốc tịch <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={
                        field.state.meta.errors.length ? 'border-red-500' : ''
                      }
                    />
                    {field.state.meta.errors.length > 0 && (
                      <span className="text-sm text-red-500">
                        {field.state.meta.errors.join(', ')}
                      </span>
                    )}
                  </Field>
                )}
              />
              <form.Field
                name="ethnicity"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'Vui lòng điền Dân tộc' : undefined,
                }}
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      Dân tộc <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={
                        field.state.meta.errors.length ? 'border-red-500' : ''
                      }
                    />
                    {field.state.meta.errors.length > 0 && (
                      <span className="text-sm text-red-500">
                        {field.state.meta.errors.join(', ')}
                      </span>
                    )}
                  </Field>
                )}
              />
              <form.Field
                name="religion"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'Vui lòng điền Tôn giáo' : undefined,
                }}
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      Tôn giáo <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={
                        field.state.meta.errors.length ? 'border-red-500' : ''
                      }
                    />
                    {field.state.meta.errors.length > 0 && (
                      <span className="text-sm text-red-500">
                        {field.state.meta.errors.join(', ')}
                      </span>
                    )}
                  </Field>
                )}
              />
              <form.Field
                name="maritalStatus"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      Tình trạng hôn nhân
                    </FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) =>
                        field.handleChange(
                          value as ProfileFormValues['maritalStatus'],
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn tình trạng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Độc thân</SelectItem>
                        <SelectItem value="married">Đã kết hôn</SelectItem>
                        <SelectItem value="divorced">Đã ly hôn</SelectItem>
                        <SelectItem value="widowed">Góa</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </div>

            {/* THÔNG TIN KHÁC */}
            <div className="space-y-4">
              <h3 className="border-b pb-2 text-lg font-semibold">
                Thông tin khác
              </h3>
              <form.Field
                name="nickName"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Tên gọi khác</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              />
              <form.Field
                name="policyObject"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      Đối tượng chính sách
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
                name="insuranceNumber"
                validators={{
                  onChange: ({ value }) => {
                    if (value && !/^[0-9]{10}$/.test(value))
                      return 'Số BHXH phải bao gồm đúng 10 chữ số';
                    return undefined;
                  },
                }}
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Số BHXH</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={
                        field.state.meta.errors.length ? 'border-red-500' : ''
                      }
                    />
                    {field.state.meta.errors.length > 0 && (
                      <span className="text-sm text-red-500">
                        {field.state.meta.errors.join(', ')}
                      </span>
                    )}
                  </Field>
                )}
              />
            </div>

            {/* THÔNG TIN HỘ CHIẾU */}
            <div className="space-y-4 md:col-span-2">
              <h3 className="border-b pb-2 text-lg font-semibold">
                Thông tin hộ chiếu
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <form.Field
                  name="passportNumber"
                  validators={{
                    onChange: ({ value }) => {
                      if (value && !/^[A-Za-z0-9]{8,9}$/.test(value))
                        return 'Hộ chiếu không hợp lệ (8-9 ký tự gồm chữ và số)';
                      return undefined;
                    },
                  }}
                  children={(field) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Số hộ chiếu</FieldLabel>
                      <Input
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={
                          field.state.meta.errors.length ? 'border-red-500' : ''
                        }
                      />
                      {field.state.meta.errors.length > 0 && (
                        <span className="text-sm text-red-500">
                          {field.state.meta.errors.join(', ')}
                        </span>
                      )}
                    </Field>
                  )}
                />
                <form.Field
                  name="passportIssuedAt"
                  validators={{
                    onChange: ({ value }) => {
                      if (value && new Date(value) > new Date())
                        return 'Ngày cấp không thể ở tương lai';
                      return undefined;
                    },
                  }}
                  children={(field) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Ngày cấp</FieldLabel>
                      <Input
                        id={field.name}
                        type="date"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={
                          field.state.meta.errors.length ? 'border-red-500' : ''
                        }
                      />
                      {field.state.meta.errors.length > 0 && (
                        <span className="text-sm text-red-500">
                          {field.state.meta.errors.join(', ')}
                        </span>
                      )}
                    </Field>
                  )}
                />
                <form.Field
                  name="passportIssuedBy"
                  children={(field) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Nơi cấp</FieldLabel>
                      <Input
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </Field>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-6">
            <AddressSection form={form} name="addrHometown" title="Quê quán" />
            <AddressSection
              form={form}
              name="addrBirthplace"
              title="Nơi sinh"
            />
            <AddressSection
              form={form}
              name="addrPermanent"
              title="Hộ khẩu thường trú"
            />
            <AddressSection
              form={form}
              name="addrCurrent"
              title="Nơi ở hiện nay"
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
            <Button
              type="submit"
              disabled={
                form.state.isSubmitting ||
                !form.state.canSubmit ||
                !form.state.isDirty
              }
            >
              {form.state.isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

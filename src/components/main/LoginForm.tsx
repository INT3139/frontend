import logo from '@/assets/VNU.svg';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { login } from '@/services/api/auth';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import * as z from 'zod';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Separator } from '../ui/separator';

const formSchema = z.object({
  username: z
    .string()
    .min(1, 'Tên tài khoản không được để trống!')
    .regex(/^[a-zA-Z0-9]+$/, {
      message: 'Tên tài khoản chỉ chứa ký tự chữ và số!',
    }),
  password: z.string().min(1, 'Mật khẩu không được để trống!'),
});

const workingInProgressToast = () => {
  toast.info('Chức năng đang được phát triển!', {
    position: 'top-center',
  });
};

export function LoginForm() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      if (import.meta.env.DEV) {
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      if (data.success && data.data.accessToken) {
        localStorage.setItem('access_token', data.data.accessToken);
        toast.success('Đăng nhập thành công!');
        navigate({ to: '/' });
      } else {
        toast.error('Tên tài khoản hoặc mật khẩu không chính xác!');
      }
    },
    onError: (err) => {
      if (import.meta.env.DEV) console.error(err);
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau!');
    },
  });

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
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
      className="w-full max-w-md"
    >
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>
            <h1 className="text-xl">Đăng nhập</h1>
          </CardTitle>
          <CardDescription>Sử dụng tài khoản VNU được cung cấp</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <form.Field
              name="username"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} required>
                      Tên tài khoản
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      placeholder="Nhập tên tài khoản"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <div className="flex">
                      <FieldLabel htmlFor={field.name} required>
                        Mật khẩu
                      </FieldLabel>

                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        onClick={workingInProgressToast}
                      >
                        Quên mật khẩu?
                      </a>
                    </div>
                    <Input
                      id={field.name}
                      type="password"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      placeholder="Nhập mật khẩu"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            <span>Đăng nhập</span>
          </Button>
          <Separator />
          <Button
            variant="secondary"
            className="w-full space-x-2"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              workingInProgressToast();
            }}
            disabled={isPending}
          >
            <img src={logo} alt="VNU" className="h-6 w-6" />
            <span> Đăng nhập bằng VNU mail</span>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

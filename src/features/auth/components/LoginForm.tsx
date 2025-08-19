"use client";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useLogin } from '../hooks/useAuthHooks';
import { loginSchema, LoginFormData } from '../schemas/authSchemas';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import LanguageSwitcher from '@/components/global/LanguageSwitcher';

// Role-based routing will be handled in the useLogin hook

export default function LoginForm() {
  const t = useTranslations('Auth.Login');
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLogin();
  const onSubmit = async (data: LoginFormData) => {
    const res = await loginMutation.mutateAsync(data);
    if (!res?.error) {
      const callback = searchParams.get('callbackUrl') || '/dashboard';
      router.replace(callback);
    }
  };

  return (
    <div>
      <div className="absolute right-4 top-4">
        <LanguageSwitcher />
      </div>
      <div className="min-h-[95vh] flex items-center justify-center">
        <div className="w-full max-w-md p-4">
          <Card>
            <CardHeader className="space-y-1 flex flex-col items-center">
              <CardTitle className="text-2xl font-bold text-center">{t('title')}</CardTitle>
              <Image
                src="/images/ur-logo.png"
                alt={"User Avatar"}
                width={150}
                height={150}
                className="rounded-full object-cover"
              />
              <CardDescription className="text-center">
                {t('description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('emailLabel')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="password">{t('passwordLabel')}</Label>
                    <Link href='/forgot-password' className="text-xs text-primary hover:underline">
                      {t('forgotPasswordLink')}
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>              <Button type="submit" className="w-full" disabled={isSubmitting || loginMutation.isPending}>
                  {isSubmitting || loginMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('signingIn')}
                    </>
                  ) : (
                    t('signIn')
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

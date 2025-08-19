"use client";
import React from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Auth hooks and schemas
import { useResetPassword } from '../hooks/useAuthHooks';
import { resetPasswordSchema, ResetPasswordFormData } from '../schemas/authSchemas';

export default function ResetPassword() {
  const t = useTranslations('Auth.ResetPassword');
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') || '';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      newPassword: '',
      confirmPassword: ''
    }
  });

  const resetPasswordMutation = useResetPassword();

  const onSubmit = (data: ResetPasswordFormData) => {
    // Only send token and newPassword to the backend
    const { token, newPassword } = data;
    resetPasswordMutation.mutate(
      { token, newPassword },
      {
        onSuccess: () => {
          router.push('/login');
        },
      }
    );
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md p-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">{t('title')}</CardTitle>
            <CardDescription className="text-center">
              {t('description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">{t('newPasswordLabel')}</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder={t('newPasswordPlaceholder')}
                  {...register('newPassword')}
                />
                {errors.newPassword && (
                  <p className="text-sm text-red-500">{errors.newPassword.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('confirmPasswordLabel')}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder={t('confirmPasswordPlaceholder')}
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>
              <input type="hidden" {...register('token')} />
              <Button type="submit" className="w-full" disabled={isSubmitting || resetPasswordMutation.isPending}>
                {isSubmitting || resetPasswordMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('resettingPassword')}
                  </>
                ) : (
                  t('resetPassword')
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-center w-full">
              {t('rememberPassword')}{' '}
              <Link href="/login" className="text-primary hover:underline">
                {t('loginLink')}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
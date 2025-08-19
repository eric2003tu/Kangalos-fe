"use client";
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

// UI Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

// Auth hooks
import { useVerifyEmail } from '../hooks/useAuthHooks';

export default function EmailVerification() {
  const t = useTranslations('Auth.EmailVerification');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const verifyEmailMutation = useVerifyEmail();

  useEffect(() => {
    if (token) {
      verifyEmailMutation.mutate({ token });
    }
  }, [token, verifyEmailMutation]);

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
          <CardContent className="flex flex-col items-center justify-center pt-6 pb-8">
            {verifyEmailMutation.isPending && (
              <>
                <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
                <p className="text-center text-lg">{t('verifying')}</p>
              </>
            )}

            {verifyEmailMutation.isSuccess && (
              <>
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <p className="text-center text-lg">{t('success')}</p>
              </>
            )}

            {verifyEmailMutation.isError && (
              <>
                <XCircle className="h-16 w-16 text-red-500 mb-4" />
                <p className="text-center text-lg">
                  {verifyEmailMutation.error instanceof Error
                    ? verifyEmailMutation.error.message
                    : t('error')}
                </p>
              </>
            )}
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <Button asChild className="w-full">
                <Link href="/login">
                  {verifyEmailMutation.isSuccess ? t('proceedToLogin') : t('backToLogin')}
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Link from 'next/link';

import { Form, FormControl, FormField } from '@/components/ui/form';
import { IconInput } from '@/components/ui/icon-input';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ErrorIcon } from '@/assets/svgs';
import hide from '../../../../assets/pngs/hide.png';

import { useCreateEventMutation } from '@/store/features/events/eventsApi';
import CustomToast from '@/components/common/CustomToast';

import Spinner from '@/components/common/Spinner';
import { forgetUrl, signupUrl, selectionUrl } from '@/configs/constants';

interface LoginProps {}

const LoginSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type FormFields = z.infer<typeof LoginSchema>;

const Login: React.FC<LoginProps> = () => {
  const router = useRouter();
  const [login, { isLoading }] = useCreateEventMutation();
  const [showPassword, setShowPaasword] = useState<boolean>(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (loginData: FormFields) => {
    const formData = new FormData();

    Object.keys(loginData).forEach((key) => {
      const value = loginData[key as keyof FormFields];
      if (value !== undefined && value !== null) {
        formData.append(key, value as any); // Type assertion for `value` to `any`
      }
    });

    try {
      //const response = await login(formData);
      form.reset();
      toast.success(`${loginData.email}`, {
        position: 'top-right',
      });

      router.push('/income');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to Create event', {
        position: 'top-right',
      });
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center pt-10 pb-4 bg-formBg gap-12 xl:gap-5 xl:w-5/5 rounded-3xl border-solid border-[1px] border-formBorder">
      <div className="flex flex-col w-full justify-center items-center py-7">
        <p
          className="font-medium text-[32px] text-headingColor text-center"
          data-cy="page-title"
          data-testid="page-title"
        >
          Log In
        </p>
        <p
          className="font-normal text-sm text-slate-900 text-center"
          data-cy="page-description"
          data-testid="page-description"
        >
          Don’t have an account?{' '}
          <Link href={selectionUrl}>
            <u className="font-medium">Sign up</u>
          </Link>
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[82%] gap-6 mb-12 xl:mb-10"
          data-testid="event-form"
        >
          <div className="w-full items-center">
            <div className="flex flex-row gap-x-6 items-center">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="w-full flex flex-col">
                    <Label className="mb-2">Email Address:</Label>
                    <FormControl>
                      <IconInput
                        {...field}
                        type="text"
                        id="email"
                        aria-label="email-address"
                        placeholder=""
                        className="bg-outline"
                        error={!!form.formState.errors.email}
                        data-cy="email-address"
                        data-testid="email-address"
                      />
                    </FormControl>
                    {form.formState.errors.email && (
                      <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                        <ErrorIcon />
                        {form.formState.errors.email.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          <div className="w-full items-center ">
            <div className=" flex flex-row gap-x-6 items-center ">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="w-full flex flex-col">
                    <div className="flex justify-between">
                      <Label>Password:</Label>
                      <div
                        className="flex items-center justify-between gap-1 cursor-pointer text-iconText "
                        onClick={(e) => {
                          setShowPaasword(!showPassword);
                        }}
                      >
                        <img src={hide.src} />
                        {showPassword ? 'Hide' : 'Show'}
                      </div>
                    </div>

                    <FormControl>
                      <IconInput
                        {...field}
                        rightIcon={ErrorIcon}
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        aria-label="Password"
                        placeholder=""
                        className="bg-outline"
                        error={!!form.formState.errors.password}
                        data-cy="password"
                        data-testid="password"
                      />
                    </FormControl>
                    {form.formState.errors.password && (
                      <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                        <ErrorIcon />
                        {form.formState.errors.password.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-3">
            {/* <div className="flex items-center gap-x-2 "> */}
            <Link href={forgetUrl}>
              <span className="underline text-sm">Forgot password ?</span>
            </Link>
            <div className="w-full bg-black h-full p-[6px] rounded-md ">
              <Button
                className="text-white text-center w-full h-full font-[400]"
                type="submit"
                data-cy="event-submit"
                data-testid="event-submit"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : 'Continue'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;

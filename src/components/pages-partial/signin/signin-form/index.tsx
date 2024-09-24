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
import { forgetUrl, signupUrl } from '@/configs/constants';

interface LoginProps {}

const LoginSchema = z.object({
  email: z.string().min(1, { message: 'email is required' }),
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
      toast.custom((t) => <CustomToast t={t} title={loginData.email} />);
      router.push('/income');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to Create event');
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center bg-[#F8F8F8] gap-12 xl:gap-5 xl:w-5/5 rounded-3xl border-solid border-[1px] border-opacity-35 border-[#666666]">
      {Object.keys(form.formState.errors).length > 0 && (
        <div className=" mt-2 p-1">
          {Object.values(form.formState.errors).map((error, index) => (
            <div
              key={'error-' + index}
              className="bg-red-100 text-red-700 p-2 rounded-lg flex gap-3 mt-2"
            >
              <ErrorIcon />
              <p className="text-sm">{error?.message?.toString()}</p>{' '}
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col w-full justify-center items-center py-7">
        <p
          className="font-medium text-3xl text-headingColor"
          data-cy="page-title"
          data-testid="page-title"
        >
          Log In
        </p>
        <p
          className="font-medium text-sm text-slate-900"
          data-cy="page-description"
          data-testid="page-description"
        >
          Don’t have an account?{' '}
          <Link href={signupUrl}>
            <u>Sign up</u>
          </Link>
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[82%] gap-12 xl:gap-6 mb-12 xl:mb-10"
          data-testid="event-form"
        >
          <div className="w-full items-center">
            <div className="flex flex-row gap-x-6 items-center">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="w-full gap-y-2 flex flex-col">
                    <Label>Email Address:</Label>
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
                      <span
                        className="flex items-center justify-between gap-1 cursor-pointer"
                        onClick={(e) => {
                          setShowPaasword(!showPassword);
                          console.log(showPassword);
                        }}
                      >
                        <img src={hide.src} />
                        {showPassword ? 'Hide' : 'Show'}
                      </span>
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
                  </div>
                )}
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-3">
            {/* <div className="flex items-center gap-x-2 "> */}
            <Link href={forgetUrl}>
              <span className="underline">Forgot password ?</span>
            </Link>
            <div className="w-full bg-black h-[6vh] rounded-md ">
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

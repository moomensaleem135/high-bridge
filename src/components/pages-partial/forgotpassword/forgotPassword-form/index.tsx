'use client';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Link from 'next/link';

import { Form, FormControl, FormField } from '@/components/ui/form';
import { IconInput } from '@/components/ui/icon-input';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ErrorIcon } from '@/assets/svgs';
import back from '../../../../assets/pngs/backArrow.png';

import { useCreateEventMutation } from '@/store/features/events/eventsApi';
import CustomToast from '@/components/common/CustomToast';

import Spinner from '@/components/common/Spinner';
import { signinUrl } from '@/configs/constants';

interface ForgotPasswordProps {}

const ForgotPasswordSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }),
});

type FormFields = z.infer<typeof ForgotPasswordSchema>;

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const router = useRouter();
  const [login, { isLoading }] = useCreateEventMutation();
  const [showPassword, setShowPaasword] = useState<boolean>(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (forgotPassData: FormFields) => {
    const formData = new FormData();

    Object.keys(forgotPassData).forEach((key) => {
      const value = forgotPassData[key as keyof FormFields];
      if (value !== undefined && value !== null) {
        formData.append(key, value as any); // Type assertion for `value` to `any`
      }
    });

    try {
      const response = await login(formData);
      form.reset();
      toast.success(`${forgotPassData.email}`, {
        position: 'top-right',
      });

      router.push('/verify');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to Create event', {
        position: 'top-right',
      });
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center pt-4 pb-1 bg-formBg gap-12 xl:gap-5 xl:w-5/5 rounded-3xl border-solid border-[1px] border-formBorder">
      {/* {Object.keys(form.formState.errors).length > 0 && (
        <div className=" mt-2 p-1">
          {Object.values(form.formState.errors).map((error, index) => (
            <div
              key={'error-' + index}
              className="bg-red-100 text-red-700 p-2 rounded-lg flex gap-3 mt-2 "
            >
              <ErrorIcon />
              <p className="text-sm">{error?.message?.toString()}</p>{' '}
            </div>
          ))}
        </div>
      )} */}
      <div className="flex flex-col w-full justify-center items-center py-7 gap-y-1">
        <p
          className="font-medium text-3xl text-headingColor"
          data-cy="page-title"
          data-testid="page-title"
        >
          Forgot your password?
        </p>
        <p
          className="font-normal text-sm text-slate-900 text-center"
          data-cy="page-description"
          data-testid="page-description"
        >
          Don’t worry, happens to all of us. Enter your email below <br /> to
          recover your password
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[82%] gap-5 mb-12 xl:mb-10"
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

          <div className="w-full flex">
            {/* <div className="flex items-center gap-x-2 "> */}
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

          <Link
            className="flex justify-start items-center gap-3 text-sm font-medium"
            href={signinUrl}
          >
            <img src={back.src} />
            Back to login
          </Link>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPassword;

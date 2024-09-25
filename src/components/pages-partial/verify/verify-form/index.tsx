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

import { ErrorIcon } from '@/assets/svgs';
import back from '../../../../assets/pngs/backArrow.png';

import { useCreateEventMutation } from '@/store/features/events/eventsApi';
import CustomToast from '@/components/common/CustomToast';

import Spinner from '@/components/common/Spinner';
import { signinUrl } from '@/configs/constants';
import OtpField from './verifyotp-field';

interface VerifyProps {}

const VerifySchema = z.object({
  otp: z.string().min(5, { message: 'verification code is required' }),
});

type FormFields = z.infer<typeof VerifySchema>;

const VerifyCode: React.FC<VerifyProps> = () => {
  const router = useRouter();
  const [verify, { isLoading }] = useCreateEventMutation();

  const [otp, setOtp] = useState('');

  const form = useForm<FormFields>({
    resolver: zodResolver(VerifySchema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = async (verifyData: FormFields) => {
    const formData = new FormData();

    Object.keys(verifyData).forEach((key) => {
      const value = verifyData[key as keyof FormFields];
      if (value !== undefined && value !== null) {
        formData.append(key, value as any); // Type assertion for `value` to `any`
      }
    });

    try {
      const response = await verify(formData);
      form.reset();
      toast.custom((t) => <CustomToast t={t} title={`${verifyData.otp}`} />);
      router.push('/reset-password');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to Create event');
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center bg-[#F8F8F8] gap-12 xl:gap-5 xl:w-5/5 rounded-3xl border-solid border-[1px] border-opacity-35 border-[#666666]">
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
      <div className="flex flex-col w-full justify-center items-center py-7">
        <p
          className="font-medium text-3xl text-headingColor"
          data-cy="page-title"
          data-testid="page-title"
        >
          Verify Code
        </p>
        <p
          className="font-medium text-sm text-slate-900"
          data-cy="page-description"
          data-testid="page-description"
        >
          An authentication code has been sent to your email.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[85%] gap-12 xl:gap-5 mb-12 xl:mb-16"
          data-testid="event-form"
        >
          <div className="flex flex-row gap-3 justify-center items-center">
            <div className="w-full items-center">
              <div className="flex flex-row gap-x-6 items-center">
                <Controller
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <div className="w-full gap-y-2 flex flex-col h-20">
                      <FormControl>
                        <OtpField
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      {form.formState.errors.otp && (
                        <span className="text-destructive text-sm flex items-center gap-1">
                          <ErrorIcon />
                          {form.formState.errors.otp.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex">
            {/* <div className="flex items-center gap-x-2 "> */}
            <div className="w-full bg-black h-[6vh] rounded-md ">
              <Button
                className="text-white text-center w-full h-full font-[400]"
                type="submit"
                data-cy="code-submit"
                data-testid="code-submit"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : 'Verify'}
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center flex-row max-md:flex-col">
            <Link
              className="flex justify-start items-center gap-3"
              href={signinUrl}
            >
              <img src={back.src} />
              Back to login
            </Link>
            <span>
              Didn’t receive a code?{' '}
              <span className="text-[#FF8682] font-[500] cursor-pointer">
                Resend
              </span>
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VerifyCode;

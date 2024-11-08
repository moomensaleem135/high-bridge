'use client';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useCreateEventMutation } from '@/store/features/events/eventsApi';
import Spinner from '@/components/common/Spinner';
import { signinUrl } from '@/configs/constants';
import { textConstants } from '@/configs/textConstants';
import { ErrorIcon } from '@/assets/svgs';

import OtpField from './verifyotp-field';
import back from '../../../../assets/pngs/backArrow.png';

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
        formData.append(key, value as any);
      }
    });

    try {
      // const response = await verify(formData);
      form.reset();
      toast.success(textConstants.verifyCodeSuccessMessage, {
        position: 'top-right',
      });
      router.push('/reset-password');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error(textConstants.verifyCodeErrorMessage, {
        position: 'top-right',
      });
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center bg-formBg gap-12 xl:gap-5 xl:w-5/5 rounded-3xl border-solid border-[1px] border-formBorder">
      <div className="flex flex-col w-full justify-center items-center pt-10 pb-3">
        <p
          className="font-medium text-3xl text-headingColor text-center"
          data-cy="page-title"
          data-testid="page-title"
        >
          {textConstants.verifyCodeTitle}
        </p>
        <p
          className="font-normal text-sm text-slate-900 text-center"
          data-cy="page-description"
          data-testid="page-description"
        >
          {textConstants.verifyCodeDescription}
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[85%] gap-5 xl:gap-5 mb-12 xl:mb-16"
          data-testid="event-form"
        >
          <div className="flex flex-row gap-3 justify-center items-center">
            <div className="w-full items-center">
              <div className="flex flex-col gap-x-6 items-center">
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
                    </div>
                  )}
                />
                <div className="flex justify-start items-start w-full">
                  {form.formState.errors.otp && (
                    <span className="text-destructive text-sm flex items-center gap-1">
                      <ErrorIcon />
                      {form.formState.errors.otp.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex">
            <div className="w-full bg-black h-[6vh] rounded-md ">
              <Button
                className="text-white text-center w-full h-full font-[400]"
                type="submit"
                data-cy="code-submit"
                data-testid="code-submit"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : textConstants.verifyButtonText}
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center flex-row max-md:flex-col gap-3">
            <Link
              className="flex justify-start items-center gap-3 text-sm font-medium"
              href={signinUrl}
            >
              <img src={back.src} />
              {textConstants.backToLoginText}
            </Link>
            <span className="font-medium text-sm text-end">
              {textConstants.resendCodeText}
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VerifyCode;

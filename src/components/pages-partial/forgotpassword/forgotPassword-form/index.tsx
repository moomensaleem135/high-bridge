'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormField } from '@/components/ui/form';
import { IconInput } from '@/components/ui/icon-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Spinner from '@/components/common/Spinner';
import { ErrorIcon } from '@/assets/svgs';

import { useCreateEventMutation } from '@/store/features/events/eventsApi';
import { signinUrl } from '@/configs/constants';
import { textConstants } from '@/configs/textConstants';
import back from '../../../../assets/pngs/backArrow.png';

interface ForgotPasswordProps {}

const ForgotPasswordSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }),
});

type FormFields = z.infer<typeof ForgotPasswordSchema>;

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const router = useRouter();
  const [login, { isLoading }] = useCreateEventMutation();

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
      // const response = await login(formData);
      form.reset();
      toast.success(textConstants.verificationSuccessMessage);

      router.push('/verify');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error(textConstants.verificationErrorMessage);
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center pt-4 pb-1 bg-formBg gap-12 xl:gap-5 xl:w-5/5 rounded-3xl border-solid border-[1px] border-formBorder">
      <div className="flex flex-col w-full justify-center items-center pt-7 pb-3 gap-y-1">
        <p
          className="font-medium text-3xl text-headingColor text-center"
          data-cy="page-title"
          data-testid="page-title"
        >
          {textConstants.forgotPasswordTitle}
        </p>
        <p
          className="font-normal text-sm text-slate-900 text-center"
          data-cy="page-description"
          data-testid="page-description"
        >
          {textConstants.forgotPasswordDescriptionStartLine}
          <br />
          {textConstants.forgotPasswordDescriptionEndLine}
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
                    <Label className="mb-2">{textConstants.emailLabel}:</Label>
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
            <div className="w-full bg-black h-[6vh] rounded-md ">
              <Button
                className="text-white text-center w-full h-full font-[400]"
                type="submit"
                data-cy="event-submit"
                data-testid="event-submit"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : textConstants.continueButtonText}
              </Button>
            </div>
          </div>

          <Link
            className="flex sm:justify-start items-center gap-3 text-sm font-medium xs:justify-center"
            href={signinUrl}
          >
            <img src={back.src} />
            {textConstants.backToLoginText}
          </Link>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPassword;

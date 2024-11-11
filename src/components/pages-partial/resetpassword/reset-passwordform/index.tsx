'use client';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormField } from '@/components/ui/form';
import PasswordStrengthMeter from '@/components/common/PasswordStrengthMeter';
import { IconInput } from '@/components/ui/icon-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Spinner from '@/components/common/Spinner';
import { ErrorIcon } from '@/assets/svgs';
import { ShowIcon, HideIcon } from '@/assets/svgs';
import { useCreateEventMutation } from '@/store/features/events/eventsApi';
import { textConstants } from '@/configs/textConstants';

interface ResetProps {}

const ResetSchema = z.object({
  password: z.string().min(1, { message: 'Password is required' }),
  confirmPassword: z
    .string()
    .min(1, { message: 'Confirm password is required' }),
});

type FormFields = z.infer<typeof ResetSchema>;

const ResetPassword: React.FC<ResetProps> = () => {
  const router = useRouter();
  const [login, { isLoading }] = useCreateEventMutation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (resetData: FormFields) => {
    const formData = new FormData();

    Object.keys(resetData).forEach((key) => {
      const value = resetData[key as keyof FormFields];
      if (value !== undefined && value !== null) {
        formData.append(key, value as any); // Type assertion for `value` to `any`
      }
    });

    try {
      // const response = await login(formData);
      form.reset();
      toast.success(textConstants.resetPasswordSuccessMessage, {
        position: 'top-right',
      });

      router.push('/signin');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error(textConstants.resetPasswordErrorMessage, {
        position: 'top-right',
      });
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center bg-formBg gap-5 xl:w-5/5 rounded-3xl border-solid border-[1px] border-formBorder">
      <div className="flex flex-col w-full justify-center items-center pt-10 pb-3">
        <p
          className="font-medium text-3xl text-headingColor text-center"
          data-cy="page-title"
          data-testid="page-title"
        >
          {textConstants.resetPasswordTitle}
        </p>
        <p
          className="font-normal text-sm text-slate-900 text-center"
          data-cy="page-description"
          data-testid="page-description"
        >
          {textConstants.resetPasswordDescriptionStartLine}
          <br />
          {textConstants.resetPasswordDescriptionEndLine}
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[82%] gap-5 mb-12 xl:mb-10"
          data-testid="event-form"
        >
          <div className="w-full items-center">
            <div className=" flex flex-row gap-x-6 items-center ">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="w-full flex flex-col">
                    <div className="flex justify-between w-full">
                      <Label className="flex justify-center items-start">
                        {textConstants.createPasswordLabel}
                      </Label>
                      <span
                        className="flex items-center justify-between gap-1 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <>
                            <ShowIcon />
                            {textConstants.hideText}
                          </>
                        ) : (
                          <>
                            <HideIcon />
                            {textConstants.showText}
                          </>
                        )}
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
                    {form.formState.errors.password && (
                      <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                        <ErrorIcon />
                        {form.formState.errors.password.message}
                      </span>
                    )}
                    {field.name === 'password' &&
                      form.getValues('password') && (
                        <div className="flex gap-2.5 justify-start mt-2 w-full">
                          <PasswordStrengthMeter
                            password={form.getValues('password')}
                          />
                        </div>
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
                name="confirmPassword"
                render={({ field }) => (
                  <div className="w-full flex flex-col">
                    <div className="flex w-full justify-between">
                      <Label className="flex justify-center items-start">
                        {textConstants.confirmPasswordLabel}
                      </Label>
                      <span
                        className="flex items-center justify-between gap-1 cursor-pointer"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <>
                            <ShowIcon />
                            {textConstants.hideText}
                          </>
                        ) : (
                          <>
                            <HideIcon />
                            {textConstants.showText}
                          </>
                        )}
                      </span>
                    </div>

                    <FormControl>
                      <IconInput
                        {...field}
                        rightIcon={ErrorIcon}
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirm-password"
                        aria-label="confirm-password"
                        placeholder=""
                        className="bg-outline"
                        error={!!form.formState.errors.confirmPassword}
                        data-cy="password"
                        data-testid="password"
                      />
                    </FormControl>
                    {form.formState.errors.confirmPassword && (
                      <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                        <ErrorIcon />
                        {form.formState.errors.confirmPassword.message}
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
                {isLoading ? <Spinner /> : textConstants.setPasswordButtonText}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ResetPassword;

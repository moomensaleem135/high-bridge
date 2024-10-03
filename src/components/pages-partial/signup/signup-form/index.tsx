'use client';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Link from 'next/link';

import { Form, FormControl, FormField } from '@/components/ui/form';
import PasswordStrengthMeter from '@/components/common/PasswordStrengthMeter';
import { IconInput } from '@/components/ui/icon-input';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ErrorIcon } from '@/assets/svgs';
import hide from '../../../../assets/pngs/hide.png';

import { useCreateEventMutation } from '@/store/features/events/eventsApi';
import CustomToast from '@/components/common/CustomToast';

import Spinner from '@/components/common/Spinner';
import { signinUrl } from '@/configs/constants';

interface SignUpProps {}

const SignUpSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  confirmPassword: z
    .string()
    .min(1, { message: 'Confrim Password is required' }),
});

type FormFields = z.infer<typeof SignUpSchema>;

const SignUp: React.FC<SignUpProps> = () => {
  const router = useRouter();
  const [signup, { isLoading }] = useCreateEventMutation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPaasword] =
    useState<boolean>(false);
  const [localChecked, setLocalChecked] = useState(false);
  const [serverChecked, setServerChecked] = useState(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleLocalCheck = (checked: boolean) => {
    console.log('in local check');
    setLocalChecked(checked);
  };

  const handleServerCheck = (checked: boolean) => {
    setServerChecked(checked);
  };
  const onSubmit = async (sinupData: FormFields) => {
    const formData = new FormData();

    Object.keys(sinupData).forEach((key) => {
      const value = sinupData[key as keyof FormFields];
      if (value !== undefined && value !== null) {
        formData.append(key, value as any); // Type assertion for `value` to `any`
      }
    });

    try {
      //const response = await signup(formData);
      toast.custom((t) => <CustomToast t={t} title={sinupData.email} />);
      router.push('/profilesetup');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to Create event');
    }
  };

  return (
    <>
      <div className="flex flex-col w-full justify-center items-center bg-formBg xl:w-5/5 rounded-3xl border-solid border-[1px] border-formBorder">
        <div className="flex flex-col w-full justify-center items-center">
          <p
            className="font-medium text-[32px] text-headingColor mt-10 max-lg:mt-6 text-center"
            data-cy="page-title"
            data-testid="page-title"
          >
            Create an account
          </p>
          <p
            className="font-medium text-sm text-slate-900 max-lg:mb-4"
            data-cy="page-description"
            data-testid="page-description"
          >
            Already have an account?{' '}
            <Link href={signinUrl}>
              <u>Log in</u>
            </Link>
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-[82%] gap-5 mb-8 py-4 max-lg:pb-0 justify-center"
            data-testid="event-form"
          >
            <div className="w-full items-center">
              <div className="flex flex-row gap-x-6 items-center">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <div className="w-full gap-y-2 flex flex-col">
                      <Label>Username:</Label>
                      <FormControl>
                        <IconInput
                          {...field}
                          type="text"
                          id="name"
                          aria-label="user-name"
                          placeholder=""
                          className="bg-outline"
                          error={!!form.formState.errors.name}
                          data-cy="user-name"
                          data-testid="user-name"
                        />
                      </FormControl>
                      {form.formState.errors.name && (
                        <span className="text-destructive text-sm flex items-center gap-1">
                          <ErrorIcon />
                          {form.formState.errors.name.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
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
                      {form.formState.errors.email && (
                        <span className="text-destructive text-sm flex items-center gap-1">
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
                        <span
                          className="flex items-center justify-between gap-1 cursor-pointer text-iconText"
                          onClick={(e) => {
                            setShowPassword(!showPassword);
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
                      {form.formState.errors.password && (
                        <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                          <ErrorIcon />
                          {form.formState.errors.password.message}
                        </span>
                      )}
                      {field.name === 'password' &&
                        form.getValues('password') && (
                          <div className="flex gap-2.5 justify-start mt-3 w-full">
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
                    <div className="w-full  flex flex-col">
                      <div className="flex justify-between">
                        <Label>Confirm Password:</Label>
                        <span
                          className="flex items-center justify-between gap-1 cursor-pointer text-iconText"
                          onClick={(e) => {
                            setShowConfirmPaasword(!showConfirmPassword);
                            console.log(showConfirmPassword);
                          }}
                        >
                          <img src={hide.src} />
                          {showConfirmPassword ? 'Hide' : 'Show'}
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
                          data-cy="confirm-password"
                          data-testid="confirm-password"
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
            <div className="flex flex-col justify-evenly items-start gap-2">
              <div className="flex justify-start items-center gap-2">
                <div className="flex justify-center items-center">
                  <Checkbox
                    checked={localChecked}
                    onCheckedChange={handleLocalCheck}
                    className="rounded-sm border-formBorder border-[2px] h-5 w-5 mt-0.5" // Optional custom class
                  />
                </div>

                <label htmlFor="my-checkbox" className="text-sm font-normal">
                  <span className="text-base font-medium">Local Storage</span>{' '}
                  (your data will be saved on your local drive, no one from
                  Zakat software can view or access the data).
                </label>
              </div>

              <div className="flex justify-start items-center gap-2">
                <div className="flex justify-center items-center">
                  <Checkbox
                    checked={serverChecked}
                    onCheckedChange={handleServerCheck}
                    className="rounded-sm border-formBorder border-[2px] h-5 w-5 mt-0.5 flex items-center justify-center" // Optional custom class
                  />
                </div>
                <label htmlFor="my-checkbox" className="text-sm font-normal">
                  <span className="text-base font-medium">Server Storage</span>{' '}
                  (your data will be encrypted and saved on the server side.
                  Only with your approval Zakat software admins can view or
                  access the data.)
                </label>
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
                  {isLoading ? <Spinner /> : 'Create an account'}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default SignUp;

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
  name: z.string().min(1, { message: 'name is required' }),
  email: z.string().min(1, { message: 'email is required' }),
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
      {Object.keys(form.formState.errors).length > 0 && (
        <div className=" mt-2 p-1 absolute right-10">
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
      <div className="flex flex-col w-full justify-center items-center bg-[#F8F8F8] rounded-3xl border-solid border-[1px] border-opacity-35 border-[#666666]">
        <div className="flex flex-col w-full justify-center items-center">
          <p
            className="font-medium text-3xl text-headingColor mt-10"
            data-cy="page-title"
            data-testid="page-title"
          >
            Create an account
          </p>
          <p
            className="font-medium text-sm text-slate-900"
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
            className="flex flex-col w-[82%] gap-12  py-4 justify-center"
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
                          className="flex items-center justify-between gap-1 cursor-pointer"
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
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col justify-evenly items-start gap-2">
              <div className="flex justify-start items-center gap-2">
                <Checkbox
                  checked={localChecked}
                  onCheckedChange={handleLocalCheck}
                  className="rounded-sm border-[#66666659] border-[2px] h-5 w-5 mt-0.5" // Optional custom class
                />
                <label htmlFor="my-checkbox">
                  Local (We will save your data locally on your system in a
                  file).
                </label>
              </div>

              <div className="flex justify-start items-center gap-2">
                <Checkbox
                  checked={serverChecked}
                  onCheckedChange={handleServerCheck}
                  className="rounded-sm border-[#66666659] border-[2px] h-5 w-5 mt-0.5" // Optional custom class
                />
                <label htmlFor="my-checkbox">
                  Server (We will encrypt and save your data on our servers).
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

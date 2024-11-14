'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Stepper, Step, StepLabel } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormField } from '@/components/ui/form';
import PasswordStrengthMeter from '@/components/common/PasswordStrengthMeter';
import { IconInput } from '@/components/ui/icon-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Spinner from '@/components/common/Spinner';

import { ErrorIcon } from '@/assets/svgs';
import { HideIcon, ShowIcon } from '@/assets/svgs';
import { useCreateEventMutation } from '@/store/features/events/eventsApi';
import { signinUrl } from '@/configs/constants';
import { textConstants } from '@/configs/textConstants';

interface SignUpProps {}

const SignUpSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  confirmPassword: z
    .string()
    .min(1, { message: 'Confirm Password is required' }),
});

type FormFields = z.infer<typeof SignUpSchema>;

const SignUp: React.FC<SignUpProps> = () => {
  const router = useRouter();
  const [signup, { isLoading }] = useCreateEventMutation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(1);
  const [showConfirmPassword, setShowConfirmPaasword] =
    useState<boolean>(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const StepIcon = (props: any) => {
    const { active, completed, icon } = props;

    return (
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          backgroundColor: completed ? 'black' : active ? 'black' : '#666666CC',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {completed ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 19L2 12L3.414 10.586L9 16.172L20.586 4.586L22 6L9 19Z"
              fill="white"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        ) : (
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{icon}</span>
        )}
      </div>
    );
  };

  const steps = ['Choose Your Storage', 'Your Details', 'Profile Set Up'];

  const onSubmit = async (signupData: FormFields) => {
    const formData = new FormData();

    Object.keys(signupData).forEach((key) => {
      const value = signupData[key as keyof FormFields];
      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    });

    try {
      //const response = await signup(formData);
      toast.success(textConstants.signupSuccessMessage);

      router.push('/profilesetup');
      setActiveStep((prev: any) => prev + 1);
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error(textConstants.signupErrorMessage);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full justify-center items-center bg-formBg xl:w-5/5 rounded-3xl border-solid border-[1px] border-formBorder">
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            display: 'flex',
            width: '90%',
            marginTop: '30px',
          }}
        >
          {steps.map((label, index) => {
            return (
              <Step
                key={label}
                sx={{
                  '& .MuiStepConnector-line': {
                    backgroundColor:
                      activeStep >= index ? 'black' : '#666666CC',
                    height: '2px',
                  },
                }}
              >
                <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <>
          <div className="flex flex-col w-full justify-center items-center mt-5">
            <p
              className={`font-medium text-[32px] text-headingColor max-lg:mt-6 text-center`}
              data-cy="page-title"
              data-testid="page-title"
            >
              {textConstants.createAccountTitle}
            </p>
            <p
              className="font-normal text-sm text-slate-900 max-lg:mb-4 text-center"
              data-cy="page-description"
              data-testid="page-description"
            >
              {textConstants.alreadyHaveAccountText}{' '}
              <Link href={signinUrl}>
                <u className="font-medium">{textConstants.logInText}</u>
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
                        <Label>{textConstants.usernameLabel}</Label>
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
                        <Label>{textConstants.emailLabel}:</Label>
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
                          <Label>{textConstants.passwordLabel}:</Label>
                          <span
                            className="flex items-center justify-between gap-1 cursor-pointer text-iconText"
                            onClick={(e) => {
                              setShowPassword(!showPassword);
                            }}
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
                      <div className="w-full  flex flex-col">
                        <div className="flex justify-between">
                          <Label>{textConstants.confirmPasswordLabel}</Label>
                          <span
                            className="flex items-center justify-between gap-1 cursor-pointer text-iconText"
                            onClick={(e) => {
                              setShowConfirmPaasword(!showConfirmPassword);
                            }}
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

              <div className="w-full flex">
                <div className="w-full bg-black h-[6vh] rounded-md ">
                  <Button
                    className="text-white text-center w-full h-full font-[400]"
                    type="submit"
                    data-cy="event-submit"
                    data-testid="event-submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      textConstants.createAccountButtonText
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </>
      </div>
    </>
  );
};

export default SignUp;

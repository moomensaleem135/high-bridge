'use client';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import toast from 'react-hot-toast';

import { Form, FormControl, FormField } from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import DatePicker from '@/components/ui/datepicker';
import { Label } from '@/components/ui/label';
import CalendarDropdown from './calendarDropdown';
import { ErrorIcon } from '@/assets/svgs';

import { useCreateEventMutation } from '@/store/features/events/eventsApi';
import CustomToast from '@/components/common/CustomToast';

import Spinner from '@/components/common/Spinner';
import { profileData } from '@/store/features/setup/setupSlice';
import IslamicCalendar from '@/components/ui/islamic-calendar';
import ReligionDropdown from './religionDropdown';
import Calendar from '@/components/common/calendar';
import { handleDateChange } from '@/lib/helpers';
import { Stepper, Step, StepLabel } from '@mui/material';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

import moment from 'moment';

interface ProfileSetupProps {}

const ProfileSetupSchema = z.object({
  year: z.string().min(0, { message: 'Year is required' }),
  startDate: z.string().min(0, { message: 'Start date is required' }),
  religion: z.string().min(0, { message: 'Religion is required' }),
});

type FormFields = z.infer<typeof ProfileSetupSchema>;

const ProfileSetup: React.FC<ProfileSetupProps> = () => {
  const router = useRouter();
  const [login, { isLoading }] = useCreateEventMutation();
  const [year, setYear] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [genericDate, setGenericDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [show, setShow] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const selection = useSelector((state: any) => state.selection.selection);
  const [activeStep, setActiveStep] = useState(2);
  const dispatch = useDispatch();

  const form = useForm<FormFields>({
    resolver: zodResolver(ProfileSetupSchema),
    defaultValues: {
      year: '',
      startDate: '',
      religion: '',
    },
  });

  const StepIcon = (props: any) => {
    const { active, completed, icon, alternativeLabel, index } = props;

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

  const onYearChange = (yearVal: string) => {
    form.setValue('year', yearVal);
    setYear(yearVal);
    form.trigger('year');
  };

  const onReligionChange = (religionVal: string) => {
    form.setValue('religion', religionVal);
    form.trigger('religion');
  };

  const DateChange = (dateVal: string) => {
    form.setValue('startDate', dateVal);
    form.trigger('startDate');
  };

  const onSubmit = async (setupData: FormFields) => {
    const finalStartDate = setupData.startDate || selectedDate;

    const formData = new FormData();

    const submissionData = {
      ...setupData,
      startDate: finalStartDate,
    };

    Object.keys(submissionData).forEach((key) => {
      const value = submissionData[key as keyof FormFields];

      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    });

    try {
      dispatch(profileData({ setupData: submissionData }));
      form.reset();
      setYear('');
      setStartDate('');

      if (
        setupData.religion !== '' &&
        setupData.year !== '' &&
        setupData.startDate !== ''
      ) {
        toast.success(`Profile setup successful.`, {
          position: 'top-right',
        });
      }

      router.push('/signin');
      setActiveStep((prev) => prev + 1);
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to Create event', {
        position: 'top-right',
      });
    }
  };

  return (
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
        {steps.map((label, index) => (
          <Step
            key={label}
            sx={{
              '& .MuiStepConnector-line': {
                backgroundColor: activeStep >= index ? 'black' : '#666666CC',
                height: '2px',
              },
            }}
          >
            <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <>
        <div className="flex flex-col w-full justify-center items-center mt-5 mb-2.5">
          <p
            className="font-medium text-[32px] text-headingColor max-lg:mt-6 text-center"
            data-cy="page-title"
            data-testid="page-title"
          >
            Profile Setup
          </p>
          <p
            className="font-normal text-sm text-slate-900 max-lg:mb-4 text-center"
            data-cy="page-description"
            data-testid="page-description"
          >
            You can update this information from the Setup <br />
            screen anytime if needed.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-[82%] gap-5 py-4 xl:gap-6 xl:mb-2"
            data-testid="event-form"
          >
            <div className="w-full items-center">
              <div className="flex flex-col justify-start gap-x-6 gap-y-2 items-start">
                <Label>Which madhab do you follow by default?</Label>
                <FormField
                  control={form.control}
                  name="religion"
                  render={({ field }) => (
                    <ReligionDropdown
                      initialValue={field.value}
                      onReligionChange={onReligionChange}
                    />
                  )}
                />
                {form.formState.errors.religion && (
                  <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                    <ErrorIcon />
                    {form.formState.errors.religion.message}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full items-center">
              <div className="flex flex-col justify-start gap-x-6 gap-y-2 items-start">
                <Label>According to which calendar do you pay zakat?</Label>
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <CalendarDropdown
                      initialValue={field.value}
                      onYearChange={onYearChange}
                      setYear={setYear}
                    />
                  )}
                />
                {form.formState.errors.year && (
                  <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                    <ErrorIcon />
                    {form.formState.errors.year.message}
                  </span>
                )}
              </div>
            </div>

            <div className="w-full flex justify-evenly items-center gap-4">
              <div className="flex flex-col gap-y-2  items-center w-full">
                <div className="col-span-12 w-full">
                  <Label>Which date to pay Zakat?</Label>
                </div>
                <div
                  className="col-span-6 w-full"
                  onFocus={() => setShow(true)}
                >
                  <Controller
                    name="startDate"
                    control={form.control}
                    render={({ field }) => (
                      <Calendar
                        year={year}
                        onDateChange={(date) => {
                          handleDateChange(
                            date,
                            year,
                            setSelectedDate,
                            setStartDate,
                            DateChange
                          );
                        }}
                      />
                    )}
                  />
                  {form.formState.errors.startDate && (
                    <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                      <ErrorIcon />
                      {form.formState.errors.startDate.message}
                    </span>
                  )}
                </div>
                <div className="font-light text-xs">
                  {selectedDate && startDate && (
                    <>
                      The Zakat period starts on{' '}
                      <span className="font-semibold">{selectedDate}</span> and
                      ends on <span className="font-semibold">{startDate}</span>{' '}
                      of the following year.
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-4">
              <div className="w-full bg-black h-[6vh] rounded-md">
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
              <p
                className="text-center font-medium text-base cursor-pointer "
                onClick={() => {
                  router.push('signin');
                }}
              >
                Skip for Now
              </p>
            </div>
          </form>
        </Form>
      </>
    </div>
  );
};

export default ProfileSetup;

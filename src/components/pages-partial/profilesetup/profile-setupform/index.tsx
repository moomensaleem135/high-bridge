'use client';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Link from 'next/link';

import { Form, FormControl, FormField } from '@/components/ui/form';
import { IconInput } from '@/components/ui/icon-input';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import DatePicker from '@/components/ui/datepicker';
import { Label } from '@/components/ui/label';
import CalendarDropdown from './calendarDropdown';
import MonthDropdown from './month-dropdown';
import { ErrorIcon } from '@/assets/svgs';

import { useCreateEventMutation } from '@/store/features/events/eventsApi';
import CustomToast from '@/components/common/CustomToast';

import Spinner from '@/components/common/Spinner';
import { forgetUrl, signupUrl } from '@/configs/constants';

interface ProfileSetupProps {}

const ProfileSetupSchema = z.object({
  year: z.string().min(1, { message: 'Year is required' }),
  month: z.string().min(1, { message: 'Month is required' }),
  startDate: z.string().min(1, { message: 'Start date is required' }),
  endDate: z.string().min(1, { message: 'End date is required' }),
});

type FormFields = z.infer<typeof ProfileSetupSchema>;

const ProfileSetup: React.FC<ProfileSetupProps> = () => {
  const router = useRouter();
  const [login, { isLoading }] = useCreateEventMutation();
  const [year, setYear] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [show, setShow] = React.useState<boolean>(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(ProfileSetupSchema),
    defaultValues: {
      year: '',
      month: '',
      startDate: '',
      endDate: '',
    },
  });

  const onSubmit = async (setupData: FormFields) => {
    const formData = new FormData();

    Object.keys(setupData).forEach((key) => {
      const value = setupData[key as keyof FormFields];
      console.log(value);
      if (value !== undefined && value !== null) {
        formData.append(key, value as any); // Type assertion for `value` to `any`
      }
    });

    try {
      const response = await login(formData);
      form.reset();
      setYear('');
      setStartDate('');
      setEndDate('');
      toast.custom((t) => (
        <CustomToast
          t={t}
          title={`${setupData.year} ${setupData.month} ${setupData.startDate} ${setupData.endDate}`}
        />
      ));
      router.push('/signin');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to Create event');
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center bg-[#F8F8F8] gap-12 xl:gap-5 xl:w-5/5 rounded-3xl border-solid border-[1px] border-opacity-35 border-[#666666]">
      <div className="flex flex-col w-full justify-center items-center py-7">
        <p
          className="font-medium text-3xl text-headingColor"
          data-cy="page-title"
          data-testid="page-title"
        >
          Profile Setup
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[82%] gap-12 xl:gap-6 mb-12 xl:mb-10"
          data-testid="event-form"
        >
          <div className="w-full items-center">
            <div className="flex flex-col justify-start gap-x-6 gap-y-2 items-start">
              <Label>According to which calendar do you pay zakat?</Label>
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <CalendarDropdown
                    initialValue={field.value}
                    onYearChange={(yearVal) => field.onChange(yearVal)}
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

          <div className="w-full items-center">
            <div className="flex flex-col justify-start gap-x-6 gap-y-2 items-start">
              <Label>Which month do you pay zakat?</Label>
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <MonthDropdown
                    onMonthChange={(month) => field.onChange(month)}
                    year={year}
                    initialValue={field.value}
                    disabled={year === '' ? true : false}
                  />
                )}
              />
              {form.formState.errors.month && (
                <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                  <ErrorIcon />
                  {form.formState.errors.month.message}
                </span>
              )}
            </div>
          </div>

          <div className="w-full flex justify-evenly items-center gap-4">
            <div className="flex flex-col gap-y-2  items-center w-full">
              <div className="col-span-12 w-full">
                <Label>Date to Pay Zakat:</Label>
              </div>
              <div className="col-span-6" onFocus={() => setShow(true)}>
                <Controller
                  name="startDate"
                  control={form.control}
                  render={({ field }) => (
                    <DatePicker
                      initialValue={field.value}
                      setStartDate={setStartDate}
                      onDateChange={(date) => {
                        field.onChange(date);
                      }}
                      show={show}
                      setShow={setShow}
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
            </div>
            <div className="flex flex-col gap-y-2 items-center w-full">
              <div className="col-span-12 w-full">
                <Label>End Date for Zakat:</Label>
              </div>
              <div className="col-span-6">
                <Controller
                  name="endDate"
                  control={form.control}
                  render={({ field }) => (
                    <DatePicker
                      initialValue={field.value}
                      onDateChange={(date) => {
                        field.onChange(date);
                      }}
                      endDate={startDate}
                      show={false}
                      setShow={() => {}}
                    />
                  )}
                />
                {form.formState.errors.endDate && (
                  <span className="text-destructive text-sm flex items-center gap-1 mt-2">
                    <ErrorIcon />
                    {form.formState.errors.endDate.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3">
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
        </form>
      </Form>
    </div>
  );
};

export default ProfileSetup;

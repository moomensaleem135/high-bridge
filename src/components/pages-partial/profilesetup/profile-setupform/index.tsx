'use client';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
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
import moment from 'moment';

interface ProfileSetupProps {}

const ProfileSetupSchema = z.object({
  year: z.string().min(1, { message: 'Year is required' }),
  startDate: z.string().min(0, { message: 'Start date is required' }),
  religion: z.string().min(1, { message: 'Religion is required' }),
});

type FormFields = z.infer<typeof ProfileSetupSchema>;

const ProfileSetup: React.FC<ProfileSetupProps> = () => {
  const router = useRouter();
  const [login, { isLoading }] = useCreateEventMutation();
  const [year, setYear] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [show, setShow] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const dispatch = useDispatch();

  const form = useForm<FormFields>({
    resolver: zodResolver(ProfileSetupSchema),
    defaultValues: {
      year: '',
      startDate: '',
      religion: '',
    },
  });

  const onYearChange = (yearVal: string) => {
    form.setValue('year', yearVal);
    setYear(yearVal);
    form.trigger('year');
  };

  const onReligionChange = (religionVal: string) => {
    form.setValue('religion', religionVal);
    form.trigger('religion');
  };

  const onSubmit = async (setupData: FormFields) => {
    const finalStartDate = setupData.startDate || startDate;

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
      setEndDate('');

      toast.custom((t) => (
        <CustomToast
          t={t}
          title={`${submissionData.year} ${submissionData.religion} ${submissionData.startDate} `}
        />
      ));

      router.push('/signin');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to Create event');
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center bg-formBg gap-12 xl:gap-5 xl:w-5/5 rounded-3xl border-solid border-[1px] border-formBorder">
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

          {/* <div className="w-full items-center">
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
          </div> */}

          <div className="w-full flex justify-evenly items-center gap-4">
            <div className="flex flex-col gap-y-2  items-center w-full">
              <div className="col-span-12 w-full">
                <Label>Which date to pay Zakat?</Label>
              </div>
              <div className="col-span-6 w-full" onFocus={() => setShow(true)}>
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
                          setStartDate
                        );
                      }}
                    />
                  )}
                />
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

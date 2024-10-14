'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { Form, FormControl, FormField } from '@/components/ui/form';
import { ArrowLeftIcon } from '@/assets/svgs';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconInput } from '@/components/ui/icon-input';

import { Button } from '@/components/ui/button';
import DatePicker from '@/components/ui/datepicker';
import { Label } from '@/components/ui/label';
import CalendarSelect from './calendarSelect';
import MonthSelect from './monthSelect';
import moment from 'moment-hijri';
import { DateObject } from 'react-multi-date-picker';
import hijri from 'react-date-object/calendars/arabic';
import gregorian from 'react-date-object/calendars/gregorian';
import { useCreateEventMutation } from '@/store/features/events/eventsApi';

import { ErrorIcon } from '@/assets/svgs';

import { useCreateItemMutation } from '@/store/features/items/itemsApi';
import CustomToast from '@/components/common/CustomToast';
import { addItemssUrl } from '@/configs/constants';
import { addItems } from '@/store/features/items/golditemsSlice';
import { profileData } from '@/store/features/setup/setupSlice';
import Spinner from '@/components/common/Spinner';

import Calendar from '../../../common/calendar';
import ReligionDropdown from '../../profilesetup/profile-setupform/religionDropdown';
import { handleDateChange } from '@/lib/helpers';

interface ProfileDetailsProps {}

const ProfileDetailsSchema = z.object({
  year: z.string().min(0, { message: 'Year is required' }),
  religion: z.string().min(0, { message: 'Religion is required' }),
  startDate: z.string().min(0, { message: 'Start date is required' }),
});

type FormFields = z.infer<typeof ProfileDetailsSchema>;

const ProfileDetailsForm: React.FC<ProfileDetailsProps> = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.setup.setup);
  const date = selector.startDate;
  let hijriDate;
  let value;
  console.log('date', date);
  console.log(typeof date);

  if (selector.year === 'lunar') {
    hijriDate = moment(date).format('iYYYY iM iD');
    const [years, month, day] = hijriDate.split(' ').map(Number);
    value = new DateObject({
      date: new Date(years, month - 1, day),
      calendar: hijri,
    });
  }

  console.log('islamic date', hijriDate);
  console.log('converted value', value);
  console.log(selector);

  const router = useRouter();
  const [login, { isLoading }] = useCreateEventMutation();
  const [year, setYear] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showStart, setShowStart] = React.useState<boolean>(false);
  const [showEnd, setShowEnd] = React.useState<boolean>(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(ProfileDetailsSchema),
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
    const finalStartDate = setupData.startDate || selectedDate;
    console.log(selector);
    console.log(setupData.religion);
    console.log(setupData.year);
    console.log(startDate);

    const formData = new FormData();

    const submissionData = {
      ...setupData,
      startDate: finalStartDate,
    };

    if (
      selector.religion === submissionData.religion &&
      selector.year === submissionData.year &&
      selector.startDate === submissionData.startDate
    ) {
      console.log('in same values');
    }

    console.log('submit data', submissionData);

    Object.keys(submissionData).forEach((key) => {
      const value = submissionData[key as keyof FormFields];
      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    });

    try {
      dispatch(profileData({ setupData: submissionData }));
      toast.success(
        `${submissionData.year} ${submissionData.religion} ${submissionData.startDate}  `
      );
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to Create event');
    }
  };

  // const handleDateChange = (date: Date) => {
  //   console.log(date);

  //   const selectedDateFormatted = date.toDateString();
  //   const startDateFormatted = new Date(
  //     date.setFullYear(date.getFullYear() - 1)
  //   ).toDateString();
  //   setSelectedDate(selectedDateFormatted);
  //   setStartDate(startDateFormatted);
  // };

  return (
    <div className="flex flex-col w-full max-w-[950px] justify-center items-center gap-12 rounded-3xl mt-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[82%] gap-5 mb-10"
          data-testid="event-form"
        >
          <div className="w-full items-center">
            <div className="flex flex-col justify-start gap-y-2 items-start">
              <Label>Which madhab do you follow by default?</Label>
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <ReligionDropdown
                    initialValue={selector.religion}
                    className="rounded-lg bg-inputBg border-inputBorder"
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
            <div className="flex flex-col justify-start gap-y-2 items-start">
              <Label>According to which calendar do you pay zakat?</Label>
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <CalendarSelect
                    initialValue={selector.year}
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
                  <MonthSelect
                    onMonthChange={(month) => field.onChange(month)}
                    year={year}
                    initialValue={selector.month}
                  />
                )}
              />
            </div>
          </div> */}

          <div className="w-full items-center">
            <div className="flex flex-col justify-start gap-x-6 items-start">
              <div className="w-full flex justify-evenly items-center">
                <div className="flex flex-col gap-y-2 items-center w-full h-[88px]">
                  <div className="col-span-12 w-full">
                    <Label>Which date to pay Zakat?</Label>
                  </div>
                  <div
                    className="col-span-6 w-full rounded-lg"
                    onFocus={() => setShowStart(true)}
                  >
                    <Controller
                      name="startDate"
                      control={form.control}
                      render={({ field }) => (
                        <Calendar
                          year={year}
                          dateVal={date}
                          onDateChange={(date) =>
                            handleDateChange(
                              date,
                              year,
                              setSelectedDate,
                              setStartDate
                            )
                          }
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div>
                {startDate && selectedDate && (
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

          <div className="flex flex-col justify-evenly items-center w-full gap-5 mt-1">
            <hr className="w-full border-[1px] border-solid border-underline" />
            <div className="flex w-full justify-end items-center">
              <Button
                className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover"
                type="submit"
                data-cy="event-submit"
                data-testid="event-submit"
              >
                {isLoading ? <Spinner /> : 'Update'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileDetailsForm;

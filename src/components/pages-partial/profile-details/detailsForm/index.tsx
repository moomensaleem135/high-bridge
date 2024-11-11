'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';

import { Form, FormField } from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';

import { Label } from '@/components/ui/label';
import CalendarSelect from './calendarSelect';

import moment from 'moment-hijri';
import { DateObject } from 'react-multi-date-picker';
import hijri from 'react-date-object/calendars/arabic';

import { useCreateEventMutation } from '@/store/features/events/eventsApi';

import { ErrorIcon } from '@/assets/svgs';

import { useCreateItemMutation } from '@/store/features/items/itemsApi';
import { profileData } from '@/store/features/setup/setupSlice';
import Spinner from '@/components/common/Spinner';

import Calendar from '../../../common/calendar';
import ReligionDropdown from '../../profilesetup/profile-setupform/religionDropdown';
import { handleDateChange } from '@/lib/helpers';
import { textConstants } from '@/configs/textConstants';

interface ProfileDetailsProps {}

const ProfileDetailsSchema = z.object({
  year: z.string().min(1, { message: 'Year is required' }),
  religion: z.string().min(0, { message: 'Religion is required' }),
  startDate: z.string().min(1, { message: 'Start date is required' }),
});

type FormFields = z.infer<typeof ProfileDetailsSchema>;

const ProfileDetailsForm: React.FC<ProfileDetailsProps> = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.setup.setup);
  const date = selector.startDate;
  let hijriDate;
  let value;

  if (selector.year === 'lunar') {
    hijriDate = moment(date).format('iYYYY iM iD');
    const [years, month, day] = hijriDate.split(' ').map(Number);
    value = new DateObject({
      date: new Date(years, month - 1, day),
      calendar: hijri,
    });
  }

  const router = useRouter();
  const [login, { isLoading }] = useCreateEventMutation();
  const [year, setYear] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showStart, setShowStart] = React.useState<boolean>(false);

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

      toast.success(textConstants.profileSetupSuccessMessage, {
        position: 'top-right',
      });
    } catch (error) {
      console.error(textConstants.profileSetupErrorMessage, error);
      toast.error(textConstants.profileSetupErrorMessage, {
        position: 'top-right',
      });
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[950px] justify-center items-center gap-12 rounded-3xl mt-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[82%] gap-5 xs:mb-10 md:mb-40"
          data-testid="event-form"
        >
          {/* <div className="w-full items-center">
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
                <span className="text-destructive text-sm flex items-center gap-1">
                  <ErrorIcon />
                  {form.formState.errors.religion.message}
                </span>
              )}
            </div>
          </div> */}
          <div className="w-full items-center">
            <div className="flex flex-col justify-start gap-y-2 items-start">
              <Label>{textConstants.calendarLabel}</Label>
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
                <span className="text-destructive text-sm flex items-center gap-1">
                  <ErrorIcon />
                  {form.formState.errors.year.message}
                </span>
              )}
            </div>
          </div>

          <div className="w-full items-center">
            <div className="flex flex-col justify-start gap-x-6 items-start">
              <div className="w-full flex justify-evenly items-center">
                <div className="flex flex-col gap-y-2 items-center w-full h-[88px]">
                  <div className="col-span-12 w-full">
                    <Label>{textConstants.zakatDateLabel}</Label>
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
                              setStartDate,
                              DateChange
                            )
                          }
                        />
                      )}
                    />
                  </div>
                  <div className="flex justify-start items-start w-full">
                    {form.formState.errors.startDate && (
                      <span className="text-destructive text-sm flex items-center gap-1">
                        <ErrorIcon />
                        {form.formState.errors.startDate.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div>
                {startDate && selectedDate && (
                  <>
                    {textConstants.zakatPeriodTextStart}{' '}
                    <span className="font-semibold">{selectedDate}</span> and
                    ends on <span className="font-semibold">{startDate}</span>{' '}
                    {textConstants.zakatPeriodTextEnd}
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
                {isLoading ? (
                  <Spinner />
                ) : (
                  textConstants.profileUpdateButtonText
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileDetailsForm;

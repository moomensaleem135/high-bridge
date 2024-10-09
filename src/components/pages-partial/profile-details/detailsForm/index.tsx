'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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

import { ErrorIcon } from '@/assets/svgs';

import { useCreateItemMutation } from '@/store/features/items/itemsApi';
import CustomToast from '@/components/common/CustomToast';
import { addItemssUrl } from '@/configs/constants';
import { addItems } from '@/store/features/items/golditemsSlice';

import Calendar from './calendar';
import ReligionDropdown from '../../profilesetup/profile-setupform/religionDropdown';

interface ProfileDetailsProps {}

const ProfileDetailsSchema = z.object({
  year: z.string().min(1, { message: 'Year is required' }),
  religion: z.string().min(1, { message: 'Religion is required' }),
  startDate: z.string().min(1, { message: 'Start date is required' }),
});

const formatHijriDate = (date: moment.Moment): string => {
  const day = date.iDate().toString().padStart(2, '0');
  const month = date.iMonth() + 1;
  const year = date.iYear();
  const hijriMonths: string[] = [
    'Muharram',
    'Safar',
    "Rabi' al-Awwal",
    "Rabi' al-Thani",
    'Jumada al-Awwal',
    'Jumada al-Thani',
    'Rajab',
    "Sha'ban",
    'Ramadan',
    'Shawwal',
    "Dhul-Qi'dah",
    'Dhul-Hijjah',
  ];
  const monthName = hijriMonths[month - 1];
  return `${day} ${monthName} ${year}`;
};

type FormFields = z.infer<typeof ProfileDetailsSchema>;

const ProfileDetailsForm: React.FC<ProfileDetailsProps> = () => {
  const selector = useSelector((state: any) => state.setup.setup);
  const date = selector.startDate;

  const hijriDate = moment(date).format('iYYYY iM iD');
  const [years, month, day] = hijriDate.split(' ').map(Number);
  const value = new DateObject({
    date: new Date(years, month - 1, day),
    calendar: hijri,
  });

  console.log('islamic date', hijriDate);
  console.log('converted value', value);
  console.log(selector);

  const router = useRouter();
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

  React.useEffect(() => {
    setYear(selector.year);
  }, []);

  const onSubmit = async (profileData: FormFields) => {
    console.log('in submit');

    const formData = new FormData();

    Object.keys(profileData).forEach((key) => {
      const value = profileData[key as keyof FormFields];
      console.log(value);
      if (value !== undefined && value !== null) {
        formData.append(key, value as any); // Type assertion for `value` to `any`
      }
    });

    try {
      // const response = await createItem(formData)
      form.reset();

      toast.custom((t) => (
        <CustomToast
          t={t}
          title={`${profileData.year} ${profileData.religion} ${profileData.startDate} `}
        />
      ));
      router.push('/income');
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

  const handleDateChange = (date: Date, calendarType: string) => {
    const momentDate = moment(date); // Convert to moment date for handling

    // Format dates based on the selected calendar type
    const selectedDateFormatted =
      calendarType === 'solar'
        ? momentDate.format('DD MMMM YYYY') // Format Gregorian date
        : formatHijriDate(momentDate); // Format Hijri date

    // Calculate start date (1 year before)
    const startDateMoment =
      calendarType === 'solar'
        ? momentDate.subtract(1, 'years') // Subtract 1 Gregorian year
        : momentDate.subtract(1, 'iYear'); // Subtract 1 Hijri year

    const startDateFormatted =
      calendarType === 'solar'
        ? startDateMoment.format('DD MMMM YYYY') // Format Gregorian date
        : formatHijriDate(startDateMoment); // Format Hijri date
    console.log(startDateFormatted);
    console.log(selectedDateFormatted);

    setSelectedDate(selectedDateFormatted);
    setStartDate(startDateFormatted);
  };

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
                    onReligionChange={(religionVal) =>
                      field.onChange(religionVal)
                    }
                  />
                )}
              />
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
                    onYearChange={(yearVal) => field.onChange(yearVal)}
                    setYear={setYear}
                  />
                )}
              />
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
                          onDateChange={(date) => handleDateChange(date, year)}
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
                    <span className="font-semibold">{startDate}</span> and ends
                    on <span className="font-semibold">{selectedDate}</span> of
                    the following year.
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-evenly items-center w-full gap-5 mt-1">
            <hr className="w-full border-[1px] border-solid border-underline" />
            <div className="flex w-full justify-end items-center">
              <Button className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover">
                Update
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileDetailsForm;

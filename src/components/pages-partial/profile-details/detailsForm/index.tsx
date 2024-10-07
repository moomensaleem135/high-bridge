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

import { ErrorIcon } from '@/assets/svgs';

import { useCreateItemMutation } from '@/store/features/items/itemsApi';
import CustomToast from '@/components/common/CustomToast';
import { addItemssUrl } from '@/configs/constants';
import { addItems } from '@/store/features/items/itemsSlice';
import ReligionDropdown from '../../profilesetup/profile-setupform/religionDropdown';

interface ProfileDetailsProps {}

const ProfileDetailsSchema = z.object({
  year: z.string().min(1, { message: 'Year is required' }),
  religion: z.string().min(1, { message: 'Religion is required' }),
  startDate: z.string().min(1, { message: 'Start date is required' }),
});

type FormFields = z.infer<typeof ProfileDetailsSchema>;

const ProfileDetailsForm: React.FC<ProfileDetailsProps> = () => {
  const selector = useSelector((state: any) => state.setup.setup);

  const router = useRouter();
  const [year, setYear] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');

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
                        <DatePicker
                          initialValue={selector.startDate}
                          setStartDate={setStartDate}
                          onDateChange={(date) => {
                            field.onChange(date);
                          }}
                          show={showStart}
                          year={year}
                          isEndDate={false}
                          setShow={setShowStart}
                          className="bg-inputBg border-inputBorder"
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
              </div>
              <span>
                The Zakat period starts on{' '}
                <span className="font-semibold">15th Ramadan </span>and ends on
                <span className="font-semibold">14th Ramadan</span> of the
                following year.
              </span>
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

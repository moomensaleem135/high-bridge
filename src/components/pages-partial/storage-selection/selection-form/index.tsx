import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Form, FormField } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ErrorIcon } from '@/assets/svgs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio';
import Spinner from '@/components/common/Spinner';
import { Stepper, Step, StepLabel } from '@mui/material'; // Import MUI Stepper components
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateEventMutation } from '@/store/features/events/eventsApi';
import { userSelection } from '@/store/features/selection/selectionSlice';
import { useDispatch, UseDispatch } from 'react-redux';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const SelectionSchema = z.object({
  storage: z.string().min(1, { message: 'Storage choice is required' }),
});

type FormFields = z.infer<typeof SelectionSchema>;

const StorageSelection: React.FC = () => {
  const router = useRouter();
  const [login, { isLoading }] = useCreateEventMutation();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const form = useForm<FormFields>({
    resolver: zodResolver(SelectionSchema),
    defaultValues: {
      storage: '',
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

  const onSubmit = async (data: FormFields) => {
    console.log(data.storage);
    router.push('signup');
    dispatch(userSelection(data.storage));
    toast.success(`${data.storage}`);
    setActiveStep((prev) => prev + 1);
  };

  const steps = ['Choose Your Storage', 'Your Details', 'Profile Set Up'];

  return (
    <div className="flex flex-col w-full justify-center items-center pt-10 pb-4 bg-formBg gap-12 xl:gap-5 xl:w-5/5 rounded-3xl border-solid border-[1px] border-formBorder">
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          display: 'flex',
          width: '95%',
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
            <StepLabel
              StepIconComponent={StepIcon}
              sx={{
                '& .MuiStepLabel-label': {
                  fontWeight: 700,
                  fontSize: '14px',
                  color: 'black',
                  marginTop: '1px',
                  fontFamily: inter.style.fontFamily,
                },
                '& .Mui-active .MuiStepLabel-label': {
                  fontWeight: 700,
                  fontSize: '14px',
                  color: 'black',
                  marginTop: '1px',
                  fontFamily: inter.style.fontFamily,
                },
                '& .css-12eb3rq-MuiStepLabel-label.Mui-active': {
                  fontWeight: 700,
                  fontSize: '14px',
                  color: 'black',
                  marginTop: '1px',
                  fontFamily: inter.style.fontFamily,
                },
                '& .css-12eb3rq-MuiStepLabel-label.MuiStepLabel-alternativeLabel':
                  {
                    fontWeight: 700,
                    fontSize: '14px',
                    color: 'black',
                    marginTop: '1px',
                    fontFamily: inter.style.fontFamily,
                  },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <>
        <div className="flex flex-col w-full justify-center items-center">
          <p
            className="font-medium text-[32px] text-headingColor max-lg:mt-6 text-center"
            data-cy="page-title"
            data-testid="page-title"
          >
            Choose Your Storage
          </p>
          <p
            className="font-normal text-sm text-slate-900 max-lg:mb-4"
            data-cy="page-description"
            data-testid="page-description"
          >
            Select your preferred storage option for your data.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-[82%] gap-6 mb-12 xl:mb-10"
            data-testid="event-form"
          >
            <FormField
              control={form.control}
              name="storage"
              render={({ field }) => (
                <RadioGroup value={field.value} onValueChange={field.onChange}>
                  <div className="flex flex-col gap-y-3">
                    <div className="flex items-start flex-col justify-start">
                      <div className="flex justify-start items-center gap-x-2">
                        <RadioGroupItem
                          value="local-storage"
                          id="local-storage"
                        />
                        <Label
                          htmlFor="local-storage"
                          className="font-medium text-lg"
                        >
                          Local Storage:
                        </Label>
                      </div>
                      <p className="font-normal text-sm">
                        Your data will be saved on your local drive, no one from
                        Zakat software can view or access the data.
                      </p>
                    </div>
                    <div className="flex items-start flex-col justify-start">
                      <div className="flex justify-start items-center gap-x-2">
                        <RadioGroupItem
                          value="server-storage"
                          id="server-storage"
                        />
                        <Label
                          htmlFor="server-storage"
                          className="font-medium text-lg"
                        >
                          Server Storage:
                        </Label>
                      </div>
                      <p className="font-normal text-sm">
                        Your data will be encrypted and saved on the server
                        side. Only with your approval Zakat software admins can
                        view or access the data.
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              )}
            />
            {form.formState.errors.storage && (
              <span className="text-destructive text-sm flex items-center gap-1">
                <ErrorIcon />
                {form.formState.errors.storage.message}
              </span>
            )}
            <div className="w-full flex flex-col gap-3">
              {/* <div className="flex items-center gap-x-2 "> */}
              <div className="w-full bg-black h-full p-[6px] rounded-md ">
                <Button
                  className="text-white text-center w-full h-full font-[400]"
                  type="submit"
                  data-cy="event-submit"
                  data-testid="event-submit"
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner /> : 'Next'}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </>
    </div>
  );
};

export default StorageSelection;

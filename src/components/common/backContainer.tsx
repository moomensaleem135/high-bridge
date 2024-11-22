import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@/assets/svgs';
import { Button } from '../ui/button';
import { textConstants } from '@/configs/textConstants';

interface Props<T> {
  nextButtonText: string;
  incomeArray?: T[];
  routeOne?: string;
  routeTwo?: string;
  value?: number;
  subtractValue?: number;
  purpose?: string;
  useHandleBack?: boolean;
  setValue?: (value: number) => void;
  handleBack?: () => void;
  onSubmit?: () => void;
  setShow?: (value: boolean) => void;
}

const BackContainer = <T extends {}>({
  nextButtonText,
  incomeArray,
  routeOne,
  routeTwo,
  value,
  subtractValue,
  purpose,
  setValue,
  handleBack,
  onSubmit,
  setShow,
  useHandleBack,
}: Props<T>) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (handleBack) {
      handleBack();
    } else if (incomeArray) {
      if (incomeArray.length === 0) {
        router.push(routeOne || '/');
      } else {
        router.push(routeTwo || '/');
      }
    } else {
      if (setValue && value !== undefined && subtractValue !== undefined) {
        const updatedValue =
          purpose === 'Saving'
            ? value - (subtractValue + 1)
            : value - subtractValue;
        setValue(updatedValue);
        if (setShow) {
          setShow(true);
        }
      } else if (setValue && value === 0) {
        setValue(value);
      }
    }
  };

  const handleNextClick = async (e: React.FormEvent) => {
    if (onSubmit) {
      e.preventDefault();
      await onSubmit();
    } else if (nextButtonText.includes('Add Another') && setValue) {
      setValue(0);
    } else if (
      nextButtonText.includes('Add Another') &&
      useHandleBack === true &&
      handleBack
    ) {
      handleBack();
    }
  };

  return (
    <div className="flex flex-col justify-evenly items-center w-full gap-5">
      <hr className="w-full border-[1px] border-solid border-underline" />
      <div className="flex justify-between items-center w-full md:flex-row md:justify-between md:items-center">
        <div
          className="flex justify-start items-center text-base font-medium cursor-pointer"
          onClick={handleBackClick}
        >
          <ArrowLeftIcon />
          {textConstants.formBackButtonText}
        </div>

        <Button
          className="bg-detailsBtn text-btnText font-normal hover:bg-btnHover px-4"
          onClick={handleNextClick}
        >
          {nextButtonText}
        </Button>
      </div>
    </div>
  );
};

export default BackContainer;

'use client';
import React from 'react';
import { cn } from '@/lib/cn';

interface CarouselTextProps {
  textParas: { text: React.JSX.Element; alt: string }[];
  interval?: number;
  containerClassName?: string;
  title?: string;
  titleClassName?: string;
}

const CarouselText: React.FC<CarouselTextProps> = ({
  textParas,
  interval = 4000,
  containerClassName = 'w-full h-11/12 flex flex-col justify-betweens',
  title,
  titleClassName = 'text-4xl font-[700] w-full',
}) => {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const autoplay = setInterval(() => {
      setCurrent((prev) => (prev === textParas.length - 1 ? 0 : prev + 1));
    }, interval);

    return () => clearInterval(autoplay);
  }, [textParas.length, interval]);

  return (
    <div className="flex flex-col justify-evenly h-4/6 w-full">
      <section className={containerClassName}>
        {textParas.map((para, index) => (
          <div
            key={index}
            className={`flex justify-between flex-col w-full${
              index === current ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-1000 ease-in-out`}
          >
            {index === current && (
              // eslint-disable-next-line @next/next/no-img-element
              <div className="flex flex-col justify-between gap-12">
                <h2 className={titleClassName}>{title}</h2>
                {para.text}
              </div>
            )}
          </div>
        ))}
      </section>

      <div className="flex items-center relative z-10 gap-2 mt-4">
        {textParas.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              'rounded-none cursor-pointer h-[5px] bg-black',
              index === current ? 'w-14 ' : ' w-10 opacity-30'
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselText;

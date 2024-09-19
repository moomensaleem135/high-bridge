'use client';

export default function Error({ error }: { error: Error; reset: () => void }) {
  return (
    <div className="bg-brand-light w-full h-[100vh] text-xl flex items-center justify-center ">
      {error.message ? error.message : 'Something went wrong!'}
    </div>
  );
}

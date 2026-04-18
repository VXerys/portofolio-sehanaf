import { ArrowRight } from 'lucide-react';

export const ButtonHoverReveal = () => {
  return (
    <div className='group relative cursor-pointer py-3 w-48 border border-base-content/20 bg-base-100 rounded-full overflow-hidden text-base-content text-center font-semibold text-sm tracking-wide uppercase transition-all duration-300 hover:border-base-content'>
      <span className='translate-y-0 group-hover:-translate-y-12 group-hover:opacity-0 transition-all duration-300 inline-block'>
        Let's talk
      </span>
      <div className='flex gap-2 text-base-100 bg-base-content z-10 items-center absolute left-0 top-0 h-full w-full justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 rounded-full'>
        <span>Let's talk</span>
        <ArrowRight className='w-4 h-4' />
      </div>
    </div>
  );
};
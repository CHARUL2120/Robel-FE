import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[color,background-color,box-shadow,transform] duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white shadow-[0_20px_45px_-22px_rgba(35,25,18,0.5)] hover:-translate-y-0.5 hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        outline:
          'border border-white/50 bg-white/65 text-[#241b16] shadow-[0_18px_44px_-26px_rgba(36,27,20,0.38)] backdrop-blur-xl hover:bg-white/85',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 !cursor-pointer',
        ghost:
          'text-[#241b16] hover:bg-[#f1e8de] hover:text-[#241b16] cursor-pointer',
        link: 'text-primary underline-offset-4 !cursor-pointer'
      },
      size: {
        default: 'h-11 px-5 text-sm sm:text-base has-[>svg]:px-4 cursor-pointer',
        sm: 'h-9 rounded-full gap-1.5 px-4 text-sm has-[>svg]:px-3',
        lg: 'h-12 rounded-full px-7 text-base has-[>svg]:px-5',
        icon: 'size-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

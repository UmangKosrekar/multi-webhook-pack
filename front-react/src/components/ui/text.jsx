import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define text variants using `cva` for scalable, variant-based styling
const textVariants = cva(
  "scroll-m-20 tracking-tight", // Base styles applied to all text elements
  {
    variants: {
      variant: {
        lead: "text-xl text-muted-foreground",
        muted: "text-sm text-muted-foreground"
      }
    },
    defaultVariants: {
      variant: "p",
      style: undefined
    }
  }
);

const Text = React.forwardRef(({ variant, className, ...props }, ref) => {
  const Comp = variant || "p";
  return <Comp className={cn(textVariants({ variant, className }))} ref={ref} {...props} />;
});

Text.displayName = "Text";

export { Text, textVariants };

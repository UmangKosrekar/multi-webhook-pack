import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define text variants using `cva` for scalable, variant-based styling
const textVariants = cva(
  "scroll-m-20 tracking-tight", // Base styles applied to all text elements
  {
    variants: {
      style: {
        lead: "text-md",
        muted: "text-sm text-muted-foreground",
        table_text: "text-sm",

      }
    },
    defaultVariants: {
      variant: "p",
      style: undefined
    }
  }
);

const Text = React.forwardRef(({ variant, style = "lead", className, ...props }, ref) => {
  const Comp = variant || "p";
  return <Comp className={cn(textVariants({ style, className }))} ref={ref} {...props} />;
});

Text.displayName = "Text";

export { Text, textVariants };

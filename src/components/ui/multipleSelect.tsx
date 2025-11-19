import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultipleSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const MultipleSelect = React.forwardRef<HTMLSelectElement, MultipleSelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          multiple
          className={cn(
            "flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-3 h-4 w-4 pointer-events-none opacity-50" />
      </div>
    );
  }
);
MultipleSelect.displayName = "MultipleSelect";

export { MultipleSelect };
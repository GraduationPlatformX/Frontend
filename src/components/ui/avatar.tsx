import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string
  fallback?: string
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, name, fallback, children, ...props }, ref) => {
    const initials = fallback || (name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?')
    
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-primary text-white",
          className
        )}
        {...props}
      >
        {children || (
          <div className="flex h-full w-full items-center justify-center text-sm font-medium">
            {initials}
          </div>
        )}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

export { Avatar }


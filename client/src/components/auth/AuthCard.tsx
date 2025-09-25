import * as React from "react";
import { cn } from "@/lib/utils";

interface AuthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const AuthCard = React.forwardRef<HTMLDivElement, AuthCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-md bg-card text-card-foreground rounded-2xl border border-border/50 shadow-2xl p-8",
          "backdrop-blur-sm bg-white/98",
          "relative overflow-hidden",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-accent/5 before:-z-10",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AuthCard.displayName = "AuthCard";

const AuthCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-center space-y-2 mb-8", className)}
    {...props}
  />
));
AuthCardHeader.displayName = "AuthCardHeader";

const AuthCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn("text-2xl font-bold tracking-tight text-foreground", className)}
    {...props}
  />
));
AuthCardTitle.displayName = "AuthCardTitle";

const AuthCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
AuthCardDescription.displayName = "AuthCardDescription";

const AuthCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-6", className)} {...props} />
));
AuthCardContent.displayName = "AuthCardContent";

const AuthCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("pt-6 text-center text-sm text-muted-foreground", className)}
    {...props}
  />
));
AuthCardFooter.displayName = "AuthCardFooter";

export {
  AuthCard,
  AuthCardHeader,
  AuthCardTitle,
  AuthCardDescription,
  AuthCardContent,
  AuthCardFooter,
};
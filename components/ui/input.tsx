import * as React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Visual + a11y validation state. */
  state?: "default" | "error" | "success";
  /** Helper or error text rendered below the field. */
  hint?: string;
  /** Leading adornment (icon or short text). */
  leadingIcon?: React.ReactNode;
  /** Trailing adornment. Falls back to a state icon when omitted. */
  trailingIcon?: React.ReactNode;
  wrapperClassName?: string;
}

const stateRing: Record<NonNullable<InputProps["state"]>, string> = {
  default:
    "border-slate-luxe/50 focus-visible:ring-champagne/40 focus-visible:border-champagne/40",
  error:
    "border-destructive/60 focus-visible:ring-destructive/40 focus-visible:border-destructive/60",
  success:
    "border-verified/60 focus-visible:ring-verified/40 focus-visible:border-verified/60",
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      type,
      state = "default",
      hint,
      leadingIcon,
      trailingIcon,
      id,
      "aria-describedby": describedByProp,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const hintId = hint ? `${id ?? generatedId}-hint` : undefined;
    const describedBy = [describedByProp, hintId].filter(Boolean).join(" ") || undefined;

    const stateIcon =
      state === "error" ? (
        <AlertCircle className="h-4 w-4 text-destructive" aria-hidden />
      ) : state === "success" ? (
        <CheckCircle2 className="h-4 w-4 text-verified" aria-hidden />
      ) : null;

    const trailing = trailingIcon ?? stateIcon;
    const enhanced = state !== "default" || !!hint || !!leadingIcon || !!trailing;

    const baseClasses =
      "flex h-10 w-full rounded-2xl border bg-slate-luxe/40 px-3 py-2 text-sm text-ivory placeholder:text-ivory/50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50";

    // Backward-compatible path: a bare input identical to the original primitive
    // so existing call sites (layout classes, flex rows) are untouched.
    if (!enhanced) {
      return (
        <input
          id={id}
          type={type}
          ref={ref}
          aria-describedby={describedByProp}
          className={cn(baseClasses, stateRing.default, className)}
          {...props}
        />
      );
    }

    const inputId = id ?? generatedId;

    return (
      <div className={cn("w-full", wrapperClassName)}>
        <div className="relative">
          {leadingIcon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ivory/50">
              {leadingIcon}
            </span>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            aria-invalid={state === "error" || undefined}
            aria-describedby={describedBy}
            className={cn(
              baseClasses,
              leadingIcon && "pl-9",
              trailing && "pr-9",
              stateRing[state],
              className
            )}
            {...props}
          />
          {trailing && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              {trailing}
            </span>
          )}
        </div>
        {hint && (
          <p
            id={hintId}
            className={cn(
              "mt-1.5 text-xs",
              state === "error"
                ? "text-destructive"
                : state === "success"
                  ? "text-verified"
                  : "text-ivory/55"
            )}
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };

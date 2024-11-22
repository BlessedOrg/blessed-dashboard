import { LucideIcon } from "lucide-react";
import React, { HTMLInputTypeAttribute, ReactNode } from "react";
import { Input, Label } from "@/components/ui";

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  errorMessage?: any;
  helperText?: React.ReactNode;
  isInvalid?: boolean;
  label: string;
  register?: any;
  id?: string;
  placeholder?: string;
  children?: ReactNode;
  icon?: LucideIcon;
  isDisabled?: boolean;
  type?: HTMLInputTypeAttribute;
}

export const FormField = ({
  errorMessage,
  isInvalid,
  label,
  helperText,
  register,
  id,
  placeholder,
  icon: Icon,
  children,
  type = "text"
}: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-2 w-full ">
      <Label htmlFor={id} className="font-semibold">{label}</Label>
      {!children && <div className="flex gap-1 items-center relative">
        {!!Icon && <Icon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />}
        <Input type={type} id={id} placeholder={placeholder || ""} {...register(id)} className={`${!!Icon ? "pl-10" : ""}`} />
      </div>
      }
      {children}
      {isInvalid && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      {!isInvalid && helperText && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>

  );
};

const FormErrorMessage = ({ children }: { children: ReactNode }) => {
  return <p className="text-red-400 font-semibold">{children}</p>;
};
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComponentProps } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  label: string;
  value: string;
};

type BaseProps<T extends FieldValues> = {
  label: string;
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  id?: string;
  options?: Option[];
};

type InputProps<T extends FieldValues> = BaseProps<T> & {
  type?: "text" | "email" | "tel";
} & Omit<ComponentProps<typeof Input>, keyof BaseProps<T> | "type">;

type SelectProps<T extends FieldValues> = BaseProps<T> & {
  type: "select";
} & Omit<ComponentProps<typeof Select>, keyof BaseProps<T> | "type" | "onValueChange" | "value">;

type Props<T extends FieldValues> = InputProps<T> | SelectProps<T>;

const MainInput = <T extends FieldValues>({
  label,
  id,
  placeholder,
  type = "text",
  control,
  name,
  options = [],
  ...props
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor={id} className="mb-1 font-bold">
            {label}
          </Label>
          {type === "select" ? (
            <Select onValueChange={field.onChange} value={field.value as string}>
              <SelectTrigger className="border-gray-300 focus:!border-blue-700 focus:!ring-0 focus-visible:!border-blue-700 focus-visible:!ring-0">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              type={type}
              id={id}
              placeholder={placeholder}
              className="border-gray-300 focus:!border-blue-700 focus:!ring-0 focus-visible:!border-blue-700 focus-visible:!ring-0"
              {...field}
              {...props}
            />
          )}
        </div>
      )}
    />
  );
};

export default MainInput;

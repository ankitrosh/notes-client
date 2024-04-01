import { ReactNode } from "react";

export default function InputContainer({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="mt-2 w-full">
      <label htmlFor="password" className="mx-auto w-1/2 block">
        {label}
      </label>
      {children}
    </div>
  );
}

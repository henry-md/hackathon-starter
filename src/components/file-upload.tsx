"use client";

import { useId } from "react";
import { Input } from "./ui";

export type FileUploadProps = {
  label: string;
  onChange: (file: File | null) => void;
  accept?: string;
};

export function FileUpload({ label, onChange, accept = ".csv,.xlsx" }: FileUploadProps) {
  const id = useId();

  return (
    <div className="min-w-0 space-y-2">
      <label htmlFor={id} className="block">{label}</label>
      <Input
        id={id}
        type="file"
        accept={accept}
        onChange={(event) => onChange(event.currentTarget.files?.[0] ?? null)}
      />
    </div>
  );
}

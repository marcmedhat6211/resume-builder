"use client";

import ResumeForm from "@/containers/resume-form/ResumeForm";
import { IResume } from "@/interfaces/resume";
import { Resume } from "@/models/resume";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("@/containers/pdf-viewer/PdfViewer"), { ssr: false });

export default function Home() {
  const { watch, control, setValue } = useForm<IResume>({ defaultValues: Resume });
  const formValues = watch();

  return (
    <div className="grid grid-cols-2 w-full">
      <div className="overflow-y-auto">
        <ResumeForm control={control} watch={watch} setValue={setValue} />
      </div>
      <div className="fixed right-0 w-1/2">
        <PdfViewer data={formValues} />
      </div>
    </div>
  );
}

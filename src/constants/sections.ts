import { FC } from "react";
import { IResume } from "@/interfaces/resume";
import EmploymentsSection from "@/containers/resume-form/form-sections/EmploymentsSection";
import EducationsSection from "@/containers/resume-form/form-sections/EducationsSection";
import CertificatesSection from "@/containers/resume-form/form-sections/CertificatesSection";
import SkillsSection from "@/containers/resume-form/form-sections/SkillsSection";
import LanguagesSection from "@/containers/resume-form/form-sections/LanguagesSection";

export type SectionKey = keyof Omit<IResume, "personalDetailsSection">;

export interface Section {
  key: SectionKey;
  subtitle: string;
  Component: FC<{ control: any; watch: any }>;
}

export const sections: Section[] = [
  {
    key: "employmentsSection",
    subtitle: "A varied work history on your resume highlights the distinct expertise and insights you offer to a role",
    Component: EmploymentsSection,
  },
  {
    key: "educationsSection",
    subtitle: "Your education section shows your academic background and achievements",
    Component: EducationsSection,
  },
  {
    key: "certificatesSection",
    subtitle: "Your certificates demonstrate your professional achievements and qualifications",
    Component: CertificatesSection,
  },
  {
    key: "skillsSection",
    subtitle: "Your skills section highlights your expertise in various areas of interest",
    Component: SkillsSection,
  },
  {
    key: "languagesSection",
    subtitle: "Your languages section highlights your proficiency in various languages",
    Component: LanguagesSection,
  },
];

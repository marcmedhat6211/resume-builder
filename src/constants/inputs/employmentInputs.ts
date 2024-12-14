import { IInput } from "@/interfaces/input";

export const getEmploymentInputs = (index: number): IInput[] => [
  {
    label: "Job Title",
    id: `job_title-${index}`,
    name: `employmentsSection.employments.${index}.position`,
    placeholder: "Job Title...",
    type: "text",
  },
  {
    label: "Company",
    id: `company-${index}`,
    name: `employmentsSection.employments.${index}.company`,
    placeholder: "Company...",
    type: "text",
  },
  {
    label: "Date",
    id: `date-${index}`,
    name: `employmentsSection.employments.${index}.date`,
    placeholder: "Date...",
    type: "text",
  },
  {
    label: "Description",
    id: `description-${index}`,
    name: `employmentsSection.employments.${index}.description`,
    placeholder: "Description...",
    type: "text",
  },
];

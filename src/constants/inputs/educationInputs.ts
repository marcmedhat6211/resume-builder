import { IInput } from "@/interfaces/input";

export const getEducationInputs = (index: number): IInput[] => [
  {
    id: `degree-${index}`,
    label: "Degree",
    placeholder: "Bachelor of Science",
    type: "text",
    name: `educationsSection.educations.${index}.degree`,
  },
  {
    id: `college-${index}`,
    label: "University",
    placeholder: "University Name...",
    type: "text",
    name: `educationsSection.educations.${index}.college`,
  },
  {
    id: `date-${index}`,
    label: "Date",
    placeholder: "Date..",
    type: "text",
    name: `educationsSection.educations.${index}.date`,
  },
  {
    id: `description-${index}`,
    label: "Description",
    placeholder: "Brief description of your academic achievements",
    type: "text",
    name: `educationsSection.educations.${index}.description`,
  },
];

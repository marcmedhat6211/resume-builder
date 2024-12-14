import { IInput } from "@/interfaces/input";

export const getCertificateInputs = (index: number): IInput[] => [
  {
    id: `name-${index}`,
    label: "Name",
    placeholder: "Certificate Name...",
    type: "text",
    name: `certificatesSection.certificates.${index}.name`,
  },
  {
    id: `date-${index}`,
    label: "Date",
    placeholder: "Date...",
    type: "text",
    name: `certificatesSection.certificates.${index}.date`,
  },
  {
    id: `description-${index}`,
    label: "Description",
    placeholder: "Description...",
    type: "text",
    name: `certificatesSection.certificates.${index}.description`,
  },
];

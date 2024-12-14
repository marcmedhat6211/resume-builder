import { IContactDetailsSection } from "@/interfaces/contactDetailsSection";

export interface IPersonalDetailsSection {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  jobTitle: string;
  summary: string;
  contactDetails: IContactDetailsSection;
}

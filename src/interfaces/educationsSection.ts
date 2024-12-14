import { IEducation } from "@/interfaces/education";
import { ISection } from "@/interfaces/section";

export interface IEducationsSection extends ISection {
  educations: IEducation[];
}

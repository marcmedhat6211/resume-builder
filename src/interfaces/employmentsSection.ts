import { IEmployment } from "@/interfaces/employment";
import { ISection } from "@/interfaces/section";

export interface IEmploymentsSection extends ISection {
  employments: IEmployment[];
}

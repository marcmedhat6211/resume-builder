import { INameLevel } from "@/interfaces/nameLevel";
import { ISection } from "@/interfaces/section";

export interface ISkillsSection extends ISection {
  skills: INameLevel[];
}

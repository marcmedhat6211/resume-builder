import { INameLevel } from "@/interfaces/nameLevel";
import { ISection } from "@/interfaces/section";

export interface ILanguagesSection extends ISection {
  languages: INameLevel[];
}

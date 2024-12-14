import { IEducationsSection } from "@/interfaces/educationsSection";
import { IEmploymentsSection } from "@/interfaces/employmentsSection";
import { ILanguagesSection } from "@/interfaces/languagesSection";
import { IPersonalDetailsSection } from "@/interfaces/personalDetailsSection";
import { ISkillsSection } from "@/interfaces/skillsSection";
import { ICertificatesSection } from "@/interfaces/certificatesSection";

export interface IResume {
  personalDetailsSection: IPersonalDetailsSection;
  employmentsSection?: IEmploymentsSection;
  educationsSection?: IEducationsSection;
  certificatesSection?: ICertificatesSection;
  languagesSection?: ILanguagesSection;
  skillsSection?: ISkillsSection;
}

import { IResume } from "@/interfaces/resume";
import { EducationsSection } from "@/models/educationsSection";
import { EmploymentsSection } from "@/models/employmentsSection";
import { languagesSection } from "@/models/languagesSection";
import { PersonalDetailsSection } from "@/models/personalDetailsSection";
import { SkillsSection } from "@/models/skillsSection";
import { CertificatesSection } from "@/models/certificatesSection";

export const Resume: IResume = {
  personalDetailsSection: PersonalDetailsSection,
  employmentsSection: EmploymentsSection,
  educationsSection: EducationsSection,
  certificatesSection: CertificatesSection,
  languagesSection: languagesSection,
  skillsSection: SkillsSection,
};

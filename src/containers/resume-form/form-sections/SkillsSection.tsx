import { Control, UseFormWatch } from "react-hook-form";
import NameLevelSection from "./NameLevelSection";
import { IResume } from "@/interfaces/resume";
import { FC } from "react";
import { Skill } from "@/models/skill";

type Props = {
  control: Control<IResume>;
  watch: UseFormWatch<IResume>;
};

const SkillsSection: FC<Props> = ({ control, watch }) => {
  return (
    <NameLevelSection
      control={control}
      watch={watch}
      name="skillsSection.skills"
      model={Skill}
      addButtonText="Add skill"
    />
  );
};

export default SkillsSection;

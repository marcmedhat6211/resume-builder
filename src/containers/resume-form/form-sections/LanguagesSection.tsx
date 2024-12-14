import { Control, UseFormWatch } from "react-hook-form";
import NameLevelSection from "./NameLevelSection";
import { IResume } from "@/interfaces/resume";
import { FC } from "react";
import { Language } from "@/models/language";

type Props = {
  control: Control<IResume>;
  watch: UseFormWatch<IResume>;
};

const LanguagesSection: FC<Props> = ({ control, watch }) => {
  return (
    <NameLevelSection
      control={control}
      watch={watch}
      name="languagesSection.languages"
      model={Language}
      addButtonText="Add language"
    />
  );
};

export default LanguagesSection;

import { FC } from "react";
import { Control, UseFormWatch } from "react-hook-form";
import { IResume } from "@/interfaces/resume";
import { getEducationInputs } from "@/constants/inputs/educationInputs";
import { Education } from "@/models/education";
import DescriptiveFormSection from "@/containers/resume-form/form-sections/DescriptiveFormSection";

type Props = {
  control: Control<IResume>;
  watch: UseFormWatch<IResume>;
};

const EducationsSection: FC<Props> = ({ control, watch }) => {
  return (
    <DescriptiveFormSection
      control={control}
      watch={watch}
      name="educationsSection.educations"
      getInputs={getEducationInputs}
      model={Education}
      titleField="degree"
      subtitleField="college"
      addButtonText="Add education"
    />
  );
};

export default EducationsSection;

import { FC } from "react";
import { Control, UseFormWatch } from "react-hook-form";
import { IResume } from "@/interfaces/resume";
import { getEmploymentInputs } from "@/constants/inputs/employmentInputs";
import { Employment } from "@/models/employment";
import DescriptiveFormSection from "@/containers/resume-form/form-sections/DescriptiveFormSection";

type Props = {
  control: Control<IResume>;
  watch: UseFormWatch<IResume>;
};

const EmploymentsSection: FC<Props> = ({ control, watch }) => {
  return (
    <DescriptiveFormSection
      control={control}
      watch={watch}
      name="employmentsSection.employments"
      getInputs={getEmploymentInputs}
      model={Employment}
      titleField="position"
      subtitleField="company"
      addButtonText="Add employment"
    />
  );
};

export default EmploymentsSection;

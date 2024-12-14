import { FC } from "react";
import { Control, UseFormWatch } from "react-hook-form";
import { IResume } from "@/interfaces/resume";
import DescriptiveFormSection from "@/containers/resume-form/form-sections/DescriptiveFormSection";
import { getCertificateInputs } from "@/constants/inputs/certificateInputs";
import { Certificate } from "@/models/certificate";

type Props = {
  control: Control<IResume>;
  watch: UseFormWatch<IResume>;
};

const CertificatesSection: FC<Props> = ({ control, watch }) => {
  return (
    <DescriptiveFormSection
      control={control}
      watch={watch}
      name="certificatesSection.certificates"
      getInputs={getCertificateInputs}
      model={Certificate}
      titleField="name"
      subtitleField="description"
      addButtonText="Add certificate"
    />
  );
};

export default CertificatesSection;

import { FC } from "react";
import { Control, Path, useFieldArray, UseFormWatch } from "react-hook-form";
import { IResume } from "@/interfaces/resume";
import SectionItem from "@/containers/resume-form/moveable-section/SectionItem";
import MainInput from "@/components/ui/custom-inputs/MainInput";
import { Plus } from "lucide-react";
import { IInput } from "@/interfaces/input";
import { IEmployment } from "@/interfaces/employment";
import { IEducation } from "@/interfaces/education";
import { ICertificate } from "@/interfaces/certificate";

type SectionName =
  | "employmentsSection.employments"
  | "educationsSection.educations"
  | "certificatesSection.certificates";

interface FormSectionProps {
  control: Control<IResume>;
  watch: UseFormWatch<IResume>;
  name: SectionName;
  getInputs: (index: number) => IInput[];
  model: IEmployment | IEducation | ICertificate;
  titleField: string;
  subtitleField: string;
  addButtonText: string;
}

const DescriptiveFormSection: FC<FormSectionProps> = ({
  control,
  watch,
  name,
  getInputs,
  model,
  titleField,
  subtitleField,
  addButtonText,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const sectionItems = fields.map((field, index) => {
    const title = watch(`${name}.${index}.${titleField}` as Path<IResume>) || "";
    const subtitle = watch(`${name}.${index}.${subtitleField}` as Path<IResume>) || "";

    return (
      <SectionItem
        key={field.id}
        title={title as string}
        subtitle={subtitle as string}
        onDelete={() => remove(index)}
      >
        <div className="grid grid-cols-2 gap-4 w-full mb-4">
          {getInputs(index).map((input) => (
            <MainInput<IResume>
              key={input.id}
              label={input.label}
              id={input.id}
              placeholder={input.placeholder}
              type={input.type}
              control={control}
              name={input.name as Path<IResume>}
            />
          ))}
        </div>
      </SectionItem>
    );
  });

  return (
    <div>
      <div>{sectionItems}</div>
      <button
        type="button"
        onClick={() => append(model)}
        className="flex items-center space-x-2 px-2 py-1 text-black hover:bg-gray-200 transition-colors mt-4 rounded-md"
      >
        <Plus size={16} className="text-black" />
        <span className="text-sm">{addButtonText}</span>
      </button>
    </div>
  );
};

export default DescriptiveFormSection;

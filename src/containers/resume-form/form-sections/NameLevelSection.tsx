import { FC } from "react";
import { Control, Path, useFieldArray, UseFormWatch } from "react-hook-form";
import { IResume } from "@/interfaces/resume";
import SectionItem from "@/containers/resume-form/moveable-section/SectionItem";
import MainInput from "@/components/ui/custom-inputs/MainInput";
import { Plus } from "lucide-react";
import { INameLevel } from "@/interfaces/nameLevel";
import { getNameLevelInputs } from "@/constants/inputs/nameLevelInputs";

type SectionName = "languagesSection.languages" | `skillsSection.skills`;

interface FormSectionProps {
  control: Control<IResume>;
  watch: UseFormWatch<IResume>;
  name: SectionName;
  model: INameLevel;
  addButtonText: "Add language" | "Add skill";
}

const NameLevelSection: FC<FormSectionProps> = ({ control, watch, name, model, addButtonText }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const sectionItems = fields.map((field, index) => {
    const title = watch(`${name}.${index}.name`) || "";
    const subtitle = watch(`${name}.${index}.level`) || "";

    return (
      <SectionItem
        key={field.id}
        title={title as string}
        subtitle={subtitle as string}
        onDelete={() => remove(index)}
      >
        <div className="grid grid-cols-2 gap-4 w-full mb-4">
          {getNameLevelInputs(name, index).map((input) => (
            <MainInput<IResume>
              key={input.id}
              label={input.label}
              id={input.id}
              placeholder={input.placeholder}
              type={input.type}
              control={control}
              name={input.name as Path<IResume>}
              {...(input.options ? { options: input.options } : {})}
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

export default NameLevelSection;

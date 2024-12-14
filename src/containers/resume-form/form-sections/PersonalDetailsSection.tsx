import SectionTitle from "@/components/typography/SectionTitle";
import MainInput from "@/components/ui/custom-inputs/MainInput";
import TextEditor from "@/components/ui/custom-inputs/TextEditor";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/wrappers/SectionWrapper";
import { contactDetailsInputs } from "@/constants/inputs/contactDetailsInputs";
import { personalDetailsInputs } from "@/constants/inputs/personalDetailsInputs";
import { IResume } from "@/interfaces/resume";
import { ChevronsUpDown } from "lucide-react";
import { FC, useState } from "react";
import { Control, Path } from "react-hook-form";
import { Label } from "@/components/ui/label";

type Props = {
  control: Control<IResume>;
};

const PersonalDetailsSection: FC<Props> = ({ control }) => {
  const [showContactDetails, setShowContactDetails] = useState(false);

  return (
    <SectionWrapper>
      <SectionTitle>Personal Details</SectionTitle>
      <div className="grid grid-cols-2 gap-4 w-full mb-4">
        {personalDetailsInputs.map((input) => (
          <MainInput<IResume>
            key={input.id}
            label={input.label}
            id={input.id}
            placeholder={input.placeholder}
            type={input.type as "text"}
            control={control}
            name={input.name as Path<IResume>}
          />
        ))}
      </div>
      <Button
        type="button"
        variant="ghost"
        className="my-4 text-blue-600 hover:text-blue-800"
        onClick={() => setShowContactDetails((prev) => !prev)}
      >
        {showContactDetails ? "Hide" : "Show"} Contact Details
        <ChevronsUpDown className="h-4 w-4 mr-2" />
      </Button>
      {showContactDetails && (
        <div className="grid grid-cols-2 gap-4 w-full mb-4">
          {contactDetailsInputs.map((input) => (
            <MainInput<IResume>
              key={input.id}
              label={input.label}
              id={input.id}
              placeholder={input.placeholder}
              type={input.type as "text"}
              control={control}
              name={input.name as Path<IResume>}
            />
          ))}
        </div>
      )}
      <div>
        <Label className="mb-1 font-bold">Summary</Label>
        <TextEditor control={control} name="personalDetailsSection.summary" />
      </div>
    </SectionWrapper>
  );
};

export default PersonalDetailsSection;

import SectionWrapper from "@/components/wrappers/SectionWrapper";
import SectionHeader from "@/containers/resume-form/moveable-section/SectionHeader";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  sectionTitle: string;
  sectionSubtitle: string;
  onTitleChange: (newTitle: string) => void;
  onDelete: () => void;
};

const MoveableSection: FC<Props> = ({
  children,
  sectionTitle,
  sectionSubtitle,
  onTitleChange,
  onDelete,
}) => {
  return (
    <SectionWrapper>
      <SectionHeader
        onDelete={onDelete}
        onTitleChange={onTitleChange}
        title={sectionTitle}
        subtitle={sectionSubtitle}
      />
      {children}
    </SectionWrapper>
  );
};

export default MoveableSection;

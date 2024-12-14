import { FC, useCallback, useRef, useState } from "react";
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { IResume } from "@/interfaces/resume";
import MoveableSection from "@/containers/resume-form/moveable-section/MoveableSection";
import DeleteDialog from "@/containers/resume-form/moveable-section/DeleteDialog";
import PersonalDetailsSection from "@/containers/resume-form/form-sections/PersonalDetailsSection";
import { SectionKey, sections } from "@/constants/sections";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { GripVertical } from "lucide-react";

type Props = {
  control: Control<IResume>;
  watch: UseFormWatch<IResume>;
  setValue: UseFormSetValue<IResume>;
};

interface DraggableSectionProps {
  id: string;
  index: number;
  moveSection: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
}

const DraggableSection: FC<DraggableSectionProps> = ({ id, index, moveSection, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "section",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "section",
    hover: (item: { id: string; index: number }, monitor) => {
      if (!monitor.isOver({ shallow: true })) return;
      if (item.index === index) return;
      moveSection(item.index, index);
      item.index = index;
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className="flex items-start gap-2">
      <div className="mt-2 cursor-grab p-1 hover:bg-gray-100 rounded-md transition-colors">
        <GripVertical className="h-5 w-5 text-gray-900" />
      </div>
      {children}
    </div>
  );
};

const ResumeForm: FC<Props> = ({ control, watch, setValue }) => {
  const [sectionToDelete, setSectionToDelete] = useState<SectionKey | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteSection = (section: SectionKey) => {
    setSectionToDelete(section);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (sectionToDelete) {
      setValue(sectionToDelete, undefined);
    }
  };

  const moveSection = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const visibleSections = sections.filter((section) => watch(section.key));
      const dragSection = visibleSections[dragIndex];
      const hoverSection = visibleSections[hoverIndex];

      setValue(`${dragSection.key}.sortNo`, hoverIndex);
      setValue(`${hoverSection.key}.sortNo`, dragIndex);
    },
    [setValue, watch]
  );

  const visibleSections = sections
    .filter((section) => watch(section.key))
    .sort((a, b) => {
      const aSortNo = watch(`${a.key}.sortNo`) || 0;
      const bSortNo = watch(`${b.key}.sortNo`) || 0;
      return aSortNo - bSortNo;
    });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col space-y-8">
        <DeleteDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onConfirm={handleConfirmDelete}
          trigger={<></>}
          title="Delete Section"
          description="Are you sure you want to delete this section? This action cannot be undone."
        />

        <PersonalDetailsSection control={control} />

        {visibleSections.map(({ key, subtitle, Component }, index) => (
          <DraggableSection key={key} id={key} index={index} moveSection={moveSection}>
            <div className="flex-1">
              <MoveableSection
                onDelete={() => handleDeleteSection(key)}
                onTitleChange={(newTitle) => setValue(`${key}.title`, newTitle)}
                sectionTitle={watch(`${key}.title`)}
                sectionSubtitle={subtitle}
              >
                <Component control={control} watch={watch} />
              </MoveableSection>
            </div>
          </DraggableSection>
        ))}
      </div>
    </DndProvider>
  );
};

export default ResumeForm;

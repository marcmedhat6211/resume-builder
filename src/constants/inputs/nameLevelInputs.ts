import { LevelEnum } from "@/enums/level";
import { IInput } from "@/interfaces/input";

export const getNameLevelInputs = (
  name: "skillsSection.skills" | "languagesSection.languages",
  index: number
): Array<IInput> => [
  {
    id: `name-${index}`,
    label: "Name",
    placeholder: "Name...",
    type: "text",
    name: `${name}.${index}.name`,
  },
  {
    id: `level-${index}`,
    label: "Level",
    placeholder: "Level...",
    type: "select",
    name: `${name}.${index}.level`,
    options: Object.values(LevelEnum).map((level) => ({
      label: level,
      value: level,
    })),
  },
];

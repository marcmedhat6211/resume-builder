import { Path } from "react-hook-form";
import { IResume } from "./resume";

export interface IInput {
  id: string;
  label: string;
  name: Path<IResume>;
  placeholder: string;
  type: "text" | "email" | "tel" | "select";
  options?: Array<{ label: string; value: string }>;
}

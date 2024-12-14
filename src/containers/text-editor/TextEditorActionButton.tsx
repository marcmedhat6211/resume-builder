import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick: () => void;
  isActive: boolean;
};

const TextEditorActionButton: FC<Props> = ({ children, onClick, isActive }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2 py-1 text-sm font-semibold rounded ${
        isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
};

export default TextEditorActionButton;

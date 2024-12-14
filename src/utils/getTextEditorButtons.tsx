import { actions } from "@/types/textEditor";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  LucideProps,
} from "lucide-react";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

const toggleBold = (editor: Editor) => {
  editor?.chain().focus().toggleBold().run();
};

const toggleItalic = (editor: Editor) => {
  editor?.chain().focus().toggleItalic().run();
};

const toggleUnderline = (editor: Editor) => {
  editor?.chain().focus().toggleUnderline().run();
};

const toggleBulletList = (editor: Editor) => {
  editor?.chain().focus().toggleBulletList().run();
};

const toggleNumberedList = (editor: Editor) => {
  editor?.chain().focus().toggleOrderedList().run();
};

const getTextEditorButtons = (
  editor: Editor
): {
  actionName: actions;
  onClick: () => void;
  icon: ReactNode;
}[] => {
  return [
    { actionName: "bold", onClick: () => toggleBold(editor), icon: <Bold /> },
    {
      actionName: "italic",
      onClick: () => toggleItalic(editor),
      icon: <Italic />,
    },
    {
      actionName: "underline",
      onClick: () => toggleUnderline(editor),
      icon: <UnderlineIcon />,
    },
    {
      actionName: "bulletList",
      onClick: () => toggleBulletList(editor),
      icon: <List />,
    },
    {
      actionName: "orderedList",
      onClick: () => toggleNumberedList(editor),
      icon: <ListOrdered />,
    },
  ];
};

export { getTextEditorButtons };

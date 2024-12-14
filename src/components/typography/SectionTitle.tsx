import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const SectionTitle: FC<Props> = ({ children }) => {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">
      {children}
    </h3>
  );
};

export default SectionTitle;

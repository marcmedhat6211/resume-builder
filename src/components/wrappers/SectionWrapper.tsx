import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const SectionWrapper: FC<Props> = ({ children }) => {
  return (
    <div className="border-b border-grey">
      <div className="p-8">{children}</div>
    </div>
  );
};

export default SectionWrapper;

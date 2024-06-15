import { SelectedItemsContainerTest } from "@/helper/test/test-id-constants";
import { MutableRefObject, ReactNode } from "react";

interface SelectedItemsContainerProps {
  children: ReactNode;
  reference: MutableRefObject<null>;
}

export const SelectedItemsContainer: React.FC<SelectedItemsContainerProps> = ({
  children,
  reference,
}) => {
  return (
    <div
      ref={reference}
      data-testid={SelectedItemsContainerTest}
      className="flex flex-row gap-1 overflow-x-auto disable-scrollbar p-1"
    >
      {children}
    </div>
  );
};

"use client";

import { ReactNode } from "react";
import { ItemFilter } from "./sub-components/ItemFilter/ItemFilter";
import { ItemSelect } from "./sub-components/ItemSelect/ItemSelect";
import { MultiSelectWrapper } from "@/helper/test/test-id-constants";
import { useSelectorStore } from "@/providers/selector-store-provider";

export const MultiSelect = () => {
  const [isComponentOpen] = useSelectorStore((state) => [
    state.isComponentOpen,
  ]);
  return (
    <Wrapper>
      <ItemFilter />
      <AbsoluteWrapper isComponentOpen={isComponentOpen}>
        <ItemSelect />
      </AbsoluteWrapper>
    </Wrapper>
  );
};

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div
      data-testid={MultiSelectWrapper}
      className="flex justify-center text-[var(--text)] px-1"
    >
      <div className="relative flex flex-col w-full max-w-96">{children}</div>
    </div>
  );
};

interface AbsoluteWrapperProps {
  children: ReactNode;
  isComponentOpen: boolean;
}

const AbsoluteWrapper: React.FC<AbsoluteWrapperProps> = ({
  children,
  isComponentOpen,
}) => {
  return (
    <div
      className={`absolute w-full max-w-96 top-12 ${
        !isComponentOpen && "hidden"
      }`}
    >
      {children}
    </div>
  );
};

// Used to improve keyboard accessibility when tabbing selected items. If user tab to the first selected item, this hook will cause overflowed container being forced to scroll to the start(left).

import { ForceScrollHorizontally } from "@/constants";
import { FocusEvent, useRef } from "react";

export type ForceScrollToStart = (
  event: FocusEvent<HTMLButtonElement, Element>,
  idCreatorCallback: (index: number) => string
) => void;

export const useForceScrollToStart = () => {
  const overflowedContainer = useRef(null);

  const forceScrollToStart = (
    ...[event, idCreatorCallback]: Parameters<ForceScrollToStart>
  ): ReturnType<ForceScrollToStart> => {
    if (event.target.id === idCreatorCallback(0)) {
      (overflowedContainer.current! as HTMLDivElement).scrollTo(
        ForceScrollHorizontally,
        0
      );
    }
  };

  return { overflowedContainer, forceScrollToStart };
};

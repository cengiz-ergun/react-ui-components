import { AnimationStyle } from "@/types/application";

export const AnimatedOverlay = ({
  animationStyle,
}: {
  animationStyle: AnimationStyle;
}) => {
  return (
    <div
      id="overlay"
      className="rounded-xl absolute w-full h-full z-10 inset-0 bg-[url('/black.svg')] opacity-30 flex"
    >
      <div className={`${animationStyle} m-auto`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

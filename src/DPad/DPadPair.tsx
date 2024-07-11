export interface DPadPairProps {
  direction: "vertical" | "horizontal";
}

export const DPadPair = ({
  children,
  direction,
}: React.PropsWithChildren<DPadPairProps>) => {
  return <div className={`dpad__${direction}`}>{children}</div>;
};

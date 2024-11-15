import { DetailedHTMLProps, HTMLAttributes } from "react";

export const Card = ({
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & { title?: string; isContainer?: boolean }) => {
  const { children, className, title, isContainer, ...rest } = props;
  const defaultCard = (
    <div className={`${isContainer ? "" : "bg-white p-6 rounded-3xl"} h-fit ${className ? className : ""}`} {...rest}>
      {children}
    </div>
  );
  return !!title ? (
    <div className="flex flex-col gap-2">
      <p className="font-semibold text-xl">{title}</p>
      {defaultCard}
    </div>
  ) : (
    defaultCard
  );
};

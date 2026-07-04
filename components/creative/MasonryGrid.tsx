import { Children, ReactNode } from "react";

interface MasonryGridProps {
  children: ReactNode;
  gapClassName?: string;
  itemGapClassName?: string;
}

const MasonryGrid = ({
  children,
  gapClassName = "gap-4",
  itemGapClassName = "mb-4",
}: MasonryGridProps) => {
  return (
    <div className={`columns-1 sm:columns-2 lg:columns-3 ${gapClassName}`}>
      {Children.map(children, (child, index) => (
        <div key={index} className={`break-inside-avoid ${itemGapClassName}`}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;

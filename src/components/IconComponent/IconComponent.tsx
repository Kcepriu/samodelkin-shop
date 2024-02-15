import { FC } from "react";
import * as ReactIcons from "react-icons/md";
import { MdFilter } from "react-icons/md";

interface IIconComponent {
  iconName: string;
  size?: number;
}
type IReactIcon = keyof typeof ReactIcons;

const IconComponent: FC<IIconComponent> = ({ iconName, size = 24 }) => {
  const DynamicIconComponent = ReactIcons[iconName as IReactIcon];

  if (!DynamicIconComponent) return <MdFilter size={size} />;

  return <DynamicIconComponent size={size} />;
};

export default IconComponent;

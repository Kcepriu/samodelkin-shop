import { FC } from "react";
import * as ReactIcons from "react-icons/md";
import { MdOutlineFilterAlt, MdLanguage } from "react-icons/md";

interface IIconComponent {
  iconName: string;
  size?: number;
}
type IReactIcon = keyof typeof ReactIcons;

const IconComponent: FC<IIconComponent> = ({ iconName, size = 24 }) => {
  if (iconName === "language") return <MdLanguage size={size} />;

  const DynamicIconComponent = ReactIcons[iconName as IReactIcon];

  if (!DynamicIconComponent) return <MdOutlineFilterAlt size={size} />;

  return <DynamicIconComponent size={size} />;
};

export default IconComponent;

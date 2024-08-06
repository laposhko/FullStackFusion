import sprite from "./sprite.svg";

const SvgIcon = ({ className, iconName, width, height }) => (
  <svg className={className} width={width} height={height}>
    <use href={`${sprite}#${iconName}`} />
  </svg>
);

export default SvgIcon;

export const getSvgSrc = (icon: string | { src: string }) => {
  return (typeof icon === 'object' && icon.src ? icon.src : icon) as string;
};

export const loadSprite = (src: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      resolve(image);
    };
    image.onerror = () => reject(new Error(`Could not load image ${src}`));
  });
};

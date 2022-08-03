import Image, { ImageProps } from "next/image";

type ImageWrapperProps = {
  className?: String;
};

// className must include position: relative to modify the image size
const ImageWrapper = (props: ImageProps & ImageWrapperProps) => {
  return (
    <div className={props.className}>
      <Image
        alt={props.alt ?? ""}
        layout="fill"
        objectFit="contain"
        {...props}
      />
    </div>
  );
};

export default ImageWrapper;

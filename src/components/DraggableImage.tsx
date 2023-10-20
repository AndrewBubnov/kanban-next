import {DraggableImageProps} from "@/types";
import Image from "next/image";

export const DraggableImage = ({ imageParameters }: DraggableImageProps) => {
	const { imgSrc, width, height } = imageParameters;
	return <Image alt="" src={imgSrc} width={width} height={height} />;
};
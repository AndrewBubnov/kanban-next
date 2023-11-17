import Image from 'next/image';
import { DraggableImageProps } from '@/modules/Desk/types';

export const DraggableImage = ({ imageParameters }: DraggableImageProps) => {
	const { imgSrc, width, height } = imageParameters;
	return <Image alt="" src={imgSrc} width={width} height={height} draggable={false} />;
};

import { ReactElement, DragEvent, CSSProperties } from 'react';
import { DELTA_X, DELTA_Y } from '@/constants';
import { DraggableBox } from '@/components/StyledComponents';

interface DraggableProps {
	children: ReactElement;
	onDragStart(event: DragEvent<HTMLDivElement>): void;
	onDrag(evt: DragEvent): void;
	onDrop(): void;
	isDragged: boolean;
	configUpdated: boolean;
	dX: number;
	dY: number;
	id: string;
}

export const Draggable = ({
	children,
	onDragStart,
	onDrag,
	dY,
	dX,
	id,
	isDragged,
	onDrop,
	configUpdated,
}: DraggableProps) => {
	const style = { [DELTA_X]: `${dX}px`, [DELTA_Y]: `${dY}px` } as CSSProperties;

	const dragOverHandler = (evt: DragEvent) => {
		evt.stopPropagation();
		evt.preventDefault();
	};

	return (
		<DraggableBox
			draggable
			id={id}
			isDragged={isDragged}
			isConfigUpdated={configUpdated}
			onDragStart={onDragStart}
			onDrag={onDrag}
			onDrop={onDrop}
			onDragOver={dragOverHandler}
			style={style}
		>
			{children}
		</DraggableBox>
	);
};

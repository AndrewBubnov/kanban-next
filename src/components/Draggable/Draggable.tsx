import { ReactElement, DragEvent, CSSProperties } from 'react';
import styles from './Draggable.module.css';
import { DELTA_X, DELTA_Y } from '@/constants';

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

	const { dragged, autoMove } = styles;
	const autoMoveStyle = configUpdated ? '' : autoMove;

	return (
		<div
			draggable
			id={id}
			onDragStart={onDragStart}
			onDrag={onDrag}
			onDrop={onDrop}
			onDragOver={dragOverHandler}
			className={`${isDragged ? dragged : autoMoveStyle}`}
			style={style}
		>
			{children}
		</div>
	);

	// return cloneElement(children, {
	//   draggable: true,
	//   id,
	//   onDragStart,
	//   onDrag,
	//   onDrop,
	//   onDragOver: dragOverHandler,
	//   className: `${isDragged ? dragged : autoMoveStyle}`,
	//   style,
	// });
};

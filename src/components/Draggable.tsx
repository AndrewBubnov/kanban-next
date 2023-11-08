import { DragEvent, CSSProperties } from 'react';
import { CenterLoader, DraggableBox, LoadingIndicator } from '@/components/StyledComponents';
import { DELTA_X, DELTA_Y } from '@/constants';
import { DraggableProps } from '@/types';

export const Draggable = ({
	children,
	onDragStart,
	onDrag,
	dY,
	dX,
	id,
	isDragged,
	onDrop,
	isConfigUpdated,
	isLoading,
}: DraggableProps) => {
	const dragOverHandler = (evt: DragEvent) => {
		evt.stopPropagation();
		evt.preventDefault();
	};

	return (
		<DraggableBox
			id={id}
			isLoading={isLoading}
			draggable={!isLoading}
			isDragged={isDragged}
			isConfigUpdated={isConfigUpdated}
			onDragStart={onDragStart}
			onDrag={onDrag}
			onDrop={onDrop}
			onDragOver={dragOverHandler}
			style={{ [DELTA_X]: `${dX}px`, [DELTA_Y]: `${dY}px` } as CSSProperties}
		>
			{isLoading && (dX || dY) ? (
				<CenterLoader>
					<LoadingIndicator />
				</CenterLoader>
			) : null}
			{children}
		</DraggableBox>
	);
};

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
	isSaved,
}: DraggableProps) => {
	const dragOverHandler = (evt: DragEvent) => {
		evt.stopPropagation();
		evt.preventDefault();
	};

	return (
		<DraggableBox
			id={id}
			isSaved={isSaved}
			draggable={!isSaved}
			isDragged={isDragged}
			isConfigUpdated={isConfigUpdated}
			onDragStart={onDragStart}
			onDrag={onDrag}
			onDrop={onDrop}
			onDragOver={dragOverHandler}
			style={{ [DELTA_X]: `${dX}px`, [DELTA_Y]: `${dY}px` } as CSSProperties}
		>
			{isSaved && (dX || dY) ? (
				<CenterLoader>
					<LoadingIndicator />
				</CenterLoader>
			) : null}
			{children}
		</DraggableBox>
	);
};

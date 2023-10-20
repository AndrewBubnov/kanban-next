import { Parameters, RecalculateProps } from '@/types';

export const recalculatePositions =
	({ draggedId, hoveredId }: RecalculateProps) =>
	(prevState: Parameters) => {
		const { status: draggedColumn, top: draggedTop, dY: draggedDY } = prevState[draggedId];
		const { status: hoveredColumn, top: hoveredTop, dY: hoveredDY } = prevState[hoveredId];
		if (draggedColumn === hoveredColumn) {
			return {
				...prevState,
				[hoveredId]: {
					...prevState[hoveredId],
					dY: draggedTop - hoveredTop + draggedDY,
				},
				[draggedId]: {
					...prevState[draggedId],
					dY: hoveredTop - draggedTop + hoveredDY,
				},
			};
		}

		return Object.keys(prevState).reduce((acc, el) => {
			const id = +el;
			if (prevState[id].status === hoveredColumn && prevState[id].top >= hoveredTop) {
				acc[id] = {
					...prevState[id],
					dY: prevState[id].dY + 166,
				};
				return acc;
			}
			acc[id] = prevState[id];
			return acc;
		}, {} as Parameters);
	};

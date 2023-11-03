import { Parameters, RecalculateProps } from '@/types';
import { SINGLE_VERTICAL_MOVE } from '@/constants';

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
			if (el === draggedId) {
				acc[el] = {
					...prevState[el],
					dY: hoveredTop - draggedTop + hoveredDY,
				};
				return acc;
			}
			if (prevState[el].status === hoveredColumn && prevState[el].top >= hoveredTop) {
				acc[el] = {
					...prevState[el],
					dY: prevState[el].dY + SINGLE_VERTICAL_MOVE,
				};
				return acc;
			}
			acc[el] = prevState[el];
			return acc;
		}, {} as Parameters);
	};

import { Parameters, RecalculateProps } from '@/types';
import { SINGLE_VERTICAL_MOVE } from '@/constants';

export const recalculatePositions =
	({ draggedId, hoveredId }: RecalculateProps) =>
	(prevState: Parameters) => {
		const { status: draggedStatus, top: draggedTop, dY: draggedDY } = prevState[draggedId];
		const { status: hoveredStatus, top: hoveredTop, dY: hoveredDY } = prevState[hoveredId];
		if (draggedStatus === hoveredStatus) {
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
					status: hoveredStatus,
					dY: hoveredTop - draggedTop + hoveredDY,
				};
				return acc;
			}
			if (prevState[el].status === hoveredStatus && prevState[el].top >= hoveredTop) {
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

import { Positions, Status } from '@/types';

export const applyHoveredColumn = (draggedId: number, status: Status) => (positions: Positions) => ({
	...positions,
	[draggedId]: { ...positions[draggedId], status },
});

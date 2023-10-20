import { Parameters, Status } from '@/types';

export const applyHoveredColumn = (draggedId: number, status: Status) => (positions: Parameters) => ({
	...positions,
	[draggedId]: { ...positions[draggedId], status },
});

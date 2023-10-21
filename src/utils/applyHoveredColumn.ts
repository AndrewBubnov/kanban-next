import { Parameters, Status } from '@/types';

export const applyHoveredColumn = (draggedId: string, status: Status) => (positions: Parameters) => ({
	...positions,
	[draggedId]: { ...positions[draggedId], status },
});

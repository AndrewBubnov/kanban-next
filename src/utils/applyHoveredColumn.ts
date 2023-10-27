import { Parameters } from '@/types';

export const applyHoveredColumn = (draggedId: string, status: string) => (positions: Parameters) => ({
	...positions,
	[draggedId]: { ...positions[draggedId], status },
});

import { Positions, TaskItem } from '@/types';

export const updateConfigInsert = (config: TaskItem[], pos: Positions) =>
	config.map(el => ({
		...el,
		status: pos[el.id].status,
	}));

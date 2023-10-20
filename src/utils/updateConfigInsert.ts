import { Parameters, TaskItem } from '@/types';

export const updateConfigInsert = (config: TaskItem[], pos: Parameters) =>
	config.map(el => ({
		...el,
		status: pos[el.id].status,
	}));

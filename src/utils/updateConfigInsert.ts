import { Positions, TaskItem } from '@/types';

export const updateConfigInsert = (config: TaskItem[], pos: Positions) =>
	config
		.map(el => ({
			...el,
			status: pos[el.id].status,
		}))
		.sort((el1, el2) => pos[el1.id].top + pos[el1.id].dY - pos[el2.id].top - pos[el2.id].dY);

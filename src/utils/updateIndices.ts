import { Parameters, TaskItem } from '@/types';

export const updateIndices = (config: TaskItem[], pos: Parameters) =>
	config
		.sort((el1, el2) => pos[el1.id].top + pos[el1.id].dY - pos[el2.id].top - pos[el2.id].dY)
		.map((el, index) => ({ ...el, index }));

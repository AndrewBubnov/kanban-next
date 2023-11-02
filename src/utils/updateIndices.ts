import { Parameters, TaskItem } from '@/types';

export const updateIndices = (config: TaskItem[], pos: Parameters) => {
	const Map = config.reduce(
		(acc, cur) => {
			if (!acc[cur.status]) {
				acc[cur.status] = [cur];
				return acc;
			} else {
				acc[cur.status].push(cur);
				return acc;
			}
		},
		{} as Record<string, TaskItem[]>
	);
	return Object.values(Map)
		.map(el =>
			el
				.sort((el1, el2) => pos[el1.id].top + pos[el1.id].dY - pos[el2.id].top - pos[el2.id].dY)
				.map((el, index) => ({ ...el, index }))
		)
		.flat();
};

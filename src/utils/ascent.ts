import { Positions, Status } from '../../types';

export const ascent = (positions: Positions, leftSiteStatus: Status | null, leftSiteIndex: number) => {
	if (!leftSiteStatus) return positions;
	return Object.keys(positions).reduce((acc, el) => {
		const id = +el;
		if (positions[id].status === leftSiteStatus && positions[id].index > leftSiteIndex) {
			acc[id] = {
				...positions[id],
				dY: positions[id].dY - 166,
				index: positions[id].index - 1,
			};
			return acc;
		}
		acc[id] = positions[id];
		return acc;
	}, {} as Positions);
};

import { Parameters, Status } from '@/types';

export const ascent = (leftSiteStatus: Status | null, leftSiteTop: number) => (positions: Parameters) => {
	if (!leftSiteStatus) return positions;
	return Object.keys(positions).reduce((acc, el) => {
		if (positions[el].status === leftSiteStatus && positions[el].top + positions[el].dY > leftSiteTop) {
			acc[el] = {
				...positions[el],
				dY: positions[el].dY - 166,
			};
			return acc;
		}
		acc[el] = positions[el];
		return acc;
	}, {} as Parameters);
};

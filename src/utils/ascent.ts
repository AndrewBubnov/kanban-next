import { Parameters, Status } from '@/types';
import { SINGLE_VERTICAL_MOVE } from '@/constants';

export const ascent = (leftSiteStatus: Status | null, leftSiteTop: number) => (positions: Parameters) => {
	if (!leftSiteStatus) return positions;
	return Object.keys(positions).reduce((acc, el) => {
		if (positions[el].status === leftSiteStatus && positions[el].top + positions[el].dY > leftSiteTop) {
			acc[el] = {
				...positions[el],
				dY: positions[el].dY - SINGLE_VERTICAL_MOVE,
			};
			return acc;
		}
		acc[el] = positions[el];
		return acc;
	}, {} as Parameters);
};

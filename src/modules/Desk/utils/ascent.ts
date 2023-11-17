import { SINGLE_VERTICAL_MOVE } from '@/modules/Desk/constants';
import { Parameters } from '@/modules/Desk/types';

export const ascent = (leftSiteStatus: string | null, leftSiteTop: number) => (positions: Parameters) => {
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

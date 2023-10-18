import { ColCoords, Positions, Status } from '@/types';

export const getInitPositions = (ref: HTMLDivElement) => {
	const columnDOMRects = {} as ColCoords;

	const cardPositions = Array.from(ref.children)
		.map(columnElement => {
			columnDOMRects[columnElement.id as Status] = columnElement.getBoundingClientRect();
			return Array.from(columnElement.children).filter(el => !!el.id);
		})
		.map(el =>
			el.reduce((acc, card) => {
				const [status, cardId] = card.id.split('-');
				const cardElement = card as HTMLDivElement;
				acc[+cardId] = {
					top: cardElement.offsetTop,
					left: cardElement.offsetLeft,
					width: cardElement.clientWidth,
					height: cardElement.clientHeight,
					dX: 0,
					dY: 0,
					status: status as Status,
				};
				return acc;
			}, {} as Positions)
		)
		.reduce((acc, cur) => {
			acc = { ...acc, ...cur };
			return acc;
		}, {} as Positions);
	return { cardPositions, columnDOMRects };
};

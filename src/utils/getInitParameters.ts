import { ColCoords, Parameters } from '@/types';
import { toJpeg } from 'html-to-image';

export const getInitParameters = async (ref: HTMLDivElement, parameters: Parameters) => {
	const columnDOMRects = {} as ColCoords;
	const elementList: { id: string; element: HTMLDivElement }[] = [];

	const cardPositions = Array.from(ref.children)
		.map(columnElement => {
			columnDOMRects[columnElement.id] = columnElement.getBoundingClientRect();
			return Array.from(columnElement.children).filter(el => !!el.id);
		})
		.map(el =>
			el.reduce((acc, card) => {
				const [status, cardId] = card.id.split(':');
				const cardElement = card as HTMLDivElement;
				if (!parameters[cardId]) elementList.push({ id: cardId, element: cardElement });
				acc[cardId] = {
					top: cardElement.offsetTop,
					left: cardElement.offsetLeft,
					width: cardElement.clientWidth,
					height: cardElement.clientHeight,
					dX: 0,
					dY: 0,
					imgSrc: parameters[cardId]?.imgSrc || '',
					status,
				};
				return acc;
			}, {} as Parameters)
		)
		.reduce((acc, cur) => {
			acc = { ...acc, ...cur };
			return acc;
		}, {} as Parameters);
	for (const item of elementList) {
		const imgSrc = await toJpeg(item.element);
		cardPositions[item.id] = { ...cardPositions[item.id], imgSrc };
	}
	return { cardPositions, columnDOMRects };
};

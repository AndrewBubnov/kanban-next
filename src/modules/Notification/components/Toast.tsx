import { useEffect, useState } from 'react';
import { StyledLink, ToastCloseIcon, ToastIconButton, ToastSpan, ToastWrapper } from '@/modules/Notification/styled';
import { DASHBOARD } from '@/modules/Shared/constants';
import { LAUNCH_TOAST, TOAST_GAP, TOAST_HEIGHT } from '@/modules/Notification/constants';
import { Move, ToastProps } from '../types';

export const Toast = ({ moves, onDelete, text, link }: ToastProps) => {
	const [vertical, setVertical] = useState<number>(0);
	const [horizontal, setHorizontal] = useState<string>('0px');

	useEffect(() => {
		moves.forEach(({ move, row, timeout }) =>
			setTimeout(() => {
				if (move === Move.UP || move === Move.DOWN) setVertical(-(TOAST_HEIGHT + TOAST_GAP) * row);
				if (move === Move.LEFT) setHorizontal(LAUNCH_TOAST);
				if (move === Move.RIGHT) setHorizontal('0px');
			}, timeout)
		);
	}, [moves]);

	return (
		<>
			<ToastWrapper style={{ transform: `translate3d(${horizontal}, ${vertical}px, 0px)` }}>
				<ToastSpan>
					{text}&nbsp;
					<StyledLink href={`${DASHBOARD}/${link}`} onClick={onDelete}>
						{link.slice(0, 4)}
					</StyledLink>
				</ToastSpan>
				<ToastIconButton onClick={onDelete}>
					<ToastCloseIcon />
				</ToastIconButton>
			</ToastWrapper>
		</>
	);
};

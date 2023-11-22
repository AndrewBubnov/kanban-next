import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Move, ToastProps } from '../types';
import { DASHBOARD } from '@/modules/Shared/constants';
import { LAUNCH_TOAST, TOAST_GAP, TOAST_HEIGHT } from '@/modules/Notification/constants';
import { StyledLink, ToastCloseIcon, ToastIconButton, ToastSpan, ToastWrapper } from '@/modules/Notification/styled';

export const Toast = ({ move, text, link, row, onDelete }: ToastProps) => {
	const [vertical, setVertical] = useState<number>(0);
	const [horizontal, setHorizontal] = useState<string>('0px');

	useEffect(() => {
		if (move === Move.UP || move === Move.DOWN) setVertical(-(TOAST_HEIGHT + TOAST_GAP) * row);
		if (move === Move.LEFT) setHorizontal(LAUNCH_TOAST);
		if (move === Move.RIGHT) setHorizontal('0px');
	}, [move, row]);

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

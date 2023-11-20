import { useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { Move, ToastProps } from '../types';
import { DASHBOARD } from '@/modules/Shared/constants';
import { LAUNCH_TOAST, TOAST_GAP, TOAST_HEIGHT } from '@/modules/Notification/constants';
import { StyledLink, ToastCloseIcon, ToastIconButton, ToastWrapper } from '@/modules/Notification/styled';

export const Toast = ({ moves, text, link, onDelete }: ToastProps) => {
	const [vertical, setVertical] = useState<number>(0);
	const [horizontal, setHorizontal] = useState<string>('0px');
	const [mountNumber, setMountNumber] = useState<number>(0);

	useEffect(() => () => setMountNumber(prevState => prevState + 1), []);

	const stringMoves = useMemo(() => JSON.stringify(moves), [moves]);

	useEffect(() => {
		if (process.env.NODE_ENV === 'development' && !mountNumber) return;

		(JSON.parse(stringMoves) as Move[]).forEach(({ move, timeout }) => {
			setTimeout(() => {
				if (move === 'up') setVertical(prevState => prevState - TOAST_HEIGHT - TOAST_GAP);
				if (move === 'left') setHorizontal(LAUNCH_TOAST);
				if (move === 'right') setHorizontal('0px');
				if (move.startsWith('down')) setVertical(prevState => prevState + TOAST_HEIGHT + TOAST_GAP);
			}, timeout);
		});
	}, [stringMoves, mountNumber]);

	return (
		<>
			<ToastWrapper style={{ transform: `translate3d(${horizontal}, ${vertical}px, 0px)` }}>
				<Box component="span">
					{text}&nbsp;
					<StyledLink href={`${DASHBOARD}/${link}`} onClick={onDelete}>
						{link.slice(0, 4)}
					</StyledLink>
				</Box>
				<ToastIconButton onClick={onDelete}>
					<ToastCloseIcon />
				</ToastIconButton>
			</ToastWrapper>
		</>
	);
};

import { useEffect, useMemo, useState } from 'react';
import { StyledLink, ToastCloseIcon, ToastIconButton, ToastWrapper } from '@/components/Toast/StyledComponents';
import { Box } from '@mui/material';
import { DASHBOARD } from '@/constants';
import { Move, ToastProps } from './types';
import { TOAST_GAP, TOAST_HEIGHT } from '@/components/Toast/constants';

export const Toast = ({ moves, text, link, onDelete }: ToastProps) => {
	const [vertical, setVertical] = useState<number>(0);
	const [horizontal, setHorizontal] = useState<string>('0px');
	const [mountNumber, setMountNumber] = useState<number>(0);

	useEffect(() => () => setMountNumber(prevState => prevState + 1), []);

	const stringMoves = useMemo(() => JSON.stringify(moves), [moves]);

	useEffect(() => {
		if (!mountNumber) return;
		(JSON.parse(stringMoves) as Move[]).forEach(({ move, timeout }) => {
			setTimeout(() => {
				if (move === 'up') setVertical(prevState => prevState - TOAST_HEIGHT - TOAST_GAP);
				if (move.startsWith('down')) setVertical(prevState => prevState + TOAST_HEIGHT + TOAST_GAP);
				if (move === 'left') setHorizontal('calc(-100% - 40px)');
				if (move === 'right') setHorizontal('0px');
			}, timeout);
		});
	}, [stringMoves, mountNumber]);

	return (
		<>
			<ToastWrapper style={{ transform: `translate3d(${horizontal}, ${vertical}px, 0px)` }}>
				<Box component="span">
					{text}&nbsp;
					<StyledLink href={`${DASHBOARD}/${link}`}>{link.slice(0, 4)}</StyledLink>
				</Box>
				<ToastIconButton onClick={onDelete}>
					<ToastCloseIcon />
				</ToastIconButton>
			</ToastWrapper>
		</>
	);
};

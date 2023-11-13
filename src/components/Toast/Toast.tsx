import { useEffect, useState } from 'react';
import { StyledLink, ToastCloseIcon, ToastIconButton, ToastWrapper } from '@/components/Toast/StyledComponents';
import { Box } from '@mui/material';
import { DASHBOARD } from '@/constants';
import { ToastProps } from './types';

export const Toast = ({ moves, text, link, onDelete }: ToastProps) => {
	const [style, setStyle] = useState({});

	useEffect(() => {
		moves.forEach(({ move, timeout }) => {
			setTimeout(() => setStyle({ transform: move }), timeout);
		});
	}, [moves]);

	const closeHandler = () => {
		const transformY = moves.at(-1)?.move.split(',')[1];
		setStyle({ transform: `translate3d(0px, ${transformY}, 0px)` });
		onDelete();
	};

	return (
		<>
			<ToastWrapper style={style}>
				<Box component="span">
					{text}&nbsp;
					<StyledLink href={`${DASHBOARD}/${link}`}>{link.slice(0, 4)}</StyledLink>
				</Box>
				<ToastIconButton onClick={closeHandler}>
					<ToastCloseIcon />
				</ToastIconButton>
			</ToastWrapper>
		</>
	);
};

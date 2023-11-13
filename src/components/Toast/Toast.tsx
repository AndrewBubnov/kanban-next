import { useEffect, useState } from 'react';
import { ToastCloseIcon, ToastIconButton, ToastWrapper } from '@/components/Toast/StyledComponents';
import { ToastProps } from './types';

export const Toast = ({ moves, text, onDelete }: ToastProps) => {
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
				{text}
				<ToastIconButton onClick={closeHandler}>
					<ToastCloseIcon />
				</ToastIconButton>
			</ToastWrapper>
		</>
	);
};

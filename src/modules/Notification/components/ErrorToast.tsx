import { useCallback, useEffect, useRef, useState } from 'react';
import {
	ErrorToastInnerWrapper,
	ErrorToastProgress,
	ErrorToastWrapper,
	ToastCloseIcon,
	ToastIconButton,
} from '@/modules/Notification/styled';
import { Box } from '@mui/material';
import { START_TOAST_POSITION, TOAST_OFFSET } from '@/modules/Notification/constants';
import { ErrorToastProps } from '@/modules/Notification/types';

export const ErrorToast = ({ isShown, onDelete, message, onTransitionEnd }: ErrorToastProps) => {
	const [horizontal, setHorizontal] = useState<string>(START_TOAST_POSITION);
	const [progress, setProgress] = useState<number>(100);

	const progressCounter = useRef<number>(500);

	const timer = useCallback(() => {
		window.setTimeout(() => {
			progressCounter.current = progressCounter.current - 1;
			if (progressCounter.current > 0) {
				setProgress(progressCounter.current / 5);
				timer();
			} else {
				onDelete();
			}
		}, 30);
	}, [onDelete]);

	useEffect(() => {
		if (isShown) {
			setTimeout(() => setHorizontal(`calc(200% + ${TOAST_OFFSET}px)`));
			timer();
			return;
		}
		setHorizontal(START_TOAST_POSITION);
	}, [isShown, timer]);

	return (
		<>
			<ErrorToastWrapper
				onTransitionEnd={onTransitionEnd}
				style={{ transform: `translate3d(${horizontal}, ${START_TOAST_POSITION}, ${START_TOAST_POSITION})` }}
			>
				<ErrorToastInnerWrapper>
					<Box sx={{ textAlign: 'center' }}>{message}</Box>
					<ErrorToastProgress width={progress} />
				</ErrorToastInnerWrapper>
				<ToastIconButton onClick={onDelete}>
					<ToastCloseIcon />
				</ToastIconButton>
			</ErrorToastWrapper>
		</>
	);
};

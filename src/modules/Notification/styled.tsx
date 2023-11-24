import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/CloseOutlined';
import { TOAST_ANIMATION_AND_DELAY_TIME, TOAST_HEIGHT } from '@/modules/Notification/constants';
import { ErrorToastProgressProps, ToastSpanProps } from '@/modules/Notification/types';

export const ToastWrapper = styled(Box)`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem 2rem 1rem 1rem;
	color: lightgray;
	width: 500px;
	height: ${TOAST_HEIGHT}px;
	background: slategray;
	bottom: 100px;
	left: 100%;
	border-radius: 5px;
	transition: transform ${TOAST_ANIMATION_AND_DELAY_TIME}ms cubic-bezier(0.39, -0.32, 0.22, 0.92);
`;

export const ErrorToastWrapper = styled(Box)`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem 2rem 1rem 1rem;
	color: lightgray;
	width: 500px;
	height: ${TOAST_HEIGHT}px;
	background: tomato;
	font-size: 0.9rem;
	bottom: 100px;
	left: -100%;
	border-radius: 5px;
	transition: transform ${TOAST_ANIMATION_AND_DELAY_TIME}ms cubic-bezier(0.39, -0.32, 0.22, 0.92);
`;

export const ErrorToastInnerWrapper = styled(Box)`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const ErrorToastProgress = styled(({ width, ...props }: ErrorToastProgressProps) => <Box {...props} />)`
	width: ${({ width }) => `${width}%`};
	height: 2px;
	background: lightgray;
`;
export const ToastIconButton = styled(IconButton)`
	position: absolute;
	top: 0;
	right: 0;
`;
export const ToastCloseIcon = styled(CloseIcon)`
	fill: lightgray;
	width: 1rem;
	height: 1rem;
	&:hover {
		fill: #fff;
	}
`;
export const StyledLink = styled(Link)`
	text-decoration: underline;
`;

export const ToastSpan = styled((props: ToastSpanProps) => <Box component="span" {...props} />)`
	text-align: center;
`;

import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/CloseOutlined';
import { TOAST_HEIGHT } from '@/modules/Notification/constants';
import { ToastSpanProps } from '@/modules/Notification/types';

export const ToastWrapper = styled(Box)`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem 2rem 1rem 1rem;
	color: lightgray;
	min-width: 500px;
	height: ${TOAST_HEIGHT}px;
	background: slategray;
	bottom: 100px;
	left: 100%;
	border-radius: 5px;
	transition: transform 0.3s ease-in-out;
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

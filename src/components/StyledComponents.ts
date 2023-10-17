'use client';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { Box, Card, CardContent, Grid } from '@mui/material';

export const StyledDialog = styled(Dialog)(() => ({
	'& .MuiPaper-root': {
		minWidth: '50%',
	},
}));

export const StyledModalButton = styled(Button)(() => ({
	'textTransform': 'none',
	'color': 'rgba(0, 0, 0, 0.87)',
	'&:focus': {
		outline: 'none',
	},
	'&:hover': {
		color: '#000',
	},
}));

export const StyledAddButton = styled(Button)(() => ({
	'textTransform': 'none',
	'fontSize': '1rem',
	'color': 'lightgray',
	'&:hover': {
		color: '#fff',
	},
	'&:focus': {
		outline: 'none',
	},
}));

export const StyledTaskMini = styled(Card)(() => ({
	height: 150,
}));

export const StyledTaskDetails = styled(Card)(() => ({
	minWidth: '50%',
	minHeight: '40%',
}));

export const Wrapper = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100vh',
	width: '100vw',
}));

export const IconContainer = styled(Grid)(() => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	width: 70,
}));

export const TitleContainer = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
}));

export const TitleText = styled(Box)(() => ({
	fontSize: '1.1rem',
	fontWeight: 600,
}));

export const Module = styled(Box)(() => ({
	marginBottom: '1.5rem',
}));

export const DarkGreyText = styled(Box)(() => ({
	color: 'darkgrey',
	fontWeight: 600,
}));

export const StyledCardContent = styled(CardContent)(() => ({
	'& .MuiTypography-root': {
		display: '-webkit-box',
		maxWidth: 180,
		WebkitBoxOrient: 'vertical',
		WebkitLineClamp: '3',
		wordBreak: 'break-word',
		overflow: 'hidden',
	},
}));

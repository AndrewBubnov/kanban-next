'use client';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { Box, Card, CardContent, Grid } from '@mui/material';
import Link from 'next/link';
import { DraggableBoxProps } from '@/types';
import { COMMON_TRANSITION, COMMON_TRANSLATE, DRAGGED_TRANSLATE } from '@/constants';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

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

export const MainContainer = styled(Box)(() => ({
	height: '100vh',
	overflowY: 'auto',
	padding: '1rem',
}));

export const FlexContainer = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: '0.5rem',
}));

export const DeskContainer = styled(Box)(() => ({
	gap: '1rem',
	maxWidth: 'calc(100vw - 4rem)',
	padding: '2rem',
	display: 'flex',
}));

export const Column = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	flex: 1,
	gap: '1rem',
	padding: '2vw',
}));

export const DraggableBox = styled(({ isDragged, isConfigUpdated, ...props }: DraggableBoxProps) => (
	<Box {...props} />
))<DraggableBoxProps>`
	transform: ${({ isDragged, isConfigUpdated }) => {
		const commonTranslate = isConfigUpdated ? '' : COMMON_TRANSLATE;
		return isDragged ? DRAGGED_TRANSLATE : commonTranslate;
	}};
	transition: ${({ isDragged, isConfigUpdated }) => (isDragged || isConfigUpdated ? '' : COMMON_TRANSITION)};
`;

export const ColumnName = styled(Box)(() => ({
	color: 'lightgray',
	fontSize: '1.25rem',
	textAlign: 'center',
}));

export const LightInputLabel = styled(InputLabel)(() => ({
	'color': 'lightgray',
	'&.Mui-focused': {
		color: '#fff',
	},
}));

export const LightSelect = styled(Select)(() => ({
	'color': 'lightgray',
	'&.Mui-focused': {
		color: '#fff',
	},
	'.MuiOutlinedInput-notchedOutline': {
		borderColor: 'darkgray',
	},
	'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
		borderColor: '#fff',
	},
	'&:hover .MuiOutlinedInput-notchedOutline': {
		borderColor: 'darkgray',
	},
	'.MuiSvgIcon-root ': {
		fill: 'lightgray !important',
	},
}));

export const HeaderContainer = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'row-reverse',
	alignItems: 'center',
	height: '4rem',
}));

export const ControlsContainer = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
}));

export const HeaderLink = styled(Link)(() => ({
	'fontSize': '1rem',
	'color': 'darkgrey',
	'marginRight': '2rem',
	'transition': 'color .3s',
	'&:hover': {
		color: '#fff',
	},
}));

export const StyledFormControl = styled(FormControl)(() => ({
	minWidth: 200,
}));

export const CenteredLink = styled(Link)(() => ({
	display: 'flex',
	alignItems: 'center',
}));

export const TitleContainer = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
}));

export const TitleText = styled(Box)(() => ({
	fontSize: '1.1rem',
	fontWeight: 600,
}));

export const ShortTitleText = styled(Box)(() => ({
	width: 150,
	textOverflow: 'ellipsis',
	overflow: 'hidden',
	whiteSpace: 'nowrap',
	fontSize: '1.1rem',
	fontWeight: 600,
}));

export const ShowFullViewIcon = styled(OpenInFullIcon)(() => ({
	width: '0.8rem',
	height: '0.8rem',
	marginLeft: '0.8rem',
}));

export const Module = styled(Box)(() => ({
	marginBottom: '1.5rem',
}));

export const DarkGreyText = styled(Box)(() => ({
	color: 'darkgrey',
	fontWeight: 600,
}));

export const Assignee = styled(Box)(() => ({
	maxWidth: 170,
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	color: 'darkgrey',
	fontSize: '0.7rem',
}));

export const HeroContainer = styled(Grid)(() => ({
	display: 'flex',
	justifyContent: 'center',
	color: '#fff',
	fontSize: '1.5rem',
	marginTop: '10rem',
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

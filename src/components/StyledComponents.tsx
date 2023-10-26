'use client';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { Box, Card, CardContent, Grid, IconButton } from '@mui/material';
import Link from 'next/link';
import { DraggableBoxProps, FlexContainerProps, FlexWrapperProps } from '@/types';
import { COMMON_TRANSITION, COMMON_TRANSLATE, DRAGGED_TRANSLATE } from '@/constants';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import IdentityIcon from '@mui/icons-material/PermIdentity';
import EditIcon from '@mui/icons-material/EditOutlined';

export const StyledDialog = styled(Dialog)(() => ({
	'& .MuiPaper-root': {
		minWidth: '50%',
	},
}));

export const StyledDialogContent = styled(DialogContent)(() => ({
	paddingTop: '5px !important',
}));

export const ButtonContainer = styled(Grid)(() => ({
	width: '40%',
	display: 'flex',
	justifyContent: 'space-between',
}));

export const StyledButton = styled(Button)(() => ({
	'textTransform': 'none',
	'color': '#000000DD',
	'padding': 0,
	'border': 'none',
	'&:focus': {
		outline: 'none',
	},
	'&:hover': {
		border: 'none',
		color: '#fff',
		background: '#00000080',
	},
}));

export const DeleteButton = styled(Button)(() => ({
	'textTransform': 'none',
	'color': 'tomato',
	'border': 'none',
	'&:focus': {
		outline: 'none',
	},
	'&:hover': {
		border: 'none',
		color: '#fff',
		background: 'tomato',
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

export const FlexContainer = styled(({ isReverse = true, marginTop = false, ...props }: FlexContainerProps) => (
	<Box {...props} />
))<FlexContainerProps>`
	display: flex;
	flex-direction: ${({ isReverse }) => (isReverse ? 'row-reverse' : 'row')};
	margin-top: ${({ marginTop }) => (marginTop ? '1rem' : 'unset')};
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.5rem;
`;

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

export const SmallIconButton = styled(IconButton)(() => ({
	padding: 0,
}));

export const CommentText = styled(Box)(() => ({
	paddingLeft: '0.5rem',
}));

export const FlexWrapper = styled(({ noJustify, ...props }: FlexWrapperProps) => <Box {...props} />)<FlexWrapperProps>`
	display: flex;
	align-items: center;
	justify-content: ${({ noJustify }) => (noJustify ? 'unset' : 'space-between')};
`;

export const CommentsContainer = styled(Box)(() => ({
	'maxHeight': 130,
	'borderRadius': 4,
	'padding': 5,
	'background': '#d3d3d345',
	'overflowY': 'auto',
	'&::-webkit-scrollbar': {
		width: 6,
	},

	'&::-webkit-scrollbar-track': {
		width: 6,
		backgroundColor: 'transparent',
		border: 'solid 1px transparent',
	},

	'&::-webkit-scrollbar-thumb': {
		backgroundColor: 'darkgray',
		border: 'solid 1px transparent',
		borderRadius: 6,
		backgroundClip: 'padding-box',
	},
}));
export const CommentWrapper = styled(Box)(() => ({
	marginBottom: '1.5rem',
	fontSize: '0.8rem',
}));

export const GrayIcon = styled(IdentityIcon)(() => ({
	fill: 'darkgray',
}));

export const SmallEditIcon = styled(EditIcon)(() => ({
	width: '1rem',
	height: '1rem',
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
	marginLeft: '1rem',
}));

export const CenteredLink = styled(Link)(() => ({
	display: 'flex',
	alignItems: 'center',
}));

export const TitleContainer = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
}));

export const TitleInnerContainer = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'flex-start',
	width: '100%',
}));

export const DateContainer = styled(Box)(() => ({
	minWidth: 70,
	fontSize: '0.68rem',
	color: 'darkgray',
	fontWeight: 600,
}));

export const TitleText = styled(Box)(() => ({
	fontSize: '1rem',
	fontWeight: 600,
	maxWidth: 'calc(100% - 120px)',
}));

export const ShortTitleText = styled(Box)(() => ({
	width: 150,
	textOverflow: 'ellipsis',
	overflow: 'hidden',
	whiteSpace: 'nowrap',
	fontSize: '1.1rem',
	fontWeight: 600,
}));

export const AddCommentTextField = styled(TextField)(() => ({
	paddingBottom: '0.5rem',
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
	fontSize: '1rem',
	fontWeight: 600,
}));

export const DarkGreyUsername = styled(Box)(() => ({
	color: 'darkgrey',
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

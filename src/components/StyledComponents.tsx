'use client';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { Box, Card, CardContent, Grid, IconButton, Switch, SwitchProps } from '@mui/material';
import Link from 'next/link';
import {
	ConditionalFullWidthProps,
	DraggableBoxProps,
	EditPageLinkProps,
	FlexContainerProps,
	TaggedSpanProps,
	ThemedActionButtonProps,
	ThemedColumnNameProps,
	ThemedIconProps,
	ThemedInputLabelProps,
	ThemedSelectProps,
	ThemedTextFieldProps,
} from '@/types';
import { COMMON_TRANSITION, COMMON_TRANSLATE, DRAGGED_TRANSLATE } from '@/constants';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import IdentityIcon from '@mui/icons-material/PermIdentity';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import BackIcon from '@mui/icons-material/ArrowBack';
import TableIcon from '@mui/icons-material/ViewWeekOutlined';
import DarkModeMuiIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeMuiIcon from '@mui/icons-material/LightModeOutlined';

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
export const FunctionalButton = styled(Button)(() => ({
	'textTransform': 'none',
	'background': 'rgba(211,211,211,0.4)',
	'color': '#00000080',
	'padding': '3px 7px',
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

export const FunctionalButtonWrapper = styled(Box)(() => ({
	display: 'flex',
	width: 180,
	justifyContent: 'space-between',
	padding: '0.5rem',
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

export const StyledActionButton = styled(({ isLight = false, ...props }: ThemedActionButtonProps) => (
	<Button {...props} />
))`
	text-transform: none;
	font-size: 1rem;
	color: ${({ isLight }) => (isLight ? '#1a1a1a' : 'lightgray')};
	border-color: ${({ isLight }) => (isLight ? '#1a1a1a' : 'lightgray')};
	&:hover {
		background: ${({ isLight }) => (isLight ? '#2f2f2f' : 'lightgray')};
		color: ${({ isLight }) => (isLight ? 'lightgray' : '#000')};
		border-color: ${({ isLight }) => (isLight ? '#2f2f2f' : 'lightgray')};
	}
	&:focus {
		outline: none;
	}
`;

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

export const FlexContainer = styled(
	({ isReverse = true, marginTop = false, justify = true, ...props }: FlexContainerProps) => <Box {...props} />
)<FlexContainerProps>`
	display: flex;
	flex-direction: ${({ isReverse }) => (isReverse ? 'row-reverse' : 'row')};
	margin-top: ${({ marginTop }) => (marginTop ? '1rem' : 'unset')};
	justify-content: ${({ justify }) => (justify ? 'space-between' : 'flex-start')};
	align-items: center;
	margin-bottom: 0.5rem;
`;

export const ConditionalFullWidth = styled(({ fullWidth, ...props }: ConditionalFullWidthProps) => (
	<FormControl {...props} />
))<ConditionalFullWidthProps>`
	width: ${({ fullWidth }) => (fullWidth ? '100%' : '48%')};
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

export const SmallIconTransparentButton = styled(IconButton)(() => ({
	padding: 2,
	opacity: 0,
	transition: 'opacity 0.3s ease',
}));

export const SmallIconButton = styled(IconButton)(() => ({
	'padding': 0,
	'marginLeft': '0.25rem',
	'&:hover': {
		background: 'darkgray',
	},
	'&:hover > svg': {
		fill: '#fff',
	},
}));

export const CommentText = styled(Box)(() => ({
	paddingLeft: '0.3rem',
}));

export const FlexWrapper = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
}));

export const SwitchWrapper = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	marginLeft: '1rem',
}));
export const FlexStartWrapper = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'flex-start',
	justifyContent: 'space-between',
}));

export const HoverSensitiveMenuItem = styled(MenuItem)`
	&:hover > button {
		opacity: 1;
	}
`;

export const CommentsContainer = styled(Box)(() => ({
	'height': 130,
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

export const RemainingTimeWrapper = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-end',
	fontSize: '0.9rem',
}));

export const NewColumnInputWrapper = styled(Box)(() => ({
	padding: '6px 16px',
}));

export const NewColumnLabel = styled(Box)(() => ({
	fontSize: '0.8rem',
}));

export const CustomColumnFormControl = styled(FormControl)(() => ({
	maxWidth: 170,
}));

export const GrayIcon = styled(IdentityIcon)(() => ({
	fill: 'darkgray',
}));

export const StyledEditIcon = styled(EditIcon)(() => ({
	fill: '#000000b5',
}));

export const StyledBackIcon = styled(BackIcon)(() => ({
	fill: '#000000b5',
}));

export const StyledTableIcon = styled(TableIcon)(() => ({
	fill: '#000000b5',
}));

export const SmallEditIcon = styled(EditIcon)(() => ({
	width: '1rem',
	height: '1rem',
}));

export const SmallMoreIcon = styled(MoreIcon)(() => ({
	width: '1rem',
	height: '1rem',
}));

export const SmallDeleteIcon = styled(DeleteIcon)(() => ({
	width: '1rem',
	height: '1rem',
}));

export const DraggableBox = styled(({ isDragged, isConfigUpdated, isSaved, ...props }: DraggableBoxProps) => (
	<Box {...props} />
))<DraggableBoxProps>`
	position: relative;
	user-select: none;
	transform: ${({ isDragged, isConfigUpdated }) => {
		const commonTranslate = isConfigUpdated ? '' : COMMON_TRANSLATE;
		return isDragged ? DRAGGED_TRANSLATE : commonTranslate;
	}};
	transition: ${({ isDragged, isConfigUpdated }) => (isDragged || isConfigUpdated ? '' : COMMON_TRANSITION)};
	&::after {
		content: '';
		position: absolute;
		display: ${({ isSaved }) => (isSaved ? 'block' : 'none')};
		top: 0;
		background: rgba(0, 0, 0, 0.25);
		width: 100%;
		height: 100%;
	}
`;

export const ColumnName = styled(({ isLight, ...props }: ThemedColumnNameProps) => <Box {...props} />)`
	color: ${({ isLight }) => (isLight ? '#1a1a1a' : 'lightgray')};
	font-size: 1.25rem;
	text-align: center;
`;

export const TaggedSpan = styled((props: TaggedSpanProps) => <Box {...props} component="span" />)`
	background: rgba(160, 160, 160, 0.4);
	padding: 0 2px;
	border-radius: 2px;
`;
export const CenterLoader = styled(Box)(() => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	zIndex: 10,
}));

export const LightInputLabel = styled(({ isLight, ...props }: ThemedInputLabelProps) => <InputLabel {...props} />)`
	color: ${({ isLight }) => (isLight ? '#1a1a1a' : 'lightgray')};
	&.Mui-focused {
		color: ${({ isLight }) => (isLight ? '#000' : '#fff')};
	}
`;

export const ThemedSelect = styled(({ isLight, ...props }: ThemedSelectProps) => <Select {...props} />)`
	color: ${({ isLight }) => (isLight ? '#1a1a1a' : 'lightgray')};
	&.MuiPaper-root-MuiPopover-paper-MuiMenu-paper {
		background: green;
	}
	&.Mui-focused {
		color: ${({ isLight }) => (isLight ? '#000' : '#fff')};
	}
	.MuiOutlinedInput-notchedOutline {
		border-color: ${({ isLight }) => (isLight ? '#1a1a1a' : 'lightgray')};
	}
	&.Mui-focused .MuiOutlinedInput-notchedOutline {
		border-color: ${({ isLight }) => (isLight ? '#000' : '#fff')};
	}
	&:hover .MuiOutlinedInput-notchedOutline {
		border-color: ${({ isLight }) => (isLight ? '#000' : '#fff')};
	}
	.MuiSvgIcon-root {
		fill: ${({ isLight }) => (isLight ? '#1a1a1a' : 'lightgray')};
	}
`;

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

export const CreateColumnInput = styled(({ isLight, ...props }: ThemedTextFieldProps) => <TextField {...props} />)`
	margin-top: 5px;
	.MuiOutlinedInput-notchedOutline {
		border-color: ${({ isLight }) => (isLight ? 'lightgray' : '#1a1a1a')};
	}
	&:hover .MuiOutlinedInput-notchedOutline {
		border-color: ${({ isLight }) => (isLight ? '#fff' : '#000')};
	}
	& .MuiOutlinedInput-root {
		& > input {
			padding: 5px;
			color: ${({ isLight }) => (isLight ? '#fff' : '#1a1a1a')};
		}
	}
`;

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
	marginLeft: '1rem',
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
}));

export const EditTaskLink = styled(({ color, paddingTop, ...props }: EditPageLinkProps) => (
	<Link {...props} />
))<EditPageLinkProps>`
	font-size: 0.9rem;
	line-height: 1rem;
	color: ${({ color }) => (color ? color : 'currentColor')};
	padding-top: ${({ paddingTop }) => (paddingTop ? `${paddingTop}px` : 'unset')};
`;

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
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '3rem',
	width: '100%',
	color: '#fff',
	fontSize: '1.5rem',
	marginTop: '10rem',
}));

export const LoadingIndicator = styled(Box)`
	width: 48px;
	height: 48px;
	border-radius: 50%;
	display: inline-block;
	border-top: 3px solid #fff;
	border-right: 3px solid transparent;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;

	@keyframes rotation {
		to {
			transform: rotate(360deg);
		}
	}
`;

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

export const StyledSwitch = styled((props: SwitchProps) => (
	<Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(() => ({
	'width': 42,
	'height': 26,
	'padding': 0,
	'margin': '0 0.5rem',
	'& .MuiSwitch-switchBase': {
		'padding': 0,
		'margin': 2,
		'transitionDuration': '300ms',
		'&.Mui-checked': {
			'transform': 'translateX(16px)',
			'color': 'lightgray',
			'& + .MuiSwitch-track': {
				backgroundColor: '#2ECA45',
				opacity: 1,
				border: 0,
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: 0.5,
			},
		},
		'&.Mui-focusVisible .MuiSwitch-thumb': {
			color: '#33cf4d',
			border: '6px solid #fff',
		},
		'&.Mui-disabled + .MuiSwitch-track': {
			opacity: 0.7,
		},
	},
	'& .MuiSwitch-thumb': {
		boxSizing: 'border-box',
		width: 22,
		height: 22,
	},
	'& .MuiSwitch-track': {
		borderRadius: 26 / 2,
		backgroundColor: 'lightgray',
		opacity: 1,
	},
}));

export const DarkModeIcon = styled(({ isLight, ...props }: ThemedIconProps) => <DarkModeMuiIcon {...props} />)`
	fill: ${({ isLight }) => (isLight ? '#1a1a1a' : 'lightgray')};
`;

export const LightModeIcon = styled(({ isLight, ...props }: ThemedIconProps) => <LightModeMuiIcon {...props} />)`
	fill: ${({ isLight }) => (isLight ? '#1a1a1a' : 'lightgray')};
`;

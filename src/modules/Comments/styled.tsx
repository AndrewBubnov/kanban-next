import { styled } from '@mui/material/styles';
import { Box, IconButton, Divider } from '@mui/material';
import TextField from '@mui/material/TextField';
import IdentityIcon from '@mui/icons-material/PermIdentity';
import Button from '@mui/material/Button';
import MoreIcon from '@mui/icons-material/MoreVert';

import { TaggedSpanProps } from '@/modules/Comments/types';
import { customScrollCSS } from '@/modules/Shared/styled';

export const CommentsContainer = styled(Box)(() => ({
	height: 130,
	borderRadius: 4,
	padding: 5,
	background: 'rgba(211,211,211,0.4)',
	overflowY: 'auto',
	...customScrollCSS,
}));
export const AddCommentTextField = styled(TextField)(() => ({
	paddingBottom: '0.5rem',
}));
export const CommentWrapper = styled(Box)(() => ({
	marginBottom: '1.5rem',
	fontSize: '0.8rem',
}));
export const GrayIcon = styled(IdentityIcon)(() => ({
	fill: 'darkgray',
}));
export const DarkGreyUsername = styled(Box)(() => ({
	color: 'darkgrey',
}));
export const FunctionalButtonWrapper = styled(Box)(() => ({
	display: 'flex',
	width: 180,
	justifyContent: 'space-between',
	padding: '0.5rem',
}));
export const FunctionalButton = styled(Button)(() => ({
	'textTransform': 'none',
	'background': '#708090',
	'color': 'lightgray',
	'padding': '3px 7px',
	'border': 'none',
	'&:focus': {
		outline: 'none',
	},
	'&:hover': {
		border: 'none',
		color: '#fff',
		background: '#434D57FF',
	},
}));
export const CommentText = styled(Box)(() => ({
	paddingLeft: '0.3rem',
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
export const SmallMoreIcon = styled(MoreIcon)(() => ({
	width: '1rem',
	height: '1rem',
}));
export const TaggedSpan = styled((props: TaggedSpanProps) => <Box {...props} component="span" />)`
	background: rgba(160, 160, 160, 0.4);
	padding: 0 2px;
	border-radius: 2px;
`;

export const StyledDivider = () => <Divider orientation="vertical" flexItem sx={{ background: '#708090' }} />;

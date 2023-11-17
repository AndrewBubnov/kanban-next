import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { ConditionalFullWidthProps } from '@/modules/Shared/types';
import FormControl from '@mui/material/FormControl';

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
export const ConditionalFullWidth = styled(({ fullWidth, ...props }: ConditionalFullWidthProps) => (
	<FormControl {...props} />
))`
	width: ${({ fullWidth }) => (fullWidth ? '100%' : '48%')};
`;

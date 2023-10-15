'use client';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Toolbar } from '@mui/material';

export const StyledDialog = styled(Dialog)(() => ({
	'& .MuiPaper-root': {
		minWidth: '50%',
	},
}));

export const StyledDialogActions = styled(DialogActions)(() => ({
	padding: '8px 20px 8px 8px',
}));

export const StyledModalButton = styled(Button)(() => ({
	'textTransform': 'none',
	'color': 'rgba(0, 0, 0, 0.87)',
	'&:focus': {
		outline: 'none',
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

export const StyledToolbar = styled(Toolbar)(() => ({
	display: 'flex',
	flexDirection: 'row-reverse',
}));

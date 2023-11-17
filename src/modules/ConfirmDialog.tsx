import { forwardRef, ReactElement, Ref } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { ConfirmDialogProps } from '@/types';
import { StyledButton } from '@/modules/StyledComponents';
import { DialogContentText } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: ReactElement<unknown>;
	},
	ref: Ref<unknown>
) {
	return (
		<Slide direction="down" ref={ref} {...props}>
			{props.children}
		</Slide>
	);
});

export const ConfirmDialog = ({ open, onCancel, onConfirm, title, text }: ConfirmDialogProps) => (
	<div>
		<Dialog open={open} TransitionComponent={Transition} keepMounted onClose={onCancel}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{text}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<StyledButton size="small" variant="outlined" onClick={onCancel}>
					Cancel
				</StyledButton>
				<StyledButton size="small" variant="outlined" onClick={onConfirm}>
					Confirm
				</StyledButton>
			</DialogActions>
		</Dialog>
	</div>
);

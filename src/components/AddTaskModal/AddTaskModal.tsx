import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { ModalProps } from '@/types';
import { StyledModalButton, StyledDialog, StyledDialogActions } from '@/components/StyledComponents';

export const AddTaskModal = ({ open, onConfirm, onCancel }: ModalProps) => {
	const [title, setTitle] = useState<string>('');
	const [body, setBody] = useState<string>('');
	const titleHandler = (evt: ChangeEvent<HTMLInputElement>) => setTitle(evt.target.value);
	const bodyHandler = (evt: ChangeEvent<HTMLInputElement>) => setBody(evt.target.value);
	const confirmHandler = () => onConfirm({ title, body });
	return (
		<StyledDialog open={open} onClose={onCancel}>
			<DialogTitle>Create new task</DialogTitle>
			<DialogContent>
				<Box>Task title</Box>
				<TextField onChange={titleHandler} margin="dense" variant="standard" fullWidth />
				<Box mt={2}>Task body</Box>
				<TextField onChange={bodyHandler} margin="dense" variant="outlined" fullWidth multiline rows={4} />
			</DialogContent>
			<StyledDialogActions>
				<StyledModalButton variant="text" onClick={onCancel}>
					Cancel
				</StyledModalButton>
				<StyledModalButton variant="text" onClick={confirmHandler}>
					Confirm
				</StyledModalButton>
			</StyledDialogActions>
		</StyledDialog>
	);
};

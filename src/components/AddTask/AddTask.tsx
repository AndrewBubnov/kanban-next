'use client';
import { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Grid } from '@mui/material';
import { StyledModalButton, StyledDialog, StyledDialogActions, StyledAddButton } from '@/components/StyledComponents';
import { addTask } from '@/prismaActions/addTask';

export const AddTask = ({ userId }: { userId: string }) => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const toggleOpenHandler = () => setOpenModal(prevState => !prevState);
	const confirmHandler = async () => {
		await addTask({ title, body }, userId);
		setOpenModal(false);
	};
	const [title, setTitle] = useState<string>('');
	const [body, setBody] = useState<string>('');
	const titleHandler = (evt: ChangeEvent<HTMLInputElement>) => setTitle(evt.target.value);
	const bodyHandler = (evt: ChangeEvent<HTMLInputElement>) => setBody(evt.target.value);
	return (
		<>
			<Grid container mt={1}>
				<StyledAddButton variant="text" onClick={toggleOpenHandler}>
					Add new
				</StyledAddButton>
			</Grid>
			<StyledDialog open={openModal} onClose={toggleOpenHandler}>
				<DialogTitle>Create new task</DialogTitle>
				<DialogContent>
					<Box>Task title</Box>
					<TextField onChange={titleHandler} margin="dense" variant="standard" fullWidth />
					<Box mt={2}>Task body</Box>
					<TextField onChange={bodyHandler} margin="dense" variant="outlined" fullWidth multiline rows={4} />
				</DialogContent>
				<StyledDialogActions>
					<StyledModalButton variant="text" onClick={toggleOpenHandler}>
						Cancel
					</StyledModalButton>
					<StyledModalButton variant="text" onClick={confirmHandler}>
						Confirm
					</StyledModalButton>
				</StyledDialogActions>
			</StyledDialog>
		</>
	);
};

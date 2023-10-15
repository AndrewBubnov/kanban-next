'use client';
import { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Grid } from '@mui/material';
import { StyledModalButton, StyledDialog, StyledAddButton } from '@/components/StyledComponents';
import { addTask } from '@/prismaActions/addTask';

export const AddTask = ({ userId }: { userId: string }) => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const toggleOpenHandler = () => setOpenModal(prevState => !prevState);
	const confirmHandler = async () => {
		if (!title) return;
		await addTask({ title, body: description }, userId);
		setOpenModal(false);
	};
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const titleHandler = (evt: ChangeEvent<HTMLInputElement>) => setTitle(evt.target.value);
	const descriptionHandler = (evt: ChangeEvent<HTMLInputElement>) => setDescription(evt.target.value);
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
					<form action={confirmHandler}>
						<Box>Task title</Box>
						<TextField
							onChange={titleHandler}
							value={title}
							name="title"
							margin="dense"
							variant="standard"
							fullWidth
						/>
						<Box mt={2}>Task body</Box>
						<TextField
							onChange={descriptionHandler}
							value={description}
							margin="dense"
							variant="outlined"
							name="body"
							fullWidth
							multiline
							rows={4}
						/>
						<Grid container flexDirection="row-reverse">
							<StyledModalButton variant="text" onClick={toggleOpenHandler}>
								Cancel
							</StyledModalButton>
							<StyledModalButton type="submit" variant="text">
								Confirm
							</StyledModalButton>
						</Grid>
					</form>
				</DialogContent>
			</StyledDialog>
		</>
	);
};

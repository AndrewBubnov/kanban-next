'use client';
import { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Grid } from '@mui/material';
import { StyledModalButton, StyledDialog, StyledAddButton } from '@/components/StyledComponents';
import { addTask } from '@/prismaActions/addTask';
import { CardForm } from '@/components/CardForm/CardForm';

export const AddTask = ({ userId }: { userId: string }) => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const toggleOpenHandler = () => setOpenModal(prevState => !prevState);
	const confirmHandler = async (data: FormData) => {
		const title = data.get('title') as string;
		const description = data.get('description') as string;
		if (!title) return;
		await addTask({ title, description }, userId);
		setOpenModal(false);
	};
	return (
		<>
			<Grid container>
				<StyledAddButton variant="text" onClick={toggleOpenHandler}>
					Add new
				</StyledAddButton>
			</Grid>
			<StyledDialog open={openModal} onClose={toggleOpenHandler}>
				<DialogTitle>Create new task</DialogTitle>
				<DialogContent>
					<CardForm onCancel={toggleOpenHandler} onConfirm={confirmHandler} />
				</DialogContent>
			</StyledDialog>
		</>
	);
};

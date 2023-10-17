'use client';
import { useState } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import { StyledDialog, StyledAddButton } from '@/components/StyledComponents';
import { CardFormCreate } from '@/components/CardFormCreate/CardFormCreate';

export const AddTask = ({ userId }: { userId: string }) => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const toggleOpenHandler = () => setOpenModal(prevState => !prevState);
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
					<CardFormCreate onCancel={toggleOpenHandler} />
				</DialogContent>
			</StyledDialog>
		</>
	);
};

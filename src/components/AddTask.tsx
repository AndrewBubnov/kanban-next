'use client';
import { useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import { StyledDialog, StyledAddButton, StyledDialogContent } from '@/components/StyledComponents';
import { CardFormCreate } from '@/components/CardFormCreate';
import { AddTaskProps } from '@/types';

export const AddTask = ({ userIdsArray, isAdmin }: AddTaskProps) => {
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
				<StyledDialogContent>
					<CardFormCreate userIdsArray={userIdsArray} isAdmin={isAdmin} onCancel={toggleOpenHandler} />
				</StyledDialogContent>
			</StyledDialog>
		</>
	);
};

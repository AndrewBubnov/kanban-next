'use client';
import { useContext, useState } from 'react';
import { DashboardContext } from '@/components/DashboardProvider';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import { StyledDialog, StyledActionButton, StyledDialogContent } from '@/components/StyledComponents';
import { TaskFormCreate } from '@/components/TaskFormCreate';

export const AddTask = () => {
	const { userIdsArray, isAdmin } = useContext(DashboardContext);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const toggleOpenHandler = () => setOpenModal(prevState => !prevState);
	return (
		<>
			<Grid container>
				<StyledActionButton variant="text" onClick={toggleOpenHandler}>
					Add new
				</StyledActionButton>
			</Grid>
			<StyledDialog open={openModal} onClose={toggleOpenHandler}>
				<DialogTitle>Create a new task</DialogTitle>
				<StyledDialogContent>
					<TaskFormCreate userIdsArray={userIdsArray} isAdmin={isAdmin} onCancel={toggleOpenHandler} />
				</StyledDialogContent>
			</StyledDialog>
		</>
	);
};

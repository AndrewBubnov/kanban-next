'use client';
import { useContext, useState } from 'react';
import { DashboardContext } from '@/modules/DashboardProvider';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import { StyledDialog, StyledActionButton, StyledDialogContent } from '@/modules/StyledComponents';
import { TaskCreateForm } from '@/modules/TaskCreateForm';

export const CreateTask = () => {
	const { userIdsArray, isAdmin, isLight } = useContext(DashboardContext);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const toggleOpenHandler = () => setOpenModal(prevState => !prevState);

	return (
		<>
			<Grid container>
				<StyledActionButton variant="outlined" onClick={toggleOpenHandler} isLight={isLight}>
					Create new
				</StyledActionButton>
			</Grid>
			<StyledDialog open={openModal} onClose={toggleOpenHandler}>
				<DialogTitle>Create a new task</DialogTitle>
				<StyledDialogContent>
					<TaskCreateForm userIdsArray={userIdsArray} isAdmin={isAdmin} onCancel={toggleOpenHandler} />
				</StyledDialogContent>
			</StyledDialog>
		</>
	);
};

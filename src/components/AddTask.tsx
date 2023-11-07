'use client';
import { useContext, useState } from 'react';
import { ControlsContext } from '@/components/ControlsProvider';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import { StyledDialog, StyledActionButton, StyledDialogContent } from '@/components/StyledComponents';
import { CardFormCreate } from '@/components/CardFormCreate';

export const AddTask = () => {
	const { userIdsArray, isAdmin } = useContext(ControlsContext);
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
				<DialogTitle>Create new task</DialogTitle>
				<StyledDialogContent>
					<CardFormCreate userIdsArray={userIdsArray} isAdmin={isAdmin} onCancel={toggleOpenHandler} />
				</StyledDialogContent>
			</StyledDialog>
		</>
	);
};

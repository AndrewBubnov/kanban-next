'use client';
import { useState } from 'react';
import { AddTaskModal } from '@/components/AddTaskModal/AddTaskModal';
import { addTask } from '@/prismaActions/addTask';
import { AppBar } from '@mui/material';
import { StyledAddButton, StyledToolbar } from '@/components/StyledComponents';
import { TaskContent } from '@/types';

export const Header = ({ userId }: { userId: string }) => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const toggleOpenHandler = () => setOpenModal(prevState => !prevState);
	const confirmHandler = async (task: TaskContent) => {
		await addTask(task, userId);
		setOpenModal(false);
	};
	return (
		<AppBar position="static" color="transparent">
			<StyledToolbar>
				<StyledAddButton variant="text" onClick={toggleOpenHandler}>
					Add new
				</StyledAddButton>
				<AddTaskModal open={openModal} onConfirm={confirmHandler} onCancel={toggleOpenHandler} />
			</StyledToolbar>
		</AppBar>
	);
};

'use client';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { DarkGreyText, FlexContainer, FlexWrapper } from '@/modules/Shared/styled';
import { ChangeEvent, useState } from 'react';
import { updateSingleTask } from '@/modules/CreateAndUpdateTask/actions/updateSingleTask';
import { useRouter } from 'next/navigation';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CardAssigneeSelect } from '@/modules/CreateAndUpdateTask/components/CardAssigneeSelect';
import { deleteTask } from '@/modules/CreateAndUpdateTask/actions/deleteTask';
import { ConfirmDialog } from '@/modules/CreateAndUpdateTask/components/ConfirmDialog';
import { CardEstimateSelect } from '@/modules/CreateAndUpdateTask/components/CardEstimateSelect';
import {
	DELETE_TASK_ERROR_MESSAGE,
	estimation,
	UPDATE_TASK_ERROR_MESSAGE,
} from '@/modules/CreateAndUpdateTask/constants';
import { DASHBOARD } from '@/modules/Shared/constants';
import { CardFormUpdateProps } from '@/modules/CreateAndUpdateTask/types';
import { ButtonContainer, DeleteButton, StyledButton } from '@/modules/CreateAndUpdateTask/styled';
import { emitErrorNotification } from '@/modules/Notification/components/ErrorNotificationEmitter';

export const TaskUpdateForm = ({
	task: {
		id: taskId,
		title: initTitle,
		description: initDescription,
		status: initStatus,
		assignee: { userId },
		estimateDays,
		createdAt,
	},
	isAdmin,
	userIdsArray,
	statusList,
}: CardFormUpdateProps) => {
	const { push } = useRouter();
	const [assigneeId, setAssigneeId] = useState<string>(userId);
	const [title, setTitle] = useState<string>(initTitle);
	const [description, setDescription] = useState<string>(initDescription);
	const [status, setStatus] = useState<string>(initStatus);
	const [open, setOpen] = useState(false);
	const [estimateDaysState, setEstimateDaysState] = useState<string>(
		estimateDays ? estimation.find(el => el.startsWith(String(estimateDays))) || '' : ''
	);

	const deleteCancelHandler = () => setOpen(false);
	const deleteConfirmHandler = async () => {
		try {
			await deleteTask(taskId);
			push(DASHBOARD);
		} catch {
			setOpen(false);
			emitErrorNotification(DELETE_TASK_ERROR_MESSAGE);
		}
	};
	const deleteClickHandler = () => setOpen(true);
	const titleHandler = (evt: ChangeEvent<HTMLInputElement>) => setTitle(evt.target.value);
	const descriptionHandler = (evt: ChangeEvent<HTMLInputElement>) => setDescription(evt.target.value);
	const statusHandler = (event: SelectChangeEvent) => setStatus(event.target.value);
	const cancelHandler = () => push(`${DASHBOARD}/${taskId}`);
	const confirmHandler = async () => {
		if (!title) return;
		const updatedTaskData = { title, description, status, estimateDays: parseFloat(estimateDaysState) || 0 };
		try {
			await updateSingleTask(assigneeId, taskId, updatedTaskData);
			cancelHandler();
		} catch {
			emitErrorNotification(UPDATE_TASK_ERROR_MESSAGE);
		}
	};

	return (
		<>
			<form action={confirmHandler}>
				{isAdmin && (
					<FlexWrapper>
						<CardAssigneeSelect userId={userId} setAssigneeId={setAssigneeId} userIdsArray={userIdsArray} />
						<CardEstimateSelect
							createdAt={createdAt}
							estimateDays={estimateDaysState}
							setEstimateDays={setEstimateDaysState}
							fullWidth={!isAdmin}
						/>
					</FlexWrapper>
				)}
				<Box mt={2}>Title</Box>
				<TextField onChange={titleHandler} value={title} name="title" margin="dense" fullWidth />
				<Box mt={2}>
					<FormControl fullWidth>
						<InputLabel id="status">Status</InputLabel>
						<Select value={status} label="Status" onChange={statusHandler}>
							{statusList.map(el => (
								<MenuItem key={el.name} value={el.name}>
									{el.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box mt={2}>Description</Box>
				<TextField
					onChange={descriptionHandler}
					value={description}
					margin="dense"
					variant="outlined"
					name="description"
					fullWidth
					multiline
					rows={4}
				/>
				<FlexContainer isReverse={!isAdmin} marginTop justify>
					{isAdmin && <DeleteButton onClick={deleteClickHandler}>Delete</DeleteButton>}
					<ButtonContainer>
						<StyledButton size="small" variant="outlined" onClick={cancelHandler}>
							Cancel
						</StyledButton>
						<StyledButton type="submit" size="small" variant="outlined">
							Update
						</StyledButton>
					</ButtonContainer>
				</FlexContainer>
			</form>
			<ConfirmDialog
				title={
					<span>
						Are you sure you want to remove task{' '}
						<DarkGreyText component="span">{taskId.slice(0, 4)}</DarkGreyText>?
					</span>
				}
				text={title}
				open={open}
				onCancel={deleteCancelHandler}
				onConfirm={deleteConfirmHandler}
			/>
		</>
	);
};

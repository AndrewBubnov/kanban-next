import { useState } from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { ButtonContainer, FlexContainer, FlexWrapper, StyledButton } from '@/modules/StyledComponents';
import { CardFormCreateProps } from '@/types';
import { createTask } from '@/actions/createTask';
import { CardAssigneeSelect } from '@/modules/CardAssigneeSelect';
import { useUser } from '@clerk/nextjs';
import { CardEstimateSelect } from '@/modules/CardEstimateSelect';

export const TaskCreateForm = ({ userIdsArray, isAdmin, onCancel }: CardFormCreateProps) => {
	const { user } = useUser();

	const userId = user?.id || '';
	const [assigneeId, setAssigneeId] = useState<string>(userId);
	const [estimateDays, setEstimateDays] = useState<string>('');

	const confirmHandler = async (data: FormData) => {
		const title = data.get('title') as string;
		const description = data.get('description') as string;
		if (!title) return;
		await createTask({ title, description, userId: assigneeId, estimateDays });
		onCancel();
	};

	return (
		<form action={confirmHandler}>
			<FlexWrapper>
				{isAdmin ? (
					<CardAssigneeSelect userId={userId} setAssigneeId={setAssigneeId} userIdsArray={userIdsArray} />
				) : null}
				<CardEstimateSelect
					createdAt={new Date(Date.now())}
					estimateDays={estimateDays}
					setEstimateDays={setEstimateDays}
					fullWidth={!isAdmin}
				/>
			</FlexWrapper>
			<Box mt={2}>Title</Box>
			<TextField name="title" margin="dense" fullWidth />
			<Box mt={2}>Description</Box>
			<TextField margin="dense" variant="outlined" name="description" fullWidth multiline rows={4} />
			<FlexContainer isReverse marginTop>
				<ButtonContainer>
					<StyledButton size="small" variant="outlined" onClick={onCancel}>
						Cancel
					</StyledButton>
					<StyledButton type="submit" size="small" variant="outlined">
						Confirm
					</StyledButton>
				</ButtonContainer>
			</FlexContainer>
		</form>
	);
};

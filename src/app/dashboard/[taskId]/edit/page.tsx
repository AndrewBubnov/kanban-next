import { StyledBackIcon, Wrapper } from '@/modules/Shared/styled';
import Link from 'next/link';
import { CardContent, Grid } from '@mui/material';
import { getTaskById } from '@/app/dashboard/[taskId]/edit/actions/getTaskById';
import { TaskUpdateForm } from '@/modules/CreateAndUpdateTask/components/TaskUpdateForm';
import { getUser } from '@/app/dashboard/[taskId]/edit/actions/getUser';
import { getMappedUserIds } from '@/modules/Shared/actions/getMappedUserIds';
import { IconContainer, StyledTaskDetails } from '@/app/dashboard/[taskId]/styled';
import { DASHBOARD } from '@/modules/Shared/constants';
import { TaskIdParam } from '@/app/dashboard/[taskId]/edit/types';
import { StyledTableIcon } from '@/app/dashboard/[taskId]/edit/styled';

const TaskEdit = async ({ params: { taskId } }: TaskIdParam) => {
	const { isAdmin } = await getUser();
	const task = await getTaskById(taskId);
	const userIdsArray = await getMappedUserIds();

	return (
		<Wrapper>
			<StyledTaskDetails>
				<CardContent>
					<Grid container flexDirection="row-reverse">
						<IconContainer>
							<Link href={DASHBOARD}>
								<StyledTableIcon />
							</Link>
							<Link href={`${DASHBOARD}/${taskId}`}>
								<StyledBackIcon />
							</Link>
						</IconContainer>
					</Grid>
					<TaskUpdateForm task={task} isAdmin={isAdmin} userIdsArray={userIdsArray} />
				</CardContent>
			</StyledTaskDetails>
		</Wrapper>
	);
};

export default TaskEdit;

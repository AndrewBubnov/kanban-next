import { IconContainer, StyledTaskDetails, Wrapper } from '@/components/StyledComponents';
import { CardContent, Grid } from '@mui/material';
import { TaskIdParam } from '@/types';
import { getTaskById } from '@/actions/getTaskById';
import { CardFormUpdate } from '@/components/CardFormUpdate';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TableIcon from '@mui/icons-material/ViewWeekOutlined';
import { getUser } from '@/actions/getUser';
import { getMappedUserIds } from '@/actions/getMappedUserIds';

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
							<Link href={'/dashboard'}>
								<TableIcon />
							</Link>
							<Link href={`/dashboard/${taskId}`}>
								<ArrowBackIcon />
							</Link>
						</IconContainer>
					</Grid>
					<CardFormUpdate task={task} isAdmin={isAdmin} userIdsArray={userIdsArray} />
				</CardContent>
			</StyledTaskDetails>
		</Wrapper>
	);
};

export default TaskEdit;

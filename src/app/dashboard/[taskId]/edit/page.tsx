import {
	IconContainer,
	StyledBackIcon,
	StyledTableIcon,
	StyledTaskDetails,
	Wrapper,
} from '@/components/StyledComponents';
import Link from 'next/link';
import { CardContent, Grid } from '@mui/material';
import { TaskIdParam } from '@/types';
import { getTaskById } from '@/actions/getTaskById';
import { CardFormUpdate } from '@/components/CardFormUpdate';
import { getUser } from '@/actions/getUser';
import { getMappedUserIds } from '@/actions/getMappedUserIds';
import { DASHBOARD } from '@/constants';

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
					<CardFormUpdate task={task} isAdmin={isAdmin} userIdsArray={userIdsArray} />
				</CardContent>
			</StyledTaskDetails>
		</Wrapper>
	);
};

export default TaskEdit;

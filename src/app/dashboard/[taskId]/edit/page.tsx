import { StyledTaskDetails, Wrapper } from '@/components/StyledComponents';
import { CardContent, Grid } from '@mui/material';
import { TaskIdParam } from '@/types';
import { getTaskById } from '@/actions/getTaskById';
import { CardFormUpdate } from '@/components/CardFormUpdate/CardFormUpdate';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TaskEdit = async ({ params: { taskId } }: TaskIdParam) => {
	const task = await getTaskById(taskId);
	return (
		<Wrapper>
			<StyledTaskDetails>
				<CardContent>
					<Grid container flexDirection="row-reverse">
						<Link href={`/dashboard/${taskId}`}>
							<ArrowBackIcon />
						</Link>
					</Grid>
					<CardFormUpdate
						initTitle={task?.title}
						initDescription={task?.description}
						taskId={+taskId}
						initStatus={task?.status}
					/>
				</CardContent>
			</StyledTaskDetails>
		</Wrapper>
	);
};

export default TaskEdit;

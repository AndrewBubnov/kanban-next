import { getTaskById } from '@/actions/getTaskById';
import { StyledTaskDetails, Wrapper } from '@/components/StyledComponents';
import { Box, CardActions, CardContent, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Status, TaskIdParam } from '@/types';
import { ColumnNameDTO } from '@/constants';

const TaskDetails = async ({ params: { taskId } }: TaskIdParam) => {
	const task = await getTaskById(taskId);
	console.log(task);

	return (
		<Wrapper>
			<StyledTaskDetails>
				<CardContent>
					<Grid container justifyContent="space-between">
						<Typography>
							<Box component="span" sx={{ color: 'darkgrey', fontWeight: 600 }}>
								{task?.id}.&nbsp;
							</Box>
							<Box component="span" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
								{task?.title}
							</Box>
						</Typography>
						<Grid item sx={{ display: 'flex', justifyContent: 'space-between', width: 70 }}>
							<Link href={`/dashboard/${taskId}/edit`}>
								<EditIcon />
							</Link>
							<Link href={'/dashboard'}>
								<ArrowBackIcon />
							</Link>
						</Grid>
					</Grid>
					<Box mt={2} sx={{ color: 'darkgrey', fontWeight: 600 }}>
						Status
					</Box>
					<Typography mt={1}>{ColumnNameDTO[task?.status as Status]}</Typography>
					<Box mt={2} sx={{ color: 'darkgrey', fontWeight: 600 }}>
						Description
					</Box>
					<Typography mt={1}>{task?.description}</Typography>
				</CardContent>
				<CardActions></CardActions>
			</StyledTaskDetails>
		</Wrapper>
	);
};
export default TaskDetails;

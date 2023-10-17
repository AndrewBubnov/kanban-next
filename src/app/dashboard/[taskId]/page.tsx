import { getTaskById } from '@/actions/getTaskById';
import {
	DarkGreyText,
	TitleContainer,
	IconContainer,
	StyledTaskDetails,
	Wrapper,
	Module,
	TitleText,
} from '@/components/StyledComponents';
import { Box, CardActions, CardContent, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/EditOutlined';
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
					<Module>
						<Grid container justifyContent="space-between">
							<TitleContainer>
								<DarkGreyText>{task?.id}.&nbsp;</DarkGreyText>
								<TitleText>{task?.title}</TitleText>
							</TitleContainer>
							<IconContainer>
								<Link href={`/dashboard/${taskId}/edit`}>
									<EditIcon />
								</Link>
								<Link href={'/dashboard'}>
									<ArrowBackIcon />
								</Link>
							</IconContainer>
						</Grid>
					</Module>
					<Module>
						<DarkGreyText>Status</DarkGreyText>
						<Typography mt={1}>{ColumnNameDTO[task?.status as Status]}</Typography>
					</Module>
					<Module>
						<DarkGreyText>Description</DarkGreyText>
						<Typography mt={1}>{task?.description}</Typography>
					</Module>
				</CardContent>
				<CardActions></CardActions>
			</StyledTaskDetails>
		</Wrapper>
	);
};
export default TaskDetails;

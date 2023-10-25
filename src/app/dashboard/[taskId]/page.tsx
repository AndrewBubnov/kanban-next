import { getTaskById } from '@/actions/getTaskById';
import {
	DarkGreyText,
	TitleContainer,
	IconContainer,
	StyledTaskDetails,
	Wrapper,
	Module,
	TitleText,
	FlexContainer,
	TitleInnerContainer,
	DateContainer,
} from '@/components/StyledComponents';
import { CardActions, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/EditOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Status, TaskIdParam } from '@/types';
import { ColumnNameDTO, DASHBOARD } from '@/constants';
import { getStringDate } from '@/utils/getStringDate';

const Dashboard = async ({ params: { taskId } }: TaskIdParam) => {
	const task = await getTaskById(taskId);

	return (
		<Wrapper>
			<StyledTaskDetails>
				<CardContent>
					<FlexContainer>
						<DarkGreyText>{`${task.assignee.username} ${task.assignee.email}`}</DarkGreyText>
						<IconContainer>
							<Link href={`/dashboard/${taskId}/edit`}>
								<EditIcon />
							</Link>
							<Link href={DASHBOARD}>
								<ArrowBackIcon />
							</Link>
						</IconContainer>
					</FlexContainer>
					<Module>
						<TitleContainer>
							<TitleInnerContainer>
								<DarkGreyText>{task?.id.slice(0, 4)}&nbsp;</DarkGreyText>
								<TitleText>{task?.title}</TitleText>
							</TitleInnerContainer>
							<DateContainer>{getStringDate(task.createdAt)}</DateContainer>
						</TitleContainer>
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
export default Dashboard;

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
	FlexStartWrapper,
} from '@/components/StyledComponents';
import { Box, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/EditOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TaskIdParam } from '@/types';
import { DASHBOARD } from '@/constants';
import { getStringDate } from '@/utils/getStringDate';
import { CommentsModule } from '@/components/CommentsModule';
import { EstimatedTime } from '@/components/EstimatedTime';

const Details = async ({ params: { taskId } }: TaskIdParam) => {
	const task = await getTaskById(taskId);
	const editPage = `${DASHBOARD}/${taskId}/edit`;

	return (
		<Wrapper>
			<StyledTaskDetails>
				<CardContent>
					<FlexContainer>
						<DarkGreyText>{`${task.assignee.username} ${task.assignee.email}`}</DarkGreyText>
						<IconContainer>
							<Link href={editPage}>
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
						<FlexStartWrapper>
							<Box>
								<DarkGreyText>Status</DarkGreyText>
								<Typography mt={1}>{task?.status}</Typography>
							</Box>
							<EstimatedTime task={task} editPage={editPage} />
						</FlexStartWrapper>
					</Module>
					<Module>
						<DarkGreyText>Description</DarkGreyText>
						<Typography mt={1}>{task?.description}</Typography>
					</Module>
					<CommentsModule task={task} />
				</CardContent>
			</StyledTaskDetails>
		</Wrapper>
	);
};
export default Details;

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
	StyledBackIcon,
	StyledEditIcon,
	FlexWrapper,
} from '@/components/StyledComponents';
import { Box, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import { TaskIdParam } from '@/types';
import { DASHBOARD } from '@/constants';
import { getStringDate } from '@/utils/getStringDate';
import { CommentsList } from '@/components/CommentsList';
import { EstimatedTime } from '@/components/EstimatedTime';
import { getMappedUserIds } from '@/actions/getMappedUserIds';
import { DetailsProvider } from '@/components/DetailsProvider';
import { UserPhoto } from '@/components/UserPhoto';

const Details = async ({ params: { taskId } }: TaskIdParam) => {
	const task = await getTaskById(taskId);
	const editPage = `${DASHBOARD}/${taskId}/edit`;
	const userIdsArray = await getMappedUserIds();

	return (
		<Wrapper>
			<StyledTaskDetails>
				<CardContent>
					<FlexContainer justify>
						<FlexWrapper>
							<UserPhoto imageUrl={task.assignee.imageUrl} username={task.assignee.username} size="big" />
							<DarkGreyText>{`${task.assignee.username} ${task.assignee.email}`}</DarkGreyText>
						</FlexWrapper>
						<IconContainer>
							<Link href={editPage}>
								<StyledEditIcon />
							</Link>
							<Link href={DASHBOARD}>
								<StyledBackIcon />
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
					<DetailsProvider userIdsArray={userIdsArray}>
						<CommentsList task={task} />
					</DetailsProvider>
				</CardContent>
			</StyledTaskDetails>
		</Wrapper>
	);
};
export default Details;

import { getTaskById } from '@/app/dashboard/[taskId]/edit/actions/getTaskById';
import {
	DarkGreyText,
	Wrapper,
	Module,
	FlexContainer,
	DateContainer,
	StyledBackIcon,
	FlexWrapper,
} from '@/modules/Shared/styled';
import { Box, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import { getStringDate } from '@/app/dashboard/[taskId]/utils/getStringDate';
import { CommentsList } from '@/modules/Comments/components/CommentsList';
import { EstimatedTime } from '@/app/dashboard/[taskId]/components/EstimatedTime';
import { getMappedUserIds } from '@/modules/Shared/actions/getMappedUserIds';
import { DetailsProvider } from '@/modules/Providers/DetailsProvider';
import { UserPhoto } from '@/modules/Shared/components/UserPhoto';
import {
	FlexStartWrapper,
	IconContainer,
	StyledEditIcon,
	StyledTaskDetails,
	TitleContainer,
	TitleInnerContainer,
	TitleText,
} from '@/app/dashboard/[taskId]/styled';
import { DASHBOARD } from '@/modules/Shared/constants';
import { TaskIdParam } from '@/app/dashboard/[taskId]/edit/types';

const Details = async ({ params: { taskId } }: TaskIdParam) => {
	const [task, userIdsArray] = await Promise.all([getTaskById(taskId), getMappedUserIds()]);
	const editPage = `${DASHBOARD}/${taskId}/edit`;

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

import { Typography } from '@mui/material';
import {
	StyledTaskMini,
	StyledCardContent,
	FlexContainer,
	DarkGreyText,
	ShortTitleText,
	ShowFullViewIcon,
	Assignee,
	CenteredLink,
	FlexWrapper,
} from '@/components/StyledComponents';
import { DASHBOARD } from '@/constants';
import { TaskMiniProps } from '@/types';
import { UserPhoto } from '@/components/UserPhoto';

export const TaskMini = ({ id, title, description, username, imageUrl, email }: TaskMiniProps) => (
	<StyledTaskMini>
		<StyledCardContent>
			<FlexContainer justify>
				<FlexWrapper>
					<UserPhoto imageUrl={imageUrl} username={username} size="small" />
					<Assignee>
						{username} {email}
					</Assignee>
				</FlexWrapper>
				<CenteredLink href={`${DASHBOARD}/${id}`}>
					<ShowFullViewIcon />
				</CenteredLink>
			</FlexContainer>
			<FlexContainer justify={false}>
				<DarkGreyText>{id.slice(0, 4)}&nbsp;</DarkGreyText>
				<ShortTitleText>{title}</ShortTitleText>
			</FlexContainer>
			<Typography mt={1}>{description}</Typography>
		</StyledCardContent>
	</StyledTaskMini>
);

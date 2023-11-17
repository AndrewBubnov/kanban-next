import { Typography } from '@mui/material';
import { FlexContainer, DarkGreyText, FlexWrapper } from '@/modules/Shared/styled';
import { UserPhoto } from '@/modules/Shared/components/UserPhoto';
import {
	Assignee,
	CenteredLink,
	ShortTitleText,
	ShowFullViewIcon,
	StyledCardContent,
	StyledTaskMini,
} from '@/modules/Desk/styled';
import { DASHBOARD } from '@/modules/Shared/constants';
import { TaskMiniProps } from '@/modules/Desk/types';

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

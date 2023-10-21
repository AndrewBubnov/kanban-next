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
} from '@/components/StyledComponents';
import { TaskMiniProps } from '@/types';

export const TaskMini = ({ id, title, description, username, email }: TaskMiniProps) => (
	<StyledTaskMini>
		<StyledCardContent>
			<FlexContainer>
				<Assignee>
					{username} {email}
				</Assignee>
				<CenteredLink href={`/dashboard/${id}`}>
					<ShowFullViewIcon />
				</CenteredLink>
			</FlexContainer>
			<FlexContainer>
				<DarkGreyText>{id.slice(0, 4)}&nbsp;</DarkGreyText>
				<ShortTitleText>{title}</ShortTitleText>
			</FlexContainer>

			<Typography mt={1}>{description}</Typography>
		</StyledCardContent>
	</StyledTaskMini>
);

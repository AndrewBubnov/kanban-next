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
import { DASHBOARD } from '@/constants';
import { TaskMiniProps } from '@/types';

export const TaskMini = ({ id, title, description, username, email }: TaskMiniProps) => (
	<StyledTaskMini>
		<StyledCardContent>
			<FlexContainer justify>
				<Assignee>
					{username} {email}
				</Assignee>
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

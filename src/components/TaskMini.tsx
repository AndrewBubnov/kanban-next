import Link from 'next/link';
import { Typography } from '@mui/material';
import {
	StyledTaskMini,
	StyledCardContent,
	FlexContainer,
	DarkGreyText,
	ShortTitleText,
	ShowFullViewIcon,
} from '@/components/StyledComponents';
import { TaskMiniProps } from '@/types';

export const TaskMini = ({ id, title, description }: TaskMiniProps) => (
	<StyledTaskMini>
		<StyledCardContent>
			<FlexContainer>
				<FlexContainer>
					<DarkGreyText>{id}.&nbsp;</DarkGreyText>
					<ShortTitleText>{title}</ShortTitleText>
				</FlexContainer>
				<Link href={`/dashboard/${id}`}>
					<ShowFullViewIcon />
				</Link>
			</FlexContainer>
			<Typography mt={1}>{description}</Typography>
		</StyledCardContent>
	</StyledTaskMini>
);

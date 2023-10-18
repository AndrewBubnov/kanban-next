import { Box, Typography } from '@mui/material';
import { StyledTaskMini, StyledCardContent } from '@/components/StyledComponents';
import { TaskMiniProps } from '@/types';
import Link from 'next/link';

export const TaskMini = ({ id, title, description }: TaskMiniProps) => (
	<Link href={`/dashboard/${id}`}>
		<StyledTaskMini>
			<StyledCardContent>
				<Box component="span" sx={{ color: 'darkgrey', fontWeight: 600 }}>
					{id}.&nbsp;
				</Box>
				<Box component="span" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
					{title}
				</Box>
				<Typography mt={1}>{description}</Typography>
			</StyledCardContent>
		</StyledTaskMini>
	</Link>
);

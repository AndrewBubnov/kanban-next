import { Box, Typography } from '@mui/material';
import { StyledCard, StyledCardContent } from '@/components/StyledComponents';
import { TaskContent } from '@/types';

export const Task = ({ id, title, description }: TaskContent) => (
	<StyledCard>
		<StyledCardContent>
			<Box component="span" sx={{ color: 'darkgrey', fontWeight: 600 }}>
				{id}.&nbsp;
			</Box>
			<Box component="span" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
				{title}
			</Box>
			<Typography mt={1}>{description}</Typography>
		</StyledCardContent>
	</StyledCard>
);

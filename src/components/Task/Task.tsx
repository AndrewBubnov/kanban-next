import styles from './Task.module.css';
import { Card, CardContent, Typography } from '@mui/material';
import { TaskContent } from '@/types';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const StyledCard = styled(Card)(() => ({
	height: 150,
}));

export const StyledCardContent = styled(CardContent)(() => ({
	'& .MuiTypography-root': {
		maxWidth: 180,
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
	},
}));

export const Task = ({ title, body }: TaskContent) => (
	<StyledCard>
		<StyledCardContent>
			<Typography gutterBottom>{title}</Typography>
			<Typography>{body}</Typography>
		</StyledCardContent>
	</StyledCard>
	// <div className={styles.card}>
	//   <div>{title}</div>
	//   <div>{body}</div>
	// </div>
);

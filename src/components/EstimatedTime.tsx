import { DarkGreyText, EditTaskLink, FlexWrapper, RemainingTimeWrapper } from '@/components/StyledComponents';
import { Box, Grid, Typography } from '@mui/material';
import { getRemainingTime } from '@/utils/getRemainingTime';
import { EstimatedTimeProps } from '@/types';

export const EstimatedTime = ({ task, editPage }: EstimatedTimeProps) => {
	const estimate = task?.estimateDays;
	const { isExpired, remainingTimeString } = getRemainingTime(task?.createdAt, estimate);
	return (
		<RemainingTimeWrapper>
			<FlexWrapper>
				{!!estimate && <DarkGreyText>Estimated as &nbsp;</DarkGreyText>}
				<Box>
					{estimate ? (
						`${estimate} day${estimate > 1 ? 's' : ''}`
					) : (
						<EditTaskLink href={editPage} color="darkgray">
							Not estimated. Estimate?
						</EditTaskLink>
					)}
				</Box>
			</FlexWrapper>
			<Grid container pt={0.5} alignItems="center">
				{!isExpired && !!estimate && <DarkGreyText>Time remaining &nbsp;</DarkGreyText>}
				{isExpired ? (
					<EditTaskLink href={editPage} color="tomato" paddingTop={8}>
						{remainingTimeString}
					</EditTaskLink>
				) : (
					<Typography>{remainingTimeString}</Typography>
				)}
			</Grid>
		</RemainingTimeWrapper>
	);
};

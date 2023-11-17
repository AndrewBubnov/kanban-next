import { DarkGreyText, FlexWrapper } from '@/modules/Shared/styled';
import { Box, Grid, Typography } from '@mui/material';
import { getRemainingTime } from '@/app/dashboard/[taskId]/utils/getRemainingTime';
import { EditTaskLink, RemainingTimeWrapper } from '@/app/dashboard/[taskId]/styled';
import { EstimatedTimeProps } from '@/app/dashboard/[taskId]/types';

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

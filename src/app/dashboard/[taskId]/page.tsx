import { getTaskById } from '@/actions/getTaskById';
import {
	DarkGreyText,
	TitleContainer,
	IconContainer,
	StyledTaskDetails,
	Wrapper,
	Module,
	TitleText,
	FlexContainer,
} from '@/components/StyledComponents';
import { CardActions, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/EditOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Status, TaskIdParam } from '@/types';
import { ColumnNameDTO } from '@/constants';

const Dashboard = async ({ params: { taskId } }: TaskIdParam) => {
	const task = await getTaskById(taskId);

	return (
		<Wrapper>
			<StyledTaskDetails>
				<CardContent>
					<Module>
						<FlexContainer>
							<TitleContainer>
								<DarkGreyText>{task?.id}.&nbsp;</DarkGreyText>
								<TitleText>{task?.title}</TitleText>
							</TitleContainer>
							<IconContainer>
								<Link href={`/dashboard/${taskId}/edit`}>
									<EditIcon />
								</Link>
								<Link href={'/dashboard'}>
									<ArrowBackIcon />
								</Link>
							</IconContainer>
						</FlexContainer>
					</Module>
					<Module>
						<DarkGreyText>Status</DarkGreyText>
						<Typography mt={1}>{ColumnNameDTO[task?.status as Status]}</Typography>
					</Module>
					<Module>
						<DarkGreyText>Description</DarkGreyText>
						<Typography mt={1}>{task?.description}</Typography>
					</Module>
				</CardContent>
				<CardActions></CardActions>
			</StyledTaskDetails>
		</Wrapper>
	);
};
export default Dashboard;

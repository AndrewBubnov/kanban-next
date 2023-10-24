import { Desk } from '@/components/Desk';
import { Header } from '@/components/Header';
import { AddTask } from '@/components/AddTask';
import { getTasks } from '@/actions/getTasks';
import { ControlsContainer, MainContainer } from '@/components/StyledComponents';
import { DashboardAssigneeSelect } from '@/components/DashboardAssigneeSelect';
import { getMappedUserIds } from '@/actions/getMappedUserIds';
import { SELECT_ALL_USERS } from '@/constants';
import { getUser } from '@/actions/getUser';
import { DashboardProvider } from '@/components/DashboardProvider';

export default async function Dashboard() {
	const { isAdmin, userId } = await getUser();
	const tasks = await getTasks();
	const userIdsArray = await getMappedUserIds();

	return (
		<MainContainer>
			<Header userId={userId} />
			<DashboardProvider userIdsArray={userIdsArray} isAdmin={isAdmin} tasks={tasks}>
				<ControlsContainer>
					<AddTask />
					<DashboardAssigneeSelect />
				</ControlsContainer>
				<Desk />
			</DashboardProvider>
		</MainContainer>
	);
}

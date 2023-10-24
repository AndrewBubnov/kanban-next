import { Desk } from '@/components/Desk';
import { Header } from '@/components/Header';
import { AddTask } from '@/components/AddTask';
import { getTasks } from '@/actions/getTasks';
import { ControlsContainer, MainContainer } from '@/components/StyledComponents';
import { UserSelect } from '@/components/UserSelect';
import { getMappedUserIds } from '@/actions/getMappedUserIds';
import { getUser } from '@/actions/getUser';
import { DashboardProvider } from '@/components/DashboardProvider';
import { ColumnSelect } from '@/components/ColumnSelect';

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
					<ColumnSelect />
					<UserSelect />
				</ControlsContainer>
				<Desk />
			</DashboardProvider>
		</MainContainer>
	);
}

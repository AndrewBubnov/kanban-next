import { Header } from '@/components/Header';
import { AddTask } from '@/components/AddTask';
import { ControlsContainer, MainContainer } from '@/components/StyledComponents';
import { UserSelect } from '@/components/UserSelect';
import { getMappedUserIds } from '@/actions/getMappedUserIds';
import { getUser } from '@/actions/getUser';
import { ColumnSelect } from '@/components/ColumnSelect';
import { getColumnList } from '@/actions/getColumnList';
import { DashboardProvider } from '@/components/DashboardProvider';
import { getTasksShown } from '@/actions/getTasksShown';
import { Desk } from '@/components/Desk';

interface DashboardPageProps {
	searchParams: { username: string };
}

export default async function Dashboard({ searchParams: { username } }: DashboardPageProps) {
	const { isAdmin, userId } = await getUser();
	const userIdsArray = await getMappedUserIds();
	const columnConfig = await getColumnList();
	const tasksShown = await getTasksShown(username, userIdsArray);

	return (
		<MainContainer>
			<Header userId={userId} />
			<DashboardProvider userIdsArray={userIdsArray} isAdmin={isAdmin} columnConfig={columnConfig}>
				<ControlsContainer>
					<AddTask />
					{tasksShown.length ? <ColumnSelect /> : null}
					<UserSelect />
				</ControlsContainer>
				<Desk tasks={tasksShown} />
			</DashboardProvider>
		</MainContainer>
	);
}

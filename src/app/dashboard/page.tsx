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
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { getAndDeleteNotifications } from '@/actions/getAndDeleteNotifications';
import { ToastEmitter } from '@/components/Toast/ToastEmitter';

interface DashboardPageProps {
	searchParams: { username: string };
}

export default async function Dashboard({ searchParams: { username } }: DashboardPageProps) {
	const { isAdmin, userId } = await getUser();
	const userIdsArray = await getMappedUserIds();
	const columnConfig = await getColumnList();
	const tasksShown = await getTasksShown(username, userIdsArray);
	const notifications = await getAndDeleteNotifications();
	console.log({ tasksShown });
	console.log({ userIdsArray });
	return (
		<MainContainer>
			<Header userId={userId} />
			<DashboardProvider userIdsArray={userIdsArray} isAdmin={isAdmin} columnConfig={columnConfig}>
				<ControlsContainer>
					<AddTask />
					{tasksShown.length ? <ColumnSelect /> : null}
					<UserSelect />
					<ThemeSwitch />
				</ControlsContainer>
				<Desk tasks={tasksShown} />
				<ToastEmitter notifications={notifications} />
			</DashboardProvider>
		</MainContainer>
	);
}

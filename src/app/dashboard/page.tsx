import { Header } from '@/modules/Header';
import { CreateTask } from '@/modules/CreateTask';
import { ControlsContainer, MainContainer } from '@/modules/StyledComponents';
import { UserSelect } from '@/modules/UserSelect';
import { getMappedUserIds } from '@/actions/getMappedUserIds';
import { getUser } from '@/actions/getUser';
import { ColumnSelect } from '@/modules/ColumnSelect';
import { getColumnList } from '@/actions/getColumnList';
import { DashboardProvider } from '@/modules/DashboardProvider';
import { getTasksShown } from '@/actions/getTasksShown';
import { Desk } from '@/modules/Desk';
import { ThemeSwitch } from '@/modules/ThemeSwitch';
import { DashboardPageProps } from '@/types';
import { getNotifications } from '@/modules/Toast/actions/getNotifications';
import { ToastEmitter } from '@/modules/Toast/components/ToastEmitter';

export default async function Dashboard({ searchParams: { username } }: DashboardPageProps) {
	const { isAdmin, userId } = await getUser();
	const userIdsArray = await getMappedUserIds();
	const columnConfig = await getColumnList();
	const tasksShown = await getTasksShown(username, userIdsArray);
	const notifications = await getNotifications();

	return (
		<MainContainer>
			<Header userId={userId} />
			<DashboardProvider userIdsArray={userIdsArray} isAdmin={isAdmin} columnConfig={columnConfig}>
				<ControlsContainer>
					<CreateTask />
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

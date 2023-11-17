import { Header } from '@/modules/Header/components/Header';
import { CreateTask } from '@/modules/CreateAndUpdateTask/components/CreateTask';
import { UserSelect } from '@/modules/UserSelect/components/UserSelect';
import { getMappedUserIds } from '@/modules/Shared/actions/getMappedUserIds';
import { getUser } from '@/app/dashboard/[taskId]/edit/actions/getUser';
import { StatusSelect } from '@/modules/StatusSelect/components/StatusSelect';
import { getColumnList } from '@/app/dashboard/actions/getColumnList';
import { DashboardProvider } from '@/modules/Providers/DashboardProvider';
import { getTasksShown } from '@/app/dashboard/actions/getTasksShown';
import { Desk } from '@/modules/Desk/components/Desk';
import { ThemeSwitch } from '@/modules/ThemeSwitch/components/ThemeSwitch';
import { getNotifications } from '@/modules/Toast/actions/getNotifications';
import { ToastEmitter } from '@/modules/Toast/components/ToastEmitter';
import { DashboardPageProps } from '@/app/dashboard/types';
import { ControlsContainer, MainContainer } from '@/app/dashboard/styled';

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
					{tasksShown.length ? <StatusSelect /> : null}
					<UserSelect />
					<ThemeSwitch />
				</ControlsContainer>
				<Desk tasks={tasksShown} />
				<ToastEmitter notifications={notifications} />
			</DashboardProvider>
		</MainContainer>
	);
}

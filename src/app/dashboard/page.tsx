import { Header } from '@/components/Header';
import { AddTask } from '@/components/AddTask';
import { ControlsContainer, MainContainer } from '@/components/StyledComponents';
import { UserSelect } from '@/components/UserSelect';
import { getMappedUserIds } from '@/actions/getMappedUserIds';
import { getUser } from '@/actions/getUser';
import { ColumnSelect } from '@/components/ColumnSelect';
import { getColumnList } from '@/actions/getColumnList';
import { DeskServer } from '@/components/DeskServer';
import { Suspense } from 'react';
import { DashboardProvider } from '@/components/DashboardProvider';
import { Loader } from '@/components/Loader';
import { getTasksShown } from '@/actions/getTasksShown';

export default async function Dashboard() {
	const { isAdmin, userId } = await getUser();
	const userIdsArray = await getMappedUserIds();
	const columnConfig = await getColumnList();
	const tasksShown = await getTasksShown();

	return (
		<MainContainer>
			<Header userId={userId} />
			<DashboardProvider userIdsArray={userIdsArray} isAdmin={isAdmin} columnConfig={columnConfig}>
				<ControlsContainer>
					<AddTask />
					{tasksShown.length ? <ColumnSelect /> : null}
					<UserSelect />
				</ControlsContainer>
				<Suspense fallback={<Loader />}>
					<DeskServer />
				</Suspense>
			</DashboardProvider>
		</MainContainer>
	);
}

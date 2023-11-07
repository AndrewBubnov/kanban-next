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
import LoadingDashboard from '@/app/dashboard/loading';
import { ControlsProvider } from '@/components/ControlsProvider';

export default async function Dashboard() {
	const { isAdmin, userId } = await getUser();
	const userIdsArray = await getMappedUserIds();
	const columnConfig = await getColumnList();

	return (
		<MainContainer>
			<Header userId={userId} />
			<ControlsContainer>
				<ControlsProvider userIdsArray={userIdsArray} isAdmin={isAdmin} columnConfig={columnConfig}>
					<AddTask />
					<ColumnSelect />
					<UserSelect />
				</ControlsProvider>
			</ControlsContainer>
			<Suspense fallback={<LoadingDashboard />}>
				<DeskServer columnConfig={columnConfig} />
			</Suspense>
		</MainContainer>
	);
}

import { Desk } from '@/components/Desk/Desk';
import { Header } from '@/components/Header/Header';
import { auth } from '@clerk/nextjs';
import { columns } from '@/constants';
import { AddTask } from '@/components/AddTask/AddTask';
import { Box } from '@mui/material';
import { getTasks } from '@/actions/getTasks';

export default async function Dashboard() {
	const userId = auth().userId as string;
	const tasks = await getTasks(userId);
	return (
		<Box
			sx={{
				height: '100vh',
				overflowY: 'auto',
				padding: '1rem',
			}}
		>
			<Header userId={userId} />
			<AddTask userId={userId} />
			<Desk tasks={tasks} columns={columns} />
		</Box>
	);
}

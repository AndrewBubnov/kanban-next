import { prisma } from '@/db';
import { Desk } from '@/components/Desk/Desk';
import { Header } from '@/components/Header/Header';
import { auth } from '@clerk/nextjs';
import { TaskItem } from '@/types';
import { columns } from '@/constants';
import { AddTask } from '@/components/AddTask/AddTask';
import { Box } from '@mui/material';

export default async function Dashboard() {
	const userId = auth().userId as string;
	const existingUser = await prisma.user.findUnique({ where: { userId } });
	if (!existingUser) await prisma.user.create({ data: { userId } });
	// await prisma.task.deleteMany()
	const tasks = (await prisma.task.findMany({ where: { userId } })) as TaskItem[];
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

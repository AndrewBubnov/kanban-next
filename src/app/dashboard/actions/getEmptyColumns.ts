'use server';

import { prisma } from '@/db';
import { SINGLE_ID } from '@/modules/Shared/constants';

export const getEmptyColumnNames = async () => {
	const columnList = await prisma.columnList.findFirst({
		where: { id: SINGLE_ID },
		include: { columns: true },
	});

	const tasks = await prisma.task.findMany();

	return (columnList?.columns || [])
		.filter(el => !tasks.map(task => task.status).includes(el.name))
		.map(el => el.name);
};

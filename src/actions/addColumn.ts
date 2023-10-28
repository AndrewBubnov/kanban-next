'use server';
import { prisma } from '@/db';
import { DASHBOARD } from '@/constants';
import { revalidatePath } from 'next/cache';

export const addColumn = async (name: string) => {
	const existed = await prisma.columnList.findFirst({
		where: { id: 1 },
		include: {
			columns: true,
		},
	});

	if (!existed) return;

	const updated = [...existed.columns, { name, shown: true }];

	await prisma.column.deleteMany({
		where: {
			tableDataId: 1,
		},
	});

	for (const col of updated) {
		await prisma.column.create({
			data: {
				name: col.name,
				shown: col.shown,
				tableDataId: 1,
			},
		});
	}

	revalidatePath(DASHBOARD);
};

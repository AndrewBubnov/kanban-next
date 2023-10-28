'use server';
import { prisma } from '@/db';
import { DASHBOARD } from '@/constants';
import { revalidatePath } from 'next/cache';

export const toggleColumnShown = async (id?: number) => {
	if (!id) return;

	const existed = await prisma.columnList.findFirst({
		where: { id: 1 },
		include: {
			columns: true,
		},
	});

	if (!existed) return;

	const updated = existed.columns.map(el => {
		if (el.id === id) return { ...el, shown: !el.shown };
		return el;
	});

	await prisma.column.deleteMany({
		where: {
			tableDataId: 1,
		},
	});

	for (const col of updated) {
		await prisma.column.create({
			data: {
				id: col.id,
				name: col.name,
				shown: col.shown,
				tableDataId: 1,
			},
		});
	}

	revalidatePath(DASHBOARD);
};

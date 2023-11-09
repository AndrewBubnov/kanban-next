'use server';

import { prisma } from '@/db';
import { DASHBOARD, SINGLE_ID } from '@/constants';
import { ColumnType } from '@/types';
import { revalidatePath } from 'next/cache';

export const updateColumns = async (columns: ColumnType[]) => {
	await prisma.column.deleteMany({
		where: {
			columnListId: SINGLE_ID,
		},
	});

	for (const col of columns) {
		await prisma.column.create({
			data: {
				name: col.name,
				shown: col.shown,
				columnListId: SINGLE_ID,
			},
		});
	}

	revalidatePath(DASHBOARD);
};

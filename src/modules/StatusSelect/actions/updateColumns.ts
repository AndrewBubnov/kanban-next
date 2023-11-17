'use server';
import { prisma } from '@/db';
import { ColumnType } from '@/modules/Shared/types';
import { SINGLE_ID } from '@/modules/Shared/constants';

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
};
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { COLUMN_LIST } from '@/app/dashboard/constants';
import { DASHBOARD } from '@/modules/Shared/constants';

export const getColumnList = async () => {
	let columnList = await prisma.columnList.findFirst({
		where: { id: '1' },
		include: {
			columns: true,
		},
	});

	if (!columnList) {
		columnList = await prisma.columnList.create({
			data: {
				id: '1',
				columns: {
					create: COLUMN_LIST,
				},
			},
			include: {
				columns: true,
			},
		});
	}

	revalidatePath(DASHBOARD);

	return columnList.columns;
};

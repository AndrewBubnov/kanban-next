import { prisma } from '@/db';
import { COLUMN_LIST } from '@/app/dashboard/constants';
import { SINGLE_ID } from '@/modules/Shared/constants';

export const getColumnList = async () => {
	let columnList = await prisma.columnList.findFirst({
		where: { id: SINGLE_ID },
		include: { columns: true },
	});

	if (!columnList) {
		columnList = await prisma.columnList.create({
			data: {
				id: SINGLE_ID,
				columns: { create: COLUMN_LIST },
			},
			include: { columns: true },
		});
	}

	return columnList.columns;
};

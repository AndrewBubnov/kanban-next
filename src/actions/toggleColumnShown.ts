'use server';
import { DASHBOARD } from '@/constants';
import { revalidatePath } from 'next/cache';
import { getExistingColumns } from '@/actions/getExistingColumns';
import { updateColumns } from '@/actions/updateColumns';

export const toggleColumnShown = async (name?: string) => {
	if (!name) return;

	const existed = await getExistingColumns();

	if (!existed) return;

	const updated = existed.columns.map(el => {
		if (el.name === name) return { ...el, shown: !el.shown };
		return el;
	});

	await updateColumns(updated);

	revalidatePath(DASHBOARD);
};

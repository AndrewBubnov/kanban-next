import { useCallback, useEffect, useState } from 'react';
import { useLatest } from '@/hooks/useLatest';
import { updateColumns } from '@/actions/updateColumns';
import { ColumnType } from '@/types';

export const useColumnConfig = (columnConfig: ColumnType[]) => {
	const [state, setState] = useState<ColumnType[]>(columnConfig);

	const updatedState = useLatest(state);

	useEffect(() => {
		(async function () {
			await updateColumns(updatedState.current);
		})();
	}, [state.length, updatedState]);

	const toggleColumnState = useCallback(
		async (name?: string) => {
			if (!name) return;
			const updatedState = state.map(el => {
				return el.name === name ? { ...el, shown: !el.shown } : el;
			});
			setState(updatedState);
			await updateColumns(updatedState);
		},
		[state]
	);

	const addCustomColumn = useCallback(
		(name: string) => {
			const updatedState = [...state, { name, shown: true }];
			setState(updatedState);
		},
		[state]
	);

	const removeColumn = (name: string) => {
		const updatedState = state.filter(el => el.name !== name);
		setState(updatedState);
	};

	return { columnConfigState: state, toggleColumnState, addCustomColumn, removeColumn };
};

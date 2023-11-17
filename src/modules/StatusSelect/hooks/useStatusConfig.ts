import { useCallback, useEffect, useState } from 'react';
import { useLatest } from '@/modules/Shared/hooks/useLatest';
import { updateColumns } from '@/modules/StatusSelect/actions/updateColumns';

import { ColumnType } from '@/modules/Shared/types';

export const useStatusConfig = (columnConfig: ColumnType[]) => {
	const [isStateUpdated, setIsStateUpdated] = useState<boolean>(false);
	const [state, setState] = useState<ColumnType[]>(columnConfig);

	const updatedStateRef = useLatest(state);

	useEffect(() => {
		if (!isStateUpdated) return;
		setIsStateUpdated(false);
		(async function () {
			await updateColumns(updatedStateRef.current);
		})();
	}, [isStateUpdated, updatedStateRef]);

	const updateState = useCallback((updatedState: ColumnType[]) => {
		setState(updatedState);
		setIsStateUpdated(true);
	}, []);

	const toggleColumnState = useCallback(
		async (name?: string) => {
			if (!name) return;
			const updatedState = state.map(el => {
				return el.name === name ? { ...el, shown: !el.shown } : el;
			});
			updateState(updatedState);
		},
		[state, updateState]
	);

	const addCustomColumn = useCallback(
		(name: string) => updateState([...state, { name, shown: true }]),
		[state, updateState]
	);

	const removeColumn = useCallback(
		(name: string) => updateState(state.filter(el => el.name !== name)),
		[state, updateState]
	);

	return { columnConfigState: state, toggleColumnState, addCustomColumn, removeColumn };
};

import { useCallback, useEffect, useState } from 'react';
import { useLatest } from '@/modules/Shared/hooks/useLatest';
import { updateColumns } from '@/modules/StatusSelect/actions/updateColumns';
import { emitErrorNotification } from '@/modules/Notification/components/ErrorNotificationEmitter';
import { STATUS_SELECT_ERROR_MESSAGE } from '@/modules/StatusSelect/constants';
import { ColumnType } from '@/modules/Shared/types';

export const useStatusConfig = (columnConfig: ColumnType[]) => {
	const [isStateUpdated, setIsStateUpdated] = useState<boolean>(false);
	const [state, setState] = useState<ColumnType[]>(columnConfig);

	const updatedStateRef = useLatest(state);

	useEffect(() => {
		if (!isStateUpdated) return;
		setIsStateUpdated(false);
		(async function () {
			try {
				await updateColumns(updatedStateRef.current);
			} catch {
				emitErrorNotification(STATUS_SELECT_ERROR_MESSAGE);
			}
		})();
	}, [isStateUpdated, updatedStateRef]);

	const updateState = useCallback((updatedState: ColumnType[]) => {
		setState(updatedState);
		setIsStateUpdated(true);
	}, []);

	const toggleColumnState = useCallback(
		(name?: string) => {
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

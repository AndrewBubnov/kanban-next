'use client';
import { ChangeEvent, useCallback, useContext, useMemo, useState, MouseEvent } from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { DashboardContext } from '@/components/DashboardProvider';
import { Select } from '@/components/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import {
	CreateColumnInput,
	NewColumnFormControl,
	NewColumnInputWrapper,
	NewColumnLabel,
	SmallDeleteIcon,
	SmallIconButton,
} from '@/components/StyledComponents';
import { toggleColumnShown } from '@/actions/toggleColumnShown';
import { addColumn } from '@/actions/addColumn';
import { deleteColumn } from '@/actions/deleteColumn';

export const ColumnSelect = () => {
	const { columnConfig, isAdmin } = useContext(DashboardContext);

	const [newColumnName, setNewColumnName] = useState<string>('');

	const changeHandler = async (event: SelectChangeEvent<unknown>) => {
		const value = (event.target.value as string[]).at(-1);
		await toggleColumnShown(columnConfig.find(el => el.name === value)?.id);
	};

	const newColumnHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		setNewColumnName(evt.target.value);
	};

	const createColumn = useCallback(async () => {
		if (newColumnName.length < 2) return;
		await addColumn(newColumnName);
		setNewColumnName('');
	}, [newColumnName]);

	const columnShown = useMemo(
		() => `${columnConfig.filter(el => el.shown).length} / ${columnConfig.length} shown`,
		[columnConfig]
	);

	const deleteHandler = (id?: number) => async (evt: MouseEvent) => {
		evt.preventDefault();
		evt.stopPropagation();
		await deleteColumn(id);
	};

	const menuItemArray = useMemo(() => {
		const main = columnConfig.map(column => (
			<MenuItem key={column.name} value={column.name}>
				<Checkbox checked={column.shown} />
				<ListItemText primary={column.name} />
				{isAdmin ? (
					<SmallIconButton onClick={deleteHandler(column.id)}>
						<SmallDeleteIcon />
					</SmallIconButton>
				) : null}
			</MenuItem>
		));
		return main.concat(
			<NewColumnInputWrapper key="input">
				<NewColumnLabel>Type new column name:</NewColumnLabel>
				<form action={createColumn}>
					<NewColumnFormControl>
						<CreateColumnInput
							autoFocus
							name="column"
							autoComplete="off"
							value={newColumnName}
							onChange={newColumnHandler}
						/>
					</NewColumnFormControl>
				</form>
			</NewColumnInputWrapper>
		);
	}, [columnConfig, createColumn, newColumnName, isAdmin]);

	return (
		<Select label="Columns" multiple value={columnConfig} onChange={changeHandler} renderValue={() => columnShown}>
			{menuItemArray}
		</Select>
	);
};

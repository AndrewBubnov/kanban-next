'use client';
import { ChangeEvent, useCallback, useMemo, useState, MouseEvent, useContext } from 'react';
import { ControlsContext } from '@/components/ControlsProvider';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Select } from '@/components/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import {
	CreateColumnInput,
	HoverSensitiveMenuItem,
	CustomColumnFormControl,
	NewColumnInputWrapper,
	NewColumnLabel,
	SmallDeleteIcon,
	SmallIconButton,
} from '@/components/StyledComponents';
import { toggleColumnShown } from '@/actions/toggleColumnShown';
import { addColumn } from '@/actions/addColumn';
import { deleteColumn } from '@/actions/deleteColumn';

export const ColumnSelect = () => {
	const { columnConfig, isAdmin } = useContext(ControlsContext);
	const [customColumnName, setCustomColumnName] = useState<string>('');

	const changeHandler = async (event: SelectChangeEvent<unknown>) => {
		const value = (event.target.value as string[]).at(-1);
		await toggleColumnShown(columnConfig.find(el => el.name === value)?.id);
	};

	const newColumnHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		setCustomColumnName(evt.target.value);
	};

	const createColumn = useCallback(async () => {
		if (customColumnName.length < 2) return;
		await addColumn(customColumnName);
		setCustomColumnName('');
	}, [customColumnName]);

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
			<HoverSensitiveMenuItem key={column.name} value={column.name}>
				<Checkbox checked={column.shown} />
				<ListItemText primary={column.name} />
				{isAdmin ? (
					<SmallIconButton onClick={deleteHandler(column.id)}>
						<SmallDeleteIcon />
					</SmallIconButton>
				) : null}
			</HoverSensitiveMenuItem>
		));
		return main.concat(
			<NewColumnInputWrapper key="input">
				<NewColumnLabel>Type new column name:</NewColumnLabel>
				<form action={createColumn}>
					<CustomColumnFormControl>
						<CreateColumnInput
							autoFocus
							name="column"
							autoComplete="off"
							value={customColumnName}
							onChange={newColumnHandler}
						/>
					</CustomColumnFormControl>
				</form>
			</NewColumnInputWrapper>
		);
	}, [columnConfig, createColumn, customColumnName, isAdmin]);

	return (
		<Select label="Columns" multiple value={columnConfig} onChange={changeHandler} renderValue={() => columnShown}>
			{menuItemArray}
		</Select>
	);
};

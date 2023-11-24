'use client';
import { ChangeEvent, useCallback, useMemo, useState, MouseEvent, useContext } from 'react';
import { DashboardContext } from '@/modules/Providers/DashboardProvider';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Select } from '@/modules/Shared/components/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import {
	CreateColumnInput,
	CustomColumnFormControl,
	HoverSensitiveMenuItem,
	NewColumnInputWrapper,
	NewColumnLabel,
	SmallDeleteIcon,
	SmallIconTransparentButton,
} from '@/modules/StatusSelect/styled';

export const StatusSelect = () => {
	const { columnConfigState, isAdmin, toggleColumnState, addCustomColumn, removeColumn, isLight, emptyColumnNames } =
		useContext(DashboardContext);
	const [customColumnName, setCustomColumnName] = useState<string>('');

	const changeHandler = (event: SelectChangeEvent<unknown>) => {
		const value = (event.target.value as string[]).at(-1);
		toggleColumnState(value);
	};
	const customColumnHandler = (evt: ChangeEvent<HTMLInputElement>) => setCustomColumnName(evt.target.value);

	const createColumn = useCallback(async () => {
		if (customColumnName.length < 2) return;
		setCustomColumnName('');
		await addCustomColumn(customColumnName);
	}, [addCustomColumn, customColumnName]);

	const columnShown = useMemo(
		() => `${columnConfigState.filter(el => el.shown).length} / ${columnConfigState.length} shown`,
		[columnConfigState]
	);

	const deleteHandler = useMemo(
		() => (name: string) => (evt: MouseEvent) => {
			evt.preventDefault();
			evt.stopPropagation();
			removeColumn(name);
		},
		[removeColumn]
	);

	const menuItemArray = useMemo(() => {
		const main = columnConfigState.map(column => (
			<HoverSensitiveMenuItem key={column.name} value={column.name}>
				<Checkbox checked={column.shown} />
				<ListItemText primary={column.name} />
				{isAdmin && emptyColumnNames.includes(column.name) ? (
					<SmallIconTransparentButton onClick={deleteHandler(column.name)}>
						<SmallDeleteIcon />
					</SmallIconTransparentButton>
				) : null}
			</HoverSensitiveMenuItem>
		));
		return main.concat(
			<NewColumnInputWrapper key="input" onKeyDown={e => e.stopPropagation()}>
				<NewColumnLabel>Type new column name:</NewColumnLabel>
				<form action={createColumn}>
					<CustomColumnFormControl>
						<CreateColumnInput
							autoFocus
							isLight={isLight}
							variant="outlined"
							name="column"
							autoComplete="off"
							value={customColumnName}
							onChange={customColumnHandler}
							onBlur={() => setCustomColumnName('')}
						/>
					</CustomColumnFormControl>
				</form>
			</NewColumnInputWrapper>
		);
	}, [columnConfigState, createColumn, customColumnName, deleteHandler, emptyColumnNames, isAdmin, isLight]);

	return (
		<Select
			label="Columns"
			multiple
			value={columnConfigState}
			onChange={changeHandler}
			renderValue={() => columnShown}
		>
			{menuItemArray}
		</Select>
	);
};

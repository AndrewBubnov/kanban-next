'use client';
import { useEffect, useState } from 'react';
import { useFilteredStore } from '@/store';
import MenuItem from '@mui/material/MenuItem';
import { LightInputLabel, LightSelect, StyledFormControl } from '@/components/StyledComponents';
import { SwitchProps } from '@/types';
import { SelectChangeEvent } from '@mui/material/Select';
import { ALL_USERNAMES } from '@/constants';

export const Switch = ({ tasks, userIdsArray }: SwitchProps) => {
	const { setFilteredTasks } = useFilteredStore();
	const [userId, setUserId] = useState<string>('');
	const [username, setUsername] = useState<string>(ALL_USERNAMES);

	useEffect(() => {
		const filtered = tasks.filter(el => el.assignee.userId.includes(userId));
		setFilteredTasks(filtered);
	}, [setFilteredTasks, tasks, userId]);
	const changeHandler = (event: SelectChangeEvent<unknown>) => {
		const value = event.target.value as string;
		const currentId = userIdsArray.find(item => value === item.username)?.userId || '';
		setUsername(value);
		setUserId(currentId);
	};

	return (
		<StyledFormControl>
			<LightInputLabel id="assignee">Assignee</LightInputLabel>
			<LightSelect value={username} label="Assignee" onChange={changeHandler}>
				{userIdsArray.map(el => (
					<MenuItem key={el.userId} value={el.username}>
						{el.username}
					</MenuItem>
				))}
			</LightSelect>
		</StyledFormControl>
	);
};

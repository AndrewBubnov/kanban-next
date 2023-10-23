'use client';
import { useContext, useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { LightInputLabel, LightSelect, StyledFormControl } from '@/components/StyledComponents';
import { SelectChangeEvent } from '@mui/material/Select';
import { ALL_USERNAMES } from '@/constants';
import { DashboardContext } from '@/components/DashboardProvider';

export const AssigneeSelect = () => {
	const { tasks, extendedUserIdsArray, setFilteredTasks } = useContext(DashboardContext);
	const [userId, setUserId] = useState<string>('');
	const [username, setUsername] = useState<string>(ALL_USERNAMES);

	useEffect(() => {
		const filtered = tasks.filter(el => el.assignee.userId.includes(userId));
		setFilteredTasks(filtered);
	}, [setFilteredTasks, tasks, userId]);

	const changeHandler = (event: SelectChangeEvent<unknown>) => {
		const value = event.target.value as string;
		const currentUserId = extendedUserIdsArray.find(item => value === item.username)?.userId || '';
		setUsername(value);
		setUserId(currentUserId);
	};

	return (
		<StyledFormControl>
			<LightInputLabel id="assignee">Assignee</LightInputLabel>
			<LightSelect value={username} label="Assignee" onChange={changeHandler}>
				{extendedUserIdsArray.map(el => (
					<MenuItem key={el.userId} value={el.username}>
						{el.username}
					</MenuItem>
				))}
			</LightSelect>
		</StyledFormControl>
	);
};

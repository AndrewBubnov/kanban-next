'use client';
import { useContext, useMemo, useState } from 'react';
import { DashboardContext } from '@/components/DashboardProvider';
import { Select } from '@/components/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import { setUserIdShown } from '@/actions/setUserIdShown';
import { ALL_USERNAMES, SELECT_ALL_USERS } from '@/constants';

export const UserSelect = () => {
	const { userIdsArray } = useContext(DashboardContext);
	const [username, setUsername] = useState<string>(ALL_USERNAMES);

	const extendedUserIdsArray = useMemo(() => [SELECT_ALL_USERS, ...userIdsArray], [userIdsArray]);

	const changeHandler = async (event: SelectChangeEvent<unknown>) => {
		const value = event.target.value as string;
		const currentUserId = extendedUserIdsArray.find(item => value === item.username)?.userId || '';
		setUsername(value);
		await setUserIdShown(currentUserId);
	};

	return (
		<Select value={username} label="Assignee" onChange={changeHandler}>
			{extendedUserIdsArray.map(el => (
				<MenuItem key={el.userId} value={el.username}>
					{el.username}
				</MenuItem>
			))}
		</Select>
	);
};

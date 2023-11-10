'use client';
import { useContext, useEffect, useMemo, useState } from 'react';
import { DashboardContext } from '@/components/DashboardProvider';
import { Select } from '@/components/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import { ALL_USERNAMES_SELECTED, ALL_USERS, DASHBOARD, SELECT_ALL_USERS } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';

export const UserSelect = () => {
	const { userIdsArray, setIsLoading } = useContext(DashboardContext);
	const [username, setUsername] = useState<string>(ALL_USERNAMES_SELECTED);
	const searchParamsUser = useSearchParams().get('user');
	const router = useRouter();

	const extendedUserIdsArray = useMemo(() => [SELECT_ALL_USERS, ...userIdsArray], [userIdsArray]);

	useEffect(() => {
		if (searchParamsUser) return;
		setIsLoading(true);
		router.replace(`${DASHBOARD}?username=${username === ALL_USERNAMES_SELECTED ? ALL_USERS : username}`);
	}, [router, searchParamsUser, username]);

	const changeHandler = async (event: SelectChangeEvent<unknown>) => setUsername(event.target.value as string);

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

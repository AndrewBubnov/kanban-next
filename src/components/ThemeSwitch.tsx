'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { DarkModeIcon, LightModeIcon, StyledSwitch, SwitchWrapper } from '@/components/StyledComponents';
import { DARK, LIGHT } from '@/constants';

export const ThemeSwitch = () => {
	const { theme, setTheme } = useTheme();
	const [checked, setChecked] = useState<boolean>(true);
	const isLight = theme === LIGHT;

	useEffect(() => setTheme(checked ? DARK : LIGHT), [checked, setTheme]);
	const changeHandler = (event: ChangeEvent<HTMLInputElement>) => setChecked(event.target.checked);
	return (
		<SwitchWrapper sx={{ marginLeft: '1rem' }}>
			<LightModeIcon isLight={isLight} />
			<StyledSwitch checked={checked} onChange={changeHandler} />
			<DarkModeIcon isLight={isLight} />
		</SwitchWrapper>
	);
};

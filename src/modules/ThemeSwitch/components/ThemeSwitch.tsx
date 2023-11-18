'use client';
import { ChangeEvent } from 'react';
import { useTheme } from 'next-themes';
import { DarkModeIcon, LightModeIcon, StyledSwitch, SwitchWrapper } from '@/modules/ThemeSwitch/styled';
import { DARK, LIGHT } from '@/modules/ThemeSwitch/constants';

export const ThemeSwitch = () => {
	const { theme, setTheme } = useTheme();
	const isLight = theme === LIGHT;
	const changeHandler = (event: ChangeEvent<HTMLInputElement>) => setTheme(event.target.checked ? DARK : LIGHT);
	return (
		<SwitchWrapper>
			<LightModeIcon isLight={isLight} />
			<StyledSwitch defaultChecked onChange={changeHandler} />
			<DarkModeIcon isLight={isLight} />
		</SwitchWrapper>
	);
};

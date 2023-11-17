'use client';

import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { Box } from '@mui/material';

export const HeaderLink = styled(Link)(() => ({
	'fontSize': '1rem',
	'color': 'darkgrey',
	'marginRight': '2rem',
	'transition': 'color .3s',
	'&:hover': {
		color: '#fff',
	},
}));
export const HeaderContainer = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'row-reverse',
	alignItems: 'center',
	height: '4rem',
}));

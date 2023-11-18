'use client';

import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { Box } from '@mui/material';

export const HeaderLink = styled(Link)(() => ({
	'fontSize': '1rem',
	'marginRight': '2rem',
	'transition': 'color .3s',
	'&:hover': {
		color: '#fff',
	},
}));
export const HeaderContainer = styled(Box)(() => ({
	position: 'fixed',
	display: 'flex',
	flexDirection: 'row-reverse',
	alignItems: 'center',
	width: '100%',
	height: '4rem',
	padding: '0px 1rem',
}));

export const UserButtonWrapper = styled(Box)(() => ({
	width: '2rem',
	height: '2rem',
}));

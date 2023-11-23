'use client';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { customScrollCSS } from '@/modules/Shared/styled';

export const MainContainer = styled(Box)(() => ({
	height: 'calc(100vh - 4rem)',
	overflowY: 'auto',
	padding: '1rem',
	marginTop: '4rem',
	...customScrollCSS,
}));
export const ControlsContainer = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
}));

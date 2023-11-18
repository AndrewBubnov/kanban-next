'use client';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const MainContainer = styled(Box)(() => ({
	height: 'calc(100vh - 4rem)',
	overflowY: 'auto',
	padding: '1rem',
	marginTop: '4rem',
}));
export const ControlsContainer = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
}));

'use client';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const MainContainer = styled(Box)(() => ({
	height: '100vh',
	overflowY: 'auto',
	padding: '1rem',
}));
export const ControlsContainer = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
}));

'use client';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import BackIcon from '@mui/icons-material/ArrowBack';
import { FlexContainerProps, UserPhotoImageProps, UserPhotoStubProps } from '@/modules/Shared/types';
import { ThemedActionButtonProps, ThemedInputLabelProps, ThemedSelectProps } from '@/modules/ThemeSwitch/types';
import Link from 'next/link';

export const StyledActionButton = styled(({ isLight = false, ...props }: ThemedActionButtonProps) => (
	<Button {...props} />
))`
	text-transform: none;
	font-size: 1rem;
	color: ${({ isLight }) => (isLight ? '#1a1a1a' : 'lightgray')};
	border-color: ${({ isLight }) => (isLight ? '#1a1a1a' : 'lightgray')};
	&:hover {
		background: ${({ isLight }) => (isLight ? '#2f2f2f' : 'lightgray')};
		color: ${({ isLight }) => (isLight ? 'lightgray' : '#000')};
		border-color: ${({ isLight }) => (isLight ? '#2f2f2f' : 'lightgray')};
	}
	&:focus {
		outline: none;
	}
`;

export const Wrapper = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100vh',
	width: '100vw',
}));

export const FlexContainer = styled(
	({ isReverse = true, marginTop = false, justify = true, ...props }: FlexContainerProps) => <Box {...props} />
)`
	display: flex;
	flex-direction: ${({ isReverse }) => (isReverse ? 'row-reverse' : 'row')};
	margin-top: ${({ marginTop }) => (marginTop ? '1rem' : 'unset')};
	justify-content: ${({ justify }) => (justify ? 'space-between' : 'flex-start')};
	align-items: center;
	margin-bottom: 0.5rem;
`;

export const DeskContainer = styled(Box)(() => ({
	gap: '1rem',
	maxWidth: 'calc(100vw - 4rem)',
	padding: '2rem',
	display: 'flex',
}));

export const FlexWrapper = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
}));

export const StyledBackIcon = styled(BackIcon)(() => ({
	fill: '#000000b5',
}));

export const LightInputLabel = styled(({ isLight, ...props }: ThemedInputLabelProps) => <InputLabel {...props} />)`
	color: ${({ isLight }) => (isLight ? '#1a1a1a' : 'lightgray')};
	&.Mui-focused {
		color: ${({ isLight }) => (isLight ? '#000' : '#fff')};
	}
`;

export const ThemedSelect = styled(({ isLight, ...props }: ThemedSelectProps) => <Select {...props} />)`
	color: ${({ isLight }) => (isLight ? '#1a1a1a' : 'lightgray')};
	&.MuiPaper-root-MuiPopover-paper-MuiMenu-paper {
		background: green;
	}
	&.Mui-focused {
		color: ${({ isLight }) => (isLight ? '#000' : '#fff')};
	}
	.MuiOutlinedInput-notchedOutline {
		border-color: ${({ isLight }) => (isLight ? '#1a1a1a' : 'lightgray')};
	}
	&.Mui-focused .MuiOutlinedInput-notchedOutline {
		border-color: ${({ isLight }) => (isLight ? '#000' : '#fff')};
	}
	&:hover .MuiOutlinedInput-notchedOutline {
		border-color: ${({ isLight }) => (isLight ? '#000' : '#fff')};
	}
	.MuiSvgIcon-root {
		fill: ${({ isLight }) => (isLight ? '#1a1a1a' : 'lightgray')};
	}
`;

export const StyledFormControl = styled(FormControl)(() => ({
	minWidth: 200,
	marginLeft: '1rem',
}));

export const DateContainer = styled(Box)(() => ({
	minWidth: 70,
	fontSize: '0.68rem',
	color: 'darkgray',
	fontWeight: 600,
	marginLeft: '1rem',
	textAlign: 'right',
}));

export const Module = styled(Box)(() => ({
	position: 'relative',
	marginBottom: '1.5rem',
}));

export const DarkGreyText = styled(Box)(() => ({
	color: 'darkgrey',
	fontSize: '1rem',
}));

export const UserPhotoImage = styled(({ size, ...props }: UserPhotoImageProps) => (
	<Image width={size === 'small' ? 24 : 40} height={size === 'small' ? 24 : 40} {...props} alt={props.alt} />
))(() => ({
	borderRadius: '50%',
	marginRight: '0.5rem',
}));

export const UserPhotoStub = styled(({ size, ...props }: UserPhotoStubProps) => <Box {...props} />)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${({ size }) => (size === 'small' ? '24px' : '40px')};
	height: ${({ size }) => (size === 'small' ? '24px' : '40px')};
	background: #708090ff;
	color: #fff;
	border-radius: 50%;
	margin-right: 0.5rem;
`;

export const HeroContainer = styled(Grid)(() => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '3rem',
	width: '100%',
	fontSize: '1.5rem',
	marginTop: '10rem',
}));

export const NotFoundPageText = styled(Typography)(() => ({
	fontSize: '2rem',
}));

export const NotFoundPageLink = styled(Link)(() => ({
	textDecoration: 'underline',
}));

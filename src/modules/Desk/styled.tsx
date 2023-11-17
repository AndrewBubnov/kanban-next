import { styled } from '@mui/material/styles';
import { Box, Card, CardContent } from '@mui/material';
import Link from 'next/link';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { COMMON_TRANSITION, COMMON_TRANSLATE, DRAGGED_TRANSLATE } from '@/modules/Desk/constants';
import { DraggableBoxProps } from '@/modules/Desk/types';
import { ThemedColumnNameProps } from '@/modules/ThemeSwitch/types';

export const LoadingIndicator = styled(Box)`
	width: 48px;
	height: 48px;
	border-radius: 50%;
	display: inline-block;
	border-top: 3px solid #fff;
	border-right: 3px solid transparent;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;

	@keyframes rotation {
		to {
			transform: rotate(360deg);
		}
	}
`;
export const Column = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	flex: 1,
	gap: '1rem',
	padding: '2vw',
}));
export const DraggableBox = styled(({ isDragged, isConfigUpdated, isSaved, ...props }: DraggableBoxProps) => (
	<Box {...props} />
))`
	position: relative;
	user-select: none;
	transform: ${({ isDragged, isConfigUpdated }) => {
		const commonTranslate = isConfigUpdated ? '' : COMMON_TRANSLATE;
		return isDragged ? DRAGGED_TRANSLATE : commonTranslate;
	}};
	transition: ${({ isDragged, isConfigUpdated }) => (isDragged || isConfigUpdated ? '' : COMMON_TRANSITION)};

	&::after {
		content: '';
		position: absolute;
		display: ${({ isSaved }) => (isSaved ? 'block' : 'none')};
		top: 0;
		background: rgba(0, 0, 0, 0.25);
		width: 100%;
		height: 100%;
	}
`;
export const CenterLoader = styled(Box)(() => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	zIndex: 10,
}));
export const StyledTaskMini = styled(Card)(() => ({
	height: 150,
}));
export const StyledCardContent = styled(CardContent)(() => ({
	'& .MuiTypography-root': {
		display: '-webkit-box',
		maxWidth: 180,
		WebkitBoxOrient: 'vertical',
		WebkitLineClamp: '3',
		wordBreak: 'break-word',
		overflow: 'hidden',
	},
}));
export const Assignee = styled(Box)(() => ({
	maxWidth: 170,
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	color: 'darkgrey',
	fontSize: '0.7rem',
}));
export const CenteredLink = styled(Link)(() => ({
	display: 'flex',
	alignItems: 'center',
}));
export const ShowFullViewIcon = styled(OpenInFullIcon)(() => ({
	width: '0.8rem',
	height: '0.8rem',
	marginLeft: '0.8rem',
}));
export const ShortTitleText = styled(Box)(() => ({
	width: 150,
	textOverflow: 'ellipsis',
	overflow: 'hidden',
	whiteSpace: 'nowrap',
	fontSize: '1.1rem',
	fontWeight: 600,
}));
export const ColumnName = styled(({ isLight, ...props }: ThemedColumnNameProps) => <Box {...props} />)`
	color: ${({ isLight }) => (isLight ? '#1a1a1a' : 'lightgray')};
	font-size: 1.25rem;
	text-align: center;
`;

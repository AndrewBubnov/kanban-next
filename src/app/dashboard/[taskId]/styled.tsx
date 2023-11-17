import { styled } from '@mui/material/styles';
import { Box, Card, Grid } from '@mui/material';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/EditOutlined';
import { EditPageLinkProps } from '@/app/dashboard/[taskId]/types';

export const RemainingTimeWrapper = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-end',
	fontSize: '0.9rem',
}));
export const EditTaskLink = styled(({ color, paddingTop, ...props }: EditPageLinkProps) => <Link {...props} />)`
	font-size: 0.9rem;
	line-height: 1rem;
	color: ${({ color }) => (color ? color : 'currentColor')};
	padding-top: ${({ paddingTop }) => (paddingTop ? `${paddingTop}px` : 'unset')};
`;
export const StyledTaskDetails = styled(Card)(() => ({
	minWidth: '50%',
	minHeight: '40%',
}));
export const IconContainer = styled(Grid)(() => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	width: 70,
}));
export const StyledEditIcon = styled(EditIcon)(() => ({
	fill: '#000000b5',
}));
export const TitleContainer = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
}));
export const TitleInnerContainer = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'flex-start',
	width: '100%',
}));
export const TitleText = styled(Box)(() => ({
	fontSize: '1rem',
	fontWeight: 600,
	maxWidth: 'calc(100% - 120px)',
}));
export const FlexStartWrapper = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'flex-start',
	justifyContent: 'space-between',
}));

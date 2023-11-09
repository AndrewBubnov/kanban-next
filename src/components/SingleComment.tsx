import {
	CommentText,
	CommentWrapper,
	DarkGreyUsername,
	DateContainer,
	FlexWrapper,
	GrayIcon,
	FunctionalButton,
	FunctionalButtonWrapper,
	FlexContainer,
} from '@/components/StyledComponents';
import FunctionalPopover from '@/components/FunctionalPopover';
import { Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { getElapsedTime } from '@/utils/getElapsedTime';
import { SingleCommentProps } from '@/types';

export const SingleComment = ({
	comment: { username, text, userId: authorId, createdAt },
	userId,
	deleteHandler,
	editHandler,
}: SingleCommentProps) => (
	<CommentWrapper>
		<FlexWrapper>
			<FlexWrapper>
				<GrayIcon />
				<DarkGreyUsername component="span">{username}</DarkGreyUsername>
			</FlexWrapper>
			<FlexWrapper>
				<DateContainer component="span">{getElapsedTime(createdAt)}</DateContainer>
			</FlexWrapper>
		</FlexWrapper>
		<FlexContainer>
			{userId === authorId && (
				<FunctionalPopover>
					<FunctionalButtonWrapper>
						<FunctionalButton onClick={editHandler} size="small" startIcon={<EditIcon />}>
							Edit
						</FunctionalButton>
						<Divider orientation="vertical" flexItem />
						<FunctionalButton onClick={deleteHandler} size="small" startIcon={<DeleteIcon />}>
							Delete
						</FunctionalButton>
					</FunctionalButtonWrapper>
				</FunctionalPopover>
			)}
			<CommentText>{text}</CommentText>
		</FlexContainer>
	</CommentWrapper>
);

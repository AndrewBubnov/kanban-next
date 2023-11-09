import {
	CommentText,
	CommentWrapper,
	DarkGreyUsername,
	DateContainer,
	FlexWrapper,
	GrayIcon,
	HoverSensitiveWrapper,
	SmallDeleteIcon,
	SmallEditIcon,
	SmallIconButton,
} from '@/components/StyledComponents';
import { getElapsedTime } from '@/utils/getElapsedTime';
import { SingleCommentProps } from '@/types';

export const SingleComment = ({
	comment: { id, username, text, userId: authorId, createdAt },
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
				<HoverSensitiveWrapper>
					{userId === authorId && (
						<SmallIconButton onClick={deleteHandler}>
							<SmallDeleteIcon />
						</SmallIconButton>
					)}
					<DateContainer component="span">{getElapsedTime(createdAt)}</DateContainer>
				</HoverSensitiveWrapper>
			</FlexWrapper>
		</FlexWrapper>
		<HoverSensitiveWrapper>
			{userId === authorId && (
				<SmallIconButton onClick={editHandler}>
					<SmallEditIcon />
				</SmallIconButton>
			)}
			<CommentText>{text}</CommentText>
		</HoverSensitiveWrapper>
	</CommentWrapper>
);

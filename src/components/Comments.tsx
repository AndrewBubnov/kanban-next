import { Box } from '@mui/material';
import {
	CommentsContainer,
	CommentWrapper,
	DarkGreyText,
	DateContainer,
	FlexWrapper,
	GrayIcon,
} from '@/components/StyledComponents';
import { getElapsedTime } from '@/utils/getElapsedTime';
import { sortComments } from '@/utils/sortComments';
import { Comment } from '@/types';

export const Comments = ({ comments }: { comments: Comment[] }) => (
	<Box>
		<DarkGreyText>Comments</DarkGreyText>
		<CommentsContainer>
			{comments.sort(sortComments).map(comment => (
				<CommentWrapper key={comment.id}>
					<FlexWrapper>
						<FlexWrapper>
							<GrayIcon />
							<DarkGreyText component="span">{comment.username}</DarkGreyText>
						</FlexWrapper>
						<DateContainer component="span">{getElapsedTime(comment.createdAt)}</DateContainer>
					</FlexWrapper>
					<Box>{comment.text}</Box>
				</CommentWrapper>
			))}
		</CommentsContainer>
	</Box>
);

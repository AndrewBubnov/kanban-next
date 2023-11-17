import { DateContainer, FlexWrapper, FlexContainer } from '@/modules/Shared/styled';
import FunctionalPopover from '@/modules/Comments/components/FunctionalPopover';
import { Box, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { getElapsedTime } from '@/modules/Comments/utils/getElapsedTime';
import { ReactNode, useContext } from 'react';
import { DetailsContext } from '@/modules/Providers/DetailsProvider';
import { useUser } from '@clerk/nextjs';
import {
	CommentText,
	CommentWrapper,
	DarkGreyUsername,
	FunctionalButton,
	FunctionalButtonWrapper,
	GrayIcon,
	TaggedSpan,
} from '@/modules/Comments/styled';
import { SingleCommentProps } from '@/modules/Comments/types';

export const SingleComment = ({
	comment: { username, text, userId: authorId, createdAt },
	deleteHandler,
	editHandler,
}: SingleCommentProps) => {
	const { user } = useUser();

	const userId = user?.id!;
	const { userIdsArray } = useContext(DetailsContext);
	let commentText: ReactNode = text;
	if (text.startsWith('@')) {
		const [firstWord, ...rest] = text.split(' ');
		const tag = firstWord.slice(1);
		const isTaggedUser = userIdsArray.find(el => el.username === tag);
		if (isTaggedUser)
			commentText = (
				<>
					<TaggedSpan>{text.split(' ')[0]}</TaggedSpan>
					&nbsp;
					<Box component="span">{rest.join(' ')}</Box>
				</>
			);
	}
	return (
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
				<CommentText>{commentText}</CommentText>
			</FlexContainer>
		</CommentWrapper>
	);
};

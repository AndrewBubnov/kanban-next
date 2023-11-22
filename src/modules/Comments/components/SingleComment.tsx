import { ReactNode, useContext, useEffect, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { DetailsContext } from '@/modules/Providers/DetailsProvider';
import { FlexWrapper, FlexContainer } from '@/modules/Shared/styled';
import FunctionalPopover from '@/modules/Comments/components/FunctionalPopover';
import { Box } from '@mui/material';
import { CommentText, CommentWrapper, DarkGreyUsername, GrayIcon, TaggedSpan } from '@/modules/Comments/styled';
import { ElapsedTime } from '@/modules/Comments/components/ElapsedTime';
import { PopoverContent } from '@/modules/Comments/components/PopoverContent';
import { PopoverContentInjectedProps, SingleCommentProps } from '@/modules/Comments/types';

export const SingleComment = ({
	comment: { username, text, userId: authorId, createdAt },
	onDelete,
	onEdit,
}: SingleCommentProps) => {
	const { user } = useUser();
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), []);

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
		<CommentWrapper ref={ref}>
			<FlexWrapper>
				<FlexWrapper>
					<GrayIcon />
					<DarkGreyUsername component="span">{username}</DarkGreyUsername>
				</FlexWrapper>
				<ElapsedTime createdAt={createdAt} />
			</FlexWrapper>
			<FlexContainer>
				{userId === authorId && (
					<FunctionalPopover>
						{({ onClose }: PopoverContentInjectedProps) => (
							<PopoverContent onEdit={onEdit} onDelete={onDelete} onClose={onClose} />
						)}
					</FunctionalPopover>
				)}
				<CommentText>{commentText}</CommentText>
			</FlexContainer>
		</CommentWrapper>
	);
};

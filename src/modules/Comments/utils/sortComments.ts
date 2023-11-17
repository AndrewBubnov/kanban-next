import { Comment } from '@/modules/Comments/types';

export const sortComments = (comment1: Comment, comment2: Comment) =>
	Date.parse(comment2.createdAt.toString()) - Date.parse(comment1.createdAt.toString());

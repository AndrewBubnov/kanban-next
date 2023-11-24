export const getErrorMessage = (commentId: string) =>
	`Oops! Something went wrong while trying to ${commentId ? 'update' : 'create'} your comment. Please try again`;

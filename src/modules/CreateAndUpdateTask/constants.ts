export const estimation = [0.5]
	.concat(Array.from({ length: 10 }).map((_, index) => index + 1))
	.map(el => `${el} ${el > 1 ? 'days' : 'day'}`);

export const CREATE_TASK_ERROR_MESSAGE =
	'Oops! Something went wrong while trying to create the task. Please try again.';
export const DELETE_TASK_ERROR_MESSAGE =
	'Oops! Something went wrong while trying to delete the task. Please try again.';
export const UPDATE_TASK_ERROR_MESSAGE =
	'Oops! Something went wrong while trying to update the task. Please try again.';

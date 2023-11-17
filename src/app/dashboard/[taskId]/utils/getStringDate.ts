const options = { year: 'numeric', month: 'short', day: 'numeric' } as const;

export const getStringDate = (dateString: Date) => {
	const date = new Date(Date.parse(dateString.toString()));
	return new Intl.DateTimeFormat('en-US', options).format(date);
};

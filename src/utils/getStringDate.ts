const options = { year: 'numeric', month: 'short', day: 'numeric' } as const;

export const getStringDate = (dateString: string) => {
	const date = new Date(Date.parse(dateString));
	return new Intl.DateTimeFormat('en-US', options).format(date);
};

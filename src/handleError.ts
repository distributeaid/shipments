export const handleError = (error: Error) =>
	console.log(
		'%cApp Error',
		'background-color: #cb3837; color: #ffffff; padding: 0.25rem;',
		error.message,
		error,
	)

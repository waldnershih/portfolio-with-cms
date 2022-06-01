export default {
	name: 'activities',
	title: 'Activities',
	type: 'document',
	fields: [
		{
			name: 'year',
			title: 'Year',
			type: 'string',
		},
		{
			name: 'yearStringForm',
			title: 'Year String Form',
			type: 'string',
		},
		{
			name: 'activities',
			title: 'Activities',
			type: 'array',
			of: [{ type: 'activity' }],
		},
	],
};

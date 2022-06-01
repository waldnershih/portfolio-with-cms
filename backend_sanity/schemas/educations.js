export default {
	name: 'educations',
	title: 'Educations',
	type: 'document',
	fields: [
		{ name: 'school', title: 'School', type: 'string' },
		{ name: 'degree', title: 'Degree', type: 'string' },
		{ name: 'major', title: 'Major', type: 'string' },
		{
			name: 'location',
			title: 'Location',
			type: 'string',
		},
		{
			name: 'date',
			title: 'Date',
			type: 'string',
		},
		{
			name: 'dateStringForm',
			title: 'Date String Form',
			type: 'string',
		},
	],
};

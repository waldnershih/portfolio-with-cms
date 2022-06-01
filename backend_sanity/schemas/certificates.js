export default {
	name: 'certificates',
	title: 'Certificates',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'time',
			title: 'Time',
			type: 'string',
		},
		{
			name: 'timeStringForm',
			title: 'Time String Form',
			type: 'string',
		},
		{
			name: 'description',
			title: 'Description',
			type: 'string',
		},
		{
			name: 'imgUrl',
			title: 'ImgUrl',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
	],
};

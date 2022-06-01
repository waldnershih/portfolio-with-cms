export default {
	name: 'contact',
	title: 'Contact',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'description',
			title: 'Description',
			type: 'string',
		},
		{
			name: 'link',
			title: 'Link',
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

const articles = [
	{
		id: 1,
		title: 'Article 1',
		content: 'Lorem ipsum',
		date: (new Date()).toISOString(),
	},
	{
		id: 2,
		title: 'Article 2',
		content: 'Lorem ipsum',
		date: (new Date()).toISOString(),
	},
	{
		id: 3,
		title: 'Article 3',
		content: 'Lorem ipsum',
		date: (new Date()).toISOString(),
	},
	{
		id: 4,
		title: 'Article 4',
		content: 'Lorem ipsum',
		date: (new Date()).toISOString(),
	},
];

const save = (article) => {
	articles.push({ ...article, date: (new Date()).toISOString() });
	return articles;
};

module.exports.save = save;
module.exports.articles = articles;

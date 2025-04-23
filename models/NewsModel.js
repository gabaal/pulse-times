import mongoose, { models } from 'mongoose';

const newsSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
		},
		shortDescription: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		viewsCount: {
			type: Number,
			required: true,
			default: 0,
		},
		thumbnailURL: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		categories: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Category',
			},
		],
	},
	{ timestamps: true }
);

const News = models.News || mongoose.model('News', newsSchema);
export default News;

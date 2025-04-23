import mongoose, { models } from 'mongoose';

const bookmarkSchema = new mongoose.Schema(
	{
		News: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'News',
			required: true,
		},
		User: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

const Bookmark = models.Bookmark || mongoose.model('Bookmark', bookmarkSchema);
export default Bookmark;

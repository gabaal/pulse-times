import mongoose, { models } from 'mongoose';

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		thumbnailURL: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Category = models.Category || mongoose.model('Category', categorySchema);
export default Category;

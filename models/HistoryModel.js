import mongoose, { models } from 'mongoose';

const historySchema = new mongoose.Schema(
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

const History = models.History || mongoose.model('History', historySchema);
export default History;

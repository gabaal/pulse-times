import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import Joi from 'joi';
import { connectMongoDB } from '@/lib/mongodb';
import mongoose from 'mongoose';
import News from '@/models/NewsModel';
import History from '@/models/HistoryModel';
import { authOptions } from '../../auth/[...nextauth]/route';
import Bookmark from '@/models/BookmarkModel';

const joiBookmarkSchema = Joi.object({
	userId: Joi.string().required(),
	newsIdentifier: Joi.string().required(),
});

export async function DELETE(req) {
	try {
		const newsIdentifier = req.nextUrl.searchParams.get('newsIdentifier');
		const session = await getServerSession(authOptions);
		const userId = session?.user?.mongoId;

		const { error } = joiBookmarkSchema.validate({ userId, newsIdentifier });

		if (error) {
			return NextResponse.json(
				{ message: 'Validation Error', error: error.details[0].message },
				{ status: 400 }
			);
		}

		const isValidObjectId = mongoose.Types.ObjectId.isValid(newsIdentifier);
		let query;

		if (isValidObjectId) {
			query = { _id: newsIdentifier };
		} else {
			query = { slug: newsIdentifier };
		}
		await connectMongoDB();
		const news = await News.findOne(query);

		const bookmarkExists = await Bookmark.findOne({
			User: userId,
			News: news?._id,
		});

		if (!bookmarkExists) {
			return NextResponse.json(
				{ message: 'Bookmark not Exists' },
				{ status: 400 }
			);
		}

		const result = await Bookmark.findOneAndDelete({
			User: userId,
			News: news?._id,
		});

		return NextResponse.json(
			{ message: 'Bookmark deleted', data: result },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: 'Something went wrong', error },
			{ status: 400 }
		);
	}
}

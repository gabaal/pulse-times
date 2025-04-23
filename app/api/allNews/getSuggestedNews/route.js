import { connectMongoDB } from '@/lib/mongodb';
import News from '@/models/NewsModel';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(req) {
	try {
		const newsIdentifier = req.nextUrl.searchParams.get('newsIdentifier');
		if (!newsIdentifier) {
			throw new Error('Provide news Identifier');
		}

		let excludeCondition = {};

		if (mongoose.Types.ObjectId.isValid(newsIdentifier)) {
			excludeCondition = { _id: { $ne: newsIdentifier } };
		} else {
			excludeCondition = { slug: { $ne: newsIdentifier } };
		}

		await connectMongoDB();
		const NewsCount = await News.countDocuments();
		const take = 4;
		let skip = 0;

		if (NewsCount > take) {
			skip = Math.floor(Math.random() * (NewsCount - take));
		}

		const newses = await News.find(excludeCondition)
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(take);
		return NextResponse.json({ newses }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: 'Something went wrong', error },
			{ status: 400 }
		);
	}
}

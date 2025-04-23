import History from '@/models/HistoryModel';
import News from '@/models/NewsModel';
import { NextResponse } from 'next/server';

const { connectMongoDB } = require('@/lib/mongodb');

await connectMongoDB();

export async function GET(request) {
	try {
		const page = parseInt(request.nextUrl.searchParams.get('page')) || 1;
		const type = request.nextUrl.searchParams.get('type');
		const NewsPerPage = 10;
		let query = {};
		let sortOption = { createdAt: -1 };

		if (type === 'most-viewed') {
			sortOption = { viewsCount: -1 };
		} else if (type === 'trending') {
			const twentyFourHAgo = new Date();
			twentyFourHAgo.setHours(twentyFourHAgo.getHours() - 24);

			const trendingNewses = await History.aggregate([
				{
					$match: { createdAt: { $gte: twentyFourHAgo } },
				},
				{
					$group: {
						_id: '$News',
						views: { $sum: 1 },
					},
				},
				{ $sort: { views: -1 } },
				{ $skip: (page - 1) * NewsPerPage },
				{ $limit: NewsPerPage },
				{
					$lookup: {
						from: 'news',
						localField: '_id',
						foreignField: '_id',
						as: 'newsDetails',
					},
				},
				{ $unwind: '$newsDetails' },
				{
					$replaceRoot: { newRoot: '$newsDetails' },
				},
			]);

			return NextResponse.json({ newses: trendingNewses }, { status: 200 });
		}

		const newses = await News.find(query)
			.sort(sortOption)
			.skip((page - 1) * NewsPerPage)
			.limit(NewsPerPage);

		return NextResponse.json({ newses }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: 'Something went wrong', error },
			{ status: 400 }
		);
	}
}

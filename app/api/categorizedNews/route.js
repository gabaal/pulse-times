import Category from '@/models/categoriesModel';
import News from '@/models/NewsModel';
import { NextResponse } from 'next/server';

const { connectMongoDB } = require('@/lib/mongodb');

await connectMongoDB();

export async function GET(request) {
	try {
		const categories = await Category.find();

		const categoriesWithNews = await Promise.all(
			categories.map(async (category) => {
				const recentNews = await News.find({ categories: category._id })
					.sort({ createdAt: -1 })
					.limit(3);
				return {
					category,
					news: recentNews,
				};
			})
		);

		return NextResponse.json({ categoriesWithNews }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: 'Something went wrong', error },
			{ status: 400 }
		);
	}
}

import Category from '@/models/categoriesModel';
import News from '@/models/NewsModel';
import mongoose, { model } from 'mongoose';
import { NextResponse } from 'next/server';

const { connectMongoDB } = require('@/lib/mongodb');

await connectMongoDB();

export async function GET(request) {
	try {
		const page = parseInt(request.nextUrl.searchParams.get('page')) || 1;
		const categoryId = request.nextUrl.searchParams.get('categoryId');
		const NewsPerPage = 10;

		let query = {};

		if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
			query.categories = new mongoose.Types.ObjectId(categoryId);
		}

		const newses = await News.find(query)
			.sort({ createdAt: -1 })
			.skip((page - 1) * NewsPerPage)
			.limit(NewsPerPage)
			.populate({
				path: 'categories',
				model: Category,
			});

		return NextResponse.json({ newses }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: 'Something went wrong', error },
			{ status: 400 }
		);
	}
}

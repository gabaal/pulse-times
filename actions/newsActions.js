'use server';

import fileUploader from '@/lib/fileUploader';
import { connectMongoDB } from '@/lib/mongodb';
import News from '@/models/NewsModel';
import Joi from 'joi';

const joiNewsCreateSchema = Joi.object({
	title: Joi.string().required(),
	shortDescription: Joi.string().required(),
	categories: Joi.array().items(Joi.string().min(1).required()),
	description: Joi.string().required(),
	author: Joi.string().required(),
	thumbnailURL: Joi.string().required(),
});

const joiNewsUpdateSchema = Joi.object({
	title: Joi.string().required(),
	shortDescription: Joi.string().required(),
	categories: Joi.array().items(Joi.string().min(1).required()),
	description: Joi.string().required(),
	author: Joi.string().required(),
	thumbnailURL: Joi.string().allow('').optional(),
});

const createSlug = (title) => {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
};

export const fetchNewsAction = async (_id) => {
	try {
		await connectMongoDB();

		const result = await News.findOne({ _id });
		const dataObj = JSON.parse(JSON.stringify(result));
		return dataObj;
	} catch (error) {
		throw new Error(error.message);
	}
};

export const addNewsAction = async (formData) => {
	try {
		const title = formData.get('title')?.toString();
		const shortDescription = formData.get('shortDescription')?.toString();
		const description = formData.get('description')?.toString();
		const author = formData.get('author')?.toString();
		const thumbnailImage = formData.get('thumbnailImage');
		const categories = formData.getAll('categories');

		if (
			!thumbnailImage ||
			(thumbnailImage.type !== 'image/jpeg' &&
				thumbnailImage.type !== 'image/png')
		) {
			throw new Error('Image is required!');
		}

		const thumbnailURL = await fileUploader(thumbnailImage, 'images');

		const { error, value } = joiNewsCreateSchema.validate({
			title,
			shortDescription,
			description,
			author,
			categories,
			thumbnailURL,
		});

		if (error) {
			throw new Error(error);
		}

		await connectMongoDB();

		let slug = createSlug(title);

		let exists = await News.findOne({ slug });
		let counter = 1;
		while (exists) {
			slug = `${createSlug(title)}-${counter}`;
			exists = await News.findOne({ slug });
			counter++;
		}

		const result = await News.create({
			title,
			slug,
			shortDescription,
			description,
			author,
			categories,
			thumbnailURL,
		});

		if (result) {
			return { success: true };
		}
	} catch (error) {
		return { error: error.message };
	}
};

export const updateNewsAction = async (formData) => {
	try {
		const newsId = formData.get('newsId')?.toString();
		const title = formData.get('title')?.toString();
		const shortDescription = formData.get('shortDescription')?.toString();
		const description = formData.get('description')?.toString();
		const author = formData.get('author')?.toString();
		const thumbnailImage = formData.get('thumbnailImage');
		const categories = formData.getAll('categories');

		let thumbnailURL;

		if (
			thumbnailImage &&
			thumbnailImage.size > 0 &&
			(thumbnailImage.type === 'image/jpeg' ||
				thumbnailImage.type === 'image/png')
		) {
			thumbnailURL = await fileUploader(thumbnailImage, 'images');
		}

		const { error, value } = joiNewsUpdateSchema.validate({
			title,
			shortDescription,
			description,
			author,
			categories,
			thumbnailURL,
		});

		if (error) {
			throw new Error(error);
		}

		await connectMongoDB();

		const existingNews = await News.findById(newsId);
		if (!existingNews) {
			throw new Error('News not found');
		}

		existingNews.title = title;
		existingNews.shortDescription = shortDescription;
		existingNews.description = description;
		existingNews.author = author;
		existingNews.categories = categories;
		if (thumbnailImage.size > 0) {
			existingNews.thumbnailURL = thumbnailURL;
		}

		const result = await existingNews.save();
		if (result) {
			return { success: true };
		}
	} catch (error) {
		return { error: error.message };
	}
};

export const deleteNewsAction = async (_id) => {
	try {
		await connectMongoDB();
		const result = await News.findByIdAndDelete(_id);
		if (result) {
			return { success: true };
		}
	} catch (error) {
		return { error: error.message };
	}
};

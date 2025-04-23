'use server';

import fileUploader from '@/lib/fileUploader';
import { connectMongoDB } from '@/lib/mongodb';
import Category from '@/models/categoriesModel';
import Joi from 'joi';

const joiCategoryCreateSchema = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().required(),
	thumbnailURL: Joi.string().required(),
});

const joiCategoryUpdateSchema = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().required(),
	thumbnailURL: Joi.string().allow('').optional(),
});

export const fetchAllCategoryAction = async () => {
	try {
		await connectMongoDB();
		const result = await Category.find();
		const categories = JSON.parse(JSON.stringify(result));
		return categories;
	} catch (error) {
		throw new Error(error);
	}
};

export const fetchCategoryAction = async (_id) => {
	try {
		await connectMongoDB();
		const result = await Category.findOne({ _id });
		const dataObj = JSON.parse(JSON.stringify(result));
		return dataObj;
	} catch (error) {
		throw new Error(error);
	}
};

export const createCategoryAction = async (formData) => {
	try {
		const name = formData.get('name')?.toString();
		const description = formData.get('description')?.toString();
		const thumbnailImage = formData.get('thumbnailImage');

		if (
			!thumbnailImage ||
			(thumbnailImage.type !== 'image/jpeg' &&
				thumbnailImage.type !== 'image/png')
		) {
			throw new Error('Image is Required!');
		}
		const thumbnailURL = await fileUploader(thumbnailImage, 'images');

		const { error, value } = joiCategoryCreateSchema.validate({
			name,
			description,
			thumbnailURL,
		});

		if (error) {
			throw new Error(error);
		}
		await connectMongoDB();

		const result = await Category.create({
			name,
			description,
			thumbnailURL,
		});
		if (result) {
			return { success: true };
		}
	} catch (error) {
		return { error: error.message };
	}
};

export const updateCategoryAction = async (formData) => {
	try {
		const _id = formData.get('categoryId')?.toString();
		const name = formData.get('name')?.toString();
		const description = formData.get('description')?.toString();
		const thumbnailImage = formData.get('thumbnailImage');

		let thumbnailURL;

		if (
			thumbnailImage.size > 0 &&
			(thumbnailImage.type === 'image/jpeg' ||
				thumbnailImage.type === 'image/png')
		) {
			thumbnailURL = await fileUploader(thumbnailImage, 'images');
		}

		const { error, value } = joiCategoryUpdateSchema.validate({
			name,
			description,
			thumbnailURL,
		});

		if (error) {
			throw new Error(error);
		}
		await connectMongoDB();

		const existingCategory = await Category.findOne({ _id });

		if (!existingCategory) {
			throw new Error('category does exists!');
		}

		existingCategory.name = name;
		existingCategory.description = description;

		if (thumbnailImage.size > 0) {
			existingCategory.thumbnailURL = thumbnailURL;
		}

		const result = await existingCategory.save();

		if (result) {
			return { success: true };
		}
	} catch (error) {
		return { error: error.message };
	}
};

export const deleteCategoryAction = async (_id) => {
	try {
		await connectMongoDB();
		const result = await Category.findByIdAndDelete(_id);
		if (result) {
			return { success: true };
		}
	} catch (error) {
		return { error: error.message };
	}
};

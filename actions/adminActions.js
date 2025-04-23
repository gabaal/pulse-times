'use server';

import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/usersModel';
import Joi from 'joi';

const joiAdminSchema = Joi.object({
	email: Joi.string().min(5).required(),
	role: Joi.string().required(),
});

export const fetchAdminAction = async () => {
	try {
		await connectMongoDB();

		const result = await User.find({ role: 'admin' }).select('name email role');

		const dataObj = JSON.parse(JSON.stringify(result));
		return dataObj;
	} catch (error) {
		throw new Error(error);
	}
};

export async function createAdminAction(formData) {
	try {
		const email = formData.get('email')?.toString();
		const role = formData.get('role')?.toString();

		const { error, value } = joiAdminSchema.validate({
			email,
			role,
		});

		if (error) {
			throw new Error(error);
		}

		await connectMongoDB();

		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			throw new Error('User does not exist!');
		}

		existingUser.role = role;
		const result = await existingUser.save();
		if (result) {
			return { success: true };
		}
	} catch (error) {
		return { error: error.message };
	}
}

export const deleteAdminAction = async (email) => {
	try {
		await connectMongoDB();
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			throw new Error('User does not exist!');
		}
		existingUser.role = 'user';
		await existingUser.save();
	} catch (error) {
		throw new Error(error);
	}
};

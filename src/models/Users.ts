import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	authentication: {
		password: { type: String, required: true, select: false },
		salt: { type: String, required: true, select: false },
		sessionToken: { type: String, required: true, select: false },
	},
});

export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = async () => {
	const users = await UserModel.find({});
	return users;
};

export const getUserById = async (id: string) => {
	const user = await UserModel.findById({ id });
	return user;
};

export const getUserByEmail = async (email: string) => {
	const user = await UserModel.findOne({ email: email });
	return user;
};

export const getUserBySessionToken = async (sessionToken: string) => {
	const user = await UserModel.findOne({ authentication: { sessionToken: sessionToken } });
	return user;
};

export const createUser = async (user: Record<string, any>) => {
	const newUser = new UserModel(user);
	await newUser.save();
	return newUser;
};

export const updateUser = async (id: string, user: Record<string, any>) => {
	const updatedUser = await UserModel.findByIdAndUpdate(id, user, { new: true });
	return updatedUser;
};

export const deleteUser = async (id: string) => {
	const deletedUser = await UserModel.findByIdAndDelete(id);
	return deletedUser;
};

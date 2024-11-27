import crypto from "crypto";

export const random = () => {
	return crypto.randomBytes(128).toString("base64");
};

export const authentication = (password: string, salt: string) => {
	const hash = crypto.createHmac("sha256", [salt, password].join("/"));
	hash.update(password);
	const digest = hash.digest("hex");
	return digest;
};

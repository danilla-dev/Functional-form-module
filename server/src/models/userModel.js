import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
	name: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	activeSub: {
		type: Boolean,
		required: false,
		default: false,
	},
	activateToken: {
		type: String,
		required: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

export const User = mongoose.model('User', userSchema)

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
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	activeSub: {
		type: Boolean,
		required: true,
		default: false,
	},
	activateToken: {
		type: String,
		required: false,
	},
	verificationCode: {
		type: Number,
		required: true,
	},
	isVerified: {
		type: Boolean,
		default: false,
		required: true,
	},
	subscription: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Subscription',
	},
	integration: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Integration',
	},
	stripeCustomerId: {
		type: String,
		required: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

export const User = mongoose.model('User', userSchema)

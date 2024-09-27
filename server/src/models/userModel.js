import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
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
		required: true,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	timestamps: true,
})

export default mongoose.model('User', userSchema)

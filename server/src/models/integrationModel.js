import mongoose from 'mongoose'
const Schema = mongoose.Schema

const integrationSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	name: {
		type: String,
		required: true,
		trim: true,
	},
	type: {
		type: String,
		required: false,
		trim: true,
	},
	apiKey: {
		type: String,
		required: true,
		trim: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
})

export const Integration = mongoose.model('Integration', integrationSchema)

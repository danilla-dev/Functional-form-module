import e from 'express'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const subSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	details: {
		type: Map,
		of: String,
		required: true,
	},
	paymentStatus: {
		type: String,
		default: 'pending',
		enum: ['pending', 'paid', 'failed'],
	},
	subscriptionDuration: {
		type: Number,
		required: true,
	},
	subscriptionDurationType: {
		type: String,
		required: true,
		enum: ['days', 'weeks', 'months', 'years'],
	},
	subscriptionEndDate: {
		type: Date,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	timestamps: true,
})

export default mongoose.model('Subscription', subSchema)

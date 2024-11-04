import e from 'express'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const subSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: false,
	},
	details: {
		type: Map,
		of: Object,
		required: true,
	},
	paymentStatus: {
		type: String,
		default: 'pending',
		enum: ['pending', 'paid', 'failed'],
		required: true,
	},
	subscriptionDuration: {
		type: Number,
		required: false,
	},
	subscriptionDurationType: {
		type: String,
		required: false,
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

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
})

export const Subscription = mongoose.model('Subscription', subSchema)

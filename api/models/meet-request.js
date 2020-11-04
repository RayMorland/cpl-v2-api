const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeetRequestSchema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    meet: {
        type: Schema.Types.ObjectId,
        ref: 'Meet'
    },
    coordinatorId: {
        type: Schema.Types.ObjectId,
        ref: 'Coordinator'
    },
    creationDate: { type: Date },
    lastEditDate: { type: Date },
    submissions: [{
        date: {
            type: Date
        },
        rejectInfo: {
            date: { type: Date },
            reason: { type: String },
            message: { type: String }
        },
    }],
    approvalDate: { type: Date },
    meetApproved: { type: Boolean },
}, {
        minimize: false
    }, {
        collection: 'meetRequests'
    }, {
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    })

mongoose.model('MeetRequest', MeetRequestSchema);
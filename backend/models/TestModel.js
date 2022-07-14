import mongoose from 'mongoose';

const TestModel = mongoose.Schema({
    name: {
        type: String,
    },
    eye: {
        type: Number,
    },
    verbal: {
        type: Number,
    },
    motor: {
        type: Number,
    },
    score: {
        type: Number,
    },
    date: {
        type: String,
    },
    patientId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Patient',
    },
}, {
    timestamps: true,
});

export const Test = mongoose.model('Test', TestModel);
"use strict";

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const entrySchema = new mongoose.Schema({
    entryType: {
        type: String,
        required: false
    },
    matchDate: {
        type: Date,
        required: false
    },
    matchVenue: {
        type: String,
        required: false
    },
    matchReferee: {
        type: String,
        required: false
    },
    matchResult: {
        type: String,
        required: false
    },
    matchStadiumType: {
        type: String,
        required: false
    },
    matchCapacity: {
        type: String,
        required: false
    },
    matchNotes: {
        type: String,
        required: false
    },
    loggedInUserName: {
        type: String,
        required: false
    }
});

const Sample = mongoose.model('sampledata', entrySchema,'sampledata');

module.exports = Sample;

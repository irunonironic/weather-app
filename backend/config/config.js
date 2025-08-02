const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    city:{
        type: String,
        required: true,
        trim: true
    },
    country:{
        type: String,
        required: true,
        trim: true
    },
    latitude:{
        type: Number,
        required: true
    },
    longitude:{
        type: Number,
        required: true
    },
    isFavorite:{
        type: Boolean,
        default : false
    }
},{
    timestamps: true
});


locationSchema.index({user:1, city:1 },{ unique:true });
locationSchema.index({ user: 1, name: 1 },{ unique: true});

 const Location = mongoose.model('Location ',locationSchema);

 module.exports = Location;
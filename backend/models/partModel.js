import mongoose from 'mongoose'

const commentsSchema = mongoose.Schema({
    name:{type: String, required: true},
    comment:{type: String, required: true},

}, {
    timestamps: true
})

const partSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    item_name:{type: String, required: true},
    image:{type: String},
    part_number:{type: String, required: true},
    niin:{type: String, required: true},
    adrn:{type: String, required: true},
    variant:{type: Number, required: true},
    codified_mrn:{type: String, required: true},
    group_class:{type: Number, required: true},
    date_last_amended:{type: Date, required: true},
    rac:{type: String, required: true},
    ui:{type: String, required: true},
    tsub:{type: String, required: true},
    comments:{type: [commentsSchema]},
    countInStock:{type: String, required: true},
}, {
    timestamps: true
})

const Part = mongoose.model('Part', userSchema)

export default Part
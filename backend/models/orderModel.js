import mongoose from 'mongoose'

const commentsSchema = mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },

}, {
  timestamps: true
})

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        qtyDelivered: { type: Number, required: true, default: 0 },
        qtyOutstanding: { type: Number, required: true, default: 0 },
        image: { type: String },
        dmReg: { type: String, required: true },
        tail: { type: String, required: true },
        trade: { type: String, required: true },
        location: { type: String, required: true },
        part: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Part',
        },
      },
    ],
    status: { type: String, required: true, default: "Open" },
    requiredDelivery: { type: Date },
    estimatedDelivery: { type: Date },
    fullReceipt: { type: Date },
    comments: { type: [commentsSchema] },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
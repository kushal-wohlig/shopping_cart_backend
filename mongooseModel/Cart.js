var cartSchema = new Schema(
    {
        CustomerId: {
            type: String,
            required: true,
            index: true
        },
        ProductId: {
            type: String,
            required: true,
            index: true
        }
    },
    {
        timestamp: true
    }
)

cartSchema.index({ CustomerId: 1, ProductId: 1 }, { unique: true })
export default mongoose.model("Cart", cartSchema)

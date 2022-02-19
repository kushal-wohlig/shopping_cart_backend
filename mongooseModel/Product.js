var productSchema = new Schema(
    {
        ProductId: {
            type: String,
            required: true,
            index: true
        },
        price: {
            type: Number,
            required: true,
            index: true
        },
        name: {
            type: String,
            required: true,
            index: true
        },
        description: {
            type: String,
            required: true,
            index: true
        }
    },
    {
        timestamp: true
    }
)

productSchema.index({ name: 1, ProductId: 1 }, { unique: true })
export default mongoose.model("Product", productSchema)

var customerSchema = new mongoose.Schema({
    CustomerId: {
        type: String,
        required: true,
        index: true
    },
    fname: {
        type: String,
        required: true,
        index: true
    },
    lname: {
        type: String,
        required: true,
        index: true
    },
    phone_no: {
        type: Number,
        required: true,
        min: 6000000000,
        max: 9999999999
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
customerSchema.index({ CustomerId: 1, fname: 1, lname: 1 }, { unique: true })
export default mongoose.model("Customer", customerSchema)

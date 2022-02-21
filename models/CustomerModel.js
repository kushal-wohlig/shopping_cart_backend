import Customer from "../mongooseModel/Customer"

export default {
    /**
     * This function adds one to its input.
     * @param {number} input any number
     * @returns {number} that number, plus one.
     */

    addCustomer: async (body) => {
        let obj = new Customer(body)
        await obj.save()
        return obj
    },

    getOneCustomer: async (id) => {
        let data = await Customer.findOne({
            CustomerId: id
        })
        return data
    }
}

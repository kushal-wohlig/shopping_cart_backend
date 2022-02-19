import Person from "../mongooseModel/Person"
import Cart from "../mongooseModel/Cart"
export default {
    /**
     * This function adds one to its input.
     * @param {number} input any number
     * @returns {number} that number, plus one.
     */

    addProduct: async (body) => {
        let obj = new Cart(body)
        await obj.save()
        return obj
    },

    getTotalCart: async (id) => {
        let cartValue = 0
        let data = await Cart.find({
            CustomerId: id
        })
        console.log(data)

        let productsInCart = await Cart.aggregate([
            //stage 1 : filter all documents based on customer id
            {
                $match: { CustomerId: id }
            },
            //Stage 2: filter out the products from ProductId
            {
                $lookup: {
                    from: "Product",
                    localField: "ProductId",
                    foreignField: "ProductId",
                    as: "products"
                }
            }

            // //Stage 3: Calculating the cart value
            // {
            //     $group: { _id: null, cartValue: { $sum: "$" } }
            // }
        ])

        return productsInCart
    },
    search: async (body) => {
        const pageNo = body.page
        const skip = (pageNo - 1) * global.paginationLimit
        const limit = global.paginationLimit
        const data = await Person.find({
            status: { $in: ["enabled", "disabled"] }
        })
            .skip(skip)
            .limit(limit)
            .exec()
        const count = await Person.countDocuments({
            status: { $in: ["enabled", "disabled"] }
        }).exec()
        const maxPage = Math.ceil(count / limit)
        return { data, count, maxPage }
    },
    getOne: async (id) => {
        return await Person.findOne({
            _id: id,
            status: { $in: ["enabled", "disabled"] }
        }).exec()
    },
    saveData: async (data) => {
        let obj = new Person(data)
        await obj.save()
        return obj
    },
    updateData: async (id, data) => {
        let obj = await Person.findOneAndUpdate({ _id: id }, data, {
            new: true
        })
        return obj
    },
    deleteData: async (id) => {
        let obj = await Person.findOneAndUpdate(
            { _id: id },
            { status: "archived" },
            {
                new: true
            }
        )
        return obj
    }
}

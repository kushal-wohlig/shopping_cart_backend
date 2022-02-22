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
                    from: "products",
                    localField: "ProductId",
                    foreignField: "ProductId",
                    as: "products"
                }
            },
            {
                $unwind: "$products"
            },

            //Stage 3: Calculating the cart value
            {
                $group: {
                    _id: "$CustomerId",
                    products: { $push: "$products" },
                    cartValue: { $sum: "$products.price" }
                }
            }
        ])
        // console.log(productsInCart)
        return productsInCart
    },
    updateData: async (id, data) => {
        let obj = await Person.findOneAndUpdate({ _id: id }, data, {
            new: true
        })
        return obj
    },
    deleteProductCart: async (pid, cid) => {
        let data = await Cart.remove({
            CustomerId: cid,
            ProductId: pid
        })
        return data
    }
}

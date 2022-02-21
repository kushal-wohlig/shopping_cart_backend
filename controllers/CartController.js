import CartModel from "../models/CartModel"

const router = Router()

router.post("/products", async (req, res) => {
    try {
        const data = await CartModel.addProduct(req.body)
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.get("/getAllProducts/:id", async (req, res) => {
    try {
        const data = await CartModel.getTotalCart(req.params.id)
        // const parsed =JSON.parse(data)
        // let cartValue = 0
        // var len = data.length
        // for(var i =0;i<len;i++)
        // {
        //     cartValue+=data[i]["products"][0]["price"]
        // }
        // console.log(cartValue)
        // console.log(len)
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

export default router

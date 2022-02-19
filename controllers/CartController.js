import CartModel from "../models/CartModel"

const router=Router()

router.post("/products", async(req,res) =>{
    try {
        const data = await CartModel.addProduct(req.body)
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.get("/getAllProducts", async(req,res) =>{
    try {
        const data = await CartModel.getTotalCart(req.params.id)
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


export default router
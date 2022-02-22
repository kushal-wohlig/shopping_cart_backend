// import { urlencoded } from "body-parser"

import CustomerModel from "../models/CustomerModel"

const router = Router()
router.post("/addCustomer", urlencodedParser, async (req, res) => {
    try {
        const data = await CustomerModel.addCustomer(req.body)
        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

router.post("/login", urlencodedParser, async (req, res) => {
    try {
        const data = await CustomerModel.loginCustomer(req.body)
        // res.json(data)
        if (data != -1) res.json(data)
        else res.status(400).send("Invalid Login")
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

router.get(
    "/customerdetails/:id",
    ValidateRequest({
        params: {
            type: "object",
            properties: {
                id: {
                    type: "string"
                    // format: "objectId"
                }
            }
        }
    }),
    async (req, res) => {
        try {
            const data = await CustomerModel.getOneCustomer(req.params.id)
            res.json(data)
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    }
)
export default router

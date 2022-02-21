// import { urlencoded } from "body-parser"

const router = Router()
router.post("/addCustomer", async (req, res) => {
    try {
        const data = await CustomerModel.addCustomer(req.body)
        res.json(data)
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

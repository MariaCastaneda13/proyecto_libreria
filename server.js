import express from "express"
import usersManager from "./data/fs/UsersManager.fs.js";
import ProductsManager from "./data/fs/ProductsManager.fs.js";
//Server
const server = express()
const port = 8080
const ready = () => console.log("server ready on port" + port);
server.listen(port, ready)
//Middlewares
server.use(express.urlencoded({ extended: true }))
server.use(express.json())

//Router
server.get("/", async (req, res) => {
    try {
        return response.json({
            statusCode: 200,
            message: "API",
        })
    } catch (error) {
        console.log(error);
        return res.json({
            statusCode: 404,
            message: "ERROR"
        })
    }

})
const create = async (req, res) => {
    try {
        const data = req.body
        const one = await ProductsManager.create(data)
        return res.json({
            statusCode: 201,
            message: "Created ID: " + one.id
        })
    } catch (error) {
        return res.json({
            statusCode: error.statusCode || 404,
            message: error.message || "ERROR"
        })
    }
}
const update = async (req, res) => {
    try {
        const { nid } = req.params
        const data = req.body
        const one = await ProductsManager.update(pid, data)
        return res.json({
            statusCode: 200,
            message: "Updated Id: " + one.id,
        })
    } catch (error) {
        return res.json({
            statusCode: error.statusCode || 404,
            message: error.message || "ERROR"
        })
    }
}
//
server.get("/api/products", async (req, res) => {
    try {
        const { category } = req.query
        const products = await ProductsManager.read(category)
        if (products) {
            return res.status(200).json({
                response: products,
                category,
                success: true
            })
        } else {
            const error = new Error("Product not found")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false
        })
    }
})

server.get("/api/products/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const one = await ProductsManager.readOne(pid)
        if (one) {
            return res.status(200).json({
                response: one,
                success: true
            })
        } else {
            const error = new Error("Product not found")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false
        })
    }
})

/**/
server.get("/api/users", async (req, res) => {
    try {
        const { rol } = req.query
        const users = await usersManager.read(rol)
        if (users) {
            return res.status(200).json({
                response: users,
                rol,
                success: true
            });
        } else {
            const error = new Error("User not found")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false
        })
    }
})

server.get("/api/users/:uid", async (req, res) => {
    try {
        const { uid } = req.params
        const one = await ProductsManager.readOne(uid)
        if (one) {
            return res.status(200).json({
                response: one,
                success: true
            })
        } else {
            const error = new Error("User not found")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false
        })
    }
})


server.post("api/products", create)
server.put("/api/products/:pid", update)
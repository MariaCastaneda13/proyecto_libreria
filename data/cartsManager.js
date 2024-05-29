import fs from "fs";
import crypto from "crypto"; 

class CartsManager {
    constructor() {
        this.path = "./data/carts.json";
        this.init();
    }
//Se inicia el carrito 
    init() {
        const exists = fs.existsSync(this.path);
        if (!exists) {
            const stringData = JSON.stringify([], null, 2);
            fs.writeFileSync(this.path, stringData);
            console.log("The file was created");
        } else {
            console.log("The file already exists");
        }
    }
// Se crea nuevo carrito
    async create() {
        const cart = {
            id: crypto.randomBytes(12).toString("hex"),
            products: []
        };

        let carts = await fs.promises.readFile(this.path, "utf-8");
        carts = JSON.parse(carts);
        carts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        console.log("The cart was created correctly");
        return cart;
    }
// Se leen todos los carritos
    async read() {
        let carts = await fs.promises.readFile(this.path, "utf-8");
        carts = JSON.parse(carts);
        return carts;
    }

    async readOne(id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let cart = all.find((each) => each.id === id);
            return cart;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
//Se agrega un producto a un carrito
    async addProduct(cartId, productId) {
        try {
            let carts = await fs.promises.readFile(this.path, "utf-8");
            carts = JSON.parse(carts);
            const cart = carts.find(c => c.id === cartId);

            if (!cart) {
                return null;
            }

            const productInCart = cart.products.find(p => p.product === productId);

            if (productInCart) {
                productInCart.quantity += 1;
            } else {
                cart.products.push({
                    product: productId,
                    quantity: 1
                });
            }

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            return cart;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

const CartsManagerInstance = new CartsManager();
export default CartsManagerInstance;

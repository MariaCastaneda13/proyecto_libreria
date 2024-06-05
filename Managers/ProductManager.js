import fs from "fs";
import path from "path";
import __dirname from "../dirname.js";


class ProductManager{
    constructor(path){
        this.path=path;
        if (fs.existsSync(this.path)){
            try{
                this.products=JSON.parse(fs.readFileSync(this.path,"utf-8"));
            }catch(error){
                this.products=[];
            }
        } else {
            this.products=[];
    }
}

async addProduct(product){
    if(
        !product.title ||
        !product.photo ||
        !product.category ||
        !product.price ||
        !product.code ||
        !product.stock
    ){
        console.log("All fields are required");
        return;
    }
    if(this.products.some((p)=>p.code== product.code)){
        console.log("The code is already registered");
        return;
    }
    if(this.products.length>0){
        const newId= this.products[this.products.length-1].id+1;
        product.id=newId;
    }else{
        product.id=1;
    }
    this.products.push(product);
    try{
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(this.products, null, "\t")
          );
        console.log("Product was added correctly");
        } catch (error) {
          throw new Error(error);
        }
      }
      getProducts() {
        return this.products;
      }
      getProductById(idProduct) {
        if (isNaN(Number(idProduct))) {
          console.log("The id must be a number");
          throw new Error("The id must be a number");
        }
    
        const product = this.products.find(
          (product) => product.id === Number(idProduct)
        );
    
        if (!product) {
          throw new Error("Product not found");
        }
    
        return product;
      }
      async deleteProduct(idProduct) {
        const productIndex = this.products.findIndex(
          (product) => product.id === idProduct
        );
    
        if (productIndex === -1) {
          throw new Error("Product not found");
        }
    
        this.products.splice(productIndex, 1);
    
        try {
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(this.products, null, "\t")
          );
    
          console.log("The product was eliminated");
        } catch (error) {
          throw new Error(error);
        }
    }
    
  async updateProduct(idProduct, product) {
    const productIndex = this.products.findIndex(
      (product) => product.id === Number(idProduct)
    );

    const productOld = this.products[productIndex];

    const newProduct = {
      id: Number(idProduct),
      title: product.title || productOld.title,
      price: product.price || productOld.price,
      photo: product.photo || productOld.photo,
      code: product.code || productOld.code,
      stock: product.stock || productOld.stock,
      status: product.status ?? productOld.status,
    };

    this.products[productIndex] = newProduct;

    console.log("Product:", this.products[productIndex]);

    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );

      console.log("The product was updated");
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const productManager = new ProductManager(
  path.resolve(__dirname, "..\data\products.json")
);
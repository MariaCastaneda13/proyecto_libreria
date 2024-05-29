import fs from "fs";
import crypto from "crypto";

class ProductsManager {
    constructor() {
        this.path = "./fs/files/products.json"
        this.init()
    }
    init() {
        const exists = fs.existsSync(this.path)
        if (!exists) {
            const stringData = JSON.stringify([], null, 2)
            fs.writeFileSync(this.path, stringData)
            console.log("The file was created")
        } else {
            console.log("The file already exist")
        }
    }


    async create(data) {
        const product = {
            id: crypto.randomBytes(12).toString("hex"),
            title: data.title,
            photo: data.photo,
            category: data.category,
            price: data.price,
            stock: data.stock
        };

        if (!data.title || !data.photo || !data.category || !data.price || !data.stock) { console.log("The product has not been created, please enter all data.") }
        else {
            let products = await fs.promises.readFile(this.path, "utf-8")
            products = JSON.parse(products)
            products.push(product);
            console.log("The product was created correctly");
            products = JSON.stringify(products, null, 2)
            await fs.promises.writeFile(this.path, products)
        }
    }

    async read() {
        let products = await fs.promises.readFile(this.path, "utf-8")
        products = JSON.parse(products)
        return products;
    }

    async readOne(id) {
       try{
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);
        let note=all.find((each)=>each.id===id);
        return note;
       } catch (error){
        console.log(error);
        return error
       
    }
}
async update(id,data) {
    try{
    const one = this.readOne(id)
    
    }catch (error){
        console.log(error);
        return error
    }
}
    async destroy(id) {
        let products = await fs.promises.readFile(this.path, "utf-8")
        users = JSON.parse(products)
        const filtered = products.filter(each => each.id !== id);
        await fs.promises.writeFile(filtered)
        console.log((id + "deleted"));
    }
}

async function test() {
    const gestorDeProductos = new ProductsManager();
    await gestorDeProductos.create({
        title: "Harry Potter y la piedra filosofal",
        photo: "HP.jpg",
        category: "Fantasía",
        price: 100000,
        stock: 10
    });

    await gestorDeProductos.create({
        title: "En agosto nos vemos",
        photo: "EANV.jpg",
        category: "Literatura uiversal",
        price: 65000,
        stock: 5
    });

    await gestorDeProductos.create({
        title: "La ciudad y sus muros inciertos",
        photo: "LCNI.jpg",
        category: "Literatura universal",
        price: 79000,
        stock: 12
    });

    await gestorDeProductos.create({
        title: "Recupera tu mente,reconquista tu vida",
        photo: "RTMRTV.jpg",
        category: "Autoayuda y superación",
        price: 65000,
        stock: 4
    });

    await gestorDeProductos.create({
        title: "Kindle Paper White",
        photo: "Kindle.jpg",
        category: "Electronics",
        price: 900000,
        stock: 15
    });

    await gestorDeProductos.create({
        title: "Paper Towns",
        photo: "PaperT.jpg",
        category: "Literatura juvenil",
        price: 57000,
        stock: 30
    });

    await gestorDeProductos.create({
        title: "El Diario de Ana Frank",
        photo: "EDDAF.jpg",
        category: "Historia",
        price: 68000,
        stock: 10
    });
    await gestorDeProductos.create({
        title: "Game Of Thrones",
        photo: "GOT.jpg",
        category: "Ficción",
        price: 98000,
        stock: 12
    });
    await gestorDeProductos.create({
        title: "The 100",
        photo: "T100.jpg",
        category: "Ficción",
        price: 63000,
        stock: 9
    });
    await gestorDeProductos.create({
        title: "Our Common Future",
        photo: "OCF.jpg",
        category: "Ciencia y divulgación",
        price: 110000,
        stock: 24
    });
    await gestorDeProductos.create({
        title: "Sobre el origen del tiempo",
        photo: "SEODT.jpg",
        category: "Ciencia y divulgación",
        price: 69000,
        stock: 19
    });
    await gestorDeProductos.create({
        title: "Supercomunicadores",
        photo: "superCom.jpg",
        category: "Autoayuda y superación",
        price: 54000,
        stock: 2
    });
    await gestorDeProductos.create({
        title: "El silencio en sus ojos",
        photo: "ESESO.jpg",
        category: "Policiaca",
        price: 55000,
        stock: 20
    });
    await gestorDeProductos.create({
        title: "Riverview",
        photo: "Rvw.jpg",
        category: "Literatura Universal",
        price: 55000,
        stock: 7
    });
    await gestorDeProductos.create({
        title: "Cocina de casa",
        photo: "CDC.jpg",
        category: "Cocina",
        price: 150000,
        stock: 21
    });
    await gestorDeProductos.create({
        title: "Quiero morir pero también comer tteokbokki",
        photo: "QMPCT.jpg",
        category: "Autoayuda y superación",
        price:48000 ,
        stock: 8
    });
    await gestorDeProductos.create({
        title: "Bajo la misma estrella",
        photo: "BLME.jpg",
        category: "Literatura juvenil",
        price: 62000,
        stock: 19
    });
    await gestorDeProductos.create({
        title: "Elizabeth Finch",
        photo: "EF.jpg",
        category: "Literatura Universal",
        price: 89000,
        stock: 7
    });
    await gestorDeProductos.create({
        title: "Grandes esperanzas",
        photo: "GE.jpg",
        category: "Literatura universal",
        price: 124000,
        stock: 21
    });
    await gestorDeProductos.create({
        title: "La historia de Oliver Twist",
        photo: "LHOT.jpg",
        category: "Literatura universal",
        price:48000 ,
        stock: 8
    });
    await gestorDeProductos.create({
        title: "1984",
        photo: "1984.jpg",
        category: "Literatura Universal",
        price: 100000,
        stock: 39
    });
    await gestorDeProductos.create({
        title: "El arte de la guerra",
        photo: "EADLG.jpg",
        category: "No ficción",
        price: 28000,
        stock: 30
    });
    await gestorDeProductos.create({
        title: "Anna Karenina",
        photo: "AKNN.jpg",
        category: "Novela",
        price:35700 ,
        stock: 3
    });
    await gestorDeProductos.create({
        title: "Eva Luna",
        photo: "EVL.jpg",
        category: "Novela",
        price:50000 ,
        stock: 8
    });
    await gestorDeProductos.create({
        title: "Galapagos",
        photo: "GLP.jpg",
        category: "Novela",
        price: 76000,
        stock: 40
    });
    await gestorDeProductos.create({
        title: "El padrino",
        photo: "EP1.jpg",
        category: "Novela",
        price: 28000,
        stock: 30
    });
    await gestorDeProductos.create({
        title: "Hamlet",
        photo: "HLT.jpg",
        category: "Tragedia",
        price:35700 ,
        stock: 3
    });
    await gestorDeProductos.create({
        title: "Inferno",
        photo: "INF.jpg",
        category: "Novela",
        price: 15900,
        stock: 12
    });
    await gestorDeProductos.create({
        title: "Julio Cesar",
        photo: "JC.jpg",
        category: "Novela",
        price:39700 ,
        stock: 6
    });
    await gestorDeProductos.create({
        title: "Mujercitas",
        photo: "MJR.jpg",
        category: "Novela",
        price: 87000,
        stock: 17
    });
    await gestorDeProductos.create({
        title: "Moby Dick",
        photo: "MBD.jpg",
        category: "Novela",
        price:41000 ,
        stock: 6
    });
    await gestorDeProductos.create({
        title: "El Cuervo",
        photo: "ECV.jpg",
        category: "Cuento",
        price:17800 ,
        stock: 3
    });
    await gestorDeProductos.create({
        title: "El Camino del artista",
        photo: "ECDA.jpg",
        category: "Autoayuda y superación",
        price:96000 ,
        stock: 8
    });
    await gestorDeProductos.create({
        title: "Will",
        photo: "Will.jpg",
        category: "Biografía",
        price:90000 ,
        stock: 10
    });
    await gestorDeProductos.create({
        title: "Mujeres de luz",
        photo: "MDL.jpg",
        category: "Autoayuda y superación",
        price:90661 ,
        stock: 107
    });
    await gestorDeProductos.create({
        title: "Combate el sindrome del impostor",
        photo: "SDI.jpg",
        category: "Autoayuda y superación",
        price:105000 ,
        stock: 97
    });
    await gestorDeProductos.create({
        title: "Hasta que deje de doler",
        photo: "HQDD.jpg",
        category: "Autoayuda y superación",
        price:96500 ,
        stock: 85
    });
    await gestorDeProductos.create({
        title: "Comer, rezar, amar",
        photo: "CRA.jpg",
        category: "Novela",
        price:75000 ,
        stock: 63
    });
    await gestorDeProductos.create({
        title: "Aprendiendo a decir adiós",
        photo: "AADA.jpg",
        category: "Autoayuda y superación",
        price:65000,
        stock: 80
    });
    await gestorDeProductos.create({
        title: "Las mujeres que compran flores",
        photo: "LMQCF.jpg",
        category: "Autoayuda y superación",
        price:63000 ,
        stock: 30
    });
    console.log(await gestorDeProductos.read())
    console.log(await gestorDeProductos.readOne("d3955e0450f9fb275df286df"))
}
const ProductsManager =new ProductsManager()
export default ProductsManager
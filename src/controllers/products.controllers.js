import '../configs/config.js';
import { ProductsDAOFactory } from '../services/DAOs/ProductsDAOFactory.js';
import { productsDTO } from '../services/DTOs/products.DTO.js';

const productsDAO = ProductsDAOFactory.getDao();

export const getAllProducts = async (ctx, next) =>{
    const products = await productsDAO.getAll();
    if(products){
        const allProductsDTO = products.map((product) => productsDTO(product));
        ctx.body = allProductsDTO;
    };
    next();
};

export const getProductById = async (ctx, next) =>{
    const {id} = ctx.params;
    const product = await productsDAO.getById(id);
    if(product){
        ctx.body = productsDTO(product);
    };
    next();
};

// productsKoaRouter.post('/', (ctx, next) =>{
//     const book = ctx.request.body;
//     books.push(book);
//     ctx.body = books;
//     next();
// });

export const createProduct = async (ctx, next) =>{
    const {name, description, price, stock, imageURL} = ctx.request.body; 
    const newProduct = {
        timestamp: new Date().getTime(),
        name: name,
        description: description, 
        price: price,
        stock: stock, 
        imageURL: imageURL
    };
    const newProductAddedMSG = await productsDAO.save(newProduct);
    ctx.body = newProductAddedMSG;
    next();
};

export const updateProduct = async (ctx, next) =>{
    const {id} = ctx.params;
    const newData = ctx.request.body;
    const updatedProduct = await productsDAO.updateById(id, newData);
    ctx.body = updatedProduct;
    next();
};

export const deleteProductByID = async (ctx, next) =>{
    const {id} = ctx.params;
    const deletedProduct = await productsDAO.deleteById(id);
    ctx.body = deletedProduct;
    next();
};
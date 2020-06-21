import { Router } from 'https://deno.land/x/oak/mod.ts'
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} from './controllers/products.ts'

const productsRouter = new Router({
  prefix: '/api/v1',
})

productsRouter.get('/products', getAllProducts)
productsRouter.get('/products/:id', getProductById)
productsRouter.post('/products', createProduct)
productsRouter.delete('/products/:id', deleteProduct)
productsRouter.put('/products/:id', updateProduct)

export default productsRouter

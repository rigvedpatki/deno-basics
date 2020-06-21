import { IProduct } from '../types.ts'
import { RouterMiddleware, Status } from 'https://deno.land/x/oak/mod.ts'
import notFound from '../middlewares/not-found-error.ts'

let products: Array<IProduct> = [
  {
    id: '1',
    name: 'Product one',
    description: 'This is product one',
    price: 12.99,
  },
  {
    id: '2',
    name: 'Product two',
    description: 'This is product two',
    price: 15.99,
  },
  {
    id: '3',
    name: 'Product three',
    description: 'This is product three ',
    price: 4.99,
  },
  {
    id: '4',
    name: 'Product four',
    description: 'This is product four ',
    price: 29.99,
  },
]

// @desc get all products
// @route GET /products
export const getAllProducts: RouterMiddleware = async (ctx) => {
  ctx.response.body = { products }
}

// @desc get all product by id
// @route GET /product/:id
export const getProductById: RouterMiddleware = async (ctx) => {
  const { id } = ctx.params
  const product = products.find((p) => p.id === id)
  if (product) {
    ctx.response.body = {
      product,
    }
  } else {
    return notFound(ctx)
  }
}

export const createProduct: RouterMiddleware = async (ctx) => {
  if (ctx.request.hasBody) {
    const body = await ctx.request.body()
    if (body.type === 'json') {
      const { name, description, price }: IProduct = body.value
      if (!name || !description || !price) {
        ctx.throw(Status.BadRequest, 'Bad Request')
      }
      const temp = products.sort((a, b) => parseInt(b.id) - parseInt(a.id))
      const newId = temp[0].id
      products.push({
        id: `${parseInt(newId) + 1}`,
        name,
        description,
        price,
      })
      ctx.response.status = 201
      ctx.response.body = {
        product: {
          id: `${parseInt(newId) + 1}`,
          name,
          description,
          price,
        },
      }
    } else {
      ctx.throw(Status.BadRequest, 'Bad Request')
    }
  } else {
    ctx.throw(Status.BadRequest, 'Bad Request')
  }
}

export const updateProduct: RouterMiddleware = async (ctx) => {
  const { id } = ctx.params
  const index = products.findIndex((el) => el.id === id)
  if (index === -1) {
    return notFound(ctx)
  }
  if (!ctx.request.hasBody) {
    ctx.throw(Status.BadRequest, 'Bad Request')
  }
  const body = await ctx.request.body()
  if (body.type !== 'json') {
    ctx.throw(Status.BadRequest, 'Bad Request')
  }
  const { name, description, price } = body.value
  products[index].name = name ?? products[index].name
  products[index].description = description ?? products[index].description
  products[index].price = price ?? products[index].price

  ctx.response.body = {
    product: products[index],
  }
}

export const deleteProduct: RouterMiddleware = async (ctx) => {
  const { id } = ctx.params
  const index = products.findIndex((el) => el.id === id)
  if (index === -1) {
    return notFound(ctx)
  }
  products = products.filter((el, elIndex) => elIndex !== index)

  ctx.response.body = {
    products,
  }
}

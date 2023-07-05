export { };

declare global {
  interface ProductType {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
      rate: number,
      count: number
    }
  }

  interface CartType {
    productId: number,
    quantity: number,
    cachedPrice: number,
  }
}
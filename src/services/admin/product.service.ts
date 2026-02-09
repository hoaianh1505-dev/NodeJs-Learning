import { prisma } from "config/client";

const createProduct = async (
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    imageUpload: string
) => {
    await prisma.product.create({
        data: {
            name: name,
            price: price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: quantity,
            factory: factory,
            target: target,
            ...(imageUpload !== null && { image: imageUpload })
        }
    })
}
const getProductList = async () => {
    return await prisma.product.findMany()
}
const handleDeleteProduct = async (id: string) => {
    await prisma.product.delete({
        where: {
            id: +id
        }
    })
}
const getProductById = async (id: string) => {
    return await prisma.product.findUnique({
        where: {
            id: +id
        }
    })
}
const postUpdateProduct = async (id: string, name: string, price: number, detailDesc: string, shortDesc: string, quantity: number, factory: string, target: string, imageUpload: string) => {
    await prisma.product.update({
        where: {
            id: +id
        },
        data: {
            name: name,
            price: price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: quantity,
            factory: factory,
            target: target,
            ...(imageUpload !== null && { image: imageUpload })
        }
    })
}
export { createProduct, getProductList, handleDeleteProduct, getProductById, postUpdateProduct }

import { prisma } from "config/client";
import { resolveInclude } from "ejs";

const getProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}
const getProductById = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: {
            id: Number(id)
        }
    });
    return product;
}
const addProductToCart = async (quantity: number, productId: number, user: Express.User) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id
        }
    })
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    });
    if (cart) {
        //update
        await prisma.cart.update({
            where: {
                id: cart.id
            },
            data: {
                sum: {
                    increment: quantity
                }
            }
        })
        const curentCartDetail = await prisma.cartDetail.findFirst({
            where: {
                productId: productId,
                cartId: cart.id
            }
        })
        await prisma.cartDetail.upsert({
            where: {
                id: curentCartDetail?.id ?? 0
            },
            update: {
                quantity: {
                    increment: quantity
                }
            },
            create: {
                cartId: cart.id,
                productId: productId,
                quantity: quantity,
                price: product?.price
            }
        })
    } else {
        await prisma.cart.create({
            data: {
                userId: user.id,
                sum: quantity,
                cartDetails: {
                    create: [
                        {
                            productId: productId,
                            quantity: quantity,
                            price: product?.price
                        }
                    ]
                }
            }
        })
    }
}
const getProductInCart = async (userId: number) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: userId
        }
    })
    if (cart) {
        const curentCartDetail = await prisma.cartDetail.findMany({
            where: {
                cartId: cart.id
            },
            include: {
                product: true
            }
        })
        return curentCartDetail;
    }
    return [];
}
const updateCartDetailQuantity = async (cartDetailId: number, quantity: number) => {
    const cartDetail = await prisma.cartDetail.findUnique({
        where: { id: cartDetailId },
    });
    if (cartDetail) {
        const diff = quantity - cartDetail.quantity;
        await prisma.cartDetail.update({
            where: { id: cartDetailId },
            data: { quantity: quantity }
        });
        await prisma.cart.update({
            where: { id: cartDetail.cartId },
            data: { sum: { increment: diff } }
        });
    }
}
const deleteProductInCart = async (cartDetailId: number, userId: number) => {
    const cartDetail = await prisma.cartDetail.findUnique({
        where: { id: cartDetailId }
    })
    if (cartDetail) {
        const quantity = cartDetail.quantity;
        await prisma.cartDetail.delete({
            where: { id: cartDetailId }
        })

        const cart = await prisma.cart.findUnique({
            where: { userId: userId }
        })

        if (cart) {
            if (cart.sum <= quantity) {
                await prisma.cart.delete({
                    where: { userId: userId }
                })
            } else {
                await prisma.cart.update({
                    where: { userId: userId },
                    data: { sum: { decrement: quantity } }
                })
            }
        }
    }
}
export { getProducts, getProductById, addProductToCart, getProductInCart, updateCartDetailQuantity, deleteProductInCart }
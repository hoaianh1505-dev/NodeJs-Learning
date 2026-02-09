import { Request, Response } from "express";
const getProductPage = (req: Request, res: Response) => {
    const { id } = req.params;
    return res.render("client/product/detail.ejs", { productId: id });
}

export { getProductPage };
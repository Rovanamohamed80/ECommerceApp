import AddressRouter from "./address/address.routes.js"
import authRouter from "./auth/auth.routes.js"
import BrandRouter from "./brand/brand.routes.js"
import CartRouter from "./cart/cart.routes.js"
import categoryRouter from "./category/category.routes.js"
import couponRouter from "./coupon/coupon.routes.js"
import OrderRouter from "./order/order.routes.js"
import ProductRouter from "./product/product.routes.js"
import ReviewRouter from "./review/review.routes.js"
import subCategoryRouter from "./subcategory/subcategory.routes.js"
import UserRouter from "./user/user.routes.js"
import WishlistRouter from "./wishlist/wishlist.routes.js"


export const bootstrap=(app)=>{
app.use('/api/categories',categoryRouter)
app.use('/api/subcategories',subCategoryRouter)
app.use('/api/brands',BrandRouter)
app.use('/api/products',ProductRouter)
app.use('/api/users',UserRouter)
app.use('/api/auth',authRouter)
app.use('/api/reviews',ReviewRouter)
app.use('/api/wishlists',WishlistRouter)
app.use('/api/addresses',AddressRouter)
app.use('/api/coupons',couponRouter)
app.use('/api/carts',CartRouter)
app.use('/api/orders',OrderRouter)

}
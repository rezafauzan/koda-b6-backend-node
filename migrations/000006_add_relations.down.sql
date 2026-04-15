ALTER TABLE orders
DROP CONSTRAINT IF EXISTS fk_orders_cart;

ALTER TABLE cart_items
DROP CONSTRAINT IF EXISTS fk_cart_items_portion;

ALTER TABLE cart_items
DROP CONSTRAINT IF EXISTS fk_cart_items_variant;

ALTER TABLE cart_items
DROP CONSTRAINT IF EXISTS fk_cart_items_product;

ALTER TABLE cart_items
DROP CONSTRAINT IF EXISTS fk_cart_items_cart;

ALTER TABLE product_campaigns
DROP CONSTRAINT IF EXISTS fk_product_campaigns_discount;

ALTER TABLE product_reviews
DROP CONSTRAINT IF EXISTS fk_product_reviews_user;

ALTER TABLE product_reviews
DROP CONSTRAINT IF EXISTS fk_product_reviews_product;

ALTER TABLE product_portions
DROP CONSTRAINT IF EXISTS fk_product_portions_product;

ALTER TABLE product_variants
DROP CONSTRAINT IF EXISTS fk_product_variants_product;

ALTER TABLE product_images
DROP CONSTRAINT IF EXISTS fk_product_images_product;

ALTER TABLE products
DROP CONSTRAINT IF EXISTS fk_products_category;

ALTER TABLE carts
DROP CONSTRAINT IF EXISTS fk_carts_user;

ALTER TABLE user_credentials
DROP CONSTRAINT IF EXISTS fk_user_credentials_user;

ALTER TABLE user_profiles
DROP CONSTRAINT IF EXISTS fk_user_profiles_user;

ALTER TABLE users
DROP CONSTRAINT IF EXISTS fk_users_role;
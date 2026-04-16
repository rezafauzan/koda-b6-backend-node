
ALTER TABLE users
ADD CONSTRAINT fk_users_role
FOREIGN KEY (role_id) REFERENCES roles(id)
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE user_profiles
ADD CONSTRAINT fk_user_profiles_user
FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE user_credentials
ADD CONSTRAINT fk_user_credentials_user
FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE carts
ADD CONSTRAINT fk_carts_user
FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE cart_items
ADD CONSTRAINT fk_cart_items_cart
FOREIGN KEY (cart_id) REFERENCES carts(id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE cart_items
ADD CONSTRAINT fk_cart_items_product
FOREIGN KEY (product_id) REFERENCES products(id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE cart_items
ADD CONSTRAINT fk_cart_items_variant
FOREIGN KEY (variant_id) REFERENCES product_variants(id)
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE cart_items
ADD CONSTRAINT fk_cart_items_portion
FOREIGN KEY (size_id) REFERENCES product_portions(id)
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE products
ADD CONSTRAINT fk_products_category
FOREIGN KEY (category_id) REFERENCES product_categories(id)
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE product_images
ADD CONSTRAINT fk_product_images_product
FOREIGN KEY (product_id) REFERENCES products(id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE product_variants
ADD CONSTRAINT fk_product_variants_product
FOREIGN KEY (product_id) REFERENCES products(id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE product_portions
ADD CONSTRAINT fk_product_portions_product
FOREIGN KEY (product_id) REFERENCES products(id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE product_reviews
ADD CONSTRAINT fk_product_reviews_product
FOREIGN KEY (product_id) REFERENCES products(id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE product_reviews
ADD CONSTRAINT fk_product_reviews_user
FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE product_campaigns
ALTER COLUMN discount_id TYPE INTEGER USING discount_id::integer;

ALTER TABLE product_campaigns
ADD CONSTRAINT fk_product_campaigns_discount
FOREIGN KEY (discount_id) REFERENCES product_discounts(id)
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE orders
ADD CONSTRAINT fk_orders_cart
FOREIGN KEY (cart_id) REFERENCES carts(id)
ON DELETE CASCADE ON UPDATE CASCADE;
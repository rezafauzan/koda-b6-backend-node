
ALTER TABLE users 
ALTER COLUMN role_id SET NOT NULL,
ALTER COLUMN verified SET NOT NULL;

ALTER TABLE user_profiles 
ALTER COLUMN user_id SET NOT NULL,
ALTER COLUMN user_avatar SET NOT NULL,
ALTER COLUMN first_name SET NOT NULL,
ALTER COLUMN last_name SET NOT NULL,
ALTER COLUMN address SET NOT NULL;

ALTER TABLE user_credentials 
ALTER COLUMN user_id SET NOT NULL,
ALTER COLUMN email SET NOT NULL,
ALTER COLUMN phone SET NOT NULL,
ALTER COLUMN password SET NOT NULL;

ALTER TABLE user_credentials 
ADD CONSTRAINT uq_user_credentials_email UNIQUE (email);

ALTER TABLE user_credentials 
ADD CONSTRAINT uq_user_credentials_phone UNIQUE (phone);

ALTER TABLE roles 
ALTER COLUMN role_name SET NOT NULL;

ALTER TABLE roles 
ADD CONSTRAINT uq_roles_role_name UNIQUE (role_name);

ALTER TABLE products 
ALTER COLUMN category_id SET NOT NULL,
ALTER COLUMN name SET NOT NULL,
ALTER COLUMN description SET NOT NULL,
ALTER COLUMN price SET NOT NULL,
ALTER COLUMN stock SET NOT NULL;

ALTER TABLE product_categories 
ALTER COLUMN name SET NOT NULL;

ALTER TABLE product_categories 
ADD CONSTRAINT uq_product_categories_name UNIQUE (name);

ALTER TABLE product_images 
ALTER COLUMN product_id SET NOT NULL,
ALTER COLUMN image SET NOT NULL;

ALTER TABLE product_reviews 
ALTER COLUMN product_id SET NOT NULL,
ALTER COLUMN user_id SET NOT NULL,
ALTER COLUMN rating SET NOT NULL;

ALTER TABLE product_variants 
ALTER COLUMN product_id SET NOT NULL,
ALTER COLUMN variant_name SET NOT NULL,
ALTER COLUMN additional_price SET NOT NULL;

ALTER TABLE product_variants 
ADD CONSTRAINT uq_product_variants_product_variant UNIQUE (product_id, variant_name);

ALTER TABLE product_portions 
ALTER COLUMN product_id SET NOT NULL,
ALTER COLUMN portion_size SET NOT NULL,
ALTER COLUMN additional_price SET NOT NULL;

ALTER TABLE product_portions 
ADD CONSTRAINT uq_product_portions_product_portion UNIQUE (product_id, portion_size);

ALTER TABLE product_discounts 
ALTER COLUMN discount_rate SET NOT NULL;

ALTER TABLE product_campaigns 
ALTER COLUMN name SET NOT NULL,
ALTER COLUMN description SET NOT NULL,
ALTER COLUMN discount_id SET NOT NULL;

ALTER TABLE product_campaigns 
ADD CONSTRAINT uq_product_campaigns_name UNIQUE (name);

ALTER TABLE carts 
ALTER COLUMN user_id SET NOT NULL;

ALTER TABLE cart_items 
ALTER COLUMN cart_id SET NOT NULL,
ALTER COLUMN product_id SET NOT NULL,
ALTER COLUMN size_id SET NOT NULL,
ALTER COLUMN variant_id SET NOT NULL,
ALTER COLUMN quantity SET NOT NULL;

ALTER TABLE orders 
ALTER COLUMN cart_id SET NOT NULL,
ALTER COLUMN total SET NOT NULL,
ALTER COLUMN status SET NOT NULL,
ALTER COLUMN fullname SET NOT NULL,
ALTER COLUMN phone SET NOT NULL,
ALTER COLUMN email SET NOT NULL,
ALTER COLUMN address SET NOT NULL,
ALTER COLUMN delivery SET NOT NULL;
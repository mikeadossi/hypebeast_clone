DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS product_colors CASCADE;
DROP TABLE IF EXISTS products CASCADE;

DROP TABLE IF EXISTS cart CASCADE;
DROP TABLE IF EXISTS brands CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE brands (
  id SERIAL PRIMARY KEY,
  brand_name VARCHAR,
  brand_name_link VARCHAR,
  brand_description VARCHAR
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  category_type VARCHAR(20)
);

CREATE TABLE product_colors (
  id SERIAL PRIMARY KEY,
  color VARCHAR(10)
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  product_price INTEGER,
  product_quantity INTEGER,
  product_name VARCHAR,
  product_name_route VARCHAR UNIQUE,
  product_images VARCHAR,
  product_details VARCHAR,
  category_id INTEGER REFERENCES categories(id),
  brand_name VARCHAR,
  brand_id INTEGER REFERENCES brands(id),
  product_color_id INTEGER REFERENCES product_colors(id),
  product_color_type VARCHAR,
  category_name VARCHAR,
  small_count INTEGER,
  medium_count INTEGER,
  large_count INTEGER,
  xlarge_count INTEGER,
  US_8_count INTEGER,
  US_8_5_count INTEGER,
  US_9_count INTEGER,
  US_9_5_count INTEGER,
  US_10_count INTEGER,
  US_10_5_count INTEGER,
  US_11_count INTEGER,
  US_11_5_count INTEGER,
  US_12_count INTEGER,
  US_12_5_count INTEGER,
  pants_28_count INTEGER,
  pants_30_count INTEGER,
  pants_32_count INTEGER,
  pants_34_count INTEGER,
  pants_36_count INTEGER,
  tot_count INTEGER
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR,
  password VARCHAR,
  first_name VARCHAR,
  last_name VARCHAR,
  phone_number VARCHAR(22),
  street VARCHAR,
  city VARCHAR,
  state VARCHAR,
  postcode VARCHAR,
  company VARCHAR,
  username VARCHAR,
  user_avatar VARCHAR,
  user_avatar_background_color VARCHAR
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  purchased_at TIMESTAMP DEFAULT now(),
  purchased_product_details_array VARCHAR,
  total_purchase_cost INTEGER,
  first_name VARCHAR,
  last_name VARCHAR,
  phone VARCHAR,
  order_email VARCHAR,
  street VARCHAR,
  city VARCHAR,
  postcode INTEGER,
  state VARCHAR,
  country VARCHAR,
  company_name VARCHAR,
  order_notes VARCHAR,
  payment_type VARCHAR,
  users_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  shipping_cost INTEGER
);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  item_image VARCHAR,
  item_quantity INTEGER,
  item_individual_price INTEGER,
  item_cost INTEGER,
  item_color VARCHAR,
  item_size VARCHAR,
  item_category VARCHAR,
  products_id INTEGER REFERENCES products(id),
  users_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  item_name VARCHAR,
  item_brand VARCHAR,
  item_route VARCHAR
);

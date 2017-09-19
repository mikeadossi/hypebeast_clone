\c comment_system_db

DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS hbx_users;
DROP TABLE IF EXISTS hbx_google_users;
DROP TABLE IF EXISTS hbx_facebook_users;
DROP TABLE IF EXISTS all_hbx_users;
DROP TABLE IF EXISTS brands;
DROP TABLE IF EXISTS color_type;
DROP TABLE IF EXISTS product_colors;
DROP TABLE IF EXISTS sizes;
DROP TABLE IF EXISTS category_sizes;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS products;

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  product_id_array INTEGER,
  cost_per_item INTEGER
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  purchased_at TIMESTAMP,
  shipped_at TIMESTAMP,
  cart_id INTEGER REFERENCES cart(id)
);

CREATE TABLE hbx_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR,
  password VARCHAR,
  order_id INTEGER REFERENCES orders(id)
);

CREATE TABLE hbx_google_users (
  id SERIAL PRIMARY KEY,
  profile_id NUMERIC,
  username VARCHAR
);

CREATE TABLE hbx_facebook_users (
  id SERIAL PRIMARY KEY,
  profile_id NUMERIC,
  username VARCHAR
);

CREATE TABLE all_hbx_users (
  id SERIAL PRIMARY KEY,
  avatar TEXT,
  google_users_id INTEGER,
  facebook_users_id INTEGER,
  google_users_id INTEGER REFERENCES google_users(id),
  facebook_users_id INTEGER REFERENCES facebook_users(id)
);

CREATE TABLE brands (
  id SERIAL PRIMARY KEY,
  brand_name VARCHAR(30),
  brand_description VARCHAR(30),
  brand_product_details TEXT
);

CREATE TABLE color_type (
  id SERIAL PRIMARY KEY,
  color VARCHAR(10)
);

CREATE TABLE product_colors (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  color_type_id INTEGER REFERENCES color_type(id)
);

CREATE TABLE sizes (
  id SERIAL PRIMARY KEY,
  size VARCHAR(10)
);

CREATE TABLE category_sizes (
  id SERIAL PRIMARY KEY,
  category_id INTEGER,
  size_id INTEGER REFERENCES sizes(id)
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  category_type VARCHAR(20),
  category_size_id INTEGER REFERENCES category_sizes(id)
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  product_price INTEGER,
  product_count INTEGER,
  product_name VARCHAR(30),
  product_images TEXT,
  product_details TEXT,
  brand_id INTEGER REFERENCES brands(id),
  product_color_id INTEGER REFERENCES product_colors(id),
  category_id INTEGER REFERENCES categories(id)
);

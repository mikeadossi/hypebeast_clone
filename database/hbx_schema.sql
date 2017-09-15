\c comment_system_db

DROP TABLE IF EXISTS brands;

CREATE TABLE brands (
  id SERIAL PRIMARY KEY,
  brand_name VARCHAR(100),
  category VARCHAR(30),
  item_name TEXT,
  details TEXT,
  images TEXT,
  small INTEGER,
  medium INTEGER,
  large INTEGER,
  eight INTEGER,
  nine INTEGER,
  ten INTEGER,
  eleven INTEGER,
  twelve INTEGER,
  thirteen INTEGER,
  color TEXT,
  small_price INTEGER,
  medium_price INTEGER,
  large_price INTEGER,
  sales_table_id INTEGER,
  FOREIGN KEY (sales_table_id) REFERENCES sales_table(id)
);

CREATE TABLE sales_table (
  id SERIAL PRIMARY KEY,
  product_id,
  brand VARCHAR(30),
  sales_amt 0.5
)

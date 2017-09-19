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
  hbx_google_users_id INTEGER REFERENCES hbx_google_users(id),
  hbx_facebook_users_id INTEGER REFERENCES hbx_facebook_users(id)
);

CREATE TABLE brands (
  id SERIAL PRIMARY KEY,
  brand_name VARCHAR,
  brand_description TEXT
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


INSERT INTO categories (category_type)
VALUES (
  'accessories'
),
(
  'caps'
),
(
  'clothing'
),
(
  'hats'
),
(
  'jackets'
),
(
  'shoes'
),
(
  'shorts'
),
(
  'sneakers'
),
(
  'ss t-shirts'
),
(
  't-shirts'
);

INSERT INTO products (product_price, product_count, product_name, product_images, product_details, brand_id, product_color_id, category_id)
VALUES (
  '165',
  '20',
  'EQT Cushion ADV',
  '["<img src="/images/hbx_images/adidas_originals/sneakers/eqt_sneaker_front.jpg" />","<img src="/images/hbx_images/adidas_originals/sneakers/eqt_sneaker_profile.jpg" />","<img src="/images/hbx_images/adidas_originals/sneakers/eqt_sneaker_side.jpg" />","<img src="/images/hbx_images/adidas_originals/sneakers/eqt_sneaker_top.jpg" />"]',
  '<div class="product_details"><p>Originally designed for performance athletes, the ''90s Equipment series boasts a style that has always wowed streetwear fans. These men''s stretchy knit shoes offer an updated shape with retro-inspired lacing. Futuristic, tailored yarn evolves this signature look.</p><ul><li>Knit upper with premium pigskin nubuck quarter panel.</li><li>OG-inspired TPU lace loops; Webbing tape 3-Stripes.</li><li>Mesh heel with tailored thick yarn embroidery; Signature cushion TPU lace ghillie and TPU heel cage.</li><li>OrthoLite® sockliner.</li><li>Super-soft EVA midsole wrapped with a TPU cage.</li><li>Textile and leather upper | Textile lining | Rubber outsole.</li></ul></div>',
  '3',
  '2',
  '28'
),
(
  '155',
  '20',
  'Tubular Rise',
  '["<img src="/images/hbx_images/adidas_originals/sneakers/tubular_rise_front.jpg" />","<img src="/images/hbx_images/adidas_originals/sneakers/tubular_rise_profile.jpg" />","<img src="/images/hbx_images/adidas_originals/sneakers/tubular_rise_side.jpg" />","<img src="/images/hbx_images/adidas_originals/sneakers/tubular_rise_top.jpg" />"]',
  '<div class="product_details"><p>The Tubular has been on the front end of forward-thinking design since its inception in the ''90s. Always ahead of its time, today''s newest addition follows in the original''s footsteps. These men''s shoes feature an adidas Primeknit upper knit with space-dyed fibers for a subtle neon look. A suede midfoot cage overlay and an elastic heel strap provide added support as the EVA outsole gives extra cushioning.</p><ul><li>adidas Primeknit upper.</li><li>Space-dyed neon fibers in the upper.</li><li>Suede midfoot cage overlay.</li><li>Comfortable textile bootee lining; Midcut.</li><li>Heel elastic for a natural heel counter.</li><li>Soft EVA outsole with contoured stability plug for extra cushioning.</li><li>Textile and leather upper | Textile lining | Rubber outsole.</li></ul></div>',
  '3',
  '1',
  '28'
),
(
  '130',
  '20',
  'Tubular Doom Sock Primeknit',
  '["<img src="/images/hbx_images/adidas_originals/sneakers/tubular_doom_front.jpg" />","<img src="/images/hbx_images/adidas_originals/sneakers/tubular_doom_profile.jpg" />","<img src="/images/hbx_images/adidas_originals/sneakers/tubular_doom_side.jpg" />","<img src="/images/hbx_images/adidas_originals/sneakers/tubular_doom_top.jpg" />"]',
  '<div class="product_details"><p>The Tubular Doom Sock Primeknit combines adidas basketball and running heritage together. It arrives in a low-cut version that fits like a sock. Features a flexible, adaptive adidas Primeknit upper. And finished with the distinctive look and feel of the Tubular outsole.</p><ul><li>Breathable and flexible adidas Primeknit upper.</li><li>Comfortable textile lining.</li><li>Sock-like construction.</li><li>Refined heel support piece.</li><li>Tubular Doom outsole.</li></ul></div>',
  '3',
  '12',
  '28'
),
(
  '115',
  '20',
  'Climacool 02/17',
  '["<img src="/images/hbx_images/adidas_originals/sneakers/climacool_white_front.jpg" />","<img src="/images/hbx_images/adidas_originals/sneakers/climacool_white_profile.jpg" />","<img src="/images/hbx_images/adidas_originals/sneakers/climacool_white_side.jpg" />","<img src="/images/hbx_images/adidas_originals/sneakers/climacool_white_top.jpg" />"]',
  '<div class="product_details"><p>A blast of nostalgia from the early 2000s, the Climacool training shoe is back as a street style crossover. These men''s shoes update and deconstruct the retro style for 2017. The bootee upper is made in climacool® mesh for a snug, breathable fit. The EVA midsole wraps up onto the upper for a fresh look. TPU plug details call back to the design of the original Climacool II.</p><ul><li>Climacool® provides 360-degree cooling for the entire foot.</li><li>Breathable mesh upper.</li><li>Mesh lining.</li><li>EVA midsole with TPU stability plugs.</li><li>Textile and synthetic upper | Textile lining | Rubber outsole.</li></ul></div>',
  '3',
  '7',
  '28'
);
-- (
--   '',
--   '20',
--   '',
--   '["<img src="/images/hbx_images/adidas_originals/sneakers/.jpg" />","<img src="/images/hbx_images/adidas_originals/sneakers/.jpg" />","<img src="/images/hbx_images/adidas_originals/sneakers/.jpg" />","<img src="/images/hbx_images/adidas_originals/sneakers/.jpg" />"]',
--   '<div class="product_details"><p></p><ul><li></li><li></li><li></li><li></li><li></li><li></li></ul></div>',
--   '',
--   '',
--   '[26,28]'
-- );
-- (
--   '',
--   '20',
--   '',
--   '["<img src="/images/hbx_images/adidas_originals/sneakers/.jpg" />","<img src="/images/hbx_images/adidas_originals/sneakers/.jpg" />","<img src="/images/hbx_images/adidas_originals/sneakers/.jpg" />","<img src="/images/hbx_images/adidas_originals/sneakers/.jpg" />"]',
--   '<div class="product_details"><p></p><ul><li></li><li></li><li></li><li></li><li></li><li></li></ul></div>',
--   '',
--   '',
--   '[26,28]'
-- ),
-- (
--   '',
--   '20',
--   '',
--   '["<img src="/images/hbx_images/adidas_originals/sneakers/.jpg" />","<img src="/images/hbx_images/adidas_originals/sneakers/.jpg" />","<img src="/images/hbx_images/adidas_originals/sneakers/.jpg" />","<img src="/images/hbx_images/adidas_originals/sneakers/.jpg" />"]',
--   '<div class="product_details"><p></p><ul><li></li><li></li><li></li><li></li><li></li><li></li></ul></div>',
--   '',
--   '',
--   '[26,28]'
-- );


INSERT INTO color_type (color)
VALUES (
  'beige'
),
( 'black' ),
( 'blue' ),
( 'green' ),
( 'grey' ),
( 'red' ),
( 'white' );

INSERT INTO sizes (size)
VALUES (
  'S'
),
( 'M' ),
( 'L' ),
( 'XL' ),
( 'EU 41' ),
( 'EU 42' ),
( 'EU 43' ),
( 'US 8' ),
( 'US 8.5' ),
( 'US 9' ),
( 'US 9.5' ),
( 'US 10' ),
( 'US 10.5' ),
( 'US 11' ),
( 'US 11.5' ),
( 'US 12' ),
( 'US 12.5' );

INSERT INTO brands (brand_name, brand_description)
VALUES (
  '11 By Boris Bidjan Saberi',
  '<div class="brand_text_container"><p>The contemporary arm of the German-born and Barcelona-based designer''s brand, 11 by Boris Bidjan Saberi''s experimental basics fuse the avant-garde cuts and fabrics of the main line with the street and skate influences that underpin its darkly urban aesthetic. Their products are polished season after season, paying accurate attention on every detail to reach the highest standards obtainable.<p></div>'
),
(
  'Très Bien',
  '<div class="brand_text_container"><p>Sweden-based fashion brand and retailer Très Bien was founded in 2006 by the Hogeman brothers Simon and Hannes Hogeman together. The Très Bien aesthetics are defined by the juxtaposition of high-fashion sensibilities: custom made fabrics, clean lines and quality garments combined with streetwear-elements like bold graphics and an overall more dressed down, loose look.</p></div>'
),
(
  'Adidas Originals',
  '<div class="brand_text_container"><p>Adidas Originals was built upon passion for sports and sporting lifestyle. Effortlessly fusing fashion with function, Adidas holds more than 60 years of design expertise across its range of sleek, minimalist trainers and streetwear. Adidas has remained firmly in the limelight though successful collaborations with influential brands and culture icons such as PALACE, Kanye West, and Alexander Wang.</p></div>'
),
(
  'Denim By Vanquish & Fragment',
  '<div class="brand_text_container"><p>A collaborative line with Hiroshi Fujiwara from fragment design had launched at the Tokyo Collection 2010. Developing real clothes based on denim fabric by refining basic styles into high casual styles.</p></div>'
),
(
  'Mastermind World',
  '<div class="brand_text_container"><p>Created by designer Masaaki Honma in 1997, Mastermind Japan, mixes street and luxury tastes. The punk-inspired graphics combined with beautiful detailing in precious raw materials like a diamond to give the collection a unique aesthetic. Mastermind’s iconic skull and crossbones logo emblazons T-shirts while jeans based on reworked classic Levis cuts are some of the most desirable there are.</p></div>'
),
(
  'Undercover',
  '<div class="brand_text_container"><p>UNDERCOVER was established in 1994 by fashion designer Jun Takahashi, and has earned international acclaim by igniting interest in a trend that was rife in the 90''s - deconstruction. With a cult following for the Japanese labels signature designs, UNDERCOVER never fails to intrigue or astonish, and have become masters at their art.</p></div>'
);

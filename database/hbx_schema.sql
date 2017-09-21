\c comment_system_db

DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS product_colors CASCADE;
DROP TABLE IF EXISTS products CASCADE;

DROP TABLE IF EXISTS cart CASCADE;
DROP TABLE IF EXISTS brands CASCADE;
DROP TABLE IF EXISTS color_type CASCADE;
DROP TABLE IF EXISTS sizes CASCADE;
DROP TABLE IF EXISTS category_sizes CASCADE;

DROP TABLE IF EXISTS all_hbx_users CASCADE;
DROP TABLE IF EXISTS hbx_google_users CASCADE;
DROP TABLE IF EXISTS hbx_facebook_users CASCADE;
DROP TABLE IF EXISTS hbx_users CASCADE;
DROP TABLE IF EXISTS orders CASCADE;

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
  brand_name_link VARCHAR,
  brand_description TEXT
);

CREATE TABLE sizes (
  id SERIAL PRIMARY KEY,
  size VARCHAR(10)
);

CREATE TABLE category_sizes (
  id SERIAL PRIMARY KEY,
  size_id INTEGER REFERENCES sizes(id)
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  category_type VARCHAR(20),
  category_size_id INTEGER REFERENCES category_sizes(id)
);

CREATE TABLE product_colors (
  id SERIAL PRIMARY KEY,
  color VARCHAR(10)
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  product_price INTEGER,
  product_count INTEGER,
  product_name VARCHAR,
  product_name_route VARCHAR,
  product_images TEXT,
  product_details TEXT,
  category_id INTEGER REFERENCES categories(id),
  brand_name TEXT,
  brand_id INTEGER REFERENCES brands(id),
  product_color_id INTEGER REFERENCES product_colors(id)
);


INSERT INTO brands (brand_name, brand_name_link, brand_description)
VALUES (
  '11 By Boris Bidjan Saberi',
  '11-by-boris-bidjan-saberi',
  '<div class="brand_text_container"><p>The contemporary arm of the German-born and Barcelona-based designer''s brand, 11 by Boris Bidjan Saberi''s experimental basics fuse the avant-garde cuts and fabrics of the main line with the street and skate influences that underpin its darkly urban aesthetic. Their products are polished season after season, paying accurate attention on every detail to reach the highest standards obtainable.<p></div>'
),
(
  'Très Bien',
  'tres-bien',
  '<div class="brand_text_container"><p>Sweden-based fashion brand and retailer Très Bien was founded in 2006 by the Hogeman brothers Simon and Hannes Hogeman together. The Très Bien aesthetics are defined by the juxtaposition of high-fashion sensibilities: custom made fabrics, clean lines and quality garments combined with streetwear-elements like bold graphics and an overall more dressed down, loose look.</p></div>'
),
(
  'Adidas Originals',
  'adidas-originals',
  '<div class="brand_text_container"><p>Adidas Originals was built upon passion for sports and sporting lifestyle. Effortlessly fusing fashion with function, Adidas holds more than 60 years of design expertise across its range of sleek, minimalist trainers and streetwear. Adidas has remained firmly in the limelight though successful collaborations with influential brands and culture icons such as PALACE, Kanye West, and Alexander Wang.</p></div>'
),
(
  'Denim By Vanquish & Fragment',
  'denim-by-vanquish-fragment',
  '<div class="brand_text_container"><p>A collaborative line with Hiroshi Fujiwara from fragment design had launched at the Tokyo Collection 2010. Developing real clothes based on denim fabric by refining basic styles into high casual styles.</p></div>'
),
(
  'Mastermind World',
  'mastermind-world',
  '<div class="brand_text_container"><p>Created by designer Masaaki Honma in 1997, Mastermind Japan, mixes street and luxury tastes. The punk-inspired graphics combined with beautiful detailing in precious raw materials like a diamond to give the collection a unique aesthetic. Mastermind’s iconic skull and crossbones logo emblazons T-shirts while jeans based on reworked classic Levis cuts are some of the most desirable there are.</p></div>'
),
(
  'Undercover',
  'undercover',
  '<div class="brand_text_container"><p>UNDERCOVER was established in 1994 by fashion designer Jun Takahashi, and has earned international acclaim by igniting interest in a trend that was rife in the 90''s - deconstruction. With a cult following for the Japanese labels signature designs, UNDERCOVER never fails to intrigue or astonish, and have become masters at their art.</p></div>'
);

INSERT INTO product_colors (color)
VALUES (
  'beige'
),
( 'black' ),
( 'blue' ),
( 'green' ),
( 'grey' ),
( 'red' ),
( 'white' ),
( 'purple' ),
( 'brown' );

INSERT INTO categories (category_type)
VALUES (
  'accessories'
),
(
  'caps'
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
),
(
  'pants'
),
(
  'hoodies'
),
(
  'sweatshirt'
),
(
  'jeans'
),
(
  'toys'
),
(
  'homeware'
),
(
  'sandals'
),
(
  'underwear'
);

INSERT INTO products (product_price, product_count, product_name, product_name_route, product_images, product_details, brand_id, brand_name, product_color_id, category_id)
VALUES (
  '165',
  '20',
  'EQT Cushion ADV',
  'eqt-cushion-adv',
  '<img src="/images/hbx_images/adidas_originals/sneakers/eqt_sneaker_front.jpg" />,<img src="/images/hbx_images/adidas_originals/sneakers/eqt_sneaker_profile.jpg" />,<img src="/images/hbx_images/adidas_originals/sneakers/eqt_sneaker_side.jpg" />,<img src="/images/hbx_images/adidas_originals/sneakers/eqt_sneaker_top.jpg" />',
  '<div class="product_details"><p>Originally designed for performance athletes, the ''90s Equipment series boasts a style that has always wowed streetwear fans. These men''s stretchy knit shoes offer an updated shape with retro-inspired lacing. Futuristic, tailored yarn evolves this signature look.</p><ul><li>Knit upper with premium pigskin nubuck quarter panel.</li><li>OG-inspired TPU lace loops; Webbing tape 3-Stripes.</li><li>Mesh heel with tailored thick yarn embroidery; Signature cushion TPU lace ghillie and TPU heel cage.</li><li>OrthoLite® sockliner.</li><li>Super-soft EVA midsole wrapped with a TPU cage.</li><li>Textile and leather upper | Textile lining | Rubber outsole.</li></ul></div>',
  '3',
  'adidas-originals',
  '2',
  '8'
),
(
  '155',
  '20',
  'Tubular Rise',
  'tubular-rise',
  '<img src="/images/hbx_images/adidas_originals/sneakers/tubular_rise_front.jpg" />,<img src="/images/hbx_images/adidas_originals/sneakers/tubular_rise_profile.jpg" />,<img src="/images/hbx_images/adidas_originals/sneakers/tubular_rise_side.jpg" />,<img src="/images/hbx_images/adidas_originals/sneakers/tubular_rise_top.jpg" />',
  '<div class="product_details"><p>The Tubular has been on the front end of forward-thinking design since its inception in the ''90s. Always ahead of its time, today''s newest addition follows in the original''s footsteps. These men''s shoes feature an adidas Primeknit upper knit with space-dyed fibers for a subtle neon look. A suede midfoot cage overlay and an elastic heel strap provide added support as the EVA outsole gives extra cushioning.</p><ul><li>adidas Primeknit upper.</li><li>Space-dyed neon fibers in the upper.</li><li>Suede midfoot cage overlay.</li><li>Comfortable textile bootee lining; Midcut.</li><li>Heel elastic for a natural heel counter.</li><li>Soft EVA outsole with contoured stability plug for extra cushioning.</li><li>Textile and leather upper | Textile lining | Rubber outsole.</li></ul></div>',
  '3',
  'adidas-originals',
  '1',
  '8'
),
(
  '130',
  '20',
  'Tubular Doom Sock Primeknit',
  'tubular-doom-sock-primeknit',
  '<img src="/images/hbx_images/adidas_originals/sneakers/tubular_doom_front.jpg" />,<img src="/images/hbx_images/adidas_originals/sneakers/tubular_doom_profile.jpg" />,<img src="/images/hbx_images/adidas_originals/sneakers/tubular_doom_side.jpg" />,<img src="/images/hbx_images/adidas_originals/sneakers/tubular_doom_top.jpg" />',
  '<div class="product_details"><p>The Tubular Doom Sock Primeknit combines adidas basketball and running heritage together. It arrives in a low-cut version that fits like a sock. Features a flexible, adaptive adidas Primeknit upper. And finished with the distinctive look and feel of the Tubular outsole.</p><ul><li>Breathable and flexible adidas Primeknit upper.</li><li>Comfortable textile lining.</li><li>Sock-like construction.</li><li>Refined heel support piece.</li><li>Tubular Doom outsole.</li></ul></div>',
  '3',
  'adidas-originals',
  '1',
  '8'
),
(
  '115',
  '20',
  'Climacool 02/17',
  'climacool-0217',
  '<img src="/images/hbx_images/adidas_originals/sneakers/climacool_white_front.jpg" />,<img src="/images/hbx_images/adidas_originals/sneakers/climacool_white_profile.jpg" />,<img src="/images/hbx_images/adidas_originals/sneakers/climacool_white_side.jpg" />,<img src="/images/hbx_images/adidas_originals/sneakers/climacool_white_top.jpg" />',
  '<div class="product_details"><p>A blast of nostalgia from the early 2000s, the Climacool training shoe is back as a street style crossover. These men''s shoes update and deconstruct the retro style for 2017. The bootee upper is made in climacool® mesh for a snug, breathable fit. The EVA midsole wraps up onto the upper for a fresh look. TPU plug details call back to the design of the original Climacool II.</p><ul><li>Climacool® provides 360-degree cooling for the entire foot.</li><li>Breathable mesh upper.</li><li>Mesh lining.</li><li>EVA midsole with TPU stability plugs.</li><li>Textile and synthetic upper | Textile lining | Rubber outsole.</li></ul></div>',
  '3',
  'adidas-originals',
  '7',
  '8'
),
(
  '35',
  '20',
  'Original Trefoil S/S T-Shirt',
  'original-trefoil-t-shirt',
  '<img src="/images/hbx_images/adidas_originals/t_shirts/adidas_clover_grey_tee_front.jpg" />,<img src="/images/hbx_images/adidas_originals/t_shirts/adidas_clover_grey_tee_side.jpg" />,<img src="/images/hbx_images/adidas_originals/t_shirts/adidas_clover_grey_tee_full.jpg" />',
  '<div class="product_details"><p>This adidas Originals Trefoil Tee puts the Trefoil logo front and center in a bold contrast color to show off adidas pride. The men''s t-shirt has an all-cotton build for a classic fit and feel.</p><ul><li>Crewneck</li><li>Large contrast Trefoil logo on the front</li><li>Regular fit</li></ul></div>',
  '3',
  'adidas-originals',
  '5',
  '9'
),
(
  '66',
  '20',
  'Tennoji Shorts',
  'tennoji-shorts',
  '<img src="/images/hbx_images/adidas_originals/shorts/tennoji_blue_shorts.jpg" />,<img src="/images/hbx_images/adidas_originals/shorts/tennoji_blue_shorts_side.jpg" />,<img src="/images/hbx_images/adidas_originals/shorts/tennoji_blue_shorts_rear.jpg" />,<img src="/images/hbx_images/adidas_originals/shorts/tennoji_blue_shorts_full.jpg" />,<img src="/images/hbx_images/adidas_originals/shorts/tennoji_blue_shorts_product_front.jpg" />,<img src="/images/hbx_images/adidas_originals/shorts/tennoji_blue_shorts_product_rear.jpg" />',
  '<div class="product_details"><p>Inspired by archival streetwear pieces from the ''70s, these men''s shorts have a slim fit and a sleek feel. Iconic 3-Stripes run down the legs, and a linear Trefoil logo sits below the pocket.</p><ul><li>Side zip pockets</li><li>Drawcord on elastic waist</li><li>Engineered, knit 3-Stripes on sides</li></ul></div>',
  '3',
  'adidas-originals',
  '3',
  '8'
),
(
  '75',
  '20',
  'Superstar Track Jacket',
  'superstar-track-jacket',
  '<img src="/images/hbx_images/adidas_originals/jackets/adidas_grey_superstar_jacket_front.jpg" />,<img src="/images/hbx_images/adidas_originals/jackets/adidas_grey_superstar_jacket_side.jpg" />,<img src="/images/hbx_images/adidas_originals/jackets/adidas_grey_superstar_jacket_rear.jpg" />,<img src="/images/hbx_images/adidas_originals/jackets/adidas_grey_superstar_jacket_full.jpg" />',
  '<div class="product_details"><p>A street-style staple, this men''s Superstar track jacket has all the details of the ''70s original. The sporty interlock fabric features 3-Stripes down the sleeves, a Trefoil logo on the chest and the signature ribbed collar. This product is part of the adidas sustainable product program: Products are made in more sustainable ways to make the world a better place; Every fiber counts: Organic cotton saves water, conserves energy and reduces the use of chemicals.</p><ul>Slim fit.<li>Zip up.</li><li>Ribbed collar, cuffs and hem.</li><li>Side pockets.</li><li>Piping details.</li><li>Embroidered Trefoil logo on left chest.</li><li>87% Recycled Polyester | 13% Organic Cotton Interlock.</li></ul></div>',
  '3',
  'adidas-originals',
  '5',
  '2'
),
(
  '410',
  '20',
  '3/4 Sleeves Loose Fit Sweatshirt',
  '3-4-sleeves-loose-fit-sweatshirt',
  '<img src="/images/hbx_images/eleven_bidjan/sweatshirts/three_fourths_sleeves_loose_front.jpg" />,<img src="/images/hbx_images/eleven_bidjan/sweatshirts/three_fourths_sleeves_loose_side.jpg" />,<img src="/images/hbx_images/eleven_bidjan/sweatshirts/three_fourths_sleeves_loose_rear.jpg" />,<img src="/images/hbx_images/eleven_bidjan/sweatshirts/three_fourths_sleeves_loose_full.jpg" />',
  '<div class="product_details"><ul><li>Loose fit.</li><li>Crew neck.</li><li>Raglan sleeve, underarm gusset.
</li><li>Printed graphic on back.</li><li>Embroidery and embroidered patch on sleeves.</li></ul></div>',
  '1',
  '11-by-boris-bidjan-saberi',
  '2',
  '13'
),
(
  '475',
  '20',
  '11 By Boris Bidjan Saberi x Salomon Sneakers',
  '11-by-boris-bidjan-saberi-x-salomon-sneakers',
  '<img src="/images/hbx_images/eleven_bidjan/sneakers/bidjan_sneaks_side.jpg" />,<img src="/images/hbx_images/eleven_bidjan/sneakers/bidjan_sneaks_rear.jpg" />,<img src="/images/hbx_images/eleven_bidjan/sneakers/bidjan_sneaks_top.jpg" />,<img src="/images/hbx_images/eleven_bidjan/sneakers/bidjan_sneaks_full.jpg" />',
  '<div class="product_details"><ul><li>Collaboration with Salomon.</li><li>Polyester upper.</li><li>Rubber outsole.</li></ul></div>',
  '1',
  '11-by-boris-bidjan-saberi',
  '2',
  '8'
),
(
  '670',
  '20',
  'Drapery Jacket',
  'drapery-jacket',
  '<img src="/images/hbx_images/eleven_bidjan/jackets/drapery_front.jpg" />,<img src="/images/hbx_images/eleven_bidjan/jackets/drapery_side.jpg" />,<img src="/images/hbx_images/eleven_bidjan/jackets/drapery_rear.jpg" />,<img src="/images/hbx_images/eleven_bidjan/jackets/drapery_full.jpg" />',
  '<div class="product_details"><ul><li>Stand up collar.</li><li>Zip up.</li><li>Contrasting brand strip on sleeves.</li></ul></div>',
  '1',
  '11-by-boris-bidjan-saberi',
  '2',
  '10'
),
(
  '550',
  '20',
  'Logo & Type Pants',
  'logo-and-type-pants',
  '<img src="/images/hbx_images/eleven_bidjan/pants/logo_type_front.jpg" />,<img src="/images/hbx_images/eleven_bidjan/pants/logo_type_side.jpg" />,<img src="/images/hbx_images/eleven_bidjan/pants/logo_type_rear.jpg" />,<img src="/images/hbx_images/eleven_bidjan/pants/logo_type_full.jpg" />,<img src="/images/hbx_images/eleven_bidjan/pants/logo_type_product_front.jpg" />,<img src="/images/hbx_images/eleven_bidjan/pants/logo_type_product_rear.jpg" />, <img src="/images/hbx_images/eleven_bidjan/pants/logo_type_product_feet.jpg" />',
  '<div class="product_details"><ul><li>Drawstring waist.</li><li>Zipped pockets.</li><li>Contrasting brand stripes on sides.</li></ul></div>',
  '1',
  '11-by-boris-bidjan-saberi',
  '2',
  '11'
),
(
  '120',
  '20',
  '11 Logo Zipper Wallet',
  '11-logo-zipper-wallet',
  '<img src="/images/hbx_images/eleven_bidjan/accessories/eleven_wallet.jpg" />,<img src="/images/hbx_images/eleven_bidjan/accessories/eleven_wallet_rear.jpg" />',
  '<div class="product_details"><ul><li>Two pocket wallet.</li><li>Reflective 11 Logo on the outside.</li><li>60% Polyester | 40% Nylon.</li></ul></div>',
  '1',
  '11-by-boris-bidjan-saberi',
  '2',
  '1'
),
(
  '380',
  '20',
  '3/4 Sleeves Loose Fit T-Shirt',
  '3-4-sleeves-loose-fit-t-Shirt',
  '<img src="/images/hbx_images/eleven_bidjan/t_shirts/three_fourths_tee_rear.jpg" />,<img src="/images/hbx_images/eleven_bidjan/t_shirts/three_fourths_tee_side.jpg" />,<img src="/images/hbx_images/eleven_bidjan/t_shirts/three_fourths_tee_front.jpg" />,<img src="/images/hbx_images/eleven_bidjan/t_shirts/three_fourths_tee_full.jpg" />',
  '<div class="product_details"><p>This long sleeve tee by celebrated designer Boris Bidjan Saberi is cut with a long profile of the body, featuring a one seam back pattern.</p><ul><li>3/4 length sleeve.</li><li>Mockneck Collar.</li><li>"11 by Boris Bidjan Saberi" script on back.</li><li>Made in Portugal.</li><li>100% Cotton.</li></ul></div>',
  '1',
  '11-by-boris-bidjan-saberi',
  '2',
  '10'
),
(
  '530',
  '20',
  'Flame Hoodie',
  'flame-hoodie',
  '<img src="/images/hbx_images/eleven_bidjan/hoodies/flame_hoody_front.jpg" />,<img src="/images/hbx_images/eleven_bidjan/hoodies/flame_hoody_side.jpg" />,<img src="/images/hbx_images/eleven_bidjan/hoodies/flame_hoody_rear.jpg" />,<img src="/images/hbx_images/eleven_bidjan/hoodies/flame_hoody_full.jpg" />',
  '<div class="product_details"><p>Made in Portugal, this meticulously crafted hoodie features an 11 logo branded face scarf and is emblazoned with a flame graphic to the back.</p><ul><li>Hood with drawstring.</li><li>Front kangaroo pocket.</li><li>Signature flame graphics.</li><li>97% Cotton | 3% Elastane.</li><li>Made in Portugal.</li></ul></div>',
  '1',
  '11-by-boris-bidjan-saberi',
  '2',
  '12'
),
(
  '380',
  '20',
  'Urban Dayback',
  'urban-dayback',
  '<img src="/images/hbx_images/eleven_bidjan/accessories/daypack_front.jpg" />,<img src="/images/hbx_images/eleven_bidjan/accessories/daypack_side.jpg" />,<img src="/images/hbx_images/eleven_bidjan/accessories/daypack_rear.jpg" />,<img src="/images/hbx_images/eleven_bidjan/accessories/daypack_full.jpg" />,<img src="/images/hbx_images/eleven_bidjan/accessories/daypack_brand_tag.jpg" />,<img src="/images/hbx_images/eleven_bidjan/accessories/daypack_innards.jpg" />',
  '<div class="product_details"><p>Masterfully crafted in Germany, this backpack from 11 by Boris Bidjan Saberi features heat sealed zip closures and an inflatable back panel.</p><ul><li>Two side pockets.</li><li>Heat sealed details.</li><li>Double adjustable shoulder straps.</li><li>Made in Germany.</li><li>100% Polyamide.</li></ul></div>',
  '1',
  '11-by-boris-bidjan-saberi',
  '2',
  '1'
),
(
  '90',
  '20',
  'New Era 39thirty Collaboration Cap',
  'new-era-39-thirty-collaboration-cap',
  '<img src="/images/hbx_images/eleven_bidjan/caps/eleven_new_era_front.jpg" />,<img src="/images/hbx_images/eleven_bidjan/caps/eleven_new_era_side.jpg" />,<img src="/images/hbx_images/eleven_bidjan/caps/eleven_new_era_side_2.jpg" />,<img src="/images/hbx_images/eleven_bidjan/caps/eleven_new_era_rear.jpg" />,<img src="/images/hbx_images/eleven_bidjan/jackets/eleven_new_era_brim.jpg" />',
  '<div class="product_details"><ul><li>Embroidered "11" on front.</li><li>6 panel.</li><li>Reflective sticker on front.</li></ul></div>',
  '1',
  '11-by-boris-bidjan-saberi',
  '2',
  '2'
),
(
  '180',
  '20',
  'Work Trousers',
  'work-trousers',
  '<img src="/images/hbx_images/tres_bien/pants/work_trousers_front.jpg" />,<img src="/images/hbx_images/tres_bien/pants/work_trousers_side.jpg" />,<img src="/images/hbx_images/tres_bien/pants/work_trousers_rear.jpg" />,<img src="/images/hbx_images/tres_bien/pants/work_trousers_full.jpg" />,<img src="/images/hbx_images/tres_bien/pants/work_trousers_product_front.jpg" />,<img src="/images/hbx_images/tres_bien/pants/work_trousers_product_rear.jpg" />',
  '<div class="product_details"><ul><li>Straight legs.</li><li>Zip fly.</li><li>Button and hook closure.</li><li>Belt loops.</li><li>Two slanted front pockets, two jetted back pockets.</li><li>100% Cotton.</li></ul></div>',
  '1',
  '11-by-boris-bidjan-saberi',
  '2',
  '11'
),
(
  '395',
  '20',
  'Hooded Blouson Jacket',
  'hooded-blouson-jacket',
  '<img src="/images/hbx_images/tres_bien/jackets/blouson_jacket_front.jpg" />,<img src="/images/hbx_images/tres_bien/jackets/blouson_jacket_side.jpg" />,<img src="/images/hbx_images/tres_bien/jackets/blouson_jacket_rear.jpg" />,<img src="/images/hbx_images/tres_bien/jackets/blouson_jacket_full.jpg" />,<img src="/images/hbx_images/tres_bien/jackets/blouson_jacket_front_zipped.jpg" />,<img src="/images/hbx_images/tres_bien/jackets/blouson_jacket_innards.jpg" />',
  '<div class="product_details"><ul><li>Zipper fastenings.</li><li>2 pockets.</li><li>Velcro to cuffs.</li><li>96% Cotton | 4% Polyurethane.
</li></ul></div>',
  '2',
  'tres-bien',
  '4',
  '5'
),
(
  '170',
  '20',
  'Panel Sweatshirt',
  'panel-sweatshirt',
  '<img src="/images/hbx_images/tres_bien/sweatshirts/panel_front.jpg" />,<img src="/images/hbx_images/tres_bien/sweatshirts/panel_side.jpg" />,<img src="/images/hbx_images/tres_bien/sweatshirts/panel_rear.jpg" />,<img src="/images/hbx_images/tres_bien/sweatshirts/panel_full.jpg" />',
  '<div class="product_details"><ul><li>Reversed loopback.</li><li>Rib crew-neck, cuff and hem.</li><li>Reversed panel across the chest.</li><li>100% Cotton.</li></ul></div>',
  '2',
  'tres-bien',
  '8',
  '13'
),
(
  '145',
  '20',
  'Army Sweatshirt',
  'army-sweatshirt',
  '<img src="/images/hbx_images/tres_bien/sweatshirts/army_front.jpg" />,<img src="/images/hbx_images/tres_bien/sweatshirts/army_side.jpg" />,<img src="/images/hbx_images/tres_bien/sweatshirts/army_rear.jpg" />,<img src="/images/hbx_images/tres_bien/sweatshirts/army_full.jpg" />',
  '<div class="product_details"><ul><li>Long sleeves.</li><li>Rib crewneck.</li><li>Single chest pocket.</li><li>Straight hem with slit side vents.</li><li>100% Cotton.</li></ul></div>',
  '2',
  'tres-bien',
  '9',
  '13'
),
(
  '1350',
  '20',
  'Circle Logo Sweatshirt',
  'circle-logo-sweatshirt',
  '<img src="/images/hbx_images/mastermind/sweatshirts/circle_beige_front.jpg" />,<img src="/images/hbx_images/mastermind/sweatshirts/circle_beige_side.jpg" />,<img src="/images/hbx_images/mastermind/sweatshirts/circle_beige_rear.jpg" />,<img src="/images/hbx_images/mastermind/sweatshirts/circle_beige_full.jpg" />,<img src="/images/hbx_images/mastermind/sweatshirts/circle_beige_wrist_zipper.jpg" />',
  '<div class="product_details"><p>Mastermind Japan''s FW17 collection has statement outerwear set as the prime focus, along with textured hoodies, traditional biker jacket, and collegiate-style varsity jacket, each bearing the brand’s signature skull and crossbones logo. Also on offer are graphic tops, trousers and a two-piece suiting option — stylistically balancing out the casual-heavy range.</p><ul><li>Beige.</li><li>Long sleeve, relaxed fit.</li><li>Top stitching detail.</li><li>Ribbed crew neck, cuffs and hem.</li><li>Printed Mastermind graphic on front and back.</li><li>Hidden embroidered metallic silver skull with Riri zip detail on cuffs.</li><li>Side panels.</li><li>Welt pockets with Mastermind Riri zips on front.</li><li>Faux leather Mastermind "Prologue Volume 1" strap.</li><li>Mastermind labels on side hem.</li><li>100% Cotton, fleece inner.</li><li>Made in Japan.</li><li>Also available in Black.</li></ul></div>',
  '5',
  'mastermind-world',
  '1',
  '10'
),
(
  '800',
  '20',
  'Distressed Oversized Circle Logo S/S T-Shirt',
  'distressed-oversized-circle-logo-s-s-t-Shirt',
  '<img src="/images/hbx_images/mastermind/ss_t_shirts/ss_shirt_front.jpg" />,<img src="/images/hbx_images/mastermind/ss_t_shirts/ss_shirt_side.jpg" />,<img src="/images/hbx_images/mastermind/ss_t_shirts/ss_shirt_rear.jpg" />,<img src="/images/hbx_images/mastermind/ss_t_shirts/ss_shirt_full.jpg" />',
  '<div class="product_details"><p>Mastermind Japan''s FW17 collection has statement outerwear set as the prime focus, along with textured hoodies, traditional biker jacket, and collegiate-style varsity jacket, each bearing the brand’s signature skull and crossbones logo. Also on offer are graphic tops, trousers and a two-piece suiting option — stylistically balancing out the casual-heavy range.</p><ul><li>Beige.</li><li>Short sleeve, oversized fit.</li><li>Distressed look.</li><li>Top stitching detail</li><li>Ribbed crew neck</li><li>Printed Mastermind graphic on front and back.</li><li>Side slits with Mastermind skull invisible binding.</li><li>Faux leather Mastermind "Prologue Volume 1" strap.</li><li>Mastermind label on front and back hem.</li><li>100% Cotton.</li><li>Made in Japan.</li><li>Available in Black.</li></ul></div>',
  '5',
  'mastermind-world',
  '1',
  '10'
),
(
  '1500',
  '20',
  'Box Logo Hoodie',
  'box-logo-hoodie',
  '<img src="/images/hbx_images/mastermind/hoodies/white_box_front.jpg" />,<img src="/images/hbx_images/mastermind/hoodies/white_box_side.jpg" />,<img src="/images/hbx_images/mastermind/hoodies/white_box_rear.jpg" />,<img src="/images/hbx_images/mastermind/hoodies/white_box_full.jpg" />,<img src="/images/hbx_images/mastermind/hoodies/white_box_logo.jpg" />,<img src="/images/hbx_images/mastermind/hoodies/white_box_wrist_zipper.jpg" />',
  '<div class="product_details"><p>Mastermind Japan''s FW17 collection has statement outerwear set as the prime focus, along with textured hoodies, traditional biker jacket, and collegiate-style varsity jacket, each bearing the brand’s signature skull and crossbones logo. Also on offer are graphic tops, trousers and a two-piece suiting option — stylistically balancing out the casual-heavy range.</p><ul><li>White.</li><li>Long sleeve, relaxed fit.</li><li>Hooded, adjustable drawstrings with Mastermind logo metal tip.</li><li>Top stitching detail.</li><li>Ribbed cuffs and hem.</li><li>Hidden embroidered skull in metallic silver with Mastermind Riri zip detail.</li><li>Printed Mastermind box graphics on front and back.</li><li>Side panels.</li><li>Welt pockets with Mastermind Riri zips on front.</li><li>Faux leather Mastermind "Prologue Volume 1" strap.</li><li>Mastermind labels on side hem.</li><li>100% Cotton.</li><li>Made in Japan.</li><li>Also available in Black.</li></ul></div>',
  '5',
  'mastermind-world',
  '7',
  '12'
),
(
  '600',
  '20',
  'Oversized Turtle Neck Box Logo L/S T-Shirt',
  'oversized-turtle-neck-box-logo-l-s-t-Shirt',
  '<img src="/images/hbx_images/mastermind/t_shirts/turtle_front.jpg" />,<img src="/images/hbx_images/mastermind/t_shirts/turtle_side.jpg" />,<img src="/images/hbx_images/mastermind/t_shirts/turtle_rear.jpg" />,<img src="/images/hbx_images/mastermind/t_shirts/turtle_full.jpg" />',
  '<div class="product_details"><p>Mastermind Japan''s FW17 collection has statement outerwear set as the prime focus, along with textured hoodies, traditional biker jacket, and collegiate-style varsity jacket, each bearing the brand’s signature skull and crossbones logo. Also on offer are graphic tops, trousers and a two-piece suiting option — stylistically balancing out the casual-heavy range.</p><ul><li>White.</li><li>Long sleeve, oversized fit.</li><li>Top stitching detail.</li><li>Turtle neck.</li><li>Printed Mastermind graphics on front and back.</li><li>Side slits with Mastermind invisible binding.</li><li>Faux leather Mastermind "Prologue Volume 1" strap.</li><li>Mastermind label on front and back hem.</li><li>100% Cotton.</li><li>Made in Japan.</li><li>Also available in Black.</li></ul></div>',
  '5',
  'mastermind-world',
  '7',
  '10'
),
(
  '600',
  '20',
  'Turtle Neck Circle Logo L/S T-Shirt',
  'turtle-neck-circle-logo-l-s-t-shirt',
  '<img src="/images/hbx_images/mastermind/t_shirts/turtle_grey_full.jpg" />,<img src="/images/hbx_images/mastermind/t_shirts/turtle_grey_side.jpg" />,<img src="/images/hbx_images/mastermind/t_shirts/turtle_grey_rear.jpg" />,<img src="/images/hbx_images/mastermind/t_shirts/turtle_grey_full.jpg" />',
  '<div class="product_details"><p>Mastermind Japan''s FW17 collection has statement outerwear set as the prime focus, along with textured hoodies, traditional biker jacket, and collegiate-style varsity jacket, each bearing the brand’s signature skull and crossbones logo. Also on offer are graphic tops, trousers and a two-piece suiting option — stylistically balancing out the casual-heavy range.</p><ul><li>Charcoal.</li><li>Long sleeve, regular fit.</li><li>Top stitching detail.</li><li>Ribbed turtle neck and cuffs.</li><li>Printed Mastermind graphic on front and back.</li><li>Side slits with Mastermind skull invisible binding.</li><li>Faux leather Mastermind "Prologue Volume 1" strap.</li></li>Mastermind label on front and back hem.</li><li>100% Cotton.</li><li>Made in Japan.</li><li>Also available in Black.</li></ul></div>',
  '5',
  'mastermind-world',
  '5',
  '13'
),
(
  '1380',
  '20',
  'Distressed Skull Embroidery Slim Fit Jeans',
  'distressed-skull-embroidery-slim-fit-jeans',
  '<img src="/images/hbx_images/mastermind/jeans/skull_jeans_front.jpg" />,<img src="/images/hbx_images/mastermind/jeans/skull_jeans_side.jpg" />,<img src="/images/hbx_images/mastermind/jeans/skull_jeans_rear.jpg" />,<img src="/images/hbx_images/mastermind/jeans/skull_jeans_product_front.jpg" />,<img src="/images/hbx_images/mastermind/jeans/skull_jeans_product_rear.jpg" />',
  '<div class="product_details"><p>Mastermind Japan''s FW17 collection has statement outerwear set as the prime focus, along with textured hoodies, traditional biker jacket, and collegiate-style varsity jacket, each bearing the brand’s signature skull and crossbones logo. Also on offer are graphic tops, trousers and a two-piece suiting option — stylistically balancing out the casual-heavy range.</p><ul><li>Indigo.</li><li>Slim fit.</li><li>Distressed look.</li><li>Top stitch finishing.</li><li>Mastermind Riri zip fly.</li><li>Mastermind selfridge.</li><li>Belt loops with small Mastermind D-rings and faux leather Mastermind "Prologue Volume 1" strap.</li><li>Custom Mastermind buttons.</li><li>Embroidered skull in white on pocket.</li><li>Double waisted.</li><li>Front and back pockets, Mastermind label.</li><li>Leather Mastermind label.</li><li>Embroidered skull in silver on back leg cuff.</li><li>98% Cotton | 2% Polyurethane.</li><li>Made in Japan.</li><li>Also available in Black.</li></ul></div>',
  '5',
  'mastermind-world',
  '3',
  '14'
),
(
  '130',
  '10',
  'Medicom Toy x Undercover Gilapple Light Green',
  'medicom-toy-x-undercover-gilapple-light-green',
  '<img src="/images/hbx_images/undercover/toys/medicom_green_front.jpg" />,<img src="/images/hbx_images/undercover/toys/medicom_green_rear.jpg" />',
  '<div class="product_details"><p>Undercover teams up with Medicom Toy to produce this version of the Gilapple led light! Based on the 2009 GILAPPLE animated video.</p><ul><li>Runs on 3 AAA batteries.</li><li>10cm x 9cm | 4" x 3.5".</li></ul></div>',
  '6',
  'undercover',
  '4',
  '15'
),
(
  '130',
  '10',
  'Medicom Toy x Undercover Gilapple Light Red',
  'medicom-toy-x-undercover-gilapple-light-red',
  '<img src="/images/hbx_images/undercover/toys/medicom_red_front.jpg" />,<img src="/images/hbx_images/undercover/toys/medicom_red_rear.jpg" />',
  '<div class="product_details"><p>Undercover teams up with Medicom Toy to produce this version of the Gilapple led light! Based on the 2009 GILAPPLE animated video.</p><ul><li>Runs on 3 AAA batteries.</li><li>10cm x 9cm | 4" x 3.5".</li></ul></div>',
  '6',
  'undercover',
  '6',
  '15'
),
(
  '150',
  '20',
  '"U" S/S T-Shirt',
  'u-s-s-t-shirt',
  '<img src="/images/hbx_images/undercover/ss_t_shirts/ss_grey_shirt_front.jpg" />,<img src="/images/hbx_images/undercover/ss_t_shirts/ss_grey_shirt_side.jpg" />,<img src="/images/hbx_images/undercover/ss_t_shirts/ss_grey_shirt_full.jpg" />',
  '<div class="product_details"><p>Graphic Print tees from Undercover are a favourite every season. As a part of its FW17 collection, the 100% cotton T-Shirt features original artwork along the chest from Undercover''s award-winning graphic designers.</p><ul><li>Slim fitted</li><li>Screen printed front</li><li>Made in Japan</li><li>100% Cotton</li></ul></div>',
  '6',
  'undercover',
  '2',
  '9'
),
(
  '620',
  '20',
  '"U" S/S T-Shirt',
  'u-s-s-t-shirt',
  '<img src="/images/hbx_images/undercover/jackets/deconstructed_jacket_front.jpg" />,<img src="/images/hbx_images/undercover/jackets/deconstructed_jacket_side.jpg" />,<img src="/images/hbx_images/undercover/jackets/deconstructed_jacket_rear.jpg" />,<img src="/images/hbx_images/undercover/jackets/deconstructed_jacket_full.jpg" />,<img src="/images/hbx_images/undercover/jackets/deconstructed_jacket_front_buttoned.jpg" />',
  '<div class="product_details"><p>From world renowned designer Jun Takahashi, this deconstructed jacket features distressed fabric detailing and removable sleeves for a unique silhouette.</p><ul><li>Oversize</li><li>Distressed detailing</li><li>Removable sleeves</li><li>Made in Japan</li><li>100% Cotton</li></ul></div>',
  '6',
  'undercover',
  '3',
  '5'
),
(
  '70',
  '20',
  'Shower Sandals',
  'shower-sandals',
  '<img src="/images/hbx_images/vanquish_fragment/sandals/shower_sandals_side.jpg" />,<img src="/images/hbx_images/vanquish_fragment/sandals/shower_sandals_front.jpg" />,<img src="/images/hbx_images/vanquish_fragment/sandals/shower_sandals_top.jpg" />,<img src="/images/hbx_images/vanquish_fragment/sandals/shower_sandals_full.jpg" />',
  '<div class="product_details"><p>Lightweight slip on sandals by Denim by Vanquish & Fragment are branded by their logo in a contrasting pink and perfect for water resistance wear by the pool.</p><ul><li>Slip on style</li><li>Branding on front</li></ul></div>',
  '4',
  'denim-by-vanquish-fragment',
  '2',
  '17'
),
(
  '40',
  '20',
  'Mug',
  'mug',
  '<img src="/images/hbx_images/vanquish_fragment/homeware/mug_side.jpg" />,<img src="/images/hbx_images/vanquish_fragment/homeware/mug_side_2.jpg" />,<img src="/images/hbx_images/vanquish_fragment/homeware/mug_front.jpg" />',
  '<div class="product_details"><ul><li>Black.</li><li>With handle.</li><li>Printed "Think Denim by".</li><li>Ceramic.</li><li>Also available in White.</li></ul></div>',
  '4',
  'denim-by-vanquish-fragment',
  '2',
  '16'
),
(
  '375',
  '20',
  'Remake Regular Straight Denim Jeans',
  'remake-regular-straight-denim-jeans',
  '<img src="/images/hbx_images/vanquish_fragment/jeans/denim_blue_front.jpg" />,<img src="/images/hbx_images/vanquish_fragment/jeans/denim_blue_side.jpg" />,<img src="/images/hbx_images/vanquish_fragment/jeans/denim_blue_rear.jpg" />,<img src="/images/hbx_images/vanquish_fragment/jeans/denim_blue_full.jpg" />,<img src="/images/hbx_images/vanquish_fragment/jeans/denim_blue_product_front.jpg" />,<img src="/images/hbx_images/vanquish_fragment/jeans/denim_blue_product_rear.jpg" />',
  '<div class="product_details"><p>Lightweight slip on sandals by Denim by Vanquish & Fragment are branded by their logo in a contrasting pink and perfect for water resistance wear by the pool.</p><ul><li>Regular fit.</li><li>Straight cut.</li><li>Side zip pockets.</li><li>Back pockets.</li><li>Printed lightning graphic on back.</li><li>Label on back waist.</li><li>100% Cotton.</li></ul></div>',
  '4',
  'denim-by-vanquish-fragment',
  '3',
  '14'
),
(
  '45',
  '20',
  'Underpants',
  'underpants',
  '<img src="/images/hbx_images/vanquish_fragment/underwear/underpants_front.jpg" />,<img src="/images/hbx_images/vanquish_fragment/underwear/underpants_rear.jpg" />',
  '<div class="product_details"><p>Lightweight slip on sandals by Denim by Vanquish & Fragment are branded by their logo in a contrasting pink and perfect for water resistance wear by the pool.</p><ul><li>Grey.</li><li>Elastic waist.</li><li>Button.</li><li>Lightning logo on hem.</li><li>100% Cotton.</li><li>Label on back waist.</li><li>Also available in Black.</li></ul></div>',
  '4',
  'denim-by-vanquish-fragment',
  '5',
  '17'
);




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

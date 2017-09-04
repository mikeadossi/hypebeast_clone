\c comment_system_db

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR,
  password VARCHAR
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  post_content TEXT,
  img_link VARCHAR
);


INSERT INTO posts (post_content, img_link)
VALUES ('<div>Since Nike released the Air VaporMax model at the beginning of this year, the envelope-pushing silhouette has donned several colorways and decorative accents, ranging from classic tonal to eccentric multicolor looks, metallic details to speckled sole units. The latest rendition of the avant-garde runner is a modern take on a timeless yet bold color pairing — black and yellow. Translating said color scheme into a dark grey and ochre yellow version, this VaporMax boasts a mixed weave upper, bold hits of yellow at the Swoosh branding, tongue tab and stitching, and a glossy black sole unit for a clean and sharp look.</div><img src="images/nikes.jpg" /><div>

There’s still no confirmation on the official release date and retail price, so stay tuned for the latest updates. In the meantime, check out the leaked future iterations of the Nike Air VaporMax.</div>','<img src="images/nikes.jpg" />')

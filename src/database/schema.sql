DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  post_title_string VARCHAR(100),
  post_title VARCHAR,
  post_image VARCHAR,
  post_author VARCHAR,
  category VARCHAR,
  post_time_of VARCHAR,
  post_hype_count INTEGER,
  post_comment_count VARCHAR(20),
  post_subtitle VARCHAR,
  post_content VARCHAR,
  image_credit VARCHAR
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  user_name VARCHAR,
  user_avatar VARCHAR,
  user_avatar_background_color VARCHAR,
  post_id INTEGER,
  comment_text VARCHAR,
  parent_comment_id INTEGER,
  replies_array VARCHAR
);

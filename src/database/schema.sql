\c hypebeast_clone_db

DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  post_title_string VARCHAR(100),
  post_title TEXT,
  post_image TEXT,
  post_author TEXT,
  category VARCHAR,
  post_time_of TEXT,
  post_hype_count INTEGER,
  post_comment_count VARCHAR(20),
  post_subtitle TEXT,
  post_content TEXT,
  image_credit VARCHAR
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  user_name TEXT,
  post_id INTEGER,
  comment_text TEXT
);

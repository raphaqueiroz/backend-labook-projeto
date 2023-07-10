-- Active: 1688147470396@@127.0.0.1@3306
CREATE TABLE users (
  id TEXT PRIMARY KEY UNIQUE NOT NULL ,
  name TEXT  NOT NULL,
  email TEXT  NOT  NULL,
  password TEXT NOT  NULL,
  role TEXT NOT NULL ,
  created_at TEXT DEFAULT (DATETIME('now')) NOT NULL
);
DROP TABLE users;

CREATE TABLE posts (
  id TEXT PRIMARY KEY UNIQUE NOT  NULL,
  creator_id TEXT NOT  NULL,
  content TEXT NOT  NULL,
  likes INTEGER NOT  NULL,
  dislikes INTEGER NOT  NULL,
  created_at TEXT DEFAULT (DATETIME('now')) NOT NULL,
  updated_at TEXT DEFAULT (DATETIME('now')) NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES users (id) ON UPDATE CASCADE

);
DROP TABLE posts;

CREATE TABLE likes_dislikes (
  user_id TEXT NOT  NULL,
  post_id TEXT NOT  NULL,
  like INTEGER NOT  NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE
  FOREIGN KEY (post_id) REFERENCES posts (id) ON UPDATE CASCADE
);

DROP TABLE likes_dislikes;

INSERT INTO users(id, name, email, password, role )
VALUES("u01", "Raphael", "ralph@email.com", "12345", "ADMIN"),
("u02", "Joana", "joana@email.com", "12345", "NORMAL"),
("u03", "Leucy", "leucy@email.com", "12345", "NORMAL"),
("u04", "Andrew", "andrew@email.com", "12345", "NORMAL"), 
("u05", "Bernadete", "bete@email.com", "12345", "NORMAL");

INSERT INTO posts(id, creator_id,  content, likes, dislikes  )
VALUES("p01", "u01", "Foto de natal", 0, 0 ),
("p02", "u02", "Foto de aniversário", 0, 2 ),
("p03", "u03", "Foto na escola", 1, 0 ),
("p04", "u04", "foto com os pais", 1, 0 ),
("p05", "u05", "foto do pet", 1 , 0 );

INSERT INTO likes_dislikes( user_id,  post_id,  like  )
VALUES("u01", "p01", 300 ),
("u02", "p01", 101 ),
("u03", "p01", 800 ),
("u04", "p04", 505 ),
("u05", "p05", 700 )
;

SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM likes_dislikes;

SELECT
    posts.id,
    posts.creator_id,
    posts.content,
    posts.likes,
    posts.dislikes,
    posts.created_at,
    posts.updated_at,
    users.name AS creator_name
FROM posts
JOIN users
ON posts.creator_id = users.id;
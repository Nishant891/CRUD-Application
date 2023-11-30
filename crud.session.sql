CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    INDEX(email),
);


--@block

CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    task VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_email) REFERENCES users(email)
);


--@block

DROP TABLE Users

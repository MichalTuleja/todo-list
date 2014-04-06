DROP DATABASE to_do_listist;
CREATE DATABASE to_do_listist;
USE to_do_listist;
CREATE TABLE task
(
	task_id int NOT NULL AUTO_INCREMENT,
	title varchar(32) NOT NULL,
	description text NOT NULL,
	done int NOT NULL,
	deleted int NOT NULL,
	modification_date datetime NOT NULL,
	creation_date datetime	NOT NULL,
	PRIMARY KEY (task_id)
);

CREATE TABLE user
(
	user_id int NOT NULL AUTO_INCREMENT,
	email varchar(32) NOT NULL,
	password varchar(32) NOT NULL,
	role int NOT NULL,
	is_active int NOT NULL,
	modification_date datetime NOT NULL,
	creation_date datetime	NOT NULL,
	PRIMARY KEY (user_id)
);

CREATE TABLE task_to_user
(
	task_to_user_id int NOT NULL AUTO_INCREMENT,
	task_id int NOT NULL,
	user_id int NOT NULL,
	PRIMARY KEY (task_to_user_id),
	FOREIGN KEY (task_id) REFERENCES task(task_id),
	FOREIGN KEY (user_id) REFERENCES user(user_id)
);

INSERT INTO user (email, password, role, is_active) VALUES('user1@example.com','examplepass1','0','1');
INSERT INTO task (description, done) VALUES ('testowe zadanie 1', 0);
INSERT INTO task_to_user (task_id, user_id) VALUES (1,1);

INSERT INTO user (email, password, role, is_active) VALUES('user2@example.com','examplepass2','1','1');
INSERT INTO task (description, done) VALUES ('testowe zadanie 2', 0);
INSERT INTO task_to_user (task_id, user_id) VALUES (2,2);

INSERT INTO user (email, password, role, is_active) VALUES('user3@example.com','examplepass3','1','1');
INSERT INTO task (description, done) VALUES ('testowe zadanie 3', 0);
INSERT INTO task_to_user (task_id, user_id) VALUES (3,3);

INSERT INTO task (description, done) VALUES ('testowe zadanie 4', 0);
INSERT INTO task_to_user (task_id, user_id) VALUES (4,1);

INSERT INTO task (description, done) VALUES ('testowe zadanie 5', 0);
INSERT INTO task_to_user (task_id, user_id) VALUES (5,1);

INSERT INTO task (description, done) VALUES ('testowe zadanie 6', 0);
INSERT INTO task_to_user (task_id, user_id) VALUES (6,3);
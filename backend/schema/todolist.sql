#---------------------------------------------------------------------------
#-- TODO list DB Schema
#-- MySQL 5.0 Compatibile
#---------------------------------------------------------------------------

#---------------------------------------------------------------------------
#-- Installation notes:
#--   For the first time: 
#--   CREATE DATABASE todolist;
#--
#--   Execute this line in the main project directory:
#--   mysql -u root -p todolist < database_schema/todolist.sql
#--
#--   Update config/local.ini (if necessary)
#---------------------------------------------------------------------------

#-------------------------------------------------------
#-- Check if DB exists
#-------------------------------------------------------
SET FOREIGN_KEY_CHECKS=0; 
DROP TABLE IF EXISTS task;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS task_to_user;
SET FOREIGN_KEY_CHECKS=1; 


#-------------------------------------------------------
#-- Create DB structure based on new schema
#-------------------------------------------------------
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
	name varchar(32) NOT NULL,
	surname varchar(32) NOT NULL,
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

INSERT INTO user (name, surname, email, password, role, is_active, modification_date, creation_date) VALUES('user','1','user1@example.com','examplepass1','0','1',NOW(), NOW());
INSERT INTO task (title, description, deleted, done, modification_date, creation_date) VALUES('testowe zadanie 1','testowe zadanie 1', '0','0', NOW(), NOW());
INSERT INTO task_to_user (task_id, user_id) VALUES(1,1);

INSERT INTO user (name, surname, email, password, role, is_active, modification_date, creation_date) VALUES('user','2','user2@example.com','examplepass2','1','1',NOW(), NOW());
INSERT INTO task (title, description, deleted, done, modification_date, creation_date) VALUES('testowe zadanie 2','testowe zadanie 2', '0','0', NOW(), NOW());
INSERT INTO task_to_user (task_id, user_id) VALUES(2,2);

INSERT INTO user (name, surname, email, password, role, is_active, modification_date, creation_date) VALUES('user','3','user3@example.com','examplepass3','1','1',NOW(), NOW());
INSERT INTO task (title, description, deleted, done, modification_date, creation_date) VALUES('testowe zadanie 3','testowe zadanie 3', '0','0', NOW(), NOW());
INSERT INTO task_to_user (task_id, user_id) VALUES(3,3);

INSERT INTO task (title, description, deleted, done, modification_date, creation_date) VALUES('testowe zadanie 4','testowe zadanie 4', '0','0', NOW(), NOW());
INSERT INTO task_to_user (task_id, user_id) VALUES(4,1);

INSERT INTO task (title, description, deleted, done, modification_date, creation_date) VALUES('testowe zadanie 5','testowe zadanie 5', '0','0', NOW(), NOW());
INSERT INTO task_to_user (task_id, user_id) VALUES(5,1);

INSERT INTO task (title, description, deleted, done, modification_date, creation_date) VALUES('testowe zadanie 6','testowe zadanie 6', '0','0', NOW(), NOW());
INSERT INTO task_to_user (task_id, user_id) VALUES(6,3);
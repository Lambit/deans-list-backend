-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES ('lucaslydon',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Luke',
        'Lambert',
        'luke@yahoo.com',
        TRUE
        ),
       ('lydo',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Lydon',
        'Lambert',
        'lydon@yahoo.com',
        FALSE
        ),
         ('ashy',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Ashy',
        'Lambert',
        'lydon@yahoo.com',
        FALSE
        );
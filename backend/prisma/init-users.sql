-- Usuń użytkownika CRUD jeśli istnieje
DROP USER IF EXISTS 'crud_user'@'%';
DROP USER IF EXISTS 'crud_user'@'localhost';

-- Stwórz użytkownika CRUD z hasłem
CREATE USER 'crud_user'@'%' IDENTIFIED BY 'CrudPass123!';
CREATE USER 'crud_user'@'localhost' IDENTIFIED BY 'CrudPass123!';

-- Nadaj uprawnienia CRUD (tylko SELECT, INSERT, UPDATE, DELETE)
GRANT SELECT, INSERT, UPDATE, DELETE ON chaber.* TO 'crud_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON chaber.* TO 'crud_user'@'localhost';

-- Odśwież uprawnienia
FLUSH PRIVILEGES;

-- Wyświetl informację o utworzeniu
SELECT '✅ Użytkownik crud_user został utworzony z uprawnieniami CRUD' AS 'STATUS';
#!/bin/sh
set -e

echo "👤 Sprawdzanie czy użytkownik CRUD istnieje..."

USER_EXISTS=$(mysql -h mariadb -u root -p${DB_ROOT_PASSWORD} --ssl-mode=DISABLED -sse "SELECT COUNT(*) FROM mysql.user WHERE user = 'crud_user';" 2>/dev/null || echo "0")

if [ "$USER_EXISTS" -eq 0 ]; then
    echo "📝 Tworzenie użytkownika crud_user z uprawnieniami CRUD..."

    mysql -h mariadb -u root -p${DB_ROOT_PASSWORD} --ssl-mode=DISABLED <<EOF
CREATE USER IF NOT EXISTS 'crud_user'@'%' IDENTIFIED BY 'CrudPass123!';
CREATE USER IF NOT EXISTS 'crud_user'@'localhost' IDENTIFIED BY 'CrudPass123!';
GRANT SELECT, INSERT, UPDATE, DELETE ON ${DB_NAME}.* TO 'crud_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON ${DB_NAME}.* TO 'crud_user'@'localhost';
FLUSH PRIVILEGES;
EOF

    echo "✅ Użytkownik crud_user został utworzony z uprawnieniami CRUD"
else
    echo "✅ Użytkownik crud_user już istnieje"
fi

echo "📋 Uprawnienia użytkownika crud_user:"
mysql -h mariadb -u root -p${DB_ROOT_PASSWORD} --ssl-mode=DISABLED -e "SHOW GRANTS FOR 'crud_user'@'%';"
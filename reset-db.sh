#!/bin/bash

echo "Resetting database..."

# Undo all migrations
npx sequelize db:migrate:undo:all

# Run migrations again
npx sequelize db:migrate

# Optionally, run seeders (if you have seed files)
# Uncomment the line below if you want to add seed data
# npx sequelize db:seed:all

echo "Database reset complete."
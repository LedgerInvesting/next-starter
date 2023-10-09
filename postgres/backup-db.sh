#!/bin/bash

# Load environment variables from .env file
source ../.env.local

# Export data from the local database
echo "⏳ Exporting data from the local database..."
pg_dump "$DATABASE_URL" \
    --table=... \
    --data-only --file=backup.sql

echo "✅ Backup completed!"

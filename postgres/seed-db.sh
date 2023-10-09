#!/bin/bash

# Load environment variables from .env file
source ../.env.local

# Check if a seed file is provided
if [[ -z "$1" ]]; then
  echo "📂 Seed file needed."
  exit 1
fi

# Export data from the local database
echo "🏄‍♂️ Import to local database..."
psql "$DATABASE_URL" < "$1"

echo "✅ Import completed!"

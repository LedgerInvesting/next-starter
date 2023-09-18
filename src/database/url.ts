let DB_URL = process.env.DATABASE_URL
const isProduction = process.env.NODE_ENV === 'production'
if (DB_URL && !DB_URL.includes('sslmode=require') && isProduction) {
  DB_URL = `${DB_URL}?sslmode=require`
}

export default DB_URL

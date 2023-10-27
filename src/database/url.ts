import { isProduction } from '@/lib/env'

let DB_URL = process.env.DATABASE_URL
if (DB_URL && !DB_URL.includes('sslmode=require') && isProduction) {
  DB_URL = `${DB_URL}?sslmode=require`
}

export default DB_URL

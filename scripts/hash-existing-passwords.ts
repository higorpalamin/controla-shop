import 'dotenv/config'
import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
})

const bcryptHashRegex = /^\$2[abzy]\$\d{2}\$[./A-Za-z0-9]{53}$/

async function main() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      password: true,
    },
  })

  const unsafeUsers = users.filter((user) => !bcryptHashRegex.test(user.password))
  if (unsafeUsers.length === 0) {
    console.log('No plaintext passwords found.')
    return
  }

  for (const user of unsafeUsers) {
    const hashed = await bcrypt.hash(user.password, 10)
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed },
    })
    console.log(`Updated password hash for ${user.email}`)
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

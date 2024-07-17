import { PrismaClient } from "@prisma/client";
import { getDb } from "./db/db";

const prisma = new PrismaClient();

async function main() {
  // const db = await getDb();
  // const payload = {
  //   email: "sample@gmail.com",
  //   name: "sample",
  // }

  // const result = await db!.collection("users").insertOne(payload);
  // await db.
  // console.log(result);
  // return result;

  const newUser = await prisma.user.create({
    data: {
      email: 'sample1@gmail.com',
      name: 'sample1',
    },
  })
  console.log(newUser)

  // const post = await prisma.post.create({
  //   data: {
  //     title: 'Hello World',
  //     content: 'This is a post',
  //     published: true,
  //     author: {
  //       connect: { email: newUser.email },
  //     },
  //   },
  // })

  const allUsers = await prisma.user.findMany({
    include: { Post: true },
  })
  console.log(allUsers)

  // const allUsers = await prisma.user.findMany();
  // console.log(allUsers);
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
import { prisma } from "../src/lib/prisma";

async function main() {

// await prisma.video.update({
//     where: {id: 123},
//     data:{
//         filename: "123.mp4"
//     }
// })


// Will delete all users from the table.
// Run npx tsx prisma/seed.ts locally

// const deletedUsers = await prisma.user.deleteMany();

// console.log(`Deleted ${deletedUsers} users`)

}

main()
.catch(console.error)
.finally(() => prisma.$disconnect());

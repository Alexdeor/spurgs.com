import { prisma } from "../src/lib/prisma";

async function main() {

await prisma.video.update({
    where: {id: 123},
    data:{
        filename: "123.mp4"
    }
})
}

main().finally(() => prisma.$disconnect());

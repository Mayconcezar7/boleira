import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function seedDatabase() {
  const id = "e4232fd1-f7cb-4123-87e3-a2dcb5dca5ee";
  const bolos = [
    {
      name: "Torta de Chocolate",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuYgh_98kHK1LlVVMCR_fj177Q0MWzJnWdDg&s",
      description: "Torta cremosa de chocolate com base crocante.",
      price: 12.9,
      category: {
        connect: {
          id,
        },
      },
    },
    {
      name: "Torta de Morango",
      imageUrl:
        "https://www.entrepratosecopos.com.br/storage/receitas/imagem2_3932.jpg",
      description: "Torta doce com creme branco e morangos frescos.",
      price: 13.5,
      category: {
        connect: {
          id,
        },
      },
    },
    {
      name: "Torta de Limão",
      imageUrl:
        "https://www.minhasreceitas.blog.br/wp-content/uploads/2020/08/torta-de-limao-diet-1.png",
      description: "Torta de limão com creme cítrico e cobertura de merengue.",
      price: 11.9,
      category: {
        connect: {
          id,
        },
      },
    },
    {
      name: "Torta de Maracujá",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5byl41rmZq27W3_xdvW5xHPcI-dkEA2lWEQ&s",
      description: "Torta doce com creme de maracujá e base crocante.",
      price: 12.5,
      category: {
        connect: {
          id,
        },
      },
    },
    {
      name: "Torta de Leite Ninho",
      imageUrl:
        "https://i.pinimg.com/736x/09/1c/a8/091ca81b18a79297ecb711db62a62250.jpg",
      description: "Torta cremosa de leite ninho com cobertura suave.",
      price: 14.9,
      category: {
        connect: {
          id,
        },
      },
    },
  ];

  try {
    for (let i = 0; i < bolos.length; i++) {
      await prisma.production.create({
        data: {
          name: bolos[i].name,
          imageUrl: bolos[i].imageUrl,
          description: bolos[i].description,
          price: bolos[i].price,
          category: {
            connect: {
              id: bolos[i].category.connect.id,
            },
          },
        },
      });

      console.log("produto criada com sucesso");
    }
  } catch (error) {
    console.error("Erro ao executar seed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();

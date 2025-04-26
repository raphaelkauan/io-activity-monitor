import { Prisma } from "../../../../infra/database/client";

export async function membersActiveFilter(): Promise<string[]> {
  let messageMembersAtivo: string[];

  const count = await Prisma.member.count({
    where: {
      status: { equals: "ativo" },
    },
  });

  if (count !== 0) {
    return (messageMembersAtivo = [`${count}`]);
  }

  return (messageMembersAtivo = ["Não existe membros ativos"]);
}

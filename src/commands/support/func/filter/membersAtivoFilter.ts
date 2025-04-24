import { Prisma } from "../../../../infra/database/client";

export async function membersAtivoFilter(): Promise<string[]> {
  let messageMembersAtivo: string[];

  const count = await Prisma.member.count({
    where: {
      status: { equals: "ativo" },
    },
  });

  if (count !== 0) {
    return (messageMembersAtivo = [`• Quantidade: ${count} membros`]);
  }

  return (messageMembersAtivo = ["Não existe membros ativos"]);
}

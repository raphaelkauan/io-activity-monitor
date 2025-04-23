import { Prisma } from "../../../../infra/database/client";

export async function membersAtivoFilter(): Promise<string[]> {
  const membersAtivoFilter = await Prisma.member.findMany({
    where: { status: { equals: "ativo" } },
    select: { username: true, globalName: true, status: true },
  });

  let messageMembersAtivo: string[];

  const metricsMembersAtivo = membersAtivoFilter.map(
    (member) => `
            • Username: **${member.username}** Status: **${member.status}**`
  );

  if (metricsMembersAtivo.length !== 0) {
    return (messageMembersAtivo = metricsMembersAtivo);
  }

  return (messageMembersAtivo = ["Não existe um membros ativos"]);
}

import { Prisma } from "../../../../infra/database/client";

export async function membersActiveLastFiveDay(): Promise<string[]> {
  // 5 dias atrás
  const today = new Date();
  const fiveDayBefore = new Date();
  fiveDayBefore.setDate(today.getDate() - 6);

  let messageMembersAtivo: string[];

  const count = await Prisma.member.count({
    where: {
      OR: [
        {
          lastOffline: {
            gt: fiveDayBefore,
          },
        },
        {
          status: {
            equals: "ativo",
          },
        },
      ],
    },
  });

  if (count !== 0) {
    return (messageMembersAtivo = [`${count}`]);
  }

  return (messageMembersAtivo = ["Não existe membros ativos"]);
}

import { Prisma } from "../../../../infra/database/client";
import { getDateDaysBefore } from "../util/getDateDaysBefore";

export async function membersActiveLastFiveDayFilter(): Promise<string[]> {
  // 6 dias atrás
  const sixDayBefore = getDateDaysBefore(6);

  let messageMembersAtivo: string[];

  const count = await Prisma.member.count({
    where: {
      OR: [
        {
          lastOffline: {
            gt: sixDayBefore,
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

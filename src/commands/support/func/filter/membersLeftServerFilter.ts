import { Prisma } from "../../../../infra/database/client";

export async function membersLeftServerFilter(): Promise<string[]> {
  const memberLeftServer = await Prisma.member.findMany({
    where: {
      isGuildMember: { equals: false },
    },
    select: {
      username: true,
      serverName: true,
      lastCheckedGuildMember: true,
    },
  });

  const metricsMemberLeftServer = memberLeftServer.map((member) => {
    const formatDate = new Date(member.lastCheckedGuildMember!).toLocaleDateString();
    const format = `
      - Username: ${member.username} | ServerName: ${member.serverName} | Última verificação de saída: ${formatDate}`;
    return format;
  });

  let messageLeftServer: string[];

  if (metricsMemberLeftServer.length !== 0) {
    return (messageLeftServer = metricsMemberLeftServer);
  }

  return (messageLeftServer = ["Não há nenhum membro que tenha saído"]);
}

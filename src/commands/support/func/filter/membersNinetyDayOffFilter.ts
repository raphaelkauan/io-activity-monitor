import { Prisma } from "../../../../infra/database/client";

export async function membersNinetyDayOffFilter(): Promise<string[]> {
  const today = new Date();

  // 91 dias atrás
  const ninetyOneDayBefore = new Date();
  ninetyOneDayBefore.setDate(today.getDate() - 91);

  console.log(ninetyOneDayBefore);

  // Mais de 90 dias
  const membersNinetyDayOff = await Prisma.member.findMany({
    where: { lastOffline: { lte: ninetyOneDayBefore }, AND: { isGuildMember: true } },
    select: { username: true, serverName: true, lastOffline: true, status: true },
  });

  const metricsMembersNinetyDayOff = membersNinetyDayOff.map((member) => {
    const formatDate = new Date(member.lastOffline!).toLocaleDateString();
    const format = `
      • Username: **${member.username}** ServerName: **${member.serverName}** Visto por último: **${formatDate}** Status: **${member.status}**`;
    return format;
  });

  let messageTenDayOff: string[];

  if (metricsMembersNinetyDayOff.length !== 0) {
    return (messageTenDayOff = metricsMembersNinetyDayOff);
  }

  return (messageTenDayOff = ["Não existe um membro off +90 dias"]);
}

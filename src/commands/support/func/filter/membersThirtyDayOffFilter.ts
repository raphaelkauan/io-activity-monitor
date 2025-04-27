import { Prisma } from "../../../../infra/database/client";
import { getDateDaysBefore } from "../util/getDateDaysBefore";

export async function membersThirtyDayOffFilter(): Promise<string[]> {
  // 31 dias atrás
  const thirtyOneDayBefore = getDateDaysBefore(31);

  // 91 dias atrás
  const ninetyOneDayBefore = getDateDaysBefore(91);

  // Menos de 90 dias e mais de 30 dias
  const membersThirtyDayOff = await Prisma.member.findMany({
    where: { lastOffline: { gt: ninetyOneDayBefore, lte: thirtyOneDayBefore }, AND: { isGuildMember: true } },
    select: { username: true, serverName: true, lastOffline: true, status: true },
  });

  const metricsMembersThirtyDayOff = membersThirtyDayOff.map((member) => {
    const formatDate = new Date(member.lastOffline!).toLocaleDateString();
    const format = `
      • Username: **${member.username}** ServerName: **${member.serverName}** Visto por último: **${formatDate}** Status: **${member.status}**`;
    return format;
  });

  let messageThirtyDayOff: string[];

  if (metricsMembersThirtyDayOff.length !== 0) {
    return (messageThirtyDayOff = metricsMembersThirtyDayOff);
  }

  return (messageThirtyDayOff = ["Não existe um membro off +30 dias"]);
}

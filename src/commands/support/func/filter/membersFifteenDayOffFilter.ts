import { Prisma } from "../../../../infra/database/client";
import { getDateDaysBefore } from "../util/getDateDaysBefore";

export async function membersFifteenDayOffFilter(): Promise<string[]> {
  // 16 dias atrás
  const sixteenDayBefore = getDateDaysBefore(16);

  // 31 dias atrás
  const thirtyOneDayBefore = getDateDaysBefore(31);

  // Menos de 30 dias e mais de 15 dias
  const membersFifteenDayOff = await Prisma.member.findMany({
    where: { lastOffline: { gt: thirtyOneDayBefore, lte: sixteenDayBefore }, AND: { isGuildMember: true } },
    select: { username: true, serverName: true, lastOffline: true, status: true },
  });

  const metricsMembersFifteenDayOff = membersFifteenDayOff.map((member) => {
    const formatDate = new Date(member.lastOffline!).toLocaleDateString();
    const format = `
      • Username: **${member.username}** ServerName: **${member.serverName}** Visto por último: **${formatDate}** Status: **${member.status}**`;
    return format;
  });

  let messageFifteenDayOff: string[];

  if (metricsMembersFifteenDayOff.length !== 0) {
    return (messageFifteenDayOff = metricsMembersFifteenDayOff);
  }

  return (messageFifteenDayOff = ["Não existe um membro off +15 dias"]);
}

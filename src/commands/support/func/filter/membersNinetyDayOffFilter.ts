import { Prisma } from "../../../../infra/database/client";
import { getDateDaysBefore } from "../util/getDateDaysBefore";

export async function membersNinetyDayOffFilter(): Promise<string[]> {
  const today = new Date();

  // 91 dias atrás
  const ninetyOneDayBefore = getDateDaysBefore(91);

  // Mais de 90 dias
  const membersNinetyDayOff = await Prisma.member.findMany({
    where: { lastOffline: { lte: ninetyOneDayBefore }, AND: { isGuildMember: true } },
    select: { username: true, serverName: true, lastOffline: true, status: true },
  });

  const metricsMembersNinetyDayOff = membersNinetyDayOff.map((member) => {
    const formatDate = new Date(member.lastOffline!).toLocaleDateString();
    const format = `
      - Username: ${member.username} | ServerName: ${member.serverName} | Visto por último: ${formatDate} Status: ${member.status}`;
    return format;
  });

  let messageNinetyDayOff: string[];

  if (metricsMembersNinetyDayOff.length !== 0) {
    return (messageNinetyDayOff = metricsMembersNinetyDayOff);
  }

  return (messageNinetyDayOff = ["Não existe um membro off +90 dias"]);
}

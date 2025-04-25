import { Prisma } from "../../../../infra/database/client";

export async function membersThirtyDayOffFilter(): Promise<string[]> {
  // 31 dias atrás
  const today = new Date();
  const thirtyDayBefore = new Date();
  thirtyDayBefore.setDate(today.getDate() - 31);

  // 91 dias atrás
  const ninetyDayBefore = new Date();
  ninetyDayBefore.setDate(today.getDate() - 91);

  // Menos de 90 dias e mais de 30 dias
  const membersThirtyDayOff = await Prisma.member.findMany({
    where: { lastOffline: { gt: ninetyDayBefore, lte: thirtyDayBefore }, AND: { isGuildMember: true } },
    select: { username: true, globalName: true, lastOffline: true, status: true },
  });

  const metricsMembersThirtyDayOff = membersThirtyDayOff.map((member) => {
    const formatDate = new Date(member.lastOffline!).toLocaleDateString();
    const format = `\n • Username: **${member.username}** UsernameGlobal: **${member.globalName}** Visto por último: **${formatDate}** Status: **${member.status}**`;
    return format;
  });

  let messageTenDayOff: string[];

  if (metricsMembersThirtyDayOff.length !== 0) {
    return (messageTenDayOff = metricsMembersThirtyDayOff);
  }

  return (messageTenDayOff = ["Não existe um membro off +30 dias"]);
}

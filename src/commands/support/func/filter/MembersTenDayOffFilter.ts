import { Prisma } from "../../../../infra/database/client";

export async function MembersTenDayOffFilter(): Promise<string[]> {
  // 10 dias atrás
  const today = new Date();
  const tenDaysBefore = new Date();
  tenDaysBefore.setDate(today.getDate() - 10);

  // 30 dias atrás
  const thirtyDayBefore = new Date();
  thirtyDayBefore.setDate(today.getDate() - 30);

  // Menos de 30 dias e mais de 10 dias
  const membersTenDayOff = await Prisma.member.findMany({
    where: { lastOffline: { gt: thirtyDayBefore, lte: tenDaysBefore }, AND: { isGuildMember: true } },
    select: { username: true, globalName: true, lastOffline: true, status: true },
  });

  const metricsMembersTenDayOff = membersTenDayOff.map((member) => {
    const formatDate = new Date(member.lastOffline!).toLocaleDateString();
    const format = `\n • Username: **${member.username}** UsernameGlobal: **${member.globalName}** Visto por último: **${formatDate}** Status: **${member.status}**`;
    return format;
  });

  let messageTenDayOff: string[];

  if (metricsMembersTenDayOff.length !== 0) {
    return (messageTenDayOff = metricsMembersTenDayOff);
  }

  return (messageTenDayOff = ["Não existe um membro off +10 dias"]);
}

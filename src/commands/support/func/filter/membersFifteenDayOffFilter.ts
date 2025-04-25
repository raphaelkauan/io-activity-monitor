import { Prisma } from "../../../../infra/database/client";

export async function membersFifteenDayOffFilter(): Promise<string[]> {
  // 16 dias atrás
  const today = new Date();
  const fifteenDayBefore = new Date();
  fifteenDayBefore.setDate(today.getDate() - 16);

  // 31 dias atrás
  const thirtyDayBefore = new Date();
  thirtyDayBefore.setDate(today.getDate() - 31);

  console.log(thirtyDayBefore);

  // Menos de 30 dias e mais de 15 dias
  const membersFifteenDayOff = await Prisma.member.findMany({
    where: { lastOffline: { gt: thirtyDayBefore, lte: fifteenDayBefore }, AND: { isGuildMember: true } },
    select: { username: true, globalName: true, lastOffline: true, status: true },
  });

  const metricsMembersFifteenDayOff = membersFifteenDayOff.map((member) => {
    const formatDate = new Date(member.lastOffline!).toLocaleDateString();
    const format = `\n • Username: **${member.username}** UsernameGlobal: **${member.globalName}** Visto por último: **${formatDate}** Status: **${member.status}**`;
    return format;
  });

  let messageTenDayOff: string[];

  if (metricsMembersFifteenDayOff.length !== 0) {
    return (messageTenDayOff = metricsMembersFifteenDayOff);
  }

  return (messageTenDayOff = ["Não existe um membro off +15 dias"]);
}

import { ApplicationCommandType, EmbedBuilder, MessageFlags } from "discord.js";
import { Command } from "../../infra/settings/types/Command";
import { Prisma } from "../../infra/database/client";
import { validationAdmin } from "../support/func/validation/validationAdmin";

export default new Command({
  name: "metrics-member",
  description: "Este comando retorna um embed com métricas dos membros",
  type: ApplicationCommandType.ChatInput,

  async run({ interaction }) {
    if (!(await validationAdmin(interaction))) return;

    try {
      const membersAtivoFilter = await Prisma.member.findMany({
        where: { status: { equals: "ativo" } },
        select: { username: true, globalName: true, status: true },
      });

      const metricsMembersAtivo = membersAtivoFilter.map(
        (member) => `
        • Nome: **${member.username}** NomeGlobal: **${member.globalName}** Status: **${member.status}**`
      );

      // 10 dias atrás
      const today = new Date();
      const tenDaysBefore = new Date();
      tenDaysBefore.setDate(today.getDate() - 10);

      console.log("10 " + tenDaysBefore);

      // 30 dias atrás
      const thirtyDayBefore = new Date();
      thirtyDayBefore.setDate(today.getDate() - 30);

      console.log("30 " + thirtyDayBefore);

      // Menos de 30 dias e mais de 10 dias
      const membersTenDayOff = await Prisma.member.findMany({
        where: { lastOffline: { gt: thirtyDayBefore, lte: tenDaysBefore } },
        select: { username: true, globalName: true, lastOffline: true, status: true },
      });

      console.log(membersTenDayOff);

      const metricsMembersTenDayOff = membersTenDayOff.map((member) => {
        const formatDate = new Date(member.lastOffline!).toLocaleDateString();
        const format = `\n • Nome: **${member.username}** NomeGlobal: **${member.globalName}** Visto por último: **${formatDate}** Status: **${member.status}**`;
        return format;
      });

      let messageTenDayOff: string[] = ["Não existe um membro off +10 dias"];

      if (metricsMembersTenDayOff.length !== 0) {
        messageTenDayOff = metricsMembersTenDayOff;
      }

      const embed = new EmbedBuilder()
        .setTitle(`Métricas **${interaction.guild?.name}**`)
        .setColor("DarkAqua")
        .setFields([
          {
            name: "**Membros +10 dias off**",
            value: `${messageTenDayOff}`,
          },
          {
            name: "**Membros ativos:**",
            value: `${metricsMembersAtivo}`,
          },
        ]);

      await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    } catch (error) {
      console.log(error);
    }
  },
});

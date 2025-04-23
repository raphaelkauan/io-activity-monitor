import { ApplicationCommandType, EmbedBuilder, MessageFlags } from "discord.js";
import { Command } from "../../infra/settings/types/Command";
import { Prisma } from "../../infra/database/client";
import { validationAdmin } from "../support/func/validation/validationAdmin";
import { membersAtivoFilter } from "../support/func/filter/membersAtivoFilter";
import { MembersTenDayOffFilter } from "../support/func/filter/MembersTenDayOffFilter";

export default new Command({
  name: "metrics-member",
  description: "Este comando retorna um embed com métricas dos membros",
  type: ApplicationCommandType.ChatInput,

  async run({ interaction }) {
    if (!(await validationAdmin(interaction))) return;

    try {
      const membersAtivo = await membersAtivoFilter();
      const membersTenDayOff = await MembersTenDayOffFilter();

      const embed = new EmbedBuilder()
        .setTitle(`Métricas **${interaction.guild?.name}**`)
        .setColor("DarkAqua")
        .setFields([
          {
            name: "**Membros +10 dias off**",
            value: `${membersTenDayOff}`,
          },
          {
            name: "**Membros ativos:**",
            value: `${membersAtivo}`,
          },
        ]);

      await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    } catch (error) {
      console.log(error);
    }
  },
});

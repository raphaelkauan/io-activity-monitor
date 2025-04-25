import { ApplicationCommandType, MessageFlags } from "discord.js";
import { Command } from "../../infra/settings/types/Command";
import path from "path";
import { membersAtivoFilter } from "../support/func/filter/membersAtivoFilter";
import { membersFifteenDayOffFilter } from "../support/func/filter/membersFifteenDayOffFilter";
import { membersThirtyDayOffFilter } from "../support/func/filter/membersThirtyDayOffFilter";
import { writeFileSync } from "fs";
import { formatDate } from "../support/func/util/formatDate";
import fs from "fs";

export default new Command({
  name: "metrics-member-txt",
  description: "Este comando enviar um arquivo .txt com métricas do servidor ",
  type: ApplicationCommandType.ChatInput,

  async run({ interaction }) {
    try {
      const data = formatDate();
      const fileName = `metrics-${data}.txt`;
      const filePath = path.join(__dirname, `../../files/${fileName}`);

      const membersAtivo = await membersAtivoFilter();
      const membersTenDayOff = await membersFifteenDayOffFilter();
      const membersThirtyDayOff = await membersThirtyDayOffFilter();

      const metricsTxt = `
      
      Métricas **${interaction.guild?.name}** - ${data}

      ==============================================================================================================
      
      **Membros +90 dias off:**
      ${data}

      ==============================================================================================================
      
      **Membros +30 dias off:**
      ${membersThirtyDayOff}
  
      ==============================================================================================================
      
      **Membros +15 dias off:**
      ${membersTenDayOff}
  
      ==============================================================================================================
      
      **Membros ativo:

      ${membersAtivo}
  
      `;

      writeFileSync(filePath, metricsTxt);

      await interaction.reply({ files: [filePath], flags: MessageFlags.Ephemeral });

      fs.unlinkSync(filePath);
    } catch (error) {
      console.error(
        `\n⚠️ Ocorreu um erro ao executar: "metricsMemberTxt.ts" \n\n Username: ${interaction.user.username} \n\n Guilda nome: ${interaction.guild?.name} \n\n❌ ${error}`
      );
    }
  },
});

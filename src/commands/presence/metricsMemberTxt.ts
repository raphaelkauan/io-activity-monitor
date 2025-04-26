import { ApplicationCommandType, MessageFlags } from "discord.js";
import { Command } from "../../infra/settings/types/Command";
import path from "path";
import { membersFifteenDayOffFilter } from "../support/func/filter/membersFifteenDayOffFilter";
import { membersThirtyDayOffFilter } from "../support/func/filter/membersThirtyDayOffFilter";
import { writeFileSync } from "fs";
import { formatDate } from "../support/func/util/formatDate";
import fs from "fs";
import { membersNinetyDayOffFilter } from "../support/func/filter/membersNinetyDayOffFilter";
import { membersActiveLastFiveDayFilter } from "../support/func/filter/membersActiveLastFiveDayFilter";
import { membersLeftServerFilter } from "../support/func/filter/membersLeftServerFilter";

export default new Command({
  name: "metrics-member-txt",
  description: "Este comando enviar um arquivo .txt com métricas do servidor ",
  type: ApplicationCommandType.ChatInput,

  async run({ interaction }) {
    try {
      const data = formatDate();
      const fileName = `metrics-${data}.txt`;
      const filePath = path.join(__dirname, `../../files/${fileName}`);

      const membersLeftServer = await membersLeftServerFilter();
      const membersNinetyDayOff = await membersNinetyDayOffFilter();
      const membersThirtyDayOff = await membersThirtyDayOffFilter();
      const membersTenDayOff = await membersFifteenDayOffFilter();
      const membersActiveLastFive = await membersActiveLastFiveDayFilter();

      const metricsTxt = `
      
      Métricas **${interaction.guild?.name}** • ${data}
      
      ==============================================================================================================
      
      **Saiu do rolê:**
      ${membersLeftServer}

      ==============================================================================================================
      
      **Membros +90 dias off:**
      ${membersNinetyDayOff}

      ==============================================================================================================
      
      **Membros +30 dias off:**
      ${membersThirtyDayOff}
  
      ==============================================================================================================
      
      **Membros +15 dias off:**
      ${membersTenDayOff}
  
      ==============================================================================================================
      
      **Total de membros que estiveram online nos últimos 5 dias:**

      • ${membersActiveLastFive} membros
  
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

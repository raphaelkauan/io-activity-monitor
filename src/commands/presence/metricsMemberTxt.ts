import { ApplicationCommandType } from "discord.js";
import { Command } from "../../infra/settings/types/Command";
import path from "path";
import { membersAtivoFilter } from "../support/func/filter/membersAtivoFilter";
import { MembersTenDayOffFilter } from "../support/func/filter/MembersTenDayOffFilter";
import { writeFileSync } from "fs";

export default new Command({
  name: "metrics-member-txt",
  description: "Este comando enviar um arquivo .txt com métricas do servidor ",
  type: ApplicationCommandType.ChatInput,

  async run({ interaction }) {
    const filePath = path.join(__dirname, "../../files/teste.txt");

    const membersAtivo = await membersAtivoFilter();
    const membersTenDayOff = await MembersTenDayOffFilter();

    const metricsTxt = `
    
    Métricas **${interaction.guild?.name}**

    =====================================
    
    **Membros +10 dias off:**
    ${membersTenDayOff}

    =====================================
    **Membros ativos:
    ${membersAtivo}

    `;

    writeFileSync(filePath, metricsTxt);

    const metrics = await interaction.reply({ files: [filePath] });
  },
});

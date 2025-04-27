import { ApplicationCommandType, ColorResolvable, EmbedBuilder, formatEmoji } from "discord.js";
import { Command } from "../../infra/settings/types/Command";
import { colors } from "../../styles/colors.json";
import { validationIsSuperUser } from "../support/func/validation/cargo/validationIsSuperUser";

export default new Command({
  name: "apresentacao-bot",
  type: ApplicationCommandType.ChatInput,
  description: "Este comando fornece uma breve apresentação do bot.",

  async run({ interaction }) {
    if (!(await validationIsSuperUser(interaction))) return;

    const embed = new EmbedBuilder()
      .setColor(colors.yellow as ColorResolvable)
      .setTitle(`Stuart`)
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .setDescription(
        `
        ${formatEmoji("1328441926705217536", true)} Documentação: https://github.com/raphaelkauan/stuart`
      )
      .setFields(
        {
          name: "Funcionalidades:",
          value: " ",
        },
        {
          name: `${formatEmoji("1328450359697346703", true)} Mensagem de Boas-Vindas`,
          value:
            "O bot envia automaticamente uma mensagem de boas-vindas sempre que um novo membro entra no servidor.",
        }
      )
      .setFooter({
        text: "Acesse nossa documentação para mais informações!",
      });

    interaction.reply({ content: `@everyone`, embeds: [embed] });
  },
});

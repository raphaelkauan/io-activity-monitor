import { CommandInteraction, MessageFlags } from "discord.js";
import dotenv from "dotenv";
import { createEmbedInformation } from "../components/createEmbedInformation";
import { colors } from "../../../../styles/colors.json";

dotenv.config();

export async function validationChannel(interaction: CommandInteraction): Promise<boolean> {
  const channelId = process.env.CHANNEL_MUSIC_ID;

  if (interaction.channelId != channelId) {
    await interaction.reply({
      embeds: [
        createEmbedInformation(
          colors.yellow,
          "Informação",
          "Você está tentando executar este comando no canal errado. Por favor, utilize o canal para pedidos de música."
        ),
      ],
      flags: MessageFlags.Ephemeral,
    });
    return false;
  }
  return true;
}

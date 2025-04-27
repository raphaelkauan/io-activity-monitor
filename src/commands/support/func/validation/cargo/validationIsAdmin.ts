import { CommandInteraction, GuildMember, MessageFlags } from "discord.js";
import { createEmbedInformation } from "../../components/createEmbedInformation";
import { colors } from "../../../../../styles/colors.json";
import dotenv from "dotenv";

dotenv.config();

export async function validationIsAdmin(interaction: CommandInteraction) {
  const cargoAdmId = process.env.CARGO_ADMIN_ID;

  if (interaction.member instanceof GuildMember) {
    if (!interaction.member?.roles.cache.has(cargoAdmId!)) {
      await interaction.reply({
        embeds: [
          createEmbedInformation(colors.red, "Atenção", "Você não tem permissão para executar este comando!"),
        ],
        flags: MessageFlags.Ephemeral,
      });
      return false;
    }
  }
  return true;
}

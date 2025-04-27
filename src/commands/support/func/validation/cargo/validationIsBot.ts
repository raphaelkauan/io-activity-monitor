import { GuildMember } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

export async function validationIsBot(cargoBotId: GuildMember | null) {
  const cargoBot = process.env.CARGO_BOT;

  if (cargoBotId) {
    if (!cargoBotId.roles.cache.has(cargoBot!)) {
      console.log("Sem permissão para !presence");
      return false;
    }
    return true;
  }
}

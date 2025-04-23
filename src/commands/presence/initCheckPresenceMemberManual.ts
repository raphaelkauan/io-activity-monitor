import { ApplicationCommandType } from "discord.js";
import { Command } from "../../infra/settings/types/Command";

import { MemberRepository } from "../../infra/database/repositories/member/MemberRepository";

export default new Command({
  name: "presence",
  description: "Presença de membros on/off",
  type: ApplicationCommandType.ChatInput,

  async run({ interaction }) {},
});

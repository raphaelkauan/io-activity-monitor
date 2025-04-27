import { client } from "../..";
import { Prisma } from "../../infra/database/client";
import { Event } from "../../infra/settings/types/Event";
import dotenv from "dotenv";

dotenv.config();

/**
 * Verifica se o membro ainda está presente no servidor.
 */
export default new Event({
  name: "ready",
  async run() {
    setInterval(async () => {
      const guild = client.guilds.cache.get(process.env.SERVIDOR_ID!);

      try {
        const dbMembers = await Prisma.member.findMany();

        for (const dbMember of dbMembers) {
          const validationServerMember = guild?.members.cache.has(dbMember.id);

          if (!validationServerMember) {
            await Prisma.member.update({
              where: {
                id: dbMember.id,
              },
              data: {
                status: "offline",
                lastOffline: null,
                isGuildMember: false,
                lastCheckedGuildMember: new Date(),
              },
            });
          }
        }
        console.log(`Check guild member ${new Date()}`);
      } catch (error) {
        console.log(`\n⚠️ Ocorreu um erro no evento: "checkedGuildMember" \n\n❌ ${error}`);
      }
    }, Number(process.env.TIME_CHECK_GUILD_MEMBER));
  },
});

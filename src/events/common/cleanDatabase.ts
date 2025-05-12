import { MemberRepository } from "../../infra/database/repositories/member/MemberRepository";
import { Event } from "../../infra/settings/types/Event";

export default new Event({
  name: "messageCreate",
  async run(interaction) {
    if (interaction.content === "!clean-database") {
      if (interaction.author.id !== process.env.SUPER_USER_ID) return;

      try {
        const memberRepository = new MemberRepository();

        await memberRepository.deleteAllData();

        await interaction.reply({ content: "✅ Banco de dados limpo!" });
      } catch (error) {
        console.error(
          `\n⚠️ Ocorreu um erro ao executar: "cleanDatabase" \n\n Guilda nome: ${interaction.guild?.name} \n\n❌ ${error}`
        );
      }
    }
  },
});

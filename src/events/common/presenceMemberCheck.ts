import { MemberRepository } from "../../infra/database/repositories/member/MemberRepository";
import { Event } from "../../infra/settings/types/Event";

export default new Event({
  name: "messageCreate",
  async run(interaction) {
    if (interaction.content === "!presence") {
      const guildId = interaction.guildId;
      const guild = interaction.client.guilds.cache.get(guildId!);

      console.log(`Check presence ${new Date()}`);

      const memberRepository = new MemberRepository();

      try {
        for (const member of guild?.members.cache.values()!) {
          const findMemberById = await memberRepository.findMemberById(member.user.id);

          /**
           * Atualiza em caso de o membro estar cadastrado como "ativo" e fique "offline"
           */
          if (
            (findMemberById?.status === "ativo" && member.presence?.status === undefined) ||
            member.presence?.status === "offline"
          ) {
            await memberRepository.updateMemberToOffline(findMemberById?.id!);
          }

          /**
           * Se o membro estiver "ativo" e não estiver cadastrado no banco ele é cadastrado
           */
          if (
            (member.presence?.status === "online" && !findMemberById) ||
            (member.presence?.status === "idle" && !findMemberById) ||
            (member.presence?.status === "invisible" && !findMemberById) ||
            (member.presence?.status === "dnd" && !findMemberById)
          ) {
            await memberRepository.registerMemberActive(member);
          }

          /**
           * Se o member estiver "offline" e não estiver cadastrado no banco ele é cadastrado
           */
          if (
            (member.presence?.status === undefined && !findMemberById) ||
            (member.presence?.status === "offline" && !findMemberById)
          ) {
            await memberRepository.registerMemberOffline(member);
          }
        }

        /**
         * Torna membro online novamente
         */
        for (const member of guild?.members.cache.values()!) {
          const memberExistsValidation = await memberRepository.findMemberById(member.user.id);

          if (
            (memberExistsValidation?.status === "offline" && member.presence?.status === "online") ||
            (memberExistsValidation?.status === "offline" && member.presence?.status === "idle") ||
            (memberExistsValidation?.status === "offline" && member.presence?.status === "invisible") ||
            (memberExistsValidation?.status === "offline" && member.presence?.status === "dnd")
          ) {
            await memberRepository.updateMemberToOnline(memberExistsValidation.id);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
});

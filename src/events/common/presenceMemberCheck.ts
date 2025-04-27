import { client } from "../..";
import { MemberRepository } from "../../infra/database/repositories/member/MemberRepository";
import { Event } from "../../infra/settings/types/Event";
import dotenv from "dotenv";

dotenv.config();

export default new Event({
  name: "ready",
  async run() {
    setInterval(async () => {
      const guild = client.guilds.cache.get(process.env.SERVIDOR_ID!);

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
        console.log(`\n⚠️ Ocorreu um erro no evento: "presenceMemberCheck" \n\n❌ ${error}`);
      }
    }, Number(process.env.TIME_CHECK_PRESENCE));
  },
});

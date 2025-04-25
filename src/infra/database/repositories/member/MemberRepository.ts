import { GuildMember } from "discord.js";
import { Prisma } from "../../../../infra/database/client";

export class MemberRepository {
  async findMemberById(memberId: string) {
    return await Prisma.member.findFirst({
      where: {
        id: memberId,
      },
    });
  }

  async updateMemberToOffline(memberId: string) {
    await Prisma.member.update({
      where: {
        id: memberId,
      },
      data: {
        status: "offline",
        lastOffline: new Date(),
      },
    });
  }

  async registerMemberActive(member: GuildMember) {
    await Prisma.member.create({
      data: {
        id: member.user.id,
        username: member.user.username,
        serverName: member.user.globalName || "Is bot",
        status: "ativo",
        isGuildMember: true,
      },
    });
  }

  async registerMemberOffline(member: GuildMember) {
    await Prisma.member.create({
      data: {
        id: member.user.id,
        username: member.user.username,
        serverName: member.user.globalName || "Is bot",
        status: "offline",
        lastOffline: new Date(),
        isGuildMember: true,
      },
    });
  }

  async updateMemberToOnline(memberId: string) {
    await Prisma.member.update({
      where: {
        id: memberId,
      },
      data: {
        status: "ativo",
        lastOffline: null,
        isGuildMember: true,
      },
    });
  }
}

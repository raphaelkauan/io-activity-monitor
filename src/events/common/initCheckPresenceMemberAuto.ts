import { Channel } from "discord.js";
import { client } from "../..";
import { Event } from "../../infra/settings/types/Event";

export default new Event({
  name: "ready",
  async run() {
    setInterval(() => {
      const channel = client.channels.cache.get("");
      if (channel) {
      }
    }, 5000);
  },
});

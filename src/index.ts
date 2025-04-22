import { CoreClient } from "./infra/settings/core/CoreClient";

export const client = new CoreClient();

client.start().then(() => {
  console.log("Bot iniciado com sucesso!");

  if (!client.user?.id) {
    throw new Error("Falha ao obter o ID do bot após o login.");
  }
});

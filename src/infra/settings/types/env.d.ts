declare namespace NodeJS {
  interface ProcessEnv {
    BOT_TOKEN_DC: string;
    NOME_SERVIDOR: string;

    CHANNEL_WELCOME_ID: string;
    SUPER_USER_ID: string;
    CLIENT_ID: string;
    CARGO_ADMIN_ID: string;

    DATABASE_URL: string;

    CHANNEL_REGRAS: string;
    CHANNEL_CONTEUDO: string;
  }
}

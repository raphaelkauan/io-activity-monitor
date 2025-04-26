declare namespace NodeJS {
  interface ProcessEnv {
    BOT_TOKEN_DC: string;
    SERVIDOR_NAME: string;
    SERVIDOR_ID: string;

    TIME_CHECK_PRESENCE: string;

    CHANNEL_WELCOME_ID: string;
    SUPER_USER_ID: string;
    CLIENT_ID: string;
    CARGO_ADMIN_ID: string;
    CARGO_BOT: string;

    DATABASE_URL: string;

    CHANNEL_REGRAS: string;
    CHANNEL_CONTEUDO: string;
    CHANNEL_LOGS: string;
  }
}

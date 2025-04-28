## 📁 Instalação

## Pré-requisitos

1. Certifique-se de ter o [Node.js](https://nodejs.org/en) instalado em sua máquina.

2. Verifique se você também tem o [Git](https://git-scm.com/downloads) instalado para clonar o repositório.

---

## Passos de Instalação

Siga os passos abaixo para configurar e executar o projeto.

### 1. Clone o repositório

No terminal, execute o comando abaixo para clonar o repositório do projeto:

```bash
git clone https://github.com/raphaelkauan/io-activity-monitor
```

### 2. Instale as dependências

Acesse o diretório do projeto e instale as dependências necessárias:

```bash
cd io-activity-monitor
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis, substituindo pelos valores apropriados:

```env
BOT_TOKEN_DC= # token do bot do Discord
CLIENT_ID= # id do bot no Discord
SERVIDOR_NAME= # nome do servidor Discord
SERVIDOR_ID= # id do servidor Discord

TIME_CHECK_PRESENCE= # intervalo para checar presença dos membros (ms)
TIME_CHECK_GUILD_MEMBER= # intervalo para verificar membros que saíram (ms)

CARGO_ADMIN_ID= # id do cargo de administrador
SUPER_USER_ID= # id do super usuário (opcional)
CARGO_BOT= # id do cargo atribuído a bots

DATABASE_URL= # url de conexão com o banco de dados

CHANNEL_WELCOME_ID= # id do canal de boas-vindas (opcional)
CHANNEL_REGRAS= # id do canal de regras (opcional)
CHANNEL_CONTEUDO= # id do canal de conteúdo (opcional)
```

### 4. Inicie o projeto

Agora você pode iniciar o projeto com o seguinte comando:

```bash
npm run dev
```

Qualquer dúvida ou incidente verifique nossa sessão de [perguntas](https://github.com/raphaelkauan/io-activity-monitor/issues).

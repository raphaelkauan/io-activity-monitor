## 💾 Instalação

## Pré-requisitos

1. Certifique-se de ter o [Node.js](https://nodejs.org/en) instalado em sua máquina.

2. Verifique se você também tem o [Git](https://git-scm.com/downloads) instalado para clonar o repositório.

---

## Passos de Instalação

Siga os passos abaixo para configurar e executar o projeto.

### 1. Clone o repositório

No terminal, execute o comando abaixo para clonar o repositório do projeto:

```bash
git clone https://github.com/raphaelkauan/stuart
```

### 2. Instale as dependências

Acesse o diretório do projeto e instale as dependências necessárias:

```bash
cd stuart
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis, substituindo pelos valores apropriados:

```env
BOT_TOKEN_DC=
NOME_SERVIDOR=
CHANNEL_WELCOME_ID=
SUPER_USER_ID=
CLIENT_ID=
CARGO_ADMIN_ID=

DATABASE_URL=

CHANNEL_REGRAS=
CHANNEL_CONTEUDO=
```

### 4. Inicie o projeto

Agora você pode iniciar o projeto com o seguinte comando:

```bash
npm run dev
```

Qualquer dúvida ou incidente verifique nossa sessão de [perguntas](https://github.com/raphaelkauan/bot-localhost).

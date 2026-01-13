# Teste Fullstack

Projeto de teste completo (Full Stack) desenvolvido com Node.js, Express e PostgreSQL para prática de desenvolvimento de APIs REST com validação de dados e gerenciamento de banco de dados.

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** (v5.2.1) - Framework web minimalista
- **TypeScript** (v5.9.3) - Superset do JavaScript com tipagem
- **PostgreSQL** - Banco de dados relacional
- **Knex.js** (v3.1.0) - Query builder SQL
- **Zod** (v4.3.5) - Validação de dados com schemas

### Development
- **tsx** (v4.21.0) - Executor de arquivos TypeScript
- **dotenv-cli** (v11.0.0) - Carregamento de variáveis de ambiente
- **@types/node** (v25.0.3) - Tipos TypeScript para Node.js
- **@types/express** (v5.0.6) - Tipos TypeScript para Express

## 📋 Estrutura do Projeto

```
Teste-Fullstack/
├── src/
├── migrations/          # Migrações de banco de dados (Knex)
├── knexfile.ts          # Configuração do Knex
├── tsconfig.json        # Configuração do TypeScript
├── package.json         # Dependências do projeto
├── .env                 # Variáveis de ambiente
├── .gitignore          # Arquivos ignorados pelo Git
└── README.md            # Este arquivo
```

## 🔧 Configuração e Instalação

### Pré-requisitos

- **Node.js** (versão 18.x ou superior)
- **npm** (vem com Node.js)
- **PostgreSQL** (versão 12 ou superior)

### Passo 1: Clone o repositório

```bash
git clone https://github.com/Moionese/Teste-Fullstack.git
cd Teste-Fullstack
```

### Passo 2: Instale as dependências

```bash
npm install
```

### Passo 3: Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Banco de Dados PostgreSQL
PG_HOST=localhost
PG_PORT=5432
PG_USER=seu_usuario
PG_PASSWORD=sua_senha
PG_DATABASE=teste_fullstack
```

**Notas importantes:**
- Substitua `seu_usuario` e `sua_senha` pelas credenciais do seu PostgreSQL
- Certifique-se de que o banco de dados `teste_fullstack` existe ou será criado
- O PORT padrão é 3333, mas você pode alterar conforme necessário

### Passo 4: Execute as migrações do banco de dados

```bash
# Criar nóvos dados de migração
npm run migrate:make -- nome_da_migracao

# Executar todas as migrações pendéntes
npm run migrate:latest

# Reverter a última migração
npm run migrate:rollback
```

## 🚀 Como Inicializar o Projeto

### Modo Desenvolvimento

Inicie o servidor em modo watch (recarrega automaticamente quando você altera os arquivos):

```bash
npm run dev
```

O servidor será iniciado em `http://localhost:3333`

### Modo Produção

Primeiro, compile o TypeScript:

```bash
npx tsc
```

Depois, execute o arquivo compilado:

```bash
node dist/server.js
```

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento - Inicia o servidor com hot reload
npm run dev

# Criar nova migração
npm run migrate:make

# Executar migrações pendentes
npm run migrate:latest

# Reverter última migração
npm run migrate:rollback
```

## 🗄️ Configuração do Banco de Dados

O arquivo `knexfile.ts` contém a configuração de conexão com o PostgreSQL:

- **Host**: localhost (padrão)
- **Port**: 5432 (padrão do PostgreSQL)
- **Database**: Definido em `PG_DATABASE` no `.env`
- **Migrações**: Armazenadas em `src/database/migrations`
- **Seeds**: Armazenadas em `src/database/seeds` (se existirem)

## 🔐 Validação de Dados

O projeto utiliza **Zod** para validação de dados. Todos os dados recebidos da API são validados contra schemas definidos utilizando Zod antes de serem processados.

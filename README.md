# Ecofunding Platform

Esta é uma plataforma para gerenciamento de projetos socioambientais que conecta projetistas e investidores, facilitando a comunicação, envio de relatórios e acesso a informações relacionadas aos projetos.

## Tecnologias Utilizadas

### Frontend

- Next.js: Escolhido por ser um framework moderno que combina server-side rendering (SSR) e static site generation (SSG), o que melhora a performance e a experiência do usuário.
- TypeScript: Oferece tipagem estática, aumentando a confiabilidade e facilitando a manutenção do código.
- TailwindCSS: Utilizado para estilização rápida e consistente, permitindo construir uma interface de usuário moderna.

### Backend
- Next.js API Routes: Usado para simplificar a criação de endpoints do backend diretamente no projeto.
- PostgreSQL: Banco de dados relacional, ideal para relacionamentos complexos.
- AWS S3: Para armazenamento seguro e escalável de relatórios enviados pelos projetistas.

### Autenticação
- NextAuth.js: Framework flexível para autenticação, integrado facilmente ao Next.js, permitindo suporte para múltiplos provedores e segurança robusta.
Outras Bibliotecas
- Zod: Para validação de dados.
- Jest e React Testing Library: Para testes unitários e integração.

#### OBS: A escolha das ferramentas apresentadas acima, é porque o react é a tecnologia que vocês utilizaram no seu site, pensando que os integrantes da equipe está familiarizada com essa tecnologia me desafiei a implementar a solução nela, pessoalmente eu estou mais familiazidado com Laravel no mundo PHP.
- Também vejo o React como uma ferramenta simples de subir em produção com a vercel e possuí um plano gratuito e escalável.

## Instalação e Execução
### Requisitos
- Node.js (versão 16 ou superior)
- PostgreSQL (versão 13 ou superior)
- Conta AWS com acesso ao S3

### Passo a Passo
### 1.Clone o repositório:

```bash
git clone https://github.com/seu-usuario/ecofunding-platform.git
cd ecofunding-platform
```

### 2.Instale as dependências:

```bash
npm install
```

### 3.Configure o ambiente: Crie um arquivo .env.local na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL=postgres://usuario:senha@localhost:5432/ecofunding
NEXTAUTH_SECRET=seu-segredo
NEXTAUTH_URL=http://localhost:3000
AWS_ACCESS_KEY_ID=seu-acesso
AWS_SECRET_ACCESS_KEY=sua-chave
AWS_S3_BUCKET=nome-do-bucket
```

### 4.Execute as migrações do banco de dados:

```bash
npx prisma migrate dev
```

### 5.Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

### 6.Acesse no navegador: http://localhost:3000

## Recursos Adicionais
- Sistema de mensagens integrado: Permite a comunicação direta entre investidores e projetistas.
- Armazenamento no S3: Relatórios são enviados de forma segura e armazenados na nuvem.

## Features a Implementar
### Notificações em Tempo Real
- Descrição: Notificar os usuários sobre mensagens e atualizações de relatórios.
- Implementação: Usar WebSockets ou Firebase Cloud Messaging para atualizações em tempo real.

### Dashboard de Análise
- Descrição: Painel com gráficos interativos sobre o progresso dos projetos e investimentos.
- Implementação: Utilizar Chart.js ou ApexCharts integrado com React Query para dados dinâmicos.

### Upload de Arquivos em Lote
- Descrição: Projetistas podem enviar múltiplos arquivos simultaneamente.
- Implementação: Adicionar suporte ao componente de upload de arquivos com bibliotecas como React Dropzone.

### Log de Auditoria
- Descrição: Histórico detalhado de ações realizadas pelos usuários.
- Implementação: Criar tabelas no banco para armazenar logs de ações e exibi-las em uma interface administrativa.
# 🦋 Luna — Plataforma Escolar

Sistema web voltado para escolas e professores, com foco em gestão humanizada de alunos, turmas e corpo docente, com suporte à neurodiversidade.

---

## 🚀 Tecnologias

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Lucide React](https://lucide.dev/)
- [date-fns](https://date-fns.org/)
- [react-day-picker](https://react-day-picker.js.org/)

---

## 📋 Funcionalidades

- Login e cadastro de instituição
- Dashboard da escola com cards de resumo
- Gestão de alunos, professores e turmas
- Calendário com criação e exclusão de eventos
- Plano de aula (manual ou por anexo)
- Dashboard do professor com matérias e turma
- Interface responsiva (mobile, tablet, Full HD)

---

## ⚙️ Como rodar localmente

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/luna-front.git

# Entre na pasta
cd luna-front

# Instale as dependências
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
```

> Substitua pela URL do back-end quando for para produção.

### Rodando

```bash
npm run dev
```

Acesse em `http://localhost:5173`

---

## 🔗 Integração com o Back-end

O front consome uma API REST em Node.js. As principais rotas esperadas são:

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/login` | Login da escola |
| GET | `/escolas/estatisticas` | Totais de alunos, professores e turmas |
| GET/POST/PUT/DELETE | `/escolas` | CRUD da instituição |
| GET/POST/PUT/DELETE | `/professores` | CRUD de professores |
| GET/POST/PUT/DELETE | `/alunos` | CRUD de alunos |
| GET/POST/PUT/DELETE | `/turmas` | CRUD de turmas |
| GET | `/professores/turma` | Dados da turma do professor |

O token JWT retornado no login é salvo no `localStorage` e enviado em todas as requisições via header `Authorization: Bearer <token>`.

---

## 📁 Estrutura de pastas

```
src/
├── assets/
├── components/
│   ├── escola/
│   └── calendar/
├── pages/
│   ├── escola/
│   ├── professores/
│   └── modals/
└── services/
    └── api.ts
```

---

## 👥 Time

Desenvolvido por **Luminous**.

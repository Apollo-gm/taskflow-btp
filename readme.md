# 🚀 Taskflow BTP

Aplicação de gerenciamento de tarefas desenvolvida com SAP CAP + SAP Fiori Elements.

## 📌 Funcionalidades

- Listagem de tarefas
- Criação de novas tarefas via modal
- Status e prioridade com indicadores visuais
- Página de detalhes (Object Page)
- Organização por responsável

## 🧱 Tecnologias

- SAP CAP (Node.js)
- OData V4
- SAP Fiori Elements
- SAP Business Application Studio
- Cloud Foundry (deploy)

## ▶️ Como rodar o projeto

## 1. Instalar dependências
   ```bash
   npm install
---

## 2. Rodar backend (CAP)
cds watch

---

## 3. Acessar aplicação

Abrir via BAS ou acessar:
http://localhost:4004

---

##📡 Endpoint OData
/odata/v4/task/Tasks

---
##📂 Estrutura do projeto
app/   → frontend (Fiori)
db/    → modelos CDS
srv/   → serviços (CAP)
---

👥 Colaboração

Projeto desenvolvido em dupla, com separação de responsabilidades:

Frontend: UI5 / Fiori Elements
Backend: CAP / OData / BTP

---

🎯 Objetivo

Criar uma aplicação simples, funcional e bem estruturada, focando em entendimento real das tecnologias SAP e boas práticas de desenvolvimento.

---

# 📋 Sistema JMS — Jeová Materiais e Serviços

Sistema web para emissão de **recibos** e **relatórios de serviços**, desenvolvido sob medida para gestão interna de Jeová Materiais e Serviços.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|---|---|---|
| [React](https://react.dev/) | 19 | Biblioteca de interface |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Tipagem estática |
| [Vite](https://vite.dev/) | 6.x | Build tool e dev server |
| [CSS Vanilla](https://developer.mozilla.org/pt-BR/docs/Web/CSS) | — | Estilização personalizada |

---

## ✨ Funcionalidades

### 🧾 Emissão de Recibos
- Formulário completo com dados do pagador e recebedor
- Campos: valor, forma de pagamento, descrição do serviço, data
- Visualização em tempo real do recibo antes de imprimir
- Impressão direta pelo navegador com layout profissional

### 📊 Emissão de Relatórios
- Criação de relatórios detalhados de serviços prestados
- Seleção de período (data início e fim)
- Listagem de itens com quantidade, unidade e valor unitário
- Cálculo automático de totais
- Preview de impressão formatado

### 📁 Histórico
- Armazenamento local dos documentos emitidos (`localStorage`)
- Consulta e reimpressão de recibos e relatórios anteriores

### 🎨 Interface
- Design moderno com tema escuro
- Logo personalizada da empresa JMS
- Layout responsivo e profissional
- Animações suaves de transição

---

## 🖥️ Como Rodar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) 18+ instalado
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/minhascuriosidades001-netizen/sistemajms.git

# Entre na pasta
cd sistemajms

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O sistema estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

---

## 📁 Estrutura do Projeto

```
sistema-jms/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── Logo.tsx           # Logo da empresa JMS
│   │   ├── ReceiptForm.tsx    # Formulário de recibo
│   │   ├── ReceiptPreview.tsx # Preview de impressão do recibo
│   │   ├── ReportForm.tsx     # Formulário de relatório
│   │   ├── ReportPreview.tsx  # Preview de impressão do relatório
│   │   └── HistoryList.tsx    # Lista de documentos emitidos
│   ├── hooks/
│   │   └── useLocalStorage.ts # Hook para persistência local
│   ├── utils/
│   │   ├── formatters.ts      # Formatadores de data, moeda, etc.
│   │   └── mockDb.ts          # Simulação de banco de dados local
│   ├── App.tsx                # Componente principal
│   ├── App.css                # Estilos do app
│   ├── index.css              # Estilos globais e design system
│   └── main.tsx               # Ponto de entrada
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 🔗 Links

- **Repositório**: https://github.com/minhascuriosidades001-netizen/sistemajms
- **Cliente**: Jeová Materiais e Serviços

---

## 📄 Changelog

Veja o arquivo [CHANGELOG.md](./CHANGELOG.md) para o histórico completo de alterações.

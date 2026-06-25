# Changelog — Sistema JMS

Todas as mudanças notáveis neste projeto serão documentadas aqui.

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto segue o [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [1.0.0] — 2026-06-25

### Adicionado
- 🎉 **Lançamento inicial** do Sistema JMS
- 🧾 **Emissão de Recibos**: formulário completo com dados do pagador, recebedor, valor, forma de pagamento e descrição
- 📊 **Emissão de Relatórios de Serviços**: formulário com itens, quantidades, unidades e valores unitários com cálculo automático
- 👁️ **Preview de Impressão**: visualização em tempo real dos documentos antes de imprimir (recibos e relatórios)
- 📁 **Histórico de Documentos**: armazenamento e consulta de recibos e relatórios emitidos via `localStorage`
- 🎨 **Logo JMS**: logotipo personalizado da empresa com ícone e tipografia
- 🌙 **Design moderno com tema escuro**: interface profissional com gradientes e animações suaves
- 🖨️ **Impressão otimizada**: layout de impressão formatado para folha A4
- 💾 **Persistência local**: dados salvos no navegador sem necessidade de servidor
- 🔧 **Utilitários**: formatadores de moeda (R$), data e extenso por escrito

### Tecnologias
- React 19 + TypeScript 5
- Vite 6 como build tool
- CSS Vanilla com design system personalizado
- LocalStorage para persistência de dados

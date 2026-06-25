# Changelog — Sistema JMS

Todas as mudanças notáveis neste projeto serão documentadas aqui.

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto segue o [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [1.0.6] — 2026-06-25

### Corrigido
- 🐳 **Deploy Estável com Dockerfile**: Substituído o Nixpacks/sirv por um `Dockerfile` de duas etapas (build com Node 20 + serve com Nginx), resolvendo definitivamente os erros `sirv: not found` e garantindo que o app seja servido de forma confiável em qualquer ambiente Docker.

---

## [1.0.5] — 2026-06-25

### Corrigido
- 🌐 **sirv: not found**: Adicionado o pacote `sirv-cli` explicitamente às dependências do projeto para garantir a presença do binário global do servidor estático no contêiner de produção.
- 🔧 **Mapeamento de Skills**: Criado o arquivo `.agents/skills.json` apontando para `.agent/skills` para que o assistente carregue corretamente as habilidades integradas do repositório.

---

## [1.0.4] — 2026-06-25

### Corrigido
- 🌐 **Tela em branco após deploy**: Adicionado servidor estático de produção (`sirv`) às dependências e configurado script `"start"` no `package.json` juntamente com instrução de inicialização explícita no `nixpacks.toml`, corrigindo a falha onde o servidor de produção não sabia como servir os arquivos da pasta `dist/`.

---

## [1.0.3] — 2026-06-25

### Adicionado
- 🖥️ **Simplificação da Edição**: Removido o painel lateral de pré-visualização A4 das telas de edição de recibos e relatórios, focando totalmente no preenchimento do formulário.

### Corrigido
- 🎨 **Estilo de Botões**: Adicionado suporte para as classes `bg-transparent` e `bg-slate-800` no arquivo `index.css`, corrigindo botões que assumiam a cor branca nativa dos navegadores.
- 📱 **Barra de Ações Responsiva**: Ajustado o posicionamento e o alinhamento dos botões (Voltar, Limpar, Salvar, Imprimir) para que se adaptem e quebrem de linha perfeitamente no celular, sem espremer ou cortar o texto.

---

## [1.0.2] — 2026-06-25

### Adicionado
- 📱 **Menu Mobile Sanduíche**: Implementação de menu colapsável (toggle) para telas móveis, deixando a interface mais clean e organizada.
- 📜 **Rolagem de Página Mobile**: Correção do scroll do body e contêineres principais no celular, permitindo subir e descer a página naturalmente.

---

## [1.0.1] — 2026-06-25

### Corrigido
- 🔧 **Deploy no Easypanel**: Adicionado arquivo `nixpacks.toml` para contornar problemas de permissão com cache do build do node_modules e configurada a versão mínima do Node.js no `package.json` para `>=20.0.0`.

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

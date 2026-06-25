# Regras do Projeto — Sistema JMS

## Repositório GitHub
- **URL**: https://github.com/minhascuriosidades001-netizen/sistemajms
- **Branch principal**: `main`

## Regra: Atualizar Online (Commit + Push)

Sempre que o usuário pedir para **"atualizar online"**, **"subir commit"**, **"push"**, **"publicar no GitHub"** ou expressões equivalentes, siga **obrigatoriamente** este fluxo completo:

### 1. Atualizar o README.md
- Reescreva ou atualize o `README.md` na raiz do projeto descrevendo:
  - O que é o sistema
  - Tecnologias utilizadas
  - Funcionalidades implementadas até o momento
  - Como rodar localmente
  - Link do repositório

### 2. Atualizar o CHANGELOG.md
- Adicione uma nova entrada no topo do `CHANGELOG.md` com:
  - Data atual no formato `YYYY-MM-DD`
  - Versão incrementada (seguindo semver: patch para correções, minor para features, major para breaking changes)
  - Lista das mudanças feitas desde o último commit
  - Categorias: `Adicionado`, `Modificado`, `Corrigido`, `Removido`

### 3. Fazer o Commit
- `git add .`
- `git commit -m "tipo: descrição resumida das mudanças"`
  - Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `chore`

### 4. Fazer o Push
- `git push origin main`
- Confirmar sucesso do push para o repositório: https://github.com/minhascuriosidades001-netizen/sistemajms

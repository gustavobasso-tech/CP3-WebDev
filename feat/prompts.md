# Relatório de Engenharia de Prompt - Seleção de Solução Acadêmica

Este documento apresenta o processo de consulta, análise e escolha da melhor base de código gerada por Inteligências Artificiais para a implementação da API de Autenticação e Cadastro de Usuários.

## 1. IAs Consultadas
* **IA 1:** OpenAI ChatGPT-4o
* **IA 2:** Anthropic Claude 3.5 Sonnet
* **IA 3:** Microsoft Copilot (Creative Mode)

---

## 2. Prompt Utilizado (Engenharia de Prompt)

> **Contexto:** Atuo como Engenheiro de Software em um projeto acadêmico e preciso estruturar o backend inicial de uma plataforma.
>
> **Tarefa:** Escreva o código completo para uma API REST de autenticação e cadastro de usuários utilizando Node.js com TypeScript e Express.
>
> **Requisitos Técnicos:**
> 1. **Arquitetura:** Camadas limpas (Controller, Service, Repository).
> 2. **Segurança:** Hash de senha usando `bcrypt` e geração de token JWT para rotas protegidas.
> 3. **Persistência:** Simular um banco de dados em memória (Array de objetos) isolado na camada de Repository para manter o foco na lógica.
> 4. **Validação:** Validar o formato do e-mail e tamanho mínimo de senha (mínimo 6 caracteres).
> 5. **Qualidade de Código:** Código tipado em TypeScript, tratamento de erros centralizado (middleware) e tratamento de exceções para e-mails duplicados.
>
> **Formato de Saída:** Código limpo, componentizado por arquivos e explicações breves da estrutura.

*Nota: Não foi necessário refinamento (prompt final igual ao inicial), pois o prompt estruturado com contexto, requisitos claros e restrições já gerou respostas completas logo de primeira.*

---

## 3. Análise das Respostas e Problemas Encontrados

### IA 1: ChatGPT-4o
* **Pontos Positivos:** Entrega o código extremamente rápido e bem comentado. Seguiu à risca a divisão de pastas sugerida.
* **Problemas Encontrados:** O middleware de tratamento de erros genérico foi implementado de forma muito superficial, capturando apenas erros 500 e ignorando códigos de status HTTP customizados (como 400 para e-mail duplicado ou 401 para credenciais inválidas). Ele "hardcodou" os status diretamente nos controllers.

### IA 2: Claude 3.5 Sonnet
* **Pontos Positivos:** Código altamente idiomático em TypeScript. Foi a única IA que criou uma classe de erro customizada (`AppError`) estendendo a classe `Error` nativa, permitindo passar o status HTTP correto para o middleware centralizado.
* **Problemas Encontrados:** Esqueceu-se de tipar corretamente o objeto `req.user` extraído do payload do JWT no middleware de autenticação, gerando um erro de compilação do TypeScript que exigiria a criação de um arquivo de definição de tipos (`.d.ts`).

### IA 3: Microsoft Copilot
* **Pontos Positivos:** Gerou uma interface visual organizada e explicou passo a passo como instalar as dependências via npm (`npm i express bcrypt jwt...`).
* **Problemas Encontrados:** Falhou no requisito de arquitetura em camadas. O Copilot condensou a lógica de validação, criptografia e persistência quase toda dentro dos Controllers, quebrando o princípio de responsabilidade única e desrespeitando o padrão de Repository solicitado.

---

## 4. Justificativa da IA Escolhida

A IA escolhida como base para o projeto foi o **Claude 3.5 Sonnet**.

**Motivos da escolha:**
1. **Padrões de Projeto (Design Patterns):** A implementação da classe `AppError` e o middleware de tratamento de erros centralizado foram os mais maduros e escaláveis, alinhados com o que o mercado de Engenharia de Software exige.
2. **Separação de Conceitos:** A divisão entre as camadas Service (regras de negócio como hash de senha e validação) e Repository (manipulação de dados) ficou impecável.
3. **Facilidade de Correção:** O único problema encontrado (a tipagem do Request do Express para o JWT) é um detalhe simples de TypeScript que pode ser resolvido rapidamente com um *Type Merging* ou um *Type Casting* (`req as any` ou estendendo a interface do Express), sendo mais fácil de corrigir do que refatorar a arquitetura inteira do Copilot ou arrumar os tratamentos de erro do ChatGPT.

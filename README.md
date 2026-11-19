# Career Dreamer — Mapeamento Vocacional

## Descrição do projeto

O Career Dreamer é um sistema de mapeamento vocacional desenvolvido para ajudar estudantes a descobrir possíveis carreiras na área da tecnologia que combinam com seus interesses, hobbies e características pessoais.

O usuário preenche um formulário com seu nome, hobbies e interesses. Essas informações são enviadas para uma API com inteligência artificial, que gera um perfil profissional e recomenda carreiras de acordo com o nível de compatibilidade.

## Público-alvo

Estudantes e pessoas que desejam conhecer melhor as possibilidades de carreira na área da tecnologia e identificar profissões que combinem com seus interesses.

## Funcionalidades

- Formulário para preenchimento do nome, hobbies e interesses.
- Validação dos campos obrigatórios.
- Envio das informações para uma API.
- Exibição de mensagens de aviso e erro.
- Apresentação do resumo do perfil profissional.
- Recomendação de carreiras com porcentagem de compatibilidade.
- Organização das profissões de acordo com a compatibilidade.
- Exibição de resultados de exemplo para testes.

## Tecnologias utilizadas

- **HTML5:** estruturação das páginas.
- **CSS3:** estilização e organização visual.
- **JavaScript:** validações, interações e comunicação com a API.
- **API:** processamento das informações e geração das recomendações.
- **JSON:** formato utilizado na comunicação de dados.
- **Visual Studio Code:** editor utilizado no desenvolvimento.
- **Live Server:** ferramenta para executar o projeto localmente.

## Requisitos mínimos

- Computador com navegador atualizado.
- Conexão com a internet para utilizar a API.
- Visual Studio Code, caso queira executar pelo editor.
- Extensão Live Server para facilitar a execução local.

## Como executar o projeto

1. Baixe ou clone este repositório.
2. Abra a pasta do projeto no Visual Studio Code.
3. Configure o endereço da API no arquivo `js/config.js`, conforme as orientações da API utilizada.
4. Abra o arquivo `index.html` com o Live Server.
5. Preencha o formulário e envie as informações para visualizar as recomendações.

Para visualizar um resultado de exemplo sem utilizar o backend, acesse `resultado.html?exemplo`.

## Estrutura do projeto

```text
meu-futuro-em-tech/
├── index.html
├── resultado.html
├── css/
│   └── style.css
├── js/
│   ├── config.js
│   ├── app.js
│   ├── resultado.js
│   └── dados-exemplo.js
├── ISSUES.md
└── README.md
```

## Desenvolvedores

- Amanda Carvalho de Jesus
- Gabriel Monteiro Silva

## Relatório de Correção de Software

O projeto também possui um Relatório de Correção de Software (RCS), que apresenta os problemas identificados, as correções realizadas e os testes executados durante o desenvolvimento.

O documento está disponível neste repositório em formato PDF.

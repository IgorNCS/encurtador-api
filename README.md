## Passo a Passo

1. **Subir Banco e Keycloak:**
   - Execute `docker compose up` para iniciar o banco de dados e o Keycloak.

2. **Executar Migrations:**
   - Use `yarn create` para rodar as migrations.
   - Utilize `yarn generate` e `yarn run` para gerar e executar o projeto.

3. **Configuração do Keycloak:**
   - Adicione um realm para a aplicação.
   - Crie um client que permita o registro de usuários.
   - Copie o client secret e coloque no arquivo `.env`.

4. **Ajustes em Desenvolvimento:**
   - Remova as validações de usuário após criação (somente em desenvolvimento).

5. **Testes:**
   - Use o `.env.example` como referência.
   - Realize testes utilizando a collection do POST disponibilizada.

6. **Documentação:**
   - Acesse a documentação em `http://localhost:3000/api`.

7. **Comandos TypeORM:**
   - Criação de Migration: `yarn typeorm migration:create --dataSource src/database/data-source.ts`
   - Gerar Migration: `yarn typeorm migration:generate ./src/database/migrations/create_link -d src/database/data-source.ts`
   - Rodar Migration: `yarn typeorm migration:run --dataSource src/database/data-source.ts`


### Pontos de melhoria

- Interface WEB onde um usuario possa disponibilizar suas url encurtadas
- Junção dos 2 bancos para utilizar apenas um e utilizar `Roles` no banco para melhor separação

> **Nota:** A versão do `nest common` não deve ser maior que `11.0.0` para PROD.
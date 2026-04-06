# Automação Mobile - WebdriverIO + Appium

Projeto de automação de testes mobile desenvolvido com WebdriverIO e Appium, executando testes em Android e iOS através do BrowserStack.

---

## Tecnologias utilizadas

- Node.js
- WebdriverIO
- Appium
- Mocha (BDD)
- BrowserStack
- Allure Reports

---

## Estrutura do Projeto

- test/specs: Cenários de teste organizados por funcionalidade.
- test/pageobjects: Elementos e ações das telas (Page Object Model).
- test/data: Gerenciamento de massa de dados.
- wdio.conf.js: Arquivo central de configuração do WebdriverIO.
- .env: Gerenciamento de credenciais e variáveis de ambiente.

---

## Padrão de Projeto: Page Object Model (POM)

O projeto utiliza o padrão Page Object Model para garantir:
- Reutilização de código entre plataformas.
- Manutenção simplificada em caso de mudança de seletores.
- Separação clara entre a lógica do teste e a interação com a interface.

### BasePage

Foi implementada uma BasePage com métodos genéricos para padronizar as interações e aumentar a robustez (uso de waits explícitos):

- aguardarEAcionar  
- aguardarEPreencher  
- aguardarEObterTexto  
- aguardarElemento  

---

## Estratégia de Testes

Os cenários cobrem os fluxos críticos do aplicativo:

### Login
- Login com sucesso e validação de mensagens de erro para dados inválidos.

### Cadastro
- Fluxo completo de criação de conta com validação de mensagens dinâmicas e tratamento de modais.

### Forms
- Interação com inputs de texto, componentes de switch, seleção em dropdowns e validação de botões ativos.

### Navegação
- Validação do fluxo de acesso entre as telas principais: Login, Forms, Swipe e Drag.

---

## Diferenças entre Android e iOS

O projeto foi desenhado para lidar com as particularidades de cada sistema operacional:

| Item | Android | iOS |
| :--- | :--- | :--- |
| Seletores | Utiliza content-desc e text. | Utiliza name, label e value. |
| Dropdown | Interação direta via clique. | Utiliza PickerWheel com scroll. |
| Switch | Atributo 'checked'. | Atributo 'value'. |
| Funcionalidades | Fluxo de Drag and Drop funcional. | Funcionalidade inexistente (cenário ignorado). |

### Tratamento de Erros no iOS

Para contornar comportamentos assíncronos e modais nativos do iOS, foram implementadas lógicas de retry em botões críticos como Login e Sign Up.

---

## Massa de Dados

Foram adotadas duas abordagens para equilibrar flexibilidade e simplicidade:

1. **Massa Externa:** Uso de arquivos .js (ex: cadastro.data.js) para dados complexos e reutilizáveis.  
2. **Massa Inline:** Definição direta na spec para cenários simples e específicos.  

---

## Execução dos Testes

### Local

1. Instalar dependências:
   npm install
2. Executar testes:
   npx wdio run wdio.conf.js


---

### BrowserStack

O projeto utiliza o BrowserStack para execução em dispositivos reais na nuvem. É necessário configurar o arquivo `.env` com as seguintes chaves:

- BROWSERSTACK_USERNAME  
- BROWSERSTACK_ACCESS_KEY  
- BROWSERSTACK_APP_ANDROID  
- BROWSERSTACK_APP_IOS  

---

## Relatórios

Utilizamos o Allure Reports para visibilidade dos resultados. O relatório inclui:

- Resumo de aprovação/reprovação  
- Logs detalhados de cada passo  
- Screenshots automáticos em caso de falha  

Para gerar e visualizar:
npx allure serve allure-results

---

## Boas Práticas Aplicadas

- Uso de Page Object Model (POM)  
- Métodos genéricos na BasePage para evitar duplicação (DRY)  
- Tratamento cross-platform (Android e iOS) no mesmo framework  
- Screenshots automáticos em falhas para facilitar o debug  
- Configuração preparada para CI/CD  

---

## Autor

José Raimundo
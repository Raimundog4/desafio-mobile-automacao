import { expect } from '@wdio/globals';
import loginPage from '../pageobjects/login.page.js';

describe('Funcionalidade: Tela de Login', () => {
    it('CT-001 - Realizar login com sucesso ao informar dados válidos', async () => {
        // Dado que o usuário tenha acessado a tela de login
        await loginPage.abrirTelaLogin();

        // Quando preenche o campo Email como "teste@exemplo.com"
        await loginPage.preencherEmail('teste@exemplo.com');

        // E preenche o campo Senha como "12345678"
        await loginPage.preencherSenha('12345678');

        // E aciona o botão Login
        await loginPage.acionarBotaoLogin();

        // Então o sistema apresenta a mensagem de login realizado com sucesso
        await loginPage.validarMensagemLoginSucesso();
    });

    it('CT-002 - Tentativa de login informando dados inválidos', async () => {
        // Dado que o usuário tenha acessado a tela de login
        await loginPage.abrirTelaLogin();

        // Quando preenche o campo Email como "teste.com"
        await loginPage.preencherEmail('teste.com');

        // E preenche o campo Senha como "123"
        await loginPage.preencherSenha('123');

        // E aciona o botão Login
        await loginPage.acionarBotaoLogin();

        // Então o sistema apresenta a mensagem de erro de email inválido
        await loginPage.validarMensagemErroEmailVisivel();

        // E o sistema apresenta a mensagem de erro de senha inválida
        await loginPage.validarMensagemErroSenhaVisivel();
    });
});
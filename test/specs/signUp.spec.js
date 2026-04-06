import { expect } from '@wdio/globals';
import signUpPage from '../pageobjects/signUp.page.js';
import { cadastroData } from '../data/cadastro.data.js';

describe('Funcionalidade: Cadastro de usuário', () => {

    async function acessarTelaDeCadastro() {
        await signUpPage.abrirTelaLogin();
        await signUpPage.acessarAbaCadastro();
    };

    it('CT-001 - Realizar cadastro com sucesso ao informar dados válidos', async () => {
        const email = cadastroData.sucesso.email();
        const senha = cadastroData.sucesso.senha;

        // Dado que o usuário acessou a tela de cadastro
        await acessarTelaDeCadastro();

        // Quando informar um e-mail válido
        await signUpPage.preencherEmail(email);

        // E informar uma senha válida
        await signUpPage.preencherSenha(senha);

        // E informar a confirmação de senha correspondente
        await signUpPage.preencherConfirmacaoSenha(senha);

        // E acionar a opção Sign Up
        await signUpPage.acionarBotaoSignUp();

        // Então o sistema deve apresentar a mensagem de confirmação de cadastro com sucesso
        await signUpPage.aguardarElemento(signUpPage.mensagemConfirmacaoCadastro);
        await expect(signUpPage.mensagemConfirmacaoCadastro).toBeDisplayed();
    });

    it('CT-002 - Visualizando mensagens de erro ao tentar realizar cadastro com dados inválidos', async () => {
        const dados = cadastroData.invalido;

        // Dado que o usuário acessou a tela de cadastro
        await acessarTelaDeCadastro();

        // Quando informar um e-mail inválido
        await signUpPage.preencherEmail(dados.email);

        // E informar uma senha inválida
        await signUpPage.preencherSenha(dados.senha);

        // E informar uma confirmação de senha divergente
        await signUpPage.preencherConfirmacaoSenha(dados.confirmacao);

        // E acionar a opção Sign Up
        await signUpPage.acionarBotaoSignUp();

        // Então o sistema deve apresentar as mensagens de erro correspondentes
        for (const mensagem of dados.mensagens) {
            await expect(
                await signUpPage.validarMensagemErroVisivel(mensagem)
            ).toBe(true);
        }
    });
});
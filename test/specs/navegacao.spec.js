import { expect } from '@wdio/globals';
import navegacaoPage from '../pageobjects/navegacao.page.js';

describe('Funcionalidade: Navegação entre telas', () => {

    it('CT-001 - Acessar a tela de Login com sucesso', async () => {
        // Dado que o usuário esteja na tela inicial do aplicativo
        await navegacaoPage.validarTelaHomeVisivel();
        // Quando aciona o menu Login
        await navegacaoPage.acessarTelaLogin();

        // Então o sistema apresenta a tela de Login
        await navegacaoPage.validarTelaLoginVisivel();
    });

    it('CT-002 - Acessar a tela de Forms com sucesso', async () => {
        // Dado que o usuário esteja na tela inicial do aplicativo
        await navegacaoPage.validarTelaHomeVisivel();
        // Quando aciona o menu Forms
        await navegacaoPage.acessarTelaForms();

        // Então o sistema apresenta a tela de Forms
        await navegacaoPage.validarTelaFormsVisivel();
    });

    it('CT-003 - Acessar a tela de Swipe com sucesso', async () => {
        // Dado que o usuário esteja na tela inicial do aplicativo
        await navegacaoPage.validarTelaHomeVisivel();
        // Quando aciona o menu Swipe
        await navegacaoPage.acessarTelaSwipe();

        // Então o sistema apresenta a tela de Swipe
        await navegacaoPage.validarTelaSwipeVisivel();
    });

    (driver.isIOS ? it.skip : it)('CT-004 - Acessar a tela de Drag com sucesso', async () => {
        // Dado que o usuário esteja na tela inicial do aplicativo
        await navegacaoPage.validarTelaHomeVisivel();
        // Quando aciona o menu Drag
        await navegacaoPage.acessarTelaDrag();

        // Então o sistema apresenta a tela de Drag
        await navegacaoPage.validarTelaDragVisivel();
    });

});
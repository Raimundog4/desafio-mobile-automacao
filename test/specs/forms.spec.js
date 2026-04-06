import { expect } from '@wdio/globals';
import formsPage from '../pageobjects/forms.page.js';

describe('Funcionalidade: Tela de Forms', () => {

    it('CT-001 - Preencher campo Input com sucesso e visualizar o valor informado', async () => {
        // Dado que o usuário tenha acessado a tela de Forms
        await formsPage.abrirTelaForms();

        // Quando preenche o campo Input como "Teste automação mobile"
        await formsPage.preencherCampoInput('Teste automação mobile');

        // Então o sistema apresenta o valor informado na mensagem "You have typed:"
        await expect(await formsPage.validarTextoPreenchido()).toBe(true);
    });

    it('CT-002 - Alterar o estado do Switch com sucesso', async () => {
        // Dado que o usuário tenha acessado a tela de Forms
        await formsPage.abrirTelaForms();

        // Quando aciona o Switch para ativar
        await formsPage.ativarSwitch();

        // Então o sistema apresenta o Switch ativado
        await formsPage.validarSwitchAtivado();

        // Quando aciona o Switch para desativar
        await formsPage.desativarSwitch();

        // Então o sistema apresenta o Switch desativado
        await formsPage.validarSwitchDesativado();
    });

    it('CT-003 - Selecionar opção no Dropdown com sucesso', async () => {
        // Dado que o usuário tenha acessado a tela de Forms
        await formsPage.abrirTelaForms();

        // Quando aciona o Dropdown
        await formsPage.acionarSelectDropdown();

        // E seleciona a opção "Appium is awesome"
        await formsPage.selecionarOpcaoDropdown('Appium is awesome');

        // Então o sistema apresenta a opção selecionada no campo Dropdown
        await formsPage.validarOpcaoDropdownSelecionada();
    });

    it('CT-004 - Acionar o botão Active com sucesso', async () => {
    // Dado que o usuário tenha acessado a tela de Forms
        await formsPage.abrirTelaForms();

        // Quando aciona o botão Active
        await formsPage.acionarBotaoActive();

        // Então o sistema apresenta o modal com a mensagem esperada
        await formsPage.validarModalVisivel();
    });
});
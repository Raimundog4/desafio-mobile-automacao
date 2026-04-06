import { $, expect } from '@wdio/globals';
import BasePage from './base.page.js';

class FormsPage extends BasePage {

    get menuForms() {
        return $('~Forms');
    }

    get inputField() {
        return $('~text-input');
    }

    get inputTyped() {
        return $('~input-text-result');
    }

    get botaoSwitch() {
        return $('~switch');
    }

    get selectDropdown() {
        return $('//*[@content-desc="Dropdown"]');
    }

    opcaoDropdown(opcao) {
        return $(`//*[@text="${opcao}"]`);
    }

    get campoDropdownSelecionado() {
    return $('//*[@content-desc="Dropdown"]/android.widget.EditText');
}

    get botaoActive() {
        return $('~button-Active');
    }

    get activeMessagemTexto() { 
        return $('//*[@text="This button is active"]');
    }

    async abrirTelaForms() {
        await this.aguardarEAcionar(this.menuForms);
    }

    async preencherCampoInput(texto) {
        this.textoDigitado = texto;
        await this.inputField.setValue(String(texto));
    }

    async validarTextoPreenchido() {
        await this.aguardarElemento(this.inputTyped);
        return await this.inputTyped.getText() === this.textoDigitado;
    }

    async ativarSwitch() {
        const estaAtivado = await this.botaoSwitch.getAttribute('checked');

        if (estaAtivado === 'false') {
            await this.aguardarEAcionar(this.botaoSwitch);
        }      
    }

    async validarSwitchAtivado() {
         await expect(this.botaoSwitch).toHaveAttr('checked', 'true');
    }

    async desativarSwitch() {
        const estaAtivado = await this.botaoSwitch.getAttribute('checked');

        if (estaAtivado === 'true') {
            await this.aguardarEAcionar(this.botaoSwitch);
        }        
    }

    async validarSwitchDesativado() {
         await expect(this.botaoSwitch).toHaveAttr('checked', 'false');
    }

    async acionarSelectDropdown() {
        await this.aguardarEAcionar(this.selectDropdown);        
    }

    async selecionarOpcaoDropdown(opcao) {   
        this.opcaoSelecionada = opcao; 
        await this.aguardarEAcionar(this.opcaoDropdown(opcao));
    }

    async validarOpcaoDropdownSelecionada() {
        await this.aguardarElemento(this.campoDropdownSelecionado);
        await expect(this.campoDropdownSelecionado).toHaveText(this.opcaoSelecionada);
    }

    async acionarBotaoActive() {
        await this.aguardarEAcionar(this.botaoActive);
    }

    async validarModalVisivel() {
        await this.aguardarElemento(this.activeMessagemTexto);
        return await this.activeMessagemTexto.isDisplayed();
    }
}

export default new FormsPage();
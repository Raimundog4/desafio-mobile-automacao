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
        return driver.isAndroid
            ? $('//*[@content-desc="Dropdown"]')
            : $('~select-Dropdown');
    }

    opcaoDropdown(opcao) {
        return driver.isAndroid
            ? $(`//*[@text="${opcao}"]`)
            : $(`//*[@name="${opcao}" or @label="${opcao}" or @value="${opcao}"]`);
    }

    get campoDropdownSelecionado() {
        return driver.isAndroid
            ? $('//*[@content-desc="Dropdown"]/android.widget.EditText')
            : $('~select-Dropdown');
    }

    get botaoActive() {
        return driver.isAndroid
            ? $('~button-Active')
            : $('//*[@name="button-Active" or @label="Active" or @name="Active"]');
    }

    get activeMensagemTexto() {
        return driver.isAndroid
            ? $('//*[@text="This button is active"]')
            : $('//*[@name="This button is active" or @label="This button is active" or @value="This button is active"]');
    }

    get pickerWheel() {
        return $('//XCUIElementTypePickerWheel');
    }

    async abrirTelaForms() {
        await this.aguardarEAcionar(this.menuForms);
    }

    async preencherCampoInput(texto) {
        this.textoDigitado = String(texto);
        await this.inputField.setValue(this.textoDigitado);
    }

    async validarTextoPreenchido() {
        await this.aguardarElemento(this.inputTyped);
        return await this.inputTyped.getText() === this.textoDigitado;
    }

    async obterEstadoSwitch() {
        if (driver.isAndroid) {
            return await this.botaoSwitch.getAttribute('checked');
        }

        return await this.botaoSwitch.getAttribute('value');
    }

    async ativarSwitch() {
        const estado = await this.obterEstadoSwitch();

        if (estado === 'false' || estado === '0') {
            await this.aguardarEAcionar(this.botaoSwitch);
        }
    }

    async validarSwitchAtivado() {
        if (driver.isAndroid) {
            await expect(this.botaoSwitch).toHaveAttr('checked', 'true');
            return;
        }

        await expect(this.botaoSwitch).toHaveAttr('value', '1');
    }

    async desativarSwitch() {
        const estado = await this.obterEstadoSwitch();

        if (estado === 'true' || estado === '1') {
            await this.aguardarEAcionar(this.botaoSwitch);
        }
    }

    async validarSwitchDesativado() {
        if (driver.isAndroid) {
            await expect(this.botaoSwitch).toHaveAttr('checked', 'false');
            return;
        }

        await expect(this.botaoSwitch).toHaveAttr('value', '0');
    }

    async acionarSelectDropdown() {
        await this.aguardarEAcionar(this.selectDropdown);
    }

    async selecionarOpcaoDropdown(opcao) {
    this.opcaoSelecionada = opcao;

    if (driver.isAndroid) {
        await this.aguardarEAcionar(this.opcaoDropdown(opcao));
        return;
    }

        await this.selecionarOpcaoDropdownIOS(opcao);
    }    

    async selecionarOpcaoDropdownIOS(opcao) {
        await this.aguardarElemento(this.pickerWheel);
        await this.pickerWheel.setValue(opcao);
    }

    async validarOpcaoDropdownSelecionada() {
        if (driver.isAndroid) {
            await this.aguardarElemento(this.campoDropdownSelecionado);
            await expect(this.campoDropdownSelecionado).toHaveText(this.opcaoSelecionada);
            return;
        }

        await expect(this.selectDropdown).toHaveText(expect.stringContaining(this.opcaoSelecionada));
    }

    async acionarBotaoActive() {
        await this.aguardarEAcionar(this.botaoActive);
    }

    async validarModalVisivel() {
        await this.aguardarElemento(this.activeMensagemTexto);
        await expect(this.activeMensagemTexto).toBeDisplayed();
    }
}

export default new FormsPage();
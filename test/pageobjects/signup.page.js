import { $, expect } from '@wdio/globals';
import BasePage from './base.page.js';

class SignupPage extends BasePage {
    get menuLogin() {
        return $('~Login');
    }

    get abaCadastro() {
        return $('~button-sign-up-container');
    }

    get inputEmail() {
        return $('~input-email');
    }

    get inputPassword() {
        return $('~input-password');
    }

    get inputConfirmPassword() {
        return $('~input-repeat-password');
    }

    get botaoSignUp() {
        return $('~button-SIGN UP');
    }

    get mensagemConfirmacaoCadastro() {
        return driver.isAndroid
            ? $('id=android:id/message')
            : $('//*[@name="You successfully signed up!" or @label="You successfully signed up!" or @value="You successfully signed up!"]');
    }

    get mensagemFalhaCadastroIOS() {
        return $('//*[@name="Some fields are not valid!" or @label="Some fields are not valid!" or @value="Some fields are not valid!"]');
    }

    obterMensagemErroTelaSignUp(mensagem) {
        return driver.isAndroid
            ? $(`//android.widget.TextView[@text="${mensagem}"]`)
            : $(`//*[@name="${mensagem}" or @label="${mensagem}" or @value="${mensagem}"]`);
    }

    get botaoTryAgainIOS() {
        return $('~Try again');
    }

    get alertIOS() {
        return $('//XCUIElementTypeAlert');
    }

    async abrirTelaLogin() {
        await this.aguardarEAcionar(this.menuLogin);
    }

    async acessarAbaCadastro() {
        await this.aguardarEAcionar(this.abaCadastro);
    }

    async preencherEmail(email) {
        await this.aguardarEPreencher(this.inputEmail, email);
    }

    async preencherSenha(senha) {
        await this.aguardarEPreencher(this.inputPassword, senha);
    }

    async preencherConfirmacaoSenha(senha) {
        await this.aguardarEPreencher(this.inputConfirmPassword, senha);
    }

    async acionarBotaoSignUp() {
        await this.aguardarEAcionar(this.botaoSignUp);

        if (driver.isIOS) {
            const modalApareceu =  (await this.mensagemConfirmacaoCadastro.isDisplayed().catch(() => false)) ||
                                    (await this.mensagemFalhaCadastroIOS.isDisplayed().catch(() => false));


            if (!modalApareceu) {
                await browser.pause(1000);
                await this.aguardarEAcionar(this.botaoSignUp);
            }
        }
    }

    async validarCadastroComSucesso() {
        await this.aguardarElemento(this.mensagemConfirmacaoCadastro);
        await expect(this.mensagemConfirmacaoCadastro).toBeDisplayed();
    }

    async validarFalhaCadastroSeExistir() {
        if (driver.isIOS) {
            await this.aguardarElemento(this.mensagemFalhaCadastroIOS);
            await expect(this.mensagemFalhaCadastroIOS).toBeDisplayed();
        }
    }

    async validarMensagemErroVisivel(texto) {
        const elemento = this.obterMensagemErroTelaSignUp(texto);
        await this.aguardarElemento(elemento);
        await expect(elemento).toBeDisplayed();
    }

    async tratarFalhaCadastroIOS() {
    if (!driver.isIOS) return;

    const apareceu = await this.alertIOS.waitForDisplayed({
        timeout: 5000,
        timeoutMsg: 'Alert de erro não apareceu'
    }).then(() => true).catch(() => false);

    if (apareceu) {
       
        await expect(this.botaoTryAgainIOS).toBeDisplayed();

        await this.aguardarEAcionar(this.botaoTryAgainIOS);
    }
}

    async validarErrosCadastro(mensagens) {
        await this.tratarFalhaCadastroIOS();

        for (const mensagem of mensagens) {
            await this.validarMensagemErroVisivel(mensagem);
        }
    }
}

export default new SignupPage();
import { $, expect } from '@wdio/globals';
import BasePage from './base.page.js';

class LoginPage extends BasePage {

    get menuLogin() {
        return $('~Login');
    }

    get inputEmail() {
        return $('~input-email');
    }

    get inputPassword() {
        return $('~input-password');
    }

    get botaoLogin() {
        return $('~button-LOGIN');
    }

    get mensagemConfirmacaoLogin() {
        return driver.isAndroid
            ? $('id=android:id/message')
            : $('//XCUIElementTypeAlert');
    }

    get tituloModalSucessoIOS() {
        return $('//*[@name="Success" or @label="Success" or @value="Success"]');
    }

    get textoModalSucessoIOS() {
        return $('//*[@name="You are logged in!" or @label="You are logged in!" or @value="You are logged in!"]');
    }

    get btnOKLogin() {
        return driver.isAndroid
            ? $('id=android:id/button1')
            : $('~OK');
    }

    get mensagemErroEmail() {
        return driver.isAndroid
            ? $('//android.widget.TextView[@text="Please enter a valid email address"]')
            : $('//*[@name="Please enter a valid email address" or @label="Please enter a valid email address" or @value="Please enter a valid email address"]');
    }

    get mensagemErroSenha() {
        return driver.isAndroid
            ? $('//android.widget.TextView[@text="Please enter at least 8 characters"]')
            : $('//*[@name="Please enter at least 8 characters" or @label="Please enter at least 8 characters" or @value="Please enter at least 8 characters"]');
    }

    async abrirTelaLogin() {
        await this.aguardarEAcionar(this.menuLogin);
    }

    async preencherEmail(email) {
        await this.aguardarEPreencher(this.inputEmail, email);
    }

    async preencherSenha(senha) {
        await this.aguardarEPreencher(this.inputPassword, senha);
    }

    async acionarBotaoLogin() {
        await this.aguardarEAcionar(this.botaoLogin);

        if (driver.isIOS) {
            const modalApareceu =  await this.mensagemConfirmacaoLogin.isDisplayed().catch(() => false);


            if (!modalApareceu) {
                await browser.pause(1000);
                await this.aguardarEAcionar(this.botaoLogin);
            }
        }
    }

    async validarMensagemLoginSucesso() {
        if (driver.isAndroid) {
            await this.aguardarElemento(this.mensagemConfirmacaoLogin);
            await expect(this.mensagemConfirmacaoLogin).toBeDisplayed();
            return;
        }

        await this.aguardarElemento(this.mensagemConfirmacaoLogin);
        await expect(this.mensagemConfirmacaoLogin).toBeDisplayed();
        await expect(this.tituloModalSucessoIOS).toBeDisplayed();
        await expect(this.textoModalSucessoIOS).toBeDisplayed();
        await expect(this.btnOKLogin).toBeDisplayed();
    }

    async validarMensagemErroEmailVisivel() {
        await this.aguardarElemento(this.mensagemErroEmail);
        await expect(this.mensagemErroEmail).toBeDisplayed();
    }

    async validarMensagemErroSenhaVisivel() {
        await this.aguardarElemento(this.mensagemErroSenha);
        await expect(this.mensagemErroSenha).toBeDisplayed();
    }

    async validarMensagensErroLogin() {
        await this.validarMensagemErroEmailVisivel();
        await this.validarMensagemErroSenhaVisivel();
    }
}

export default new LoginPage();
import BasePage from './base.page.js';

class LoginPage extends BasePage {

    get menuLogin() {
        return $('~Login');
    }

    get inputEmail () {
        return $('~input-email');
    }

    get inputPassword () {
        return $('~input-password');
    }

    get botaoLogin () {
        return $('~button-LOGIN');
    }

    get mensagemConfirmacaoLogin() {
        return $('id=android:id/message');
    }
    
    get btnOKLogin() {
        return $('id=android:id/button1');
    }

    get mensagemErroEmail() { 
        return $('//android.widget.TextView[@text="Please enter a valid email address"]'); 
    }
    
    get mensagemErroSenha() {
        return $('//android.widget.TextView[@text="Please enter at least 8 characters"]');
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
    }

    async validarMensagemLoginSucesso() {
        await this.aguardarElemento(this.mensagemConfirmacaoLogin);
        return await this.mensagemConfirmacaoLogin.isDisplayed();
    }

    async validarMensagemErroEmailVisivel() {
        globalThis.console.log('🔥 Método de erro do email foi chamaaaaaaaaaadooooooooo');
        await this.aguardarElemento(this.mensagemErroEmail);
        return await this.mensagemErroEmail.isDisplayed();
    }
    
    async validarMensagemErroSenhaVisivel() {
        await this.aguardarElemento(this.mensagemErroSenha);
        return await this.mensagemErroSenha.isDisplayed();
    }
}

export default new LoginPage();
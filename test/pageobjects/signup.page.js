import BasePage from "./base.page.js";

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
        return $('id=android:id/message');
    }

    obterMensagemErroTelaSignUp(mensagem) {
        return $(`//android.widget.TextView[@text="${mensagem}"]`);
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
    }

    async validarMensagemErroVisivel(texto) {
        const elemento = this.obterMensagemErroTelaSignUp(texto);
        await this.aguardarElemento(elemento);
        return await elemento.isDisplayed();
    }
}

export default new SignupPage();
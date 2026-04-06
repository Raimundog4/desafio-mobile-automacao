import BasePage from './base.page.js';

class NavegacaoPage extends BasePage {

    get telaHome() {
        return $('//android.widget.ScrollView[@content-desc="Home-screen"]');
    }

    get menuLogin() {
        return $('~Login');
    }

    get menuForms() {
        return $('~Forms');
    }

    get menuSwipe() {
        return $('~Swipe');
    }

    get menuDrag() {
        return $('~Drag');
    }

    get tituloTelaLogin() {
        return $('//android.widget.TextView[@text="Login / Sign up Form"]');
    }

    get tituloTelaForms() {
        return $('//android.widget.TextView[@text="Form components"]');
    }

    get tituloTelaSwipe() {
        return $('//android.widget.TextView[@text="Swipe horizontal"]');
    }

    get tituloTelaDrag() {
        return $('//android.widget.TextView[@text="Drag and Drop"]');
    }
    
    async validarTelaHomeVisivel() {
        await this.aguardarElemento(this.telaHome);
        return await this.telaHome.isDisplayed();
    }

    async acessarTelaLogin() {
        await this.aguardarEAcionar(this.menuLogin);
    }

    async acessarTelaForms() {
        await this.aguardarEAcionar(this.menuForms);
    }

    async acessarTelaSwipe() {
        await this.aguardarEAcionar(this.menuSwipe);
    }

    async acessarTelaDrag() {
        await this.aguardarEAcionar(this.menuDrag);
    }

    async validarTelaLoginVisivel() {
        await this.aguardarElemento(this.tituloTelaLogin);
        return await this.tituloTelaLogin.isDisplayed();
    }

    async validarTelaFormsVisivel() {
        await this.aguardarElemento(this.tituloTelaForms);
        return await this.tituloTelaForms.isDisplayed();
    }

    async validarTelaSwipeVisivel() {
        await this.aguardarElemento(this.tituloTelaSwipe);
        return await this.tituloTelaSwipe.isDisplayed();
    }

    async validarTelaDragVisivel() {
        await this.aguardarElemento(this.tituloTelaDrag);
        return await this.tituloTelaDrag.isDisplayed();
    }
}

export default new NavegacaoPage();
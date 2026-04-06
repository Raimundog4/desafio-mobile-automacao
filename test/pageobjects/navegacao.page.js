import { $, expect } from '@wdio/globals';
import BasePage from './base.page.js';

class NavegacaoPage extends BasePage {

    get telaHome() {
        return driver.isAndroid
            ? $('//android.widget.ScrollView[@content-desc="Home-screen"]')
            : $('~Home-screen');
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
        return driver.isAndroid
            ? $('//android.widget.TextView[@text="Login / Sign up Form"]')
            : $('//*[@name="Login / Sign up Form" or @label="Login / Sign up Form" or @value="Login / Sign up Form"]');
    }

    get tituloTelaForms() {
        return driver.isAndroid
            ? $('//android.widget.TextView[@text="Form components"]')
            : $('//*[@name="Form components" or @label="Form components" or @value="Form components"]');
    }

    get tituloTelaSwipe() {
        return driver.isAndroid
            ? $('//android.widget.TextView[@text="Swipe horizontal"]')
            : $('//*[@name="Swipe horizontal" or @label="Swipe horizontal" or @value="Swipe horizontal"]');
    }

    get tituloTelaDrag() {
        return $('//android.widget.TextView[@text="Drag and Drop"]');
    }

    async validarTelaHomeVisivel() {
        await this.aguardarElemento(this.telaHome);
        await expect(this.telaHome).toBeDisplayed();
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
        if (driver.isIOS) {
            throw new Error('A aba Drag não está disponível no iOS.');
        }

        await this.aguardarEAcionar(this.menuDrag);
    }

    async validarTelaLoginVisivel() {
        await this.aguardarElemento(this.tituloTelaLogin);
        await expect(this.tituloTelaLogin).toBeDisplayed();
    }

    async validarTelaFormsVisivel() {
        await this.aguardarElemento(this.tituloTelaForms);
        await expect(this.tituloTelaForms).toBeDisplayed();
    }

    async validarTelaSwipeVisivel() {
        await this.aguardarElemento(this.tituloTelaSwipe);
        await expect(this.tituloTelaSwipe).toBeDisplayed();
    }

    async validarTelaDragVisivel() {
        if (driver.isIOS) {
            throw new Error('A tela Drag não existe no iOS.');
        }

        await this.aguardarElemento(this.tituloTelaDrag);
        await expect(this.tituloTelaDrag).toBeDisplayed();
    }
}

export default new NavegacaoPage();
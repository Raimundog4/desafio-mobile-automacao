const TIMEOUT_PADRAO = 10000;

export default class BasePage {

  async aguardarEAcionar(elemento) {
    await elemento.waitForDisplayed({ timeout: TIMEOUT_PADRAO });
    await elemento.click();
  }

  async aguardarEPreencher(elemento, valor) {
    await elemento.waitForDisplayed({ timeout: TIMEOUT_PADRAO });
    await elemento.setValue(valor);
  }

  async aguardarEObterTexto(elemento) {
    await elemento.waitForDisplayed({ timeout: TIMEOUT_PADRAO });
    return await elemento.getText();
  }

  async aguardarElemento(elemento) {
    await elemento.waitForDisplayed({ timeout: TIMEOUT_PADRAO });
  }
}
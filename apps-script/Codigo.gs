// ============================================================
// ROBÔ DE VAGAS - código para o Google Apps Script
// Cole este código em: Extensões > Apps Script (dentro da planilha)
// ============================================================

// Troque pelo ID da SUA planilha (está na URL dela, entre /d/ e /edit)
const PLANILHA_ID = "COLE_AQUI_O_ID_DA_SUA_PLANILHA";

// Termos de busca que combinam com o seu perfil
const TERMOS = ["dev", "javascript", "frontend", "front-end", "ai", "python", "automation"];

// Busca as vagas nos feeds abertos e grava na planilha
function buscarVagas() {
  const vagas = [];
  const vistos = {};
  for (const termo of TERMOS) {
    try {
      const resp = UrlFetchApp.fetch("https://remoteok.com/api?tags=" + termo, {muteHttpExceptions:true});
      const arr = JSON.parse(resp.getContentText());
      for (let i = 1; i < arr.length; i++) {
        const v = arr[i];
        if (!v.position) continue;
        const chave = v.position + v.company;
        if (vistos[chave]) continue;
        vistos[chave] = true;
        const desc = (v.description || "").replace(/<[^>]+>/g, " ").slice(0, 500);
        vagas.push([v.position, v.company || "", v.location || "Remoto", v.url || "", desc]);
      }
    } catch (e) {}
  }
  const sh = SpreadsheetApp.openById(PLANILHA_ID).getSheets()[0];
  const ultima = sh.getLastRow();
  if (ultima > 1) sh.getRange(2, 1, ultima - 1, 5).clearContent();
  if (vagas.length) sh.getRange(2, 1, vagas.length, 5).setValues(vagas);
  Logger.log("Gravei " + vagas.length + " vagas");
}

// Publica as vagas para a página ler (com suporte a JSONP p/ contornar CORS)
function doGet(e) {
  const sh = SpreadsheetApp.openById(PLANILHA_ID).getSheets()[0];
  const ultima = sh.getLastRow();
  const vagas = [];
  if (ultima > 1) {
    const dados = sh.getRange(2, 1, ultima - 1, 5).getValues();
    for (const l of dados) {
      if (l[0]) vagas.push({titulo:l[0], empresa:l[1], local:l[2], link:l[3], descricao:l[4]});
    }
  }
  const json = JSON.stringify(vagas);
  if (e && e.parameter && e.parameter.callback) {
    return ContentService.createTextOutput(e.parameter.callback + "(" + json + ")")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

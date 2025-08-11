// Configura tus credenciales de Twilio aquí
const ACCOUNT_SID = '';
const AUTH_TOKEN = '';
const FROM_WHATSAPP_NUMBER = 'whatsapp:+14155238886'; // Número de Twilio WhatsApp (sandbox o oficial)

function sendMessageTwilio(toPhone, messageText) {
  //Logger.log('Mensaje a enviar: ' + messageText);
  const url = 'https://api.twilio.com/2010-04-01/Accounts/' + ACCOUNT_SID + '/Messages.json';

  const payload = {
    To: 'whatsapp:+' + toPhone,
    From: FROM_WHATSAPP_NUMBER,
    Body: messageText
  };

  const options = {
    method: 'post',
    payload: payload,
    muteHttpExceptions: true,
    headers: {
      Authorization: 'Basic ' + Utilities.base64Encode(ACCOUNT_SID + ':' + AUTH_TOKEN)
    }
  };

  const response = UrlFetchApp.fetch(url, options);
  Logger.log(response.getContentText());
  return response;
}

function onEdit(e) {
  //const sheet = e.source.getActiveSheet();
  const sheet = e.source.getSheetByName('Hoja 1');
  const editedRange = e.range;

  const columnCheck = 3; // Columna C: casilla de verificación
  if (editedRange.getColumn() === columnCheck && editedRange.getValue() === "SI") { // TRUE para checkbox marcado
    const row = editedRange.getRow();
    const message = sheet.getRange(row, 1).getValue(); // Columna A
    const phone = sheet.getRange(row, 2).getValue();   // Columna B

    if (phone && message) {
      sendMessageTwilio(phone, message);
    }
  }
}

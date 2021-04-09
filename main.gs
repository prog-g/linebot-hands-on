const ACCESS_TOKEN = '';//チャンネルアクセストークンを入れる

function doPost(e) {
  // WebHookで受信した応答用Token
  const replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
  // ユーザーのメッセージを取得うらない
  const userMessage = JSON.parse(e.postData.contents).events[0].message.text;
  // 応答メッセージ用のAPI URL
  const url = 'https://api.line.me/v2/bot/message/reply';

  const options = {
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [{
        'type': 'text',
        'text': 　"占いました！結果は"+lot()+"です！",
      }],
    }),
  };
  // 応答メッセージをリクエスト
  UrlFetchApp.fetch(url, options);
  return ContentService.createTextOutput(JSON.stringify({ 'content': 'post ok' })).setMimeType(ContentService.MimeType.JSON);
}

function lot() {
  //0~99までのランダムな数字
  const num = Math.floor(Math.random() * 100);
  const probability = {
    "大吉": 23,
    "中吉": 10,
    "小吉": 13,
    "吉": 24,
    "末吉": 19,
    "凶": 11
  };
  let sum = 0;
  for (let key in probability) {
    sum += probability[key];
    if (num < sum) {
      return key;
    }
  }
  return "大凶";
}
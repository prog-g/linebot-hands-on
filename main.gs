//チャンネルアクセストークン(公開しちゃダメ)を入れる
const ACCESS_TOKEN = '';

//Postリクエストを受け取ると発火する関数
function doPost(e) {
  //Webhookで送られてきた応答用のトークン
  const replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
  //ユーザーが送ったメッセージ
  const userMessage = JSON.parse(e.postData.contents).events[0].message.text;
  //応答用のAPIのURL
  const url = 'https://api.line.me/v2/bot/message/reply';
  //応答するメッセージ
  //ここに応答メッセージをつくるプログラムを書いてみましょう！
  let replyText = '';
  if (userMessage === '占って') {
    replyText = '占いました！結果は' + lot() + 'です。';
  } else {
    replyText = '「占って」と言ってみてください！';
  }
  //応答メッセージリクエストに必要な情報
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
        'text': replyText,
      }],
    }),
  };
  console.log("送信：" + userMessage);
  console.log("応答：" + replyText);
  try {
    // 応答メッセージをリクエスト
    UrlFetchApp.fetch(url, options);
  } catch (e) {
    // console.log(e.message);
  }
  return ContentService.createTextOutput(JSON.stringify({ 'content': 'post ok' })).setMimeType(ContentService.MimeType.JSON);
}

//占って結果を返す関数
function lot() {
  //0~99までのランダムな数字
  const num = Math.floor(Math.random() * 100);
  //各運勢とその確率(%)
  const probability = {
    '大吉': 23,
    '中吉': 10,
    '小吉': 13,
    '吉': 24,
    '末吉': 19,
    '凶': 11
  };
  let sum = 0;
  for (let key in probability) {
    sum += probability[key];
    if (num < sum) {
      return key;
    }
  }
  return '大凶';
}

//一連のプログラムがきちんと動くか確認する関数
function test() {
  function post(text) {
    const contents = {
      destination: "xxxxxxxxxx",
      events: [
        {
          replyToken: "0f3779fba3b349968c5d07db31eab56f",
          type: "message",
          mode: "active",
          timestamp: 1462629479859,
          source: {
            type: "user",
            userId: "U4af4980629..."
          },
          message: {
            id: "325708",
            type: "text",
            text: text
          }
        }
      ]

    }
    const e = {
      postData: {
        contents: JSON.stringify(contents)
      }
    }
    const result = doPost(e);
  }

  post("占って");
  post("うらなって");
  post("こんにちは");
}

const express = require("express");
const line = require("@line/bot-sdk");
const app = express();
const PORT = process.env.PORT || 3000;
const config = {
    channelSecret: "1a27013d82df6c3d297fc99779b2fb6e",
    channelAccessToken: "91X3DBdfGPeKI13+WQEAK5LiwCKazzggiMjUlQshdam7isE9hPFXBrEooa2aQxWvsuEywbjaIeYo/F4cTBVygbr6C7Gv0FLqVumLdu+fmGqEaF1Q2NrT29No4IWPsDdCIfycIYvdSvZJgKTH+fMlEQdB04t89/1O/w1cDnyilFU="
};
const bot = new line.Client(config);

// 占い結果を返す関数
function fortuneTelling() {
    const num = Math.floor(Math.random() * 10);

    if (num === 0) {
        return "大吉ですo(^▽^)o"
    } else if (num === 1) {
        return "中吉です(￣∀￣)"
    } else if (num === 2) {
        return "小吉です"
    } else if (num === 3) {
        return "吉です"
    } else if (num === 4) {
        return "末吉です"
    } else if (num === 5) {
        return "凶です(T_T)"
    } else {
        return "大凶です( ；∀；)"
    }
}

app.listen(PORT);
console.log("サーバを動かしています")

app.get("/", (req, res) => res.send("Hello LINE BOT!(GET)"));

app.post("/webhook", line.middleware(config), (req, res) => {
    // 成功ステータスコード
    res.sendStatus(200);

    try {
        // イベントオブジェクトを順次処理。
        req.body.events.forEach((event) => {
            // この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
            if (event.type == "message" && event.message.type == "text"){
                // ユーザーからのテキストメッセージが「占って」だった場合のみ反応。
                if (event.message.text == "占って"){
                    bot.replyMessage(event.replyToken, {
                        type: "text",
                        text: fortuneTelling()
                    });
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
});

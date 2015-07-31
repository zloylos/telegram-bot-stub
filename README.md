# telegram-bot-stub
Project stub for smart telegram bots

## Requirements
* Node >= 0.10
* MongoDB

## Install
1. Clone repository:
```
git clone https://github.com/zloylos/telegram-bot-stub.git myTelegramBot
```
2. Fill config file: telegram bot token and MongoDB URL.
3. Write your bot.

## Structure
### **Message.**
All types of messages (text / location / photo / custom) have own handler, which located in `lib/message/handlers`).
The message types are assigned by analyzers `lib/analyzer/analyzers/*`.

For write new message handler you should create new analyzer and new handler. If you use avaible analyzer, change exists handler. 

#### Example
New analyzer, for example, `lib/analyzer/analyzers/hello.js`
```js
module.exports = {
  is: function (message) {
    return message.text.toLowerCase() == 'hello!';
  },
  
  getData: function () {
    return {
      type: 'HELLO',
      answer: 'Aloha!'
    };
  }
};
```
New message handler: `lib/message/handlers/hello.js`
```js
// Promise library.
var vow = require('vow');
var Message = require('../messages/Message');
module.exports = {
  get: function (info) {
    return vow.resolve(new Message({
      message: info.answer
    }));
  }
};
```

Now when somebody send text message "hello!", bot will answer "Aloha!".

### **Command.**
Command start with "/" and can have parameter. Standart command looks like this: **"/search Cafe"**.
For add new command handler you need create JS module in `lib/message/commands/` width name = command. For "/search" command file must be named "search.js". This module must realize interface ICommandHandler `lib/interfaces/ICommandHandler`.

#### Example
We would crete new command: /weather <City>

Create file: `lib/message/commands/weather.js`
```js
var request = require('superagent'),
    vow = require('vow');
var Message = require('../Message');
var WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather',
    K = 273.15;

module.exports = {
    get: function (info) {
        var deferred = vow.defer();
        request
            .get(WEATHER_URL)
            .query({q: info.params})
            .end(function (err, resp) {
                if (err || resp.statusCode != 200) {
                    deferred.reject(err || new Error('Statuc code: ' + resp.statusCode));
                    return;
                }
                var result = resp.body;
                deferred.resolve(new Message({
                    message: 'Weather in ' + result.name + ': ' + 
                        Math.floor(result.main.temp - K) + '°C. ' + 
                        result.weather[0].description
                }));
            });
        return deferred.promise();
    }
};
```
Now send: "/weather London" and get answer like this: "Weather in London: 17°C. Sky is Clear"

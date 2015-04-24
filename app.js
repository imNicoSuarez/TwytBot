var request = require('request');
var Twitter = require('node-tweet-stream');

var t = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    token: '',
    token_secret: ''
  })

t.on('tweet', function (tweet) {
  console.log('Tweet:', tweet.text);

  var textTweet = tweet.text;

  var textReply = "@"+tweet.user.screen_name+" Próximamente :) ";

  if (textTweet.match(/Hola|hola/) != null) {
    var textReply = "@"+tweet.user.screen_name+ " Hola, todo bien? ";
  } else if (textTweet.match(/hi|Hi|Hello|hello/) != null) {
    var textReply = "@"+tweet.user.screen_name+ " Hi, how are you? ";
  }

   var options = {
    method: 'POST',
    url: 'https://api.twitter.com/1.1/statuses/update.json',
    oauth: {
      consumer_key:         ''
    , consumer_secret:      ''
    , token:         ''
    , token_secret:  ''
   },
    form: {
      status: textReply,
      in_reply_to_status_id: tweet.id_str
    }
  };

  function callback(error, response, body) {

    if (!error && response.statusCode == 200) {
      var tw = JSON.parse(body);
      console.log('Replay:', tw.text)

    }
  }

  request(options, callback);

})

t.on('error', function (err) {
  console.log('Oh no')
})

t.track('@twytbot')
t.track('twytbot')
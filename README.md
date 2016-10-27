# Heroes-API-server

<img src="https://cdn-ssl.img.disneystore.com/content/ds/skyway/2015/category/full/fwb_marvel-char-shop_20150810.jpg" width="500" height="200" /><br>
[![npm](https://img.shields.io/npm/v/npm.svg?style=plastic)]()
[![AppVeyor](https://img.shields.io/appveyor/ci/gruntjs/grunt.svg?style=plastic)]()
[![Codecov](https://img.shields.io/codecov/c/github/codecov/example-python.svg?style=plastic)]()
## how to run this project
```
npm install
npm start
```

## file structure
```
    -middleware/
    ----------- index.js  // use for authentication
    -routes/
    -------- index.js     // setting routes
    -seed/
    ------ index.js       // hero basic data for dev used
    -test/
    ------ spec.js        // testing every api
    ------ mocha.opts     // mocha configuration
    - node_modules/       // created by npm. holds our dependencies/packages
    - package.json        // define all our node app and dependencies
    - app.js              // configure our application and create routes
    - index.js            // server entry point
```
## Third-party Library used
<ul>
  <li>Express: create server and routes</li>
  <li>Request: make http calls from hahow api provided</li>
  <li>Mocha: test framwork make asynchronous testing simple</li>
  <li>Should: keeps your test code clean</li>
  <li>Supertest: testing HTTP</li>
</ul>

## 寫註解的原則
<p>一般會盡量在variable/function 命名的時候就說明該功用，如果要表達原因/目的的時候才會特別寫註解(或覺得有點難看懂的時候...呵)</p>

## 遇到的困難，解決
1. 在呼叫hahow api做auth的時候，本來沒有打算開middleware，全部寫在routes底下，後來覺得寫下來太大一坨，還是把auth寫回去middleware裡了
2. 在把每個秘密英雄的profile塞進各自的dictionary的時候，因為用map的關係，本來以為Promise會一道一道的去抓每個英雄的資料，但後來用Promise.all就不需要等一個profile抓完再抓下一個profile了，滿厲害的方法
3. 本來/heroes跟/heroes/:heroId是寫在同一個function底下，判斷有沒有id再用filter把其他英雄拿掉，本來覺得是個不錯的辦法，因為code都用同一組，但後來想想如果英雄一多filter就會花很多時間，所以又改成兩組function
4. 抓單一英雄資料的hahow api 有時會報backend error(但status:200)，我原封不動的傳給client端了，畢竟是真實情況，應該要從這隻hahow api下去找問題，只不過這樣我就要額外處理testing
5. 秘密英雄授權失敗有兩種訊息Unauthorized/ Bad Request，我一律塞在profile的value底下，user看到應該就會知道 哦～我帳密打錯了所以看不到profile內容

## Testing
![test](http://gifyu.com/images/10-27-201610-40-08.gif)

# Heroes-API-server

<img src="https://cdn-ssl.img.disneystore.com/content/ds/skyway/2015/category/full/fwb_marvel-char-shop_20150810.jpg" width="500" height="200" /><br>
[![npm](https://img.shields.io/npm/v/npm.svg?style=plastic)]()
[![AppVeyor](https://img.shields.io/appveyor/ci/gruntjs/grunt.svg?style=plastic)]()
[![Codecov](https://img.shields.io/codecov/c/github/codecov/example-python.svg?style=plastic)]()
## How to run this project
```
npm install
npm start
```

## File Structure
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
    -Networking/          
    ----------- index.js  // do all http request
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

## 10/6 問題解釋
1. 為什麼會選擇讓遇到 error 的情況 (middleware 和 route 裡面的 catch 部分) 繼續跑完整個流程？
因為我忘記這是一個api server了，所以就希望避免掉可能的error status，並把本來跟hahow api要到的error message都一並擺進profile裡面，不過現在改回來了。
2. routes/index.js 75 行寫 `res.json(result);` 但是 73 行 promise 回傳的卻是 results，這部分是故意的還是寫錯？如果是寫錯，請試著解釋為什麼 API 回傳的結果會是對的？並且修正這個部分
這邊是我寫錯了，因為本來的寫法是將result做reassigned，並且傳進promise回傳的results中，所以兩個就恰巧一樣了。

## 10/6 修改部分
1. 因為寫太多個幾乎一樣的http request，所以開一個networking的資料夾去做這件事情，並且把middleware跟route有需要要求hahow api的function都放在這裡面。
2. 參考從hahow api得到的response status送status出去，若是沒有得到權限的user不會直接在middleware跳出error，仍然可以看到公開資料(所以會送next繼續執行)，原本做法是把profile整理成hahow的error message並且都送200出去，現在都改成了400up
3. 有時候會收到status code 200的backend error, 之前是原封不動送了出去，現在改成由於backend error連公開英雄資料都得不到，因此送status code 500出去，直接顯示從hahow api得到的backend error
4. 簡化流程，在middleware把三種情境(沒有帳密，正確帳密，缺/錯誤帳密)給清楚分開，在route的時候就不用用太多if來判斷這三個的不同。
5. 本來heroesList跟singleHero這兩個route我是寫在一起的，但checkAuthenticate沒有分開，造成一個function裡面做太多事，現在拆成兩個checkAuthenticate，對heroList跟singleHero所得到的分別做整理，有重複的邏輯就再拿出來。
6. 用了airbnb的eslint，本來是參考Daniel給的jslint，但因為想處理空行太多的問題(我對要空幾行沒什麼概念)，看到airbnb的有，所以就改用他了，不知道改完有沒有比較好看一點https://github.com/airbnb/javascript/blob/master/linters/.eslintrc
7. .gitignore直接參考https://github.com/github/gitignore/blob/master/Node.gitignore
8. testing會有error的case改成直接判斷status code，eslint在test的index.js裡面一直叫我要加esversion: 6，但其他file都沒有這個問題...不知道為何，然後還一直叫我把supertest跟should不要裝在devDependencies裡面，我可能要在linter裡面另外再加東西不要限制這麼多。
9. 在loop中的promise一開始是用es6原生的all來處理，後來看到bluebird有幾個不錯的loop處理方式(原生沒有)，但目前情況看起來用all也還ＯＫ，就沒改了。
10. 感謝回饋<(＿ ＿)>


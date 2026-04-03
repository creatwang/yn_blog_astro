---
title: '第一节、node常见内置模块'
---



# 第一节、node常见内置模块

- 使用场景

  > 可以作为中间层(转发服务器)，进行客户端请求转发，在不动原有服务器接口的情况下，整理数据避免跨域问题

  - 也可以作为后台服务器

- 爬虫cheerio

## 一、http模块

1. 引入内置模块

2. 创建服务，监听指定接口

3. 通过 `write` 方法将 `json` 字符串响应到前台，

4. ##### 注意：必须要有end 方法否则不会返回到前台的

   > end 方法也可以返回数据的

~~~js
const http = require("http")
http.createServer((req, res) => {
  //要设置请求头，虽然浏览器会自动识别是否是html，但是不会自动添加编码格式
  res.writeHead("200", {"Content-Type": "chartset:utf-8"})
  res.write(JSON.stringify({
    name: "zhangsan",
    age: "lisi"
  }))
  res.end()
    
/*也可以写在 end 方法当中
  res.end(JSON.stringify({
    name: "lisi"
  }))*/
    
}).listen(3000)

~~~



## url 模块

> `http` 服务的 `req` 对象中的 **url属性**只是保存了**path路径**，没有`localhost`，还会有`queryString`，这个模块可以帮助我们进行截取



### 旧的方法(了解)

- ##### parse

  - 第二个 `Boolean` 参数会决定query是否转换成对象

- ##### format

  - 将指定格式的对象装换成url

- ##### resolve 已经废弃了

  - 同用于进行 `url`，路径的拼接

  - **第一个参数path** ：路径结尾**有/ 的情况**下会**拼接**，**没有 / 的**话会进行**替换**

    `console.log(url.resolve('https://www.baidu.com:443/ad/index/', "zhangsan"));`

    

  - **第二个参数path**：路径前有 `/` 的情况下会将，域名或端口后面的path **全部替换**

    `console.log(url.resolve('url/lisi', "/zhangsan"));`

    

~~~js
const sss = `/ad/index.html?id=8&name=mouse#tag=110`
//传入 ture 的时候，会将query装换成对象
console.log(url.parse(sss), ture)
//返回数据
Url {
    protocol: null,slashes: null,auth: null,host: null,port: null,hostname: null,
    hash: '#tag=110',
    search: '?id=8&name=mouse',
    //传入到
    query: 'id=8&name=mouse',
    //可以将字符串进行截取
    pathname: '/ad/index.html',
    path: '/ad/index.html?id=8&name=mouse',
    href: '/ad/index.html?id=8&name=mouse#tag=110'
}

~~~



### 新的方法（掌握）推荐使用

#### 1、URL class

新增于: v7.6.0 提供了全局，

> 推荐使用新的 因为 url 容易出现命名冲突

- **第一个参数path**：路径前有 `/` 的情况下会将第二个参数域名或端口后面的path **全部替换**，存放url.href
- **第二个参数path** ：路径结尾**有 `/` 的情况**下会**拼接**，**没有 / 的**话会进行**替换**
- **searchParams**：是一个**包含 querySting 的迭代器对象**，可以通过get 或者遍历获取query键值对

~~~js
console.log(new URL("zhangsan?name=zhangsan", "https://www.baidu.com:443/abc"))

const url =  {
  href: 'https://www.baidu.com/zhangsan?name=zhangsan',
  origin: 'https://www.baidu.com',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'www.baidu.com',
  hostname: 'www.baidu.com',
  port: '',
  pathname: '/zhangsan',
  search: '?name=zhangsan',
  //这个对象保存的是queryString，可以使用URLSearchParams的api获取可以使用遍历
  searchParams: URLSearchParams { 'name' => 'zhangsan' },
  hash: ''
}

~~~



#### 2、url.format()

- `auth` 如果序列化的网址字符串应包含用户名和密码，则为 `true`，否则为 `false`。 **默认值:** `true`。
- `fragment`  格式化的地址**是否包含**，`hash` 锚点片段，则为 `true`，否则为 `false`。 **默认值:** `true`。
- `search`  格式化的地址**是否包含**，?后面的查询字符串，则为 `true`，否则为 `false`。 **默认值:** `true`。
- `unicode`  对于中文字符会默认进行编码。 设置为`true` 的话会在转换为中文字符 **默认值:** `false



#### 3、url.fileURLToPath(url)

> 用于处理 `file` 协议的路径，可以**根据不同的系统(windows、linux)转换为不同的`path`**

~~~js
fileURLToPath('file:///C:/path/');       // 正确: C:\path\ (Windows)
~~~



#### 4、url.pathToFileURL(path)

> 将路径转换为 file协议的url

~~~js
pathToFileURL('/foo#1');            
// 正确: file:///foo%231 (POSIX)
~~~



#### 5、url.urlToHttpOptions(url)

> 该实用函数按照 http.request() 和 https.request() API 的预期将网址对象转换为普通选项对象。

- 由于new URL 返回的对象格式是 whatwg 标准，可以**通过该方法转换**成 http.request() 的options 选项对像



## 二、querystring模块



### 1.parse

> 主要功能就是解析 queryString 的

```js
const querystring = require('querystring')
var qs = 'x=3&y=4'
var parsed = querystring.parse(qs)
console.log(parsed)
```



### 2.stringify

> 将对象转换为queryString

```js
const querystring = require('querystring')
var qo = {
  x: 3,
  y: 4
}
var parsed = querystring.stringify(qo)
console.log(parsed)

```

### 3.escape/unescape

> queryString 中文编解码



```js
const querystring = require('querystring')
var str = 'id=3&city=北京&url=https://www.baidu.com'
var escaped = querystring.escape(str)
console.log(escaped)

```

```js
const querystring = require('querystring')
var str = 'id%3D3%26city%3D%E5%8C%97%E4%BA%AC%26url%3Dhttps%3A%2F%2Fwww.baidu.com'
var unescaped = querystring.unescape(str)
console.log(unescaped)
```



##  三、event模块

> 简单来说就是全局事件总线。

~~~js
const EventEmitter = require("events")
exports.eventBus = new EventEmitter()

const foo = (res) => {
  console.log("zhangsan", res)
}

eventBus.on("play", foo)
eventBus.emit("play", "lisi")
eventBus.off("play", foo)
~~~



## 四、fs文件模块

> Node.js 文件系统（fs 模块）模块中的方法均有**异步**和**同步版本**



- **同步方法注意**：同步方法没有回调，同步代码**一定要**用 `try-catch` 进行**捕获异常**，否则一但出现异常的话会导致整个项目停止运行

  > 服务器启动时如果需要**读取配置文件**，或者**结束时**需要**写入到**状态文件时，可以使用同步代码，因为这些代码只在**启动**和**结束**时执行一次，不影响服务器正常运行时的异步执行。

  

- **异步方法注意**：

  - 采用 `err-first` 风格设计的，**通过回调函数返回异常**
  - 异步方法**支持 `promise`**  
  - **获取promise "属性" 对象** 进行操作，`const fs = require('fs').promise`

  > 由于Node环境执行的JavaScript代码是服务器端代码，所以，绝大部分需要在服务器运行期**反复执行**业务逻辑的代码，**必须使用异步代码**，否则，同步代码在执行时期，服务器将停止响应，因为JavaScript只有一个执行线程。





### fast-glob

> 一个全局扫描所有文件的工具，[fast-glob](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmrmlnc%2Ffast-glob)，速度非常快的 `glob` 工具库。

~~~js

import glob from 'fast-glob';

async function scan() {
    const files = await glob(['src/**/*.{js,jsx,json}']);
    for (const file of files) {
        const fileName = file.split('/').reverse()[0];
        const content = fs.readFileSync(file, 'utf-8');
        console.log(file, fileName, content);
    }
}

~~~





### fs.mkdir

>  创建文件夹

- `arg1`：创建的文件路径
- `arg2`:  `callback`

~~~js
const fs = require('fs')

fs.mkdir('./logs', (err) => {
  console.log('done.')
})
~~~



### fs.rename

> 文件夹改名

- `arg1`：修改的文件路径
- `arg2`:  `callback`

~~~js

fs.rename('./logs', './log', (err) => {
  console.log('done')
})
~~~



### fs.rmdir

> 删除文件夹

- `arg1`：删除的文件路径
- `arg2`:  `callback`

~~~js

fs.rmdir('./log', () => {
  console.log('done.')
})
~~~



### fs.writeFile

> 写内容到文件里

- `arg1`：写入文件的路径
- `arg2`：写入的内容
- `arg3`:  `callback`

~~~js

fs.writeFile(
  './logs/log1.txt',
  'hello',
  // 错误优先的回调函数
  (err) => {
    if (err) {
      console.log(err.message)
    } else {
      console.log('文件创建成功')
    }
  }
)

// 批量写文件
for (var i = 0; i < 10; i++) {
  fs.writeFile(`./logs/log-${i}.txt`, `log-${i}`, (err) => {
    console.log('done.')
  })
}
~~~



### fs.appendFile

> 给文件追加内容

- arg1`：写入文件的路径
- `arg2`：追加的内容
- `arg3`:  `callback`

~~~js

fs.appendFile('./logs/log1.txt', 'nworld', () => {
  console.log('done.')
})
~~~



### fs.readFile

> 读取文件内容

~~~js

fs.readFile('./logs/log1.txt', 'utf-8', (err, data) => {
  console.log(data)
})

// 同步读取文件
try {
  const content = fs.readFileSync('./logs/log-1.txt', 'utf-8')
  console.log(content)
  console.log(0)
} catch (e) {
  console.log(e.message)
}

// 异步读取文件：方法一
fs.readFile('./logs/log-0.txt', 'utf-8', (err, content) => {
  console.log(content)
  console.log(0)
})
console.log(1)

// 异步读取文件：方法二
const fs = require("fs").promises
fs.readFile('./logs/log-0.txt', 'utf-8').then(result => {
  console.log(result)
})

~~~



### fs.unlink

> 删除文件 

~~~js
fs.unlink('./logs/log1.txt', (err) => {
  console.log('done.')
})
~~~

### fs.stat

> 查看文件状态，是否是文件或文件夹

- `err-first`: 风格方式

1. stats.isFile(): 如果是文件则返回true,否则返回false;
2. stats.isDirectiory(): 如果是目录则返回true,否则返回false;
3. stats.isBlockDevice(): 如果是块设备则返回true，否则返回false;
4. stats.isCharacterDevice(): 如果是字符设备返回true,否则返回false;
5. stats.isSymbolicLink(): 如果是软链接返回true,否则返回false;
6. stats.isFIFO(): 如果是FIFO,则返回true,否则返回false.FIFO是UNIX中的一种特殊类型的命令管道；
7. stats.isSocket(): 如果是Socket则返回true,否则返回false;
8. stats.size(): 文件的大小（以字节为单位）。

~~~js
fs.stat("../", (err, state) => {
  console.log(state.isDirectory(), state.isFile());
})

fs.stat("../").then(state => console.log(state.isDirectory()))
~~~



### fs.statSync

~~~js
const stats = fs.statSync(filePath)
~~~





### fs.readdir

> 读取文件夹中的文件信息，数组类型，`['file1.txt','file2.bat']`

- `err-first`: 风格方式

~~~js
// 读取文件/目录信息
fs.readdir('./', (err, data) => {
  data.forEach((value, index) => {
    fs.stat(`./${value}`, (err, stats) => {
      // console.log(value + ':' + stats.size)
      console.log(value + ' is ' + (stats.isDirectory() ? 'directory' : 'file'))
    })
  })
})

fs.readdir("./avatar").then(async (data)=>{
    await Promise.all(data.map(item=>fs.unlink(./avatar/s(item))
    ))
    await fs.rmdir("./avatar")
)

fs.readdirSync(path,option)
~~~

### fs.readdirSync

~~~js
 const data = fs.readdirSync(dirPath)
~~~



- **path:**它保存必须从中读取内容的目录路径。它可以是字符串，缓冲区或URL。

- options:

  它是一个对象，可用于指定将影响方法的可选参数。它具有两个可选参数：

  - **encoding:**它是一个字符串值，该字符串值指定给回调参数指定的文件名使用哪种编码。默认值为“ utf8”。
  - **withFileTypes:**这是一个布尔值，它指定是否将文件作为fs.Dirent对象返回。默认值为“ false”。

  

## 五、stream流模块

> 标准流，这个模块不会直接被调用，用于在 Node.js 中处理流数据的抽象接口。 `stream` 模块提供了用于实现流接口的 API。

- 和文件写入方法的区别(重点)：writefile本质上也是流的操作，但是一次性的写入，stream则会右更多的方法控制buffer，可以分段写入，恢复写入，暂停写入、读取大的视频文件

- `fs` 模块也实现了标准输入输出流的 Api

- 为了读取速度统一，nodejs 提供了 pipe 管道

  > 所有的数据自动从`Readable`流进入`Writable`流，这种操作叫`pipe`。

- 输出流要添加，字符编码，否则中文乱码

  > utf-8 国际编码格式，通用性强

- **注意**：`require("fs").promise` 的 `promise` 风格，**不能**创建文件流，**只能**使用**普通的fs模块**

  - 默认一次读取64k

  ~~~js
  //创建文件输入流
  const read = fs.createReadStream('./index.js')
  //创建文件输出流，设置文件编码格式
  const wr = fs.createWriteStream("zhangsan.js","utf8")
  //建立管道写入
  read.pipe(wr)
  ~~~



##  六、zlib

> 提供了**资源压缩功能**。
>
>  例如在 http 传输过程中常用的 gzip，能大幅度减少网络传输流量，提高速度。

- response 也是一个可写流
- **注意**：返回gzip 要告诉浏览器类型，进行解压，**设置对应的请求头**

~~~js
const gzip = createGzip()
const read = fs.createReadStream('./index.js')
const wr = fs.createWriteStream("zhangsan.js", "utf8")
read.pipe(gzip).pipe(wr)


//可以将res 转换成输出流写出
http.createServer((req,res)=>{
    // res 可写流

    const readStream = fs.createReadStream("./index.js")
    res.writeHead(200,{"Content-Type":"application/x-javascript;charset=utf-8","Content-Encoding":"gzip"})
    readStream.pipe(gzip).pipe(res)
}).listen(3000,()=>{
    console.log('server start')
})
~~~



## 七、crypto

> crypto模块的目的是为了提供**通用的加密和哈希算法。**



### md5加密-createHash

> md5 是不可逆的，是**`hash` 算法**，通常用16进制的字符串进行表示

1. `Md5`不可逆是摘要算法，几乎不能还原出原始数据
2. 相同数据加密之后的字符串，完全相等
3. 容易受到碰撞攻击



**应用场景**：

1. 数据完整性的**校验**；

> 例: 订单进行支付的时候，传入支付金额的签名，如果支付金额一但被篡改，那么就和签名对不上，就是被篡改了

2. 用户名密码加密
3. 大数据情况下去重



~~~js
const crypto = require('crypto');

//也可以使用sha1加密方式
//const hash = crypto.createHash('sha1');
const hash = crypto.createHash('md5');

// 可任意多次调用update():
//`update()`方法默认字符串编码为`UTF-8`，
hash.update('Hello, world!');
hash.update('Hello, nodejs!');

//返回16进制格式
console.log(hash.digest('hex')); 

//返回base64格式
//console.log(hash.digest('base64')); 
~~~



### md5加盐-createHmac

> Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法。不同的是，Hmac还需要一个密钥：

- 只要**密钥发生了变化**，那么同样的输入数据也会得到不同的签名，因此，可以把Hmac理解为用随机数“增强”的哈希算法。

~~~js
const crypto = require("crypto")
const str = "zhangsan"

const md1 = crypto.createHash("md5")
//这个方法一个要添加secret_key,否则报错
const md3 = crypto.createHmac('md5', '123')

//执行加密
md3.update(str)
md1.update(str);
// md1.digest("hex") 这个方法只能调用一次否则报错
console.log(md1.digest("hex"), md3.digest("hex"));
~~~



### AES对称加密

> 加解密都用同一个密钥。crypto模块提供了AES支持，但是需要自己封装好函数，便于使用：

- 需要`key` 和 `iv` 两个密钥进行 **加密 **和 **解密**
- **注意加密方式**：aes-128-cbc 密钥**需要是 `128` 位的字符串**



特点：

1. 加密速度快
2. 安全性高



~~~js
const crypto = require("crypto");
)
//aes-128-cbc 的算法使用的key 也要是 128位的转换成字节，可以计算位和字节的转换
//一个字节8位，一个字母一个字节，因此要16个数字或者字母的字符
//16 * 8=128,

let key="1234567890123456"
let iv="6543211234567890"

console.log(encrypt(key, iv, "zhangsan"));

console.log(decrypt(key, iv, encrypt(key, iv, "zhangsan")));

//加密方法
function encrypt (key, iv, data) {
  let decipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  // decipher.setAutoPadding(true);
  return decipher.update(data, 'binary', 'hex') + decipher.final('hex');
}

//解密方法
function decrypt (key, iv, crypted) {
  crypted = Buffer.from(crypted, 'hex').toString('binary');
  let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  return decipher.update(crypted, 'binary', 'utf8') + decipher.final('utf8');
}

~~~



### res 加密 非对称加密

> 公钥（`publicKey`）加密、私钥（`privateKey`）解密。不能逆向，私钥（`privateKey`）加密、公钥（`publicKey`）解密。说白了就是前后端都需要用公钥（`publicKey`）进行加密，用私钥（`privateKey`）进行解密。



**引入前端 JS 库：jsencrypt.js**

~~~js
// RSA 解密
static decryptRSA(str: string) {
    const encryptor = new JSEncrypt() // 新建JSEncrypt对象
    const privateKey = "XXXX" // 私钥串
    encryptor.setPrivateKey(privateKey)//设置私钥
    const decrytStr = encryptor.decrypt(str)
    return decrytStr
}

// RSA 加密
static encryptRSA(str: string) {
    const encryptor = new JSEncrypt() // 新建JSEncrypt对象
    const publicKey = '';  //公钥串
    encryptor.setPublicKey(publicKey) // 设置公钥
    const rsaPassWord = encryptor.encrypt(str)
    return rsaPassWord
}
~~~





### base64 编解码，浏览器提供的

~~~~js
var enc = window.btoa('Hello World');
// SGVsbG8gV29ybGQ=

var str = window.atob(enc);
~~~~

# 第二节、node 全局变量

# 1、process.cwd()和__dirname的区别

`rocess.cwd()` 是当前执行 `node` 命令时候的文件夹地址 ——工作目录。

例如：你在`d:/`下执行的node，路径就是`d:/`

 `__dirname` 是被执行的 `js` 文件的地址    ——文件所在目录。



# 第三节、cros跨域问题

> **跨域**：指的是浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器对 `javascript` 施加的安全限制。

- 如果a、b页面的协议、域名、端口、子域名不同，所进行的访问行动都是跨域的。



## 1、jsonp

> 前后端分离会有跨域的问题

- ##### 原理

  1. 动态创建 script 标签
  2. src 指向跨域没有限制，前端定义好函数
  3. 后端返回该函数的调用

- ##### 理解

  > 动态创建 script 标签 src 属性会访问一个地址**接收js代码并进行执行**，后台地址**返回一个字符串形式的js函数并且将值赋值给形参，**，返回到html页面就会**直接进行调用预先声明好的函数**，接收的参数就是后台返回数据

~~~html
<!--前台-->
<script>
    //动态创建script标签
	var oscript document.createElement("script")
    //设置src地址
	oscript.src="http://localhost:3000/api/aaa?callback=test"
    //添加到页面
	document.body.appendchild(oscript)
	function test(obj){
    	console.log(obj)
    }
</script>
<!--后台nodejs-->
<script>
    http.createServer((req,res)=>{
        //解析url
        var urlobj url.parse(req.url,true)
        console.log(urlobj.query.callback)

        res.end(`${urlobj.query.callback}(${JSON.stringify({
            name: "zhangsan",
            address: "天津市"
        })})`)
      
    }).1isten(3000)
</script>

~~~





## 2、cros添加响应头的方式

-  添加响应头**允许所有的源进行访问控制使用**
      `'Access-Control-Allow-Origin': '*'`

~~~js
const http = require('http')
const url = require('url')
const querystring = require('querystring')

const app = http.createServer((req, res) => {
  let data = ''
  let urlObj = url.parse(req.url, true)

  res.writeHead(200, {
    'content-type': 'application/json;charset=utf-8',
     //添加响应头允许所有的源进行访问控制
    'Access-Control-Allow-Origin': '*'
  })

  req.on('data', (chunk) => {
    data += chunk
  })

  req.on('end', () => {
    responseResult(querystring.parse(data))
  })

  function responseResult(data) {
    switch (urlObj.pathname) {
      case '/api/login':
        res.end(JSON.stringify({
          message: data
        }))
        break
      default:
        res.end('404.')
        break
    }
  }
})

app.listen(8080, () => {
  console.log('localhost:8080')
})
~~~



## 3、app.all

- Express提供的服务端的CORS服务 

~~~js


//设置跨域访问  
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
});  

 
~~~





# 第四节、路由



### 定义路由

~~~js
var fs = require("fs")
var path = require("path")

function render(res, path) {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf8" })
    res.write(fs.readFileSync(path, "utf8"))
    res.end()
}


const route = {
    "/login": (req, res) => {
        render(res, "./static/login.html")
    },

    "/home": (req, res) => {
        render(res, "./static/home.html")
    },
    "/404": (req, res) => {
        res.writeHead(404, { "Content-Type": "text/html;charset=utf8" })
        res.write(fs.readFileSync("./static/404.html", "utf8"))
    }
}
~~~



### 封装请求

- get请求

  ~~~js
      "/api/login":(req,res)=>{
          const myURL = new URL(req.url, 'http://127.0.0.1:3000');
          console.log(myURL.searchParams.get("username"))   
          render(res,`{ok:1}`)
      }
  ~~~

  



- post请求

  ~~~js
  "/api/login": (req, res) => {
          var post = '';
          // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
          req.on('data', function (chunk) {
              post += chunk;
          });
  
          // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
          req.on('end', function () {
              post = JSON.parse(post);
              render(res, `{ok:1}`)
          });
      }
  ~~~



### 静态资源处理

> 静态资源也会向服务器发起请求，由于项目会部署在不同的服务器上，所以要进行拼接。以绝对路径的方式返回资源文件

~~~js
const path = require("path")
function readStaticFile(req, res) {
  const myURL = new URL(req.url, 'http://127.0.0.1:3000')
  let filePathname = path.join(__dirname, "/static", myURL.pathname);

  if (fs.existsSync(filePathname)) {
    // console.log(1111)
      
    res.writeHead(200, { "Content-Type": `${mime.getType(path.extname(myURL.pathname))};charset=utf8` })
      
    res.write(fs.readFileSync(filePathname, "utf8"))
    res.end()
    return true
  } else {
    return false
  }
}
~~~



# 第五节 express

> `express` 是基于`Node.js`平台的、快速、开放、极简的 `web`开发框架

- `express` 做的事情

1. 对于 `write()` 和 `end()` 方法的封装，**在 res 对象中添加 send() 方法**
   - 正常情况下浏览器会根据不同数据格式，进行显示，如果返回的**html格式的字符串**，会对字符串进行解析
   - 但是，包含中文的话，会乱码，send方法会自动在**请求头上添加编码格式**，`"Content-type": "text/html;charset=utf-8"`
   
   
   
2. 不在需要手动的进行 `JSON.stringify()` 方法手动进行装换 `json` 字符串了，`send()` 会自动将发送的对象装换成 `json` 字符串。



- res 对象的其他方法

  1. `res.json()`

     > 只响应`json`，`send()` 都会响应 (遇见`json`也会自动解析)

  2. `res.render()` 

     > 渲染指定的模板

### express-generator

> 通过生成器快速创建，express 的基本骨架

- 需要先下载 `express-generator`

  ```shell
  npm install express-generator -g
  ##或者直接
  npx --package express-generator express express-app
  ```

- 使用express 创建应用，应用名不能为空

  > 默认使用的模板引擎，jade，需要手动指定ejs

  ```shell
  npx express myapp --view=ejs
  #下载之后的app是没有 node_modules 的需要手动
  npm i
  ```

- 完成这些之后

  ```shell
  #全局安装node-dev小工具，修改代码之后会自动重启
  npm -g i node-dev
  #或者使用 nodemon
  npm -g i nodemon
  ```

- 查看 `package.json`，**使用 `node-dev` 运行应用文件**

  ```js
   "scripts": {
      "start": "node-dev ./bin/www"
    },
  ```





## 一、express 路由

> express 会通过 app.get() 收集映射关系。来实现路由

### 1、路径访问

- ##### 访问机制

  > 个人认为，app接收到请求之后，还有从头进行执行**最先匹配前面的路由**，看那个api可以处理该响应，就执行对应的回调

  

- ##### 参数一：访问的路径

  - String( 提供了一些正则中的量词、捕获组的用法)

    ~~~js
    //b可有可无，/ac || /abc
    app.get('/ab?c', (req, res) => {})
    //捕获组 123 可有可无 /ac || /a123c
    app.get('/a(123)?c', (req, res) => {})
    ~~~

    

  - 正则表达式

    ~~~js
    //正则表达式，就不需要添加引号了
    app.get(/[1-9]^zhangsan$/, (req, res) => {})
    ~~~

    

  - 路径占位符 ( vue 中动态路由的占位符 :id，也算是实现了restful风格 )

    - 通过 `req.params` 获取
    
    ~~~js
    //占位符只能占一个
    app.get('/zhangsan/:id/:idx', (req, res) => {})
    ~~~

- ##### 参数二：回调函数



### 2、参数传递

1. `req.query`

   > 获取 `fromData` 类型的参数

2. `req.body`

   > 获取请求体参数

3. `req.params` 

   > 获取动态路径参数

   
   
   

### 3、路由回调函数

> 可以理解是一个 `...argus` ，**既可以**是参数列表，**也**可以是数组



- `next()` 方法

  > 在回调函数中有三个参数，`req`、`res`、`next()` ，当 `app,get()` 存在**多个回调函数**的时候，**会由`next()`  方法决定是否执行下面的函数**

  - **注意**：要在 `send()` 方法前进行调用 `next()` 方法否则直接响应页面了，不会返回数据的。

  ~~~js
  app.get('/example/d', [cb0, cb1], function (req, res, next) {
    console.log('response will be sent by the next function ...')
    //这里调用了才会调用下一个回调函数
    //在这里可以进行 token 的验证
    next()
  }, function (req, res) {
    res.send('Hello from D!')
  })
  ~~~

  

  

- ##### 知识点：后面的函数接收前面函数的参数

  > 这个是在进行错误信息传递时用的，err-first 风格

  ~~~js
  router.get("/hello", (req, res, next) => {
    //将这个值传到下一个函数的第一个参数中
    next("wangwu")
  }, (err, req, res) => {
    console.log(err)
    res.send(err)
    //output wangwu
  })
  ~~~

  

- **注意一**：如果第二个参数是**数组**的话，**后面**可以是**参数列表**

  ~~~js
  function foo(){}
  app.get('/zhangsan/:id/:idx', [foo], (req, res, next) => {})
  ~~~

  

- **注意二**：`app.get()` 的**回调函数中使用 `return`** ，不会有任何的响应，和**不写的效果是一样的**，都会**卡住**





## 二、express 中间件



###  1、应用级别中间件

> 应用级别中间件，其实就是 **凡是挂在app对象上的方法**，就叫做应用级别中间件。

- 参数同 `app.get()` 相同
- `app.get`、`app.post` 也都叫应用中间间
- 只不过 app.use() 方法，**不添加路径**的话就是万能匹配，每次进行访问的时候都会，调用该中间件。**包括get 或者 post 请求**



~~~js
const express = require("express")
const app = express()
app.use("/", (req, res, next) => {
  // res.send("这里是拦截器")
  console.log("这里是拦截器");
  next()
})
~~~





#### 1.1、路径冲突

> 第一个参数也是路径，规则同 app.get()

- **注意**：和其他 Api 方法冲突，就是存在相同路径的情况下**记得使用 `next()` 方法放行**

  > **相当于拦截指定的路径**，例如链接 `/` 路径 就算是拦截所有路径

  

  - 访问 `/` 路径**后面**的**所有路径都会**调用这个拦截器
  - 如果要拦截所有的路径，**可以不填**这个参数，只填一个回调函数，默认是全部拦截

  

- 因为`use()` 方法和 `app.get()` 方法在执行的顺序上，只会调用声明在前的方法。

  > 如果前面的方法 `send()` 响应客户端，那么另一个方法就无法被调用




#### 1.2、中间件回调函数

- 当 `use()` 方法中只有一个函数的情况下，**每次**请求都会对调用该方法，**直到遇见 `send()` 方法给客户端返回数据**

  > 相当与 `javaWeb` 中的过滤器

  - **注意**：如果 `use()` 方法定义在其他 `api` 接口后面的话，那么访问 `use()` 方法前面的 `Api()` 方法的话，`use()` 方法是不会调用了

    > 因为访问前面的 `api`，之后遇见 `send()` 方法直接返回前台了，不会执行到 `use()` 方法

    

  - **总结**：调用 `use()` 方法**前**，**声明的 `Api` 接口**，**不会触发 `use()` 方法**，要在Api接口前定义 `use()` 方法

    > 直接在创建 `app` 之后声明 `use()` 函数

    

  - ##### 因此 use() 方法的声明一定要注意顺序
  
  - **主要作用**：应用其他中间件，所有请求过来会由中间件处理之后，在做其他的处理



- **注意**：应用级别的中间件，**声明在所有api 方法的前面**，由于自身的特性**每次**都会调用，如果在 `use()` 方法的回调函数中使用 `send()` 方法响应客户端，那么**其他**的 `Api` 接口永远不会调用。

  

#### 1.3、use方法的作用

1. 作为网络请求的拦截器

2. ##### 用于注册其他中间件进行使用

   - `router`中间件、错误中间件



#### 1.4、use 方法和 all 方法的区别

- app.all其实是和 `app.get` 和 `app.post` 类似，它是 app.get 和 app.post 等的一个**统一函数，可以接收任何的请求**，路径匹配的是完整路径，如果要匹配以某个字符串开头，则后面添加* 即可

  

- `app.use((req,res,next)=>{})`效果是相同的。但是在一般情况下，为了好识别和解读程序代码，最好还是让其**按语义来执行**。`app.all`的一个用途是可以处理跨域请求：

  

- `app.use` 还用于注册其他中间件



### 2、错误中间件

> 使用 `use()` 方法，接收所有请求

- **注意**的是声明的位置，**一定**要是**所有的路由 `Api` 方法的后面**进行声明。

  > use() 默认是全部路径拦截，放在前面声明的话所有路径都会 404 

- 这样的话当，前面所有的 `Api` 都没有匹配到的路径，就会自动调用最后的中间件，

- 之后**通过 `status()` 方法手动返回 404 错误码**，及错误信息



~~~js
app.use((req, res) => {
  //返回错误码
  res.status(404).send("路径错误")
})
~~~





### 3、路由级别中间件

> 挂在路由对象上的方法回调函数，就是路由级别的中间件

- 使用场景：**创建二级子路由**
- 注意：应用级别和路由级别中间件都有接收请求的方法



#### 路由中间件使用

1. 通过`express` 中的 `Router()` 方法创建路由对象

   - 路由对象也会有对应的get、post 方法

   

2. 在 `app.use()` 方法中定义，父级路径

   > 访问`/home` 路径的时候被 `use()` 方法拦截交由 `router`对象处理。
   >
   > 如果不访问`/home`，又找不到路由对象.

   

3. 这样就会先匹配应用级别的中间件，之后在匹配路由级别的

   ~~~js
   const express = require("express")
   //通过 Router 方法创建路由对象。
   const app = express()
   const router = express.Router()
   //注册路由中间件
   app.use("/home", router)
   
   //不需要父级路径的时候可以直接写 app.use(router)
   
   router.get("/zhangsan", (req, res) => {
     res.send("zhnagsan")
   })
   
   app.listen(3000, () => {
    console.log("启动成功");
   })
   ~~~
   
   

### 4、内置中间件

#### 4.1、Express 静态文件

> 通过 Express 内置的 express.static 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等。



- ##### 手动处理静态文件的流程

1. 在不同服务器的路径格式不同，因此要 path 模块进行绝对路径的拼接

   > **拼接文件路径**

   

2. css文件则不会自动解析，需要**根据不同**的扩展名**手动添加**请求头，需要依赖其他库 mime, 否则不会被浏览器解析.

   > **设置请求头**

   

3. 当**手动处理静态资源文件**的时候，在访问 `html` 浏览器会根据正确的格式**自动添加请求头**，但是不会自动添加字符编码所以，中文会乱码

   > **设置中文乱码**

   

4. 获取到文件之后，**通过 fs 文件流进行写出**

   > 当访问不到对应路由的时候就会，根据访问的路径拼接，**访问静态文件夹**，找到对应的文件**写出**



- ##### 以上就是 `express` 处理静态文件帮忙做的事情

  > 在express 中需要做的只有设置哪些文件夹是静态资源文件夹

  - 参数：静态资源文件夹的路径

  ~~~js
  //注册这个内置的中间件, 文件夹不一定要叫 public
  app.use(express.static('public'))
  ~~~

  

- 同手动处理静态文件夹流程相同，前台**访问**的时候**不需要添加**静态资源文件路径

  > 如果一定要访问的话

  ~~~js
  //注册这个内置的中间件，最好拼接绝对路径
  app.use("/public", express.static('public'))
  ~~~

  



#### 4.2、post获取请求参数

- 在处理 get 请求中可以直接获取到查询字符串

  

- 但是在要处理post请求需要单独在应用中注册中间件

  > 在以前的老版本，4版本之前，需要手动的导入 第三方中间件，但是在**4版本之后内置了**

  

- 只需要手动注册即可

  ~~~js
  //响应 application/x-www-from-urlencoded 请求
  app.use(express.urlencoded({extended:false}))
  //响应 application/json 请求
  app.use(express.json())
  //获取请求体
  req.body
  //获取查询字符串，这个不需要中间件，因为默认git请求不需要配置请求头
  req.qurey
  ~~~



### 3、`cookie-parser` 中间件 

#### 配置

~~~js
const app = express()
var cookieParser = require('cookie-parser');
app.use(cookieParser('123456')); //使用cookie中间件，传入签名123456进行加密
app.use(cookie)
~~~

#### 使用

~~~js
//设置
res.cookie("zhangsn", "lisi",[options])
//获取是负数形式
req.cookies.zhangsn
~~~



- 其中option是 Object 类型：有以下选项
  -  **domain**: 域名。设置子域名（二级域名）是否可以访问cookie。 例：domain:'.主域名'  name=value：键值对，可以设置要保存的 Key/Value，注意这里的 name 不能和其他属性项的名字一样
  -  **expires**： 过期时间（秒），在设置的某个时间点后该 Cookie 就会失效，如 expires=Wednesday, 09-Nov-99 23:12:40 GMT
  -  **maxAge**： 最大失效时间（毫秒），设置在多少后失效
  -  **secure**： 当 secure 值为 true 时， cookie 在 HTTP 中是无效，在 HTTPS 中才有效
  -  **path**： 表示 cookie 影响到的路由，如 path=/。如果路径不能匹配时，浏览器则不发送这个 Cookie
  -  **httpOnly**：默认为false,建议设置为true, 客户端将无法通过document.cookie读取到 COOKIE 信息，可防止 XSS 攻击产生
  -  **signed**： 表示是否签名（加密） cookie, 设为 true 会对这个 cookie 签名，这样就需要用res.signedCookies 访问它,前提需要设置上面中间件app.use传参  。未签名则用 res.cookies 访问
  - 被篡改的签名 cookie 会被服务器拒绝，并且 cookie值会重置为它的原始值



## 三 、模板引擎ejs

> EJS 是什么？. “E” 代表什么？. 可以表示 “可嵌入（Embedded）”，也可以是“高效（Effective）”、“优雅（Elegant）”或者是“简单（Easy）”。. EJS 是一套简单的模板语言



- `npm i ejs`  文件扩展名：`index.ejs`

- 在 `html` 中使用 `ejs` 配置

  > 配置好之后，就可以在html文件中使用 ejs 语法了

  ~~~js
  app.set("views","./views")
  app.set("view engine","html")
  //html 文件通过ejs模块及逆行渲染
  app.engine("html",require("ejs").renderFile)
  ~~~

  
  
  

### 页面跳转及配置

- `req.render()` 方法

  > `req.render()` 会根据**配置的**模板引擎，自动去指定的文件夹中查找该文件

  

  ~~~js
  const express  = require("express")
  const router = express.Router()
  
  router.get("/home", (req, res) => {
      
      
    //这里的效果，和 render() 中的第二个参数的效果一样，也会在模板中获取到message这个变量
    //res.locals.message = "message";
  
    
    res.render(
        		//配置了模板引擎和页面文件的路径之后不用扩展名就可以找到这个文件
        		"home", 
        		//这里的第二个参数，会作为 home.ejs页面的 上下文对象，可以直接<%name%> 获取到
               {name: "zhangsan", addr: "天津市", age: 34}
              )
  })
  
  ~~~

  

- `req.redirect()` 重定向 ejs 页面

  ~~~js
  router.get("/", (req, res) => {
    //访问 / 会直接重定向到 /home 页面
    res.redirect("/home")
  })
  ~~~

  

-  `use.set()` 配置 ejs 模板引擎

  ~~~js
  //通过 use.set() 方法
  //设置views 选项，要在那个文件夹中获取页面文件
  
  //render会在这个文件夹下获取文件， 最好要用绝对路径
  app.set("views", path.join(__dirname, "/views"))
  
  //设置需要的模板引擎，render函数会根据配置的扩展名，自动给参数添加扩展名
  app.set("view engine", "ejs")
  ~~~



### 基本语法

~~~html
<%  %>流程控制标签（写的是if else,for 条件判断语句)

<div class="conteiner">
    <h3><%=product%></h3>
    <%for (let i = 0; i < 10; i++) {%>
        <li>这里是 <%=i%> </li>
    <%}%>
</div>

<!--输出标签（原文输出HTML标签）-->
<%= 这里的变量或者表达式会被执行，渲染结果 %>

<!--输出标签(HTL会被浏览器解析), 导入html片段的时候记得使用-->
<%- 这里的html标签字符串会被解析 %>

<!--这里的注释不会出现在最后生成的html文件当中-->
<%# 注释标签 %>

<!--导入公共的模板内容
    这里的 product 属性会保存到导入ejs上下文中,扩展名可以省略
-->
<%- include("./about", {product: "收集"})%>
~~~



# 第六节、mongoose

> 使用第三方模块 `mongoose` 来，操作`mongodb`，在**启动之前链接上数据库**



## mongoose链接

> 建立链接的时候，`mongo://localhose:27017/zhnagsan` 会**自动创建** `zhangsan` 库

- 当mongo，开启验证的时候，末尾需要添加 authSource=admin

  > 具体还不知道什么原因

  ~~~js
  //下载 mongoose ，npm i mongoose
  const mongoose = require("mongoose")
  //链接本地不需要账号密码
  mongoose.connect('mongodb://182.92.155.197:27017/zhangsan')
  //开启验证的链接方式url最前面添加账号密码，使用 : 进行分割以 @ 结尾
  mongoose.connect('mongodb://admin:123456@182.92.155.197:27017/zhangsan?authSource=admin')
  ~~~

  

## mongoose创建模型

> 由于`mongo` 太过于自由了，字段就算不一致的情况下也会存入集合内，在没有任何限制的情况下很容易出现错误

- 因此，`mongoose` 提供了 **`Schema` 类**，用于**限制文件记录的规范**。

  > 和模型不一致的字段是不会添加的。其他字段一致的则会添加，字段全部错误的话也会添加一条只有id字段的文档。

  

- **注意**：`import` 导入的时候，是不会遵循 d`require` 的查找规则的

  > 需要写完整路径和后缀名

  

- 同 `javaBean` 相似，思想一致，**和数据库字段一致**

- **注意**：模型对应的集合也会自动创建的

- ##### mongoose 的模型，相似与 jpa  

~~~js
const mongoose = require("mongoose")
//利用Schema限制类型，和数量，只能添加这几个字段,多个村不尽其
const Schema = mongoose.Schema
const userType = {
  username: String,
  password: String,
  age: Number,
  addr: String
}
//如果没有user集合会自动创建
const UserModel = mongoose.model('user', new Schema(userType))
module.exports = UserModel
~~~





## mongoose 的操作

1. create是对save的封装
2. insertMany
3. updateOne\updateMany
4. deleteOne\deleteMany
5. find().then()
6. sort





# 第七节、登录鉴权



## 一、cookie-session

- `express`：默认提供了处理`session`的中间件

  `npm install express-session`



- `express-session`：会自动创建 `session` 自动获取设置cookie，来进行验证

  > 当登录逻辑完成的时候，`req.sesson.attr` 属性的时候，同时会根据 `name` 向浏览器设置 `cookie`。

  - 这里想要强调的是，不设置默认初始化`cookie` ，只有进行`session`设置的时候，才会设置`cookie`

  ~~~js
  //获取 session 对象,并设置属性
  req.session.flag
  //销毁
  req.session.destroy(()=>{})
  ~~~



- **注意：**如果是 **`ajax` 请求**的话，就不能 `redirect` 了，因为 `ajax` 需要响应需要返回错误信息，相应之后，后台也就不执行了，**没有办法重定向 `redirect`**

  - 提示：后台可以**用 `includes` 方法判断** `req.url` 中是**否是 `api` 接口**，进行`redirect`

  > 因此每次超时请求前端都要进行处理，可以使用 `axios` 中的 “拦截器”，**针对不同的错误码进行重定向**。



- 当每次请求需要重新设置 cookie 的 maxAge，只需要重新设置下 session即可

  ~~~js
  //这里不一定要设置时间戳，只要重新设置下session即可
  req|ctx.session.data = Data.now()
  ~~~

  



### 知识点补充：

> 问题一：由于 `session` 是存放在内存中的，当**用户访问量很存在很多session**的时候，会**占用**大量的内存，**将服务器运行撑满。**
>
> 问题二：当使用集群负载均衡的时候，无法实现 `session` 共享，

- 或者在进行更新重启的时候，大量用户都需要重新登录

- 可以将` session` 存放到 `nosql` 数据库中，进行保存，在**指定的超时时间内自动删除**

  - 目前主流的nosql ，redis，和mongo。redis 会有默认超时时间
  - Mongo中：TTL索引是特殊的**单字段索引**，MongoDB可使用TTL索引**在一定时间后或在特定时钟时间自动从集合中删除文档**。数据到期对于某些类型的信息很有用，例如机器生成的事件数据，日志和会话信息，它们仅需要在数据库中保留有限的时间。

  - 解决：

    1. 可以手动添加 `session`
    2. 借助 `connect-mongo` 模块，配置 `express-session` 的 `store` 选项，自动实现

    ~~~js
    const express = require("express");
    const session = require("express-session");
    const MongoStore = require("connect-mongo");
    const app = express();
    
    app.use(
      session({
        secret: "this is session", // 服务器生成 session 的签名
        resave: true, 
        cookie: {
          maxAge: 1000 * 60 * 10,// 过期时间
        },
        store: MongoStore.create({
          mongoUrl: 'mongodb://127.0.0.1:27017/kerwin_session',
          ttl: 1000 * 60 * 10 // 过期时间
      	}),
      })
    );
    ~~~

    



- #### 例：

~~~js
const express = require("express");
const session = require("express-session");
const app = express();

app.use(
  session({
    name: "浏览器保存cooike 的名字"
    secret: "this is session", // 服务器生成 session 的签名
    //当重新设置 session 的时候，会更新 cookie 的超时时间 ，所以只是登录的时候会重新更新时间
    //可以每次在接口调用的时候，重新创建一个时间戳
    resave: true, 
    //就是第一次访问的时候，就先生成一个 cookie，强制将为初始化的 session 存储
    saveUninitialized: true, 
    cookie: {
      maxAge: 1000 * 60 * 10,// 过期时间
     //为 true 时候表示只有 https 协议才能访问cookie，可以省略因为默认就是false
      secure: false, 
    },
    //为 true(默认就是ture) 表示 超市前页面刷新，cookie 会重新计时； 为 false 表示在超时前刷新多少次，都是按照第一次刷新开始计时。   
    rolling: true, 
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/kerwin_session',
      ttl: 1000 * 60 * 10 // 过期时间
  }),

  })
);
~~~



## 二、JWT

- ##### 组成部分

  1. `header` ：存放一些加密算法格式
  2. `payload`: 一些负载信息
  3. `sign`：是根据密钥和 `header` 与  `payload` 指定算法生成，拼接到最后

  - 会将上面三段数据，进行加密之后拼接，生成`token`

- ##### 校验

  1. 解密之后获取`header`、`payload`，之后与密钥进行加密运算，与sigin进行比较是否一致，防止篡改



### 优缺点

- #### csrf跨站请求伪造

> 在采用 `cookie` 和 `session` 组合进行登录鉴权的时候，容易发生跨站请求伪造

~~~shell
a.com cookie
#b网站发送一个链接，a网站登录之后点击进入，会自动携带cookie，如果请求带有参数的话后台接收请求验证成功之后，就会造成一些未知的操作
b.com ===>链接 http://a.com?from=aaaa&to=vvv&money=100 chokie
~~~



- #### 保存在客户端

> 用户访问量过大的时候，不必担心内存的问题



- #### 缺点

  1. **占带宽**，正常情况下要比 session_id 更大，需要消耗更多流量，挤占更多带宽，假如你的网站每月有 10 万次的浏览器，就意味着要多开销几十兆的流量。听起来并不多，但日积月累也是不小一笔开销。实际上，许多人会在 JWT 中存储的信息会更多；
  2. **无法在服务端注销**，那么久很难解决劫持问题；
  3. 性能问题，JWT 的卖点之一就是加密签名，由于这个特性，接收方得以验证 JWT 是否有效且被信任。对于有着严格性能要求的 Web 应用，这并不理想，尤其对于单线程环境。



### jwt可以避免csrf的原因

- 因为手动点击不会走 `axios`，只有使用 `axios` 实例发送的请求才会走拦截器，添加请求头

- 验证的时候应该提供两个错误码 
  1. 是 `token` 验证失败，
  2. 是没有 `authorization` 请求头，的情况，来决定是否是回到登录页面，还是请求api接口



### jsonwebtoken的使用

> 用于生成`jwt`，和解析`jwt`

-  `SHA256` 默认加密算法

~~~shell
npm i jsonwebtoken
~~~



- 简单使用：剩下的看npm文档
- 通常生成 token 会保存在 `Authorization` 请求头中

~~~js
//jsonwebtoken 封装
const jsonwebtoken = require("jsonwebtoken")
const secret = "yanan.wang"
const JWT = {
    getJwt(value,exprires = "1h"){
        return jsonwebtoken.sign(value,secret,{expiresIn:exprires})
    },
    verify(token){
        try{
            return jsonwebtoken.verify(token,secret)
        }catch(e){
            return false
        }
    }
}

module.exports = JWT
~~~





# 第八节、文件上传 `multer`

> Multer 是一个 node.js 中间件，用于处理 `multipart/form-data` 类型的表单数据，它主要用于上传文件。

- **注意**: Multer 不会处理任何非 `multipart/form-data` 类型的表单数据。

- ##### `npm` 有中文文档

~~~shell
npm install --save multer
~~~



## multer 的使用

- 可以将上传文件夹保存到静态资源文件中进行保存，这样的话上传之后可以直接访问

  > 上传的文件默认对文件名进行加密没有扩展名，<u>没有扩展名也能访问</u>

  

- 如果需要自定义名称可以：看npm文档 -》`DiskStorage`

- 会自动将传入文件的一些路径或者字段**保存到 req.file 属性中**

  > 例：`path` 或者 `filename` 具体可以看文档

~~~js
const express = require('express')
const multer  = require('multer')
//会在当前目录下创建一个 uploads文件
const upload = multer({ dest: 'uploads/' })

//single 的参数是，前台保存file文件字段名
router.post('/upload', upload.single('avatar'),function(req, res, next) {
    //会自动将传入文件的一些路径或者字段保存到 req.file 属性中
	console.log(req.file)
})

//上传多个
app.post('/photos/uploads', upload.array('avatar', 12), function (req, res, next) {
  // req.files 是 `photos` 文件数组的信息，不填的话不会限制文件数量
  // req.body 将具有文本域数据，如果存在的话
})
~~~



## APIDOC - API 文档生成工具

> `apidoc` 是一个简单的 RESTful API 文档生成工具，它从代码注释中提取特定格式的内容生成文档。支持诸如 `Go`、`Java`、`C++`、`Rust` 等大部分开发语言，具体可使用 `apidoc lang` 命令行查看所有的支持列表。

- ##### apidoc 拥有以下特点：

1. 跨平台，`linux`、`windows`、`macOS` 等都支持；

2. 支持语言广泛，即使是不支持，也很方便扩展；

3. 支持多个不同语言的多个项目生成一份文档；

4. 输出模板可自定义；

5. 根据文档生成 `mock` 数据；

   

~~~shell
npm install -g apidoc
#-i 接口文件路径，文档路径
apidoc -i src/ -o doc/
~~~



- ##### 在当前文件夹下 `apidoc.json`

```json
{
	"name": "****接口文档",
	"version": "1.0.0",
	"description": "关于****的接口文档描述",
	"title": "****"
}
```



# 第九节、koa2

> `koa` 是由 `Express` 原班人马打造的，致力于成为一个**更小**、更**富有表现力**、更**健壮的 `Web` 框架**。使用 koa 编写 `web` 应用.

- 特点：通过组合不同的 `generator`，可以**免除重复繁琐的回调函数嵌套**，并极大地提升错误处理的效率。

  > 这个也是对于express 的一个区别，`next()` 的作用就是控制执行体，koa 是通过 `async、await` 进行控制函数的执行，避免了回调嵌套

- `koa` **不在**内核方法中**绑定任何中间件**，它仅仅提供了一个**轻量优雅的函数库**，使得编写 `Web` 应用变得得心应手

  > 也是和express 的一个区别，express 就是开箱即用，基本配置都由express帮忙做好了，koa需要自己选择需要的中间间，router...



## 一、koa2 vs express

> 就记这四点

1. `koa` 更加的**轻量**，不在提供内置中间件

2. 添加了一个**ctx 对象**，作为当前请求的上下文对象

3. **异步流程控制**，`express` 是通过回调函数实现的，`koa2` 是通过 `async` 和 `await`实现的

4. **中间件模型架构**

   > **同步上没区别**

   - `express` 是一个线性模型

     > 只有调用了 `next` 才会执行下一步，一步一步的执行

     1. `express` 在使用 `async` 和 `await` 作用在 `next()` 异步方法上时，是不会等待 `next()` 执行万册灰姑娘的
     2. 所以说 `express` 就要保证流水线风格，`next()` 执行处理下一个

   - `koa2` 采用的洋葱模型

     > 可以 `await` 等待 `next()` 异步完成之后，继续执行当前函数，**相互转交控制权**

     **注意**：记住一点即可，凡是使用 `next()` 方法要同步执行都需要使用 `await` 进行转交控制权



## 二、express 对比 koa2 封装的res|req方法

| api作用      |         express          |                  koa2                   | 描述                                                         |
| ------------ | :----------------------: | :-------------------------------------: | :----------------------------------------------------------- |
| 响应数据     |    `res.send({})`方法    | `ctx.response.body={}`<br>`ctx.body`={} | 都支持对象自动转`json`，字符串自动转`html`模板。<br/>1、`express` 是将 原生的 `res` 合并了<br/>2、`koa` 是重新封装了一个 `response` 属性对象，**获取原生的需要 ctx.res 进行获取**<br>3、同时会将一些**常用的 `Api` 封装到 ctx 对象**中。<br>例：`ctx.body` |
| 获取路径参数 | `req.params`获取路径参数 |              `ctx.params`               |                                                              |
| 获取query    |       `req.query`        |       `ctx.query ctx.querystring`       | `ctx.querystring <`br/>获取的字符串是没有解析的              |
| 重定向       |      `res.redirect`      |    `app.redirect`<br>`ctx.redirect`     | 应用级中间件和 ctx都会由一个redirect 的方法进行重定向        |
| 获取请求体   |        `req.body`        |           `ctx.request.body`            | **注意**：`ctx.body` 是 `reposone.body`                      |
| 跳转模板引擎 |       `res.render`       |           `ctx.render`异步的            | koa2 中的render是异步的, 需要使用async、await 等待           |
| 设置响应头   |       `res.header`       |               `ctx.set()`               | 设置token，或者chaset 编码，响应格式                         |
| 获取请求头   |      `req.headers`       |              `ctx.headers`              |                                                              |
| 状态码       | `res.status(200).send()` |            `ctx.status(200)`            |                                                              |
| file         |        `req.file`        |               `ctx.file`                | `multer` 中间件的使用                                        |



## 三、静态资源文件夹配置对比

### express

> `express` 创建静态资源文件夹，是通过express实例中的 static方法创建的

- 通过 use 方法进行注册
- 参数：静态文件夹的路径

~~~js
const express = require("express")
const app = express()
//一定要用绝对路径，避免出错
app.use(express.static(path.join( __dirname,  "public")))
~~~



### koa2 `koa-static`

> 在koa2 中需要手动下载 `npm intstall koa-static`

- 下载之后进行注册

~~~js
const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()

app.use(static(path.join( __dirname,  "public")))

~~~



## 四、路由 `koa-router`

> 同样需要进行下载中间件 `npm install koa-router`



### 支持链式调用

> 使用`restful`风格，同时匹配多个请求方式

~~~js
var Koa = require("koa")
var Router = require("koa-router")
var app = new Koa()
var router = new Router()

router.get("/user",(ctx)=>{
    ctx.body=["aaa","bbb","ccc"]
})
.put("/user/:id",(ctx)=>{
    ctx.body={ok:1,info:"user update"}
})
.post("/user",(ctx)=>{
    ctx.body={ok:1,info:"user post"}
})
.del("/user/:id",(ctx)=>{
    ctx.body={ok:1,info:"user del"}
})


~~~



###  router.allowedMethods 方法

> 通常前台请求访问的情况下，传入错误的 `method`，例如：`get|post` 会返回404路径错误

- `allowedMethods()` 方法的作用就是当接口一致，但是 `method` 不对的话，返回的是405 方法不允许

~~~js
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
~~~



### 路由拆分

- `koa-router` 实例也会有 `use` 方法

  > 可以**进行注册其他路由**，这样的话只需要在 `app.js` 中**只注册一个根路由即可**，让代码更加有内聚性

  ~~~js
  var Koa = require("koa")
  var router = require("./router/index")
  
  var app = new Koa()
  //routers 是router实例的方法
  app.use(router.routes()).use(router.allowedMethods())
  app.listen(3000)
  ~~~

  

### 路由前缀

- 开发到一半的时候，需要将所有接口修改为 `/Api`
- 可以通过 `prefix()` 实例方法进行添加，避免手动修改

~~~js
//那个router需要设置那个实例上，或者直接在根路由上设置
router.prefix('/api')
~~~



### 路由重定向

- 通常情况下用不到路由对象进行重定向，一般都是 `ctx`

~~~js
router.get("/home",(ctx)=>{
    ctx.body="home页面"
})
//写法1 
router.redirect('/', '/home');
//写法2
router.get("/",(ctx)=>{
    ctx.redirect("/home")
})
~~~



## 五、请求处理中间件

> 同 express 一样需要中间件来处理post 请求

- `koa-bodyparser`中间件可以把`koa2`上下文的`formData`数据解析到`ctx.request.body`中

  ~~~shell
  npm i koa-bodyparser
  ~~~

- 配置

  ~~~js
  const bodyParser = require('koa-bodyparser')
  
  // 使用ctx.body解析中间件
  app.use(bodyParser())
  ~~~

- `post` 获取请求参数

  > `ctx.request.body` 进行获取，可以直接简写 `ctx.body`

- `get` 获取请求参数

  - 是从上下文中直接获取 请求对象`ctx.query`，返回如 `{ a:1, b:2 }` 请求字符串 `ctx.querystring`，返回如 `a=1&b=2`
  - 是从上下文的 `request` 对象中获取 请求对象 `ctx.request.query`，返回如 `{ a:1, b:2 }` 请求字符串 `ctx.request.querystring`，返回如 `a=1&b=2`



## 六、ejs模板 `koa-views`

- #### 安装

  ~~~shell
  # 安装koa模板使用中间件
  npm install --save koa-views ejs
  
  # 安装ejs模板引擎
  npm install --save ejs
  ~~~

- #### 配置

  ~~~js
  const Koa = require('koa')
  const views = require('koa-views')
  const path = require('path')
  const app = new Koa()
  
  // 加载模板引擎
  app.use(
      views(path.join(__dirname, './view'), {extension: 'ejs'})
         )
  
  app.use( async ( ctx ) => {
    let title = 'hello koa2'
    await ctx.render('index', {
      title,
    })
  })
  
  app.listen(3000)
  ~~~

  

## 七、cookie&session



### cookie

> koa**提供了从上下文直接读取**、写入cookie的方法
>

- `ctx.cookies.get(name, [options])` 读取上下文请求中的 `cookie`
- `ctx.cookies.set(name, value, [options])` 在上下文中写入`cookie`



### session

~~~shell
npm install koa-session-minimal
~~~

- `koa-session-minimal` 适用于`koa2` 的`session`中间件，**提供存储介质的读写接口 。**

  > 这个中间件，在使用ctx.sessiion.attr 属性的时候会**自动**根据配置向客户端**添加`cookie`**

- ##### 配置同 `express-session` 相似

  [中间件配置github](https://github.com/pillarjs/cookies)地址;

  ~~~js
  const session = require("koa-session-minimal")
  
  //配置session
  app.use(session({
    key: "zhangsan",
    cookie: ctx => ({
      maxAge: 1000 * 60 * 60
    })
  }))
  ~~~

- ##### 使用

  ~~~js
  app.use(async (ctx, next) => {
      //排除login相关的路由和接口
      if (ctx.url.includes("login")) {
          await next()
          return
      }
  
      if (ctx.session.user) {
          //重新设置以下sesssion
          ctx.session.mydate = Date.now()
          await next()
      } else {
          ctx.redirect("/login")
      }
  })
  ~~~
  
### jwt

~~~js
  app.use(async (ctx, next) => {
      //排除login相关的路由和接口
      if (ctx.url.includes("login")) {
          await next()
          return
      }
  
      if (ctx.session.user) {
          //重新设置以下sesssion
          ctx.session.mydate = Date.now()
          await next()
      } else {
  
          ctx.redirect("/login")
      }
  })
~~~



## 八、上传文件

> 对于 `koa2`，`multer`模块对其进行了封装 `@koa/multer` ，用于适配，本身还是依赖与 `multer` 模块，所以两个都需要

- `npm install --save @koa/multer multer`

- ##### 使用方法上是一致的

  ~~~js
  const multer = require('@koa/multer');
  const upload = multer({ dest: 'public/uploads/' })
  
  router.post("/",upload.single('avatar'),
  (ctx,next)=>{
      console.log(ctx.request.body,ctx.file)
      ctx.body={
          ok:1,
          info:"add user success"
      }
  })
  
  ~~~






## 九、mysql

> mysql2 模块的链接方式直接查看npm官网 `npm i mysql2`

插入：

```sql
INSERT INTO `students`(`id`, `name`, `score`, `gender`) VALUES (null,'kerwin',100,1)
//可以不设置id,create_time
```

更新：

```sql
UPDATE `students` SET `name`='tiechui',`score`=20,`gender`=0 WHERE id=2;
```

删除：

```sql
DELETE FROM `students` WHERE id=2;
```

查询：

```sql
查所有的数据所有的字段
SELECT * FROM `students` WHERE 1;

查所有的数据某个字段
SELECT `id`, `name`, `score`, `gender` FROM `students` WHERE 1;

条件查询
SELECT * FROM `students` WHERE score>=80;
SELECT * FROM `students` where score>=80 AND gender=1

模糊查询
SELECT * FROM `students` where name like '%k%'

排序
SELECT id, name, gender, score FROM students ORDER BY score;
SELECT id, name, gender, score FROM students ORDER BY score DESC;

分页查询
SELECT id, name, gender, score FROM students LIMIT 50 OFFSET 0

记录条数
SELECT COUNT(*) FROM students;
SELECT COUNT(*) kerwinnum FROM students;

多表查询

SELECT * FROM students, classes;（这种多表查询又称笛卡尔查询，使用笛卡尔查询时要非常小心，由于结果集是目标表的行数乘积，对两个各自有100行记录的表进行笛卡尔查询将返回1万条记录，对两个各自有1万行记录的表进行笛卡尔查询将返回1亿条记录）
SELECT
    students.id sid,
    students.name,
    students.gender,
    students.score,
    classes.id cid,
    classes.name cname
FROM students, classes; （要使用表名.列名这样的方式来引用列和设置别名，这样就避免了结果集的列名重复问题。）

SELECT
    s.id sid,
    s.name,
    s.gender,
    s.score,
    c.id cid,
    c.name cname
FROM students s, classes c; （SQL还允许给表设置一个别名）


联表查询
SELECT s.id, s.name, s.class_id, c.name class_name, s.gender, s.score
FROM students s
INNER JOIN classes c
ON s.class_id = c.id; （连接查询对多个表进行JOIN运算，简单地说，就是先确定一个主表作为结果集，然后，把其他表的行有选择性地“连接”在主表结果集上。）


```







# 第十节、webSocket







## 一、ws

~~~shell
npm i ws
~~~

- ws 对数据的传输，**都需要转换成`json`字符串**进行传输，不能直接传对象

### 客户端

```js
//可以附带 token 传输，后台可以通过 const myURL = new URL(req.url, 'http://127.0.0.1:3000');
//来获取 token
var ws = new WebSocket(`ws://localhost:8080?token=${localStorage.getItem("token")}`)
//建立链接时回调
ws.onopen = ()=>{
    console.log("open")
}

//消息响应时回调,event 事件就是后台响应的数据
ws.onmessage = (event)=>{
    console.log(event.data)
}

//关闭连接时回调
ws.onclose = function(event) {
  console.log("WebSocket is closed now.");
};

//也可以使用addEvent 添加事件
ws.addEventListener('error', function (event) {
  console.log('WebSocket error: ', event);
});

```



### 服务端

~~~js
//后端
const WebSocket = require("ws");

const JWT = require('../util/JWT');

WebSocketServer = WebSocket.WebSocketServer

const server = new WebSocketServer({ port: 8080 });
//server websocket 服务,也是当前应用的实例，管理所有的 socket 链接
server.on('connection', function connection(ws, req) {
    
    const myURL = new URL(req.url, 'http://127.0.0.1:3000');
    const payload = JWT.verify(myURL.searchParams.get("token"))
    
    //校验token
    if (payload) {
		//user 最好要保存每个用户的唯一id，用于私聊判断
        ws.user = payload
        ws.send(createMessage(WebSocketType.GroupChat, ws.user, "欢迎来到聊天室"))
        sendBroadList() //发送好友列表

    } else {

        ws.send(createMessage(WebSocketType.Error, null, "token过期"))

    }
    

    ws.on('message', function message(data, isBinary) {

        const messageObj = JSON.parse(data)

        switch (messageObj.type) {
            case WebSocketType.GroupList:
                //响应数据
                ws.send(createMessage(WebSocketType.GroupList, ws.user, JSON.stringify(Array.from(server.clients).map(item => item.user))))
                break;
            case WebSocketType.GroupChat:
                server.clients.forEach(function each(client) {
                    if (client !== ws 
                        && client.readyState === WebSocket.OPEN) 
                    {
                        
                        client.send(createMessage(WebSocketType.GroupChat
                                                  , ws.user
                                                  , messageObj.data));
                        
                    }
                });
                break;
            //私聊
            case WebSocketType.SingleChat:
                
                //server.clients 所有的链接
                server.clients.forEach(function each(client) {
                    //遍历所有的链接，判断是否是指定用户，以及当前用户是否还保持链接
                    if (client.user.username === messageObj.to 
                        && client.readyState === WebSocket.OPEN) 
                    {
                      //发送消息
                     client.send(createMessage(WebSocketType.SingleChat
                                               , ws.user
                                               , messageObj.data)
                                );
                    }
                    
                });
                break;
        }
    });


    ws.on("close",function(){
      //删除当前用户
      server.clients.delete(ws.user)
      sendBroadList() //发送好用列表
  })

});



//自定义方法
const WebSocketType = {
  Error: 0, //错误
  GroupList: 1,//群列表
  GroupChat: 2,//群聊
  SingleChat: 3//私聊
}

function createMessage(type, user, data) {
  return JSON.stringify({
    type: type,
    user: user,
    data: data
  });
}

function sendBroadList(){
  server.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(createMessage(WebSocketType.GroupList, client.user, JSON.stringify(Array.from(server.clients).map(item => item.user))))
    }
  });
}
~~~





## 二、socket.io

~~~shell
#服务端使用
npm i socket.io
#vue中使用
npm install vue-socket.io --save
#react 中使用，和正常cdn script 标签引入的 js使用没有区别
npm install socket.io-client --save

~~~



- 可以自定义事件

- 具有更好的兼容性，在不支持 `webSocket` 的情况下，会自动切换长轮询 ，可以做到优雅的降级

  > 并不是使用webscoket实现的

- 当服务器重启的时候，客户端就会断开链接，`socket.io` **默认实现自动断连**的功能

  > 当服务器重启，断开的时候，`socket.io` 会尝试重新链接	

- `socket.io` 当前链接对象的 emmit() 支持直接传入对象，**不用手动转`json`了**

- 缺点就是，**性能并没有 `ws` 高**

  



### 客户端

~~~js
import io from "socket.io-client"
//这里不写也能连，会默连共用的http 端口, 通常会手动配置websocket链接
//const socket = io()
const socket = io("ws://loalhost:8080")
~~~



### 服务端

- `socket.io` 中服务器端**获取`url`携带的数据**，是通过**当前链接 `socket` 对象**中的 `handshake(握手的意思).query.key值`属性获取

  > 当前链接对象，就是 `socket` 服务中`connention` 事件中的参数一，
  >
  > 参数二：是req对象
  
- 具体使用方法开socket.io中文文档

- 客户端/服务端示例

~~~js

//客户端
import { io } from "socket.io-client";

const socket = io("ws://localhost:3000");

// 向服务器发送消息
socket.emit("hello from server", 5, "6", { 7: Uint8Array.from([8]) });

// 从服务器接收消息
socket.on("hello from server", (...args) => {
  // ...
});



//服务端
import { Server } from "socket.io";

const io = new Server(3000);
// 监听客户端连接
io.on("connection", function (socket) {
	/* 每一个连接上来的用户，都会分配一个socket */
	console.log("客户端有连接");
    
	// 给客户端发送消息（发布welcome事件）
	socket.emit("welcome", "欢迎连接socket");
    
	/* 监听登录事件 */
	socket.on('login', data => {
		console.log('login', data);
	});
   	// 监听断开事件
	socket.on('disconnect', (reason) => {
            console.log("disconnect reason ", reason)
            //userMap.delete(socket.handshake.query.username)
    })
 
	/* socket实例对象会监听一个特殊函数，关闭连接的函数disconnect */
	socket.on('disconnect', function () {
		console.log('用户关闭连接');
	});

~~~



- sockid

  ~~~js
  io.on("connection", socket => {
    socket.on("private message", (anotherSocketId, msg) => {
      socket.to(anotherSocketId).emit("private message", socket.id, msg);
    });
  });
  ~~~

  





# 第十一节、模型对象分类



## 一、VO（Value Object）值对象

最接近前端的对象

VO就是展示用的数据，不管展示方式是网页，还是客户端，还是APP，只要是这个东西是让人看到的，这就叫VO
VO主要的存在形式就是js里面的对象（也可以简单理解成json）

数据可能是要格式 DTO 之后的数据对象

解释：

~~~js
//DTO
{
    //0代表男性 1代表女性
    gender: 0
}

//VO 可能男性展示名称呼要展示为公子，这样的业务场景就是vo
{
    "gender":"公子" 
}
~~~





## 二、DTO （Data Transfer Object）数据传输对象

1、在后端的形式是 java 对象，表达了一个业务模块的输出数据，也就是服务和服务之间相对独立，传输的对象那就可以叫DTO

2、如果服务和服务之间不独立，每个都不是一个完整的业务模块，拆开可能仅仅是因为计算复杂度或者性能的问题，那这就不能够叫做DTO，只能是BO，也就是业务逻辑层



## 三、BO（Business Object）业务对象

BO就是PO的组合
简单的例子比如说PO是一条交易记录，BO是一个人全部的交易记录集合对象
复杂点儿的例子PO1是交易记录，PO2是登录记录，PO3是商品浏览记录，PO4是添加购物车记录，PO5是搜索记录，BO是个人网站行为对象
BO是一个业务对象，一类业务就会对应一个BO，数量上没有限制，而且BO会有很多业务操作，也就是说除了get，set方法以外，BO会有很多针对自身数据进行计算的方法
为什么BO也画成横跨两层呢？原因是现在很多持久层框架自身就提供了数据组合的功能，因此BO有可能是在业务层由业务来拼装PO而成，也有可能是在数据库访问层由框架直接生成
很多情况下为了追求查询的效率，框架跳过PO直接生成BO的情况非常普遍，PO只是用来增删改使用



## 四、PO（Persistant Object）持久层对象

O比较好理解，就是数据库表对象，也就是实体类等同于Entity，这俩概念是一致的
简单说PO就是数据库中的记录，一个PO的数据结构对应着库中表的结构，表中的一条记录就是一个PO对象
通常PO里面除了get，set之外没有别的方法
对于PO来说，数量是相对固定的，一定不会超过数据库表的数量



## 五、DO

一个是阿里巴巴的开发手册中的定义
DO（ Data Object）这个等**同于上面的PO**
另一个是在DDD（Domain-Driven Design）领域驱动设计中
DO（Domain Object）这个等**同于上面的BO**



## 六、实际应用

1，PO这个没法省，不管叫PO还是Entity，怎么着都得有
2，一些工具类的系统和一些业务不是很复杂的系统DTO是可以和BO合并成一个，当业务扩展的时候注意拆分就行
3，VO是可以第一个优化掉的，展示业务不复杂的可以压根儿不要，直接用DTO
4，这也是最重要的一条，概念是给人用的，多人协作的时候一定要保证大家的概念一致，赶紧把这篇文章转发给跟你协作的人吧



## 七、打包








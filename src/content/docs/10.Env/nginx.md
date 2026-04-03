---
title: '或者自己手动下载之后解压压缩包'
---

## 一、Nginx简介

1. 反向代理

正向代理是代理客户端访问，个人理解相当于客户端使用的别的ip地址去访问服务器反向代理是代理服务器，开放一个都能访问的ip供客户端访问

- 正向代理：服务器不需要管是由那个客户端进行访问
- 反向代理：客户端不需要关心数据来自那个服务器

1. Nginx的作用

- 1.反向代理
- 2.负载均衡
- 3.动静分离
- 4.高并发

## 二、Nginx安装



### 安装方式一

使用dnf 工具进行现在，是yum 的升级版本。

```xml
dnf search nginx
dnf install nginx
#启动nginx
systemctl start nginx
systemctl status nginx
systemctl enable nginx
```

- 下载之后 `nginx `所在的文件夹

- - nginx的**配置文件**在`/etc/nginx/nginx.conf`
  - 自定义的配置文件放在`/etc/nginx/conf.d`
  - **项目文件**存放在`/usr/share/nginx/html/`
  - **日志文件**存放在`/var/log/nginx/`
  - 还有一些其他的安装文件都在`/etc/nginx`

[
](https://blog.csdn.net/s416676943s/article/details/113247855)



### 安装方式二(老版本)

1. 先安装Nginx所需要的依赖环境

- pce-8.37.tar.gz [pce 环境依赖下载地址](http://downloads.sourceforge.net/project/pcre/pcre/8.35/pcre-8.35.tar.gz)

1. 1. 联网下载

```bash
wget http://downloads.sourceforge.net/project/pcre/pcre/8.37/pcre-8.37.tar.gz
# 或者自己手动下载之后解压压缩包
#下载地址： http://downloads.sourceforge.net/project/pcre/pcre/8.35/pcre-8.35.tar.gz
```

1. 1. 之后进入文件夹之后进行`./configure`进行检查配置，回到 pcre 目录下执行 make，最后执行 make install 因该也可以make && make install进行安装没试过
   2. 作用：PCRE 作用是让 Nginx 支持 Rewrite 功能。

- openssl-1.0.1t.tar.gz
- zlib-1.2.3.tar.gz

1. 1. 安装 openssl  、zlib  、  gcc  依赖

```bash
yum -y install make zlib zlib-devel gcc-c++ libtool  openssl openssl-devel
```

- nginx-1.11.1.tar.gz [Nginx下载连接](https://nginx.org/en/download.html)

1. 1. 安装 nginx 解压之后执行 ./configure 进行配置，之后指定 make && make install 进行安装；
   2. 安装之后ngin所在的目录`cd /usr/local/nginx/sbin`

## 三、防火墙设置

- 在windows系统中访问linux中nginx，默认不能访问的，因为防火墙问题、

1. 1. （1）关闭防火墙
   2. （2）开放访问的端口号，80端口

- 查看开放的端口号
  firewall-cmd --list-all
- 设置开放的端口号
  firewall-cmd --add-service=http –permanent
  firewall-cmd --add-port=6378/tcp --permanent
- 重启防火墙
  firewall-cmd –reload



## 四、Nginx命令

- **注意(很重要)**：当win 环境下安装的nginx如果使用了 nginx.exe 启动之后，会出现即使停止了nginx 也可以访问项目

原因就是，你只杀死了`nginx` 进程，但是并没有杀死 `nginx.exe` 进行，所以 `pid` 文件消失了但是端口依然重复的占用，因此项目还是依然能访问

- **解决**：

```bash
tasklist /fi "IMAGENAME eq nginx.exe"
//找到nginx 进程之后 kill，会有很多pid 一点点全部杀死

taskkill /f /pid 21992
```

- **注意**(很重要)：就**不要**直接点击 `nginx.exe` 启动，**要**使用 `win` 环境 ` start nginx.exe` 命令来启动



- 1、查看nginx版本号

 	尽量使用` start nginx`启动，不要直接使用  `./nginx -v` 启动

- 2、启动 `nginx`
  `./nginx ` 或者 `nginx`
- 3、停止nginx
  `./nginx -s stop`
- 4、重新加载nginx配置文件
  `./nginx -s reload`
- 5、重启nginx
  `nginx -s reopen `

## 五、Nginx配置文件

nginx 安装目录下，其默认的配置文件都放在这个目录的conf 目录下，而主配置文件
nginx.conf 也在其中，后续对nginx 的使用基本上都是对此配置文件进行相应的修改



### 1、Ngnix.config示例

```bash
#
#这里的配置是用于设置用户的，因为默认认 nginx 并不是所有的文件夹都可以访问的
#当项目文件并不是放在 nginx 文件夹中的话，可以使用 root 用户，user root
#user  nginx;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;
    client_max_body_size 1024M;
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

#标准
server {
        listen       8099;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            # 给一个locatin 块，设置一个根项目
            root   /data/elv/master/elv-master;
            # 给该根设置一个入口文件
            index  index.html index.htm;

        if (!-e $request_filename) {
                rewrite ^(.*)$ /index.html?s=$1 last;
                break;
					}
       }

       location /api {
                proxy_pass   http://localhost:30005;
                proxy_set_header   Host             $http_host;# required for docker client's sake 也可以是$host还不知道有什么区别
                proxy_set_header   X-Real-IP        $remote_addr;# 获取用户的真实IP地址
                proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
                proxy_set_header  X-Forwarded-Proto $scheme;
            		proxy_read_timeout                  900;
        }

    }


    #gzip请求压缩
　　#Nginx实现资源压缩的原理是通过ngx_http_gzip_module模块拦截请求，并对需要做gzip的类型做gzip，ngx_http_gzip_module是Nginx默认集成的，不需要重新编译，直接开启即可。
　　#网站开启gzip压缩，不仅能够节省带宽，也能够快速响应用户的访问。
  #（启用 gzip 压缩功能）
    gzip  on;
  #（nginx 做前端代理时启用该选项，表示无论后端服务器的headers头返回什么信息，都无条件启用压缩）
    gzip_proxied any;
  # （最小压缩的页面，如果页面过于小，可能会越压越大，这里规定大于1K的页面才启用压缩）
    gzip_min_length  1024;
  # （设置系统获取几个单位的缓存用于存储gzip的压缩结果数据流）
    gzip_buffers    4 8k;
  # (压缩级别，1压缩比最小处理速度最快，9压缩比最大但处理最慢，同时也最消耗CPU,一般设置为3就可以了）
    gzip_comp_level 3;
  #  （什么类型的页面或文档启用压缩）
    gzip_types      text/plain text/css application/x-javascript application/javascript application/xml application/json;





}
```



### 2、顶级域名跳二级域名

> 因为**使用二级域名可以减短网址途径的长度**，也许会对收录起到很好的效果。 全站交织衔接，可以使搜索引擎能检索到，还主动生成网站地图。
>
> 所以通常情况下，网站都回将一级域名做重定向



~~~shell
    server {
    	listen       80;
    	server_name  yanan.store wwww.yanan.store;
    	return       301 http://www.yanan.store$request_uri;
    }

    server {
        listen       80;
        listen       [::]:80;
        server_name  www.yanan.store;
        root         /usr/share/nginx/dist;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        error_page 404 /404.html;
        location = /404.html {
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }
    }

~~~



### 3、第一部分：全局块

从配置文件开始到 `events`块之间的内容，主要会设置一些影响 `nginx `服务器整体运行的配置指令，主要包括配
置运行 `Nginx`服务器的用户（组）、允许生成的 `worker process` 数，进程PID 存放路径、日志存放路径和类型以
及配置文件的引入等。
比如上面第一行配置的：
这是 `Nginx `服务器并发处理服务的关键配置，`worker_processes` 值越大，可以支持的并发处理量也越多，但是
会受到硬件、软件等设备的制约，应该是根据内核的数量设置值和核心数一致。



### 4、第二部分：events块 工作模式配置

```bash
events {
# 指定最大可以同时接收的连接数量，这里一定要注意，最大连接数量是和worker processes共同决定的。
    worker_connections  1024;
# 配置指定nginx在收到一个新连接通知后尽可能多的接受更多的连接
    multi_accept on;
#  配置指定了线程轮询的方法，如果是linux2.6+，使用epoll，如果是BSD如Mac请使用Kqueue
    use epoll;
}
```

events 块涉及的指令主要影响Nginx 服务器与用户的网络连接，常用的设置包括是否开启对多work process
下的网络连接进行序列化，是否允许同时接收多个网络连接，选取哪种事件驱动模型来处理连接请求，每个word
process 可以同时支持的最大连接数等。
上述例子就表示每个work process 支持的最大连接数为1024.
这部分的配置对Nginx 的性能影响较大，在实际中应该灵活配置。



### 5、第三部分：http块

这算是Nginx 服务器配置中最频繁的部分，代理、缓存和日志定义等绝大多数功能和第三方模块的配置都在这里。

需要注意的是：http 块也可以包括http全局块、server 块。



#### ①、http 全局块

http全局块配置的指令包括文件引入、MIME-TYPE 定义、日志自定义、连接超时时间、单链接请求数上限等

#### ②、server 块

这块和虚拟主机有密切关系，虚拟主机从用户角度看，和一台独立的硬件主机是完全一样的，该技术的产生是为了

节省互联网服务器硬件成本。

每个http 块可以包括多个server 块，而每个server 块就相当于一个虚拟主机。

而每个server 块也分为全局server 块，以及可以同时包含多个locaton 块

##### 2.1、全局server 块

最常见的配置是本虚拟机主机的监听配置和本虚拟主机的名称或IP配置。

```bash
server {
				#对外监听的端口号
        listen       80;
        #访问nginx的地址
        server_name  localhost;
				#编码
        #charset koi8-r;
				#处理日志
        #access_log  logs/host.access.log  main;
        #错误日志
        # error_log    logs/error.log;
				#本地块 路由配置
        # 表示整个server虚拟主机内的根目录，所有当前主机中web项目的根目录
        #    ssl_certificate      cert.pem; #证书位置
   		  #    ssl_certificate_key  cert.key; #私钥位置

   		  #    ssl_session_cache    shared:SSL:1m;
  		  #    ssl_session_timeout  5m;
        root  ;
        # 用户访问web网站时的全局首页
        index ;

}
```



##### 2.2、location 块

- 一个 server 块可以配置多个location 块。



- 这块的主要作用是基于Nginx服务器接收到的请求字符串（例如server_name/uri-string），对虚拟主机名称
  （也可以是IP别名）之外的字符串（例如前面的/uri-string）进行匹配，对特定的请求进行处理。地址定向、数据缓
  存和应答控制等功能，还有许多第三方模块的配置也在这里进行。

```bash
      location / {
          	#所需要代理的应用访问地址
    				proxy_pass:127.0.0.1:8080
        		# 用于指定访问根目录时，访问虚拟主机的web目录,定义服务器的默认网站根目录位置。如果locationURL匹配的是子目录或文件，root没什么作用，一般放在server指令里面或/下。
            root   html;
            # 用户访问web网站时的全局首页 在不指定访问具体资源时，默认展示的资源文件列表,默认去上述路径中找到index.html或者index.htm
            # 如果包括多个文件，Nginx会根据文件的枚举顺序来检查，直到查找的文件存在；
            index  index.html index.htm;
            proxy_set_header X-real-ip $remote_addr;
    				proxy_set_header Host $http_host;
        }
```

- location ~* /js/.*/\.js 以 = 开头，表示精确匹配；如只匹配根目录结尾的请求，后面不能带任何字符串。

以^~ 开头，表示uri以某个常规字符串开头，不是正则匹配

以~ 开头，表示区分大小写的正则匹配;

以~* 开头，表示不区分大小写的正则匹配

以/ 开头，通用匹配, 如果没有其它匹配,任何请求都会匹配到

**location 的匹配顺序是“先匹配正则，再匹配普通”**



###### 1、proxy_pass 后面带/和不带/的区别

```js
server {
  location  /abc {
    proxy_pass http://server_url;
    }
  location  /abc {
    proxy_pass http://server_url/;
    }
}
//请求 /abc/b.html
http://server_url/abc/b.html (把/abc/b.html拼接到http://server_url之后)
http://server_url/b.html (把/abc/b.html的/abc去掉之后，拼接到http://server_url/之后)
```

###### 2、location 后面带/和不带/的区别

- 没有“**/**”结尾时，**location/abc/def** 可以匹配 **/abc/defghi** 请求，也可以匹配 **/abc/def/ghi** 等
- 而有“**/**”结尾时，**location/abc/def/** 不能匹配 **/abc/defghi** 请求，只能匹配 **/abc/def/anything** 这样的请求



##### 2.3 try_files文件判断指令

Nginx0.7.27 版本中开始加入的，它可以按顺序检查文件是否存在，并返回第一个找到的文件，如果未找到任何文件，则会调用**最后一个参数进行内部重定向，也就是重定向到本地loaction的文件**



- **通常用于阻止，使用router 的时候浏览器自动发送请求 ,**`history` 模式子路由刷新会`404`

```js
location / {
  //$uri 表示当前访问地址后面的path根据path 查找对应的文件，$uri/ 表示的就是文件路径
  //最后一个就是前面两个没有找到的话就直接重定向到之后一个地址
  try_files $uri $uri/ /index.html;
}
```



##### 2.4 rewrite 重定向配置详解

- 参数一：匹配path的 正则表达式 通常都是全部匹配
- 参数二：进行转发的 url
- 参数三：flag 是执行该条重写指令后的操作控制符。操作控制符有如下 4 种：

- - `last`：执行完当前重写规则跳转到新的 URI 后继续执行后续操作；
  - `break`：执行完当前重写规则跳转到新的 URI 后不再执行后续操作。不影响用户浏览器 URI 显示；
  - `redirect`：返回响应状态码 302 的临时重定向，返回内容是重定向 URI 的内容，但浏览器网址仍为请求时的 URI；
  - `permanent`：返回响应状态码 301 的永久重定向，返回内容是重定向 URI 的内容，浏览器网址变为重定向的 URI。



##### 2.5 root 指令

`root` 指令可以设定请求 `URL` 的本地文件根目录

```js
//当 root 指令在 location 指令域时，root 设置的是 location 匹配访问路径的上一层目录，
//样例中被请求文件的实际本地路径为 /data/web/flv/。
location /flv/ {
    root /data/web;
}
```



### 6、https

1. 申请域名类的证书，七牛云
2. 添加解析记录
3. 之后下载证书直接配

~~~shell
# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log notice;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    keepalive_timeout   65;
    types_hash_max_size 4096;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;

     server {
     #转发的地方没证书就不用在端口后面加 ssl
     listen       80;
     server_name  yanan.store wwww.yanan.store;
     return       301 https://www.yanan.store$request_uri;
    }

    server {
        listen       80;
        #有证书的serve 端口后面要加ssl，默认监听的是443，不加的化不生效
        listen       443 ssl;
        server_name  www.yanan.store;
        root         /usr/share/nginx/dist;
        ssl_certificate "/etc/nginx/ssl/www.yanan.store_cert_chain.pem";
        ssl_certificate_key "/etc/nginx/ssl/www.yanan.store_key.key";
        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        error_page 404 /404.html;
        location = /404.html {
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }
    }

# Settings for a TLS enabled server.
#
#    server {
#        listen       443 ssl http2;
#        [::]:443 据说是兼容ip的，不确定
#        listen       [::]:443 ssl http2;
#        server_name  _;
#        root         /usr/share/nginx/html;
#
#        ssl_certificate "/etc/pki/nginx/server.crt";
#        ssl_certificate_key "/etc/pki/nginx/private/server.key";
#        ssl_session_cache shared:SSL:1m;
#        ssl_session_timeout  10m;
#        ssl_ciphers PROFILE=SYSTEM;
#        ssl_prefer_server_ciphers on;
#
#        # Load configuration files for the default server block.
#        include /etc/nginx/default.d/*.conf;
#
#        error_page 404 /404.html;
#        location = /404.html {
#        }
#
#        error_page 500 502 503 504 /50x.html;
#        location = /50x.html {
#        }
#    }

}


~~~



## 六、负载均衡算法（五种）轮询+权重（默认算法）

```bash
http {
    # ... 省略其它配置
    upstream tomcats {
        server 192.168.0.100:8080;
        server 192.168.0.101:8080;
        server example.com:8080;
    }
    server {
        listen 80;
        location / {
            proxy_pass http://tomcats;
        }
    }
    # ... 省略其它配置
}
```

[






](https://blog.csdn.net/xyang81/article/details/51702900)



### 1、ip hash：对ip进行hash计算，可以解决机器负载均衡以后session需要重新登录，session共享的问题

```bash
   upstream tomcats {
   ip_hash;
    server 192.168.0.100:8080 weight=2 max_fails=3 fail_timeout=15;   # 2/6次
    server 192.168.0.101:8080 weight=3;  # 3/6次
    server 192.168.0.102:8080 weight=1 backup;  # 1/6次
    server 192.168.0.100:8080 max_conns=1000;
    server 192.168.0.101:8080 down;
    server example.com resolve;
}
```

### [       ](https://github.com/evanmiller/nginx_upstream_hash)

### 2、weight：权重

-  fail_timeout
  默认为10秒。某台Server达到max_fails次失败请求后，在fail_timeout期间内，nginx会认为这台Server暂时不可用，不会将请求分配给它
-  backup
  备份机，所有服务器挂了之后才会生效
-  max_conns
  限制分配给某台Server处理的最大连接数量，超过这个数量，将不会分配新的连接给它。默认为0，表示不限制。注意：1.5.9之后的版本才有这个配置
-  resolve
  将server指令配置的域名，指定域名解析服务器。需要在http模块下配置resolver指令，指定域名解析服务

```bash
   upstream tomcats {
    server 192.168.0.100:8080 weight=2 max_fails=3 fail_timeout=15;   # 2/6次
    server 192.168.0.101:8080 weight=3;  # 3/6次
    server 192.168.0.102:8080 weight=1 backup;  # 1/6次
    server 192.168.0.100:8080 max_conns=1000;
    server 192.168.0.101:8080 down;
    server example.com resolve;
}
```

### 3、fair（第三方）按后端服务器的响应时间来分配请求，响应时间短的优先分配。

下载fair模块源码

下载地址：https://github.com/xyang0917/nginx-upstream-fair

```bash
cd /opt
wget https://github.com/xyang0917/nginx-upstream-fair/archive/master.zip
unzip master.zip
# 重新编译nginx，将fair模块添加到编译参数
cd /opt/nginx-nginx-1.10.0
./configure --prefix=/opt/nginx --add-module=/opt/nginx-upstream-fair-master
make
```

**注意：**不要执行make install，这样会覆盖之前nginx的配置
3> 将新编译的nginx可执行程序拷贝到/opt/nginx/sbin/目录下，覆盖之前安装的nginx
编译后的nginx执行程序，放在nginx源码的objs目录下

```bash
19.ps -aux | grep nginx
kill -9 nginx进程ID  # 停止nginx服务
cp /opt/nginx-1.10.0/objs/nginx /opt/nginx/sbin/  # 覆盖旧的nginx
nginx # 启动服务
```

示例开启

```bash
upstream tomcats {
    fair;
    server 192.168.0.100:8080;
    server 192.168.0.101:8080;
    server 192.168.0.102:8080;
}
```

### 4、url hash：对url进行hash计算，可以使资源均匀分布，例如图片资源均匀分布；

 1.7.2版本以后，url_hash模块已经集成到了nginx源码当中，不需要单独安装。之前的版本仍需要单独安装，下载地址：https://github.com/evanmiller/nginx_upstream_hash

 安装方法和fair模块一样，先下载url_hash源码，然后重新编译nginx源码，将url_hash模块添加到编译配置参数当中，最后将编译后生成的nginx二进制文件替换之前安装的nginx二进制文件即可。

```bash
upstream tomcats {
    server 192.168.0.100:8080;
    server 192.168.0.101:8080;
    server 192.168.0.102:8080;
    hash $request_uri;
}
```

last_connection：最小连接数



least_time：最少响应时间

## 七、部署vue示例

```bash
 server {
        listen       8888;#默认端口是80，如果端口没被占用可以不用修改
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;
        root        E:/vue/my_project/dist;#vue项目的打包后的dist

        location / {
            try_files $uri $uri/ @router;#需要指向下面的@router否则会出现vue的路由在nginx中刷新出现404
            index  index.html index.htm;
        }
        #对应上面的@router，主要原因是路由的路径资源并不是一个真实的路径，所以无法找到具体的文件
        #因此需要rewrite到index.html中，然后交给路由在处理请求资源
        location @router {
            rewrite ^.*$ /index.html last;
        }
        #.......其他部分省略
  }
```



## 八、动静分离
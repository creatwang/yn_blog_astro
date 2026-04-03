---
title: 'linux 常用命令'
---



# linux 常用命令

## 一、部署的linux命令

1. 后台启动jar包：nohup java -jar ruoyi.jar 
2. 查看java进程：px -aux | grep java 或者` ps –ef|grep tomcat` 
3. 打包压缩： `tar -zcvf  文件名.tar.gz  文件`
4. 解压： `tar -zxvf tar.gz压缩文件` 

- - tar 命令系统自带不用安装

1. 删除(慎重使用)：` rm -rf  文件名`
2. 杀死进程：`kill -9 prot`
3. 查看日志：`tail  –f catalina.out/ tail  –f *.out`
4. 修改主机名：`sudo hostnamectl set-hostname <newhostname>`
5. 使用tomcat启动应用的时候，访问路径后面都会跟着webapps下面的应用文件夹名称，需要修改为/路径下访问，在service.xml配置文件里 找到host标签在里面添加。

```xml
<Host name="localhost"  appBase="webapps"
      unpackWARs="true" autoDeploy="true">
  
  <!--开启了Tomcat的reloadable=true,那么每当相关文件改变时，Tomcat会停止web app并释放内存,然后重新加载web app.这实在是个浩大的工程。-->
  <!--添加-->
  <Context docBase="d:tomcat/weapp/Asset" path="/" reloadable="false"/>
  <!-- SingleSignOn valve, share authentication between web applications
             Documentation at: /docs/config/valve.html -->
  <!--
        <Valve className="org.apache.catalina.authenticator.SingleSignOn" />
        -->
  
  <!-- Access log processes all example.
             Documentation at: /docs/config/valve.html
             Note: The pattern used is equivalent to using pattern="common" -->
  <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
         prefix="localhost_access_log." suffix=".txt"
         pattern="%h %l %u %t &quot;%r&quot; %s %b" />
  
      </Host>
```



1. 查看 `log` 实时日志 `tail -f sys_info.log`

## 二、配置类linux命令

1. 查看 `linux` 的 `ip` 地址 `ifconfig`
1. `which git`: 查看软件执行文件的路径

## 三、查看内存-运行-配置命令

du -sh *查看当前文件夹下面的目录文件所占用内存的大小

`df -h `查看磁盘分配



## 四、修改文件

```bash
:w            - 保存文件，不退出 vim
:w file  -将修改另外保存到 file 中，不退出 vim
:w!          -强制保存，不退出 vim
:wq          -保存文件，退出 vim
:wq!        -强制保存文件，退出 vim
:q            -不保存文件，退出 vim
:q!          -不保存文件，强制退出 vim
:e!          -放弃所有修改，从上次保存文件开始再编辑
```



## 五、文件夹操作

1. `pwd`： 查看当前路径
2. `mv dist html` : 有文件夹修改文件夹，没有的话修改名字
3. `rm -rf dist`：强制删除文件(确定好在用，曾经将这个命令删除了一个数据库)
4. `ll` 和 `ls`： `-a` 可以查看隐藏文件 查看当前文件夹下的所有文件及路径



## 六、权限类操作

1. 提升当前用户，`sodo su root` ，`su root`
2. 给用户分配文件夹操作权限：`chmod jenkins 777 nginx` 对文件夹可读可写可修改



## 七、shell

- 查看当前 `shell`：`echo $SHELL`
- 查看可用 `shell`： `cat /etc/shells` 或者 `chsh -l`
- 切换 `shell`： `chsh -s /bin/ksh` 或者 `usermod -s /bin/ksh root`
---
title: 'MongoDB'
---

# MongoDB

> `mongodb`，区分于关系型数据库的一大特点，就是自由，**不限制于字段的格式，和字段的一致性**

- 启动服务建立链接

- ##### 库

- ##### 集合

- ##### 文档记录

- ##### 字段



## 一、启动数据库

- ##### `mongod` 是启动 `mongo` 的服务

  > 启动服务的时候需要指定，数据库文件保存的路径。

- ##### `mongo` 是链接 `mongo` 的客户端

- ###### （1）windows

```bash
mongod --dbpath e:/data/db
mongo
```

- ###### （2）mac

```bash
mongod --config /usr/local/etc/mongod.conf
mongo
```



## 二、Mongo 的常用命令



### 1、DB命令

- **(1)**Help查看命令提示

  ```js
  help
  db.stats()
  db.help()
  db.test.help()
  db.test.find().help()
  ```

- **(2)创建/切换**数据库

  > **注意**：创建之后是看不见数据库的，**必须**要添加一个集合之后才能显示

  ```sql
  use music
  ```

- **(3)**查询当前链接的所有数据库

  ```sql
  show dbs
  ```

- **(4)**查看**当前**使用的数据库

  ```sql
  db       /db.getName()
  ```

- **(5)**显示当前DB**状态**

  ```sql
  db.stats()
  ```

- **(6)**查看当前DB**版本**

  ```sql
  db.version()
  ```

- **(7)**查看当前DB的**链接机器地址**

  ```sql
  db.getMongo()
  ```

- **(8)删除**数据库

  ```sql
  db.dropDatabase()
  ```



### 2、集合命令

- **(1)**创建一个聚集集合

  > **注意**：如果**超过**了 max 设置的最大记录条数，就会将**第一条顶掉**

  ```sql
  db.createCollection(
      "collName",
      {
     		--最大存储空间为5m，单位kb
          size:5242880,
          --好像4版本之后就没有这个参数了
          capped:true,
          --最多存5000条记录
          max:5000
      }
  );
  --获取当前集合
  db.getCollection("account");
  ```



- **(3)**得到当前db的**所有集合**
  `db.getCollectionNames();`



- **(4)**显示当前db所有集合的状态
  `db.printCollectionStats();`



- **(5)**删除集合、数据库
  `db.users.drop();`



### 3、crud方法

#### 添加 save/insert 可批量

- insert() 和 save()的区别

1. 区别一：

   - `insert()`直接往库中插入数据，**不更新**已存在的重复数据

     > 只有id相同的情况下，会被认为是重复的数据

   - `save()` 往数据库插入数据时，会**更新**重复的数据。

2. 区别二：
       insert() 可以直接插入一个列表，无需遍历，效率高。
       save() 不能直接插入列表，需要遍历列表，逐一插入。



```sql
--添加一条
db.users.save((name:'zhangsan',age:25,sex:true));
--添加多条，使用数组包裹
db.users.save([
{name:'zhangsan',age:25,sex:true},
{name:"kerin",age:100)
]);
```



#### 修改 update

- 参数：
  - 参数一(`Object`)：参数设置查询条件。
  - 参数二(`Object`)：需要通过**特定的指令**来决定修改类型，之后通过**对象写法修改指定字段**的值
  - `upsert`：为布尔型可选项，表示如果不存在 update 的记录，是否插入这个新的文档。true 为插入；**默认为 false，不插入。**
  - `multi`：也是布尔型可选项，**默认是 false，只更新找到的第一条记录**。如果为 true，则把按条件查询出来的记录全部更新。

```sql
db.users.update(
    --条件：age等于25的文档
    {age:25},
    -- 修该name为changeName
    {$set:{name:'changeName'}},
    --默认就是false，不存在的话就不处理
    false,
    --默认false只会修改匹配的第一条数据，主要修改的就是这个，
    true);
--相当于：update users set name='changeName'where age=25;

db.users.update(
    {name:'Lisi'},
    --increment 的缩写可以将指定的number类型的字段在原有的基础上添加
    {$inc:{age:50)),
    false,
    true);
--相当于：update users set age=age+50 where name=Lisi';

db.users.update(
    {name:'Lisi'},
    --将number指定的字段number类型进行减法
    {$inc:{age:-50},$set:{name:'kerwin'}},
    false,
    true);
--相当于：update users set age=age+50,name=hoho'where name=kerwin';
```



#### 删除 remove

```sql
db.users.remove({age:132});
--删除集合中所有记录
db.users.remove()
```



### 4、查询

- **参数一：** ：可选，使用查询操作符指定**查询条件**

- **参数二：** ：可选，**过滤**返回的字段，只显示自己设置的字段

  ```sql
  --{name: "zhangsan", address: "天津曲艺协会"}
  -- 这样的话只会显示 {name: "zhangsan"}
  -- 0 是不显示，1 是显示
  db.user.find({}, {name: 1})
  ```





#### 条件查询

> 条件指令 `$gt、$gte、$lt、$lte、$or、count()`

```sql
(1)查询所有记录
db.userlnfo.find();
相当于：select * from userlnfo


(2)查询某字段去重后数据
db.userlnfo.distinct("name"):
相当于：select distict name from userlnfo,

(3)查询age=22的记录
db.userlnfo.find({"age":22));
相当于：select*from userlnfo where age=22

(4)查询age>22/< 22 的记录
db.userlnfo.find({age:{$gt/$lt:22))):
相当于：select*from userlnfo where age>22


(5)查询age>=25/age<=25 的记录
db.userlnfo.find(fage:{$gte/$Ite:25)));
相当于：select*from userlnfo where age>=25


(6)查询age>=23 并且 age<=26
db.userlnfo.find(fage:($gte:23,$Ite:26)));

(7)查询当前记录的条数
-- total 查询
db.userlnfo.find().count()

(8)多条件查询
--注意：$or 后面跟的是数组
db.userlnfo.find({$or:[{age: 34}, {age: 56}]})
-- 要是 and 与条件的话直接在对象内多添加字段即可
db.userlnfo.find({name: "zhangsan", age: 34})


(9)单条查询
db.userlnfo.findOne()
```



#### 排序sort，

- ##### -1: 是降序

- ##### 1：是升序

~~~sql
db.userinfo.find().sort({age: -1})
~~~



#### 查询条数 skip，limit

- ##### `skip`：跳过多少条

- ##### `limit`：查询多少条

~~~sql
--这样的话(currentPage-1) 当第一页的时候就是不跳过，从0开始
db.userinfo.sort({age: -1}).skip((currentPage-1) * limit).limit(10)
~~~



#### 模糊查询

> Mongodb 中使用的是**正则表达式**

- **注意**：正则表达式是不需要引号包裹的

```sql
(7)查询name中包含mongo的数据，模糊查询
db.userlnfo.find({name:/mongo/);
--/ 相当于 % 简单说就是正则表达式
select from userlnfo where name like '%mongo%';


(8)查询name中以nongo:开头的
db.userlnfo.find({name:/^mongo/);
select from userlnfo where name like 'mongo%';
```










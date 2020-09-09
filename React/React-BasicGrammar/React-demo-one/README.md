# 前言
教程会存在一些不全的情况，后续会持续更新，有疑问的地方可以加微信（halfsoulsummer）联系我，看到会及时回复
<a name="LilP8"></a>
# 启动
```typescript
cnpm  start
```
<a name="bmVSl"></a>
# 数据
里面的数据都是在根目录下的 db.json 里面<br />用 **mockjs **模拟的假数据 <br />**安装：mock.js**
```typescript
cnpm   install    mock.js   -save
```
**安装 json-server**
```typescript
cnpm   install    json-server   -save
```
**根目录下启动  :**
```typescript
json-server  --watch   db.json --port 8000
```
**账号和密码：**<br />**
账号：admin
密码：123456

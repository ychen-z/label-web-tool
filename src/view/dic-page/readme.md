## 新增接口
###  1、更新字典接口： PUT /mongo/dictionaries
```
    入参：
    dictionaryDescribe: "1",
    dictionaryName: "测试数据",
    key: "1"

    输出：
    status: 200,
    message: 查查成功,
    data: null
```


###  2、查字典详情接口： get /mongo/dictionaries/:key
```
    输出：
    status: 200,
    message: 查查成功,
    data: null
```
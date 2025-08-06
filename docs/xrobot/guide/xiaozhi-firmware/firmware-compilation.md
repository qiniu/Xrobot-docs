# esp32固件编译

## 第1步 准备好ota地址

https://xrobo.qiniuapi.com/v1/ota/

## 第2步 配置环境
### Windows

先按照这个教程配置项目环境[《Windows搭建 ESP IDF 5.3.2开发环境以及编译小智》](https://icnynnzcwou8.feishu.cn/wiki/JEYDwTTALi5s2zkGlFGcDiRknXf)

### Mac / Linux

参考该教程进行配置：https://docs.espressif.com/projects/esp-idf/zh_CN/v5.5/esp32s3/get-started/linux-macos-setup.html

## 第3步 打开配置文件
配置好编译环境后，下载虾哥iaozhi-esp32项目源码，

从这里下载虾哥[xiaozhi-esp32项目源码](https://github.com/78/xiaozhi-esp32)。

下载后，打开`xiaozhi-esp32/main/Kconfig.projbuild`文件。

## 第4步 修改OTA地址

找到`OTA_URL`的`default`的内容，把`https://api.tenclass.net/xiaozhi/ota/`
   改成·`https://xrobo.qiniuapi.com/v1/ota/`，就把内容改成这个。

修改前：
```
config OTA_URL
    string "Default OTA URL"
    default "https://api.tenclass.net/xiaozhi/ota/"
    help
        The application will access this URL to check for new firmwares and server address.
```
修改后：
```
config OTA_URL
    string "Default OTA URL"
    default "https://xrobo.qiniuapi.com/v1/ota/"
    help
        The application will access this URL to check for new firmwares and server address.
```

## 第4步 设置编译参数

设置编译参数

```
# 终端命令行进入xiaozhi-esp32的根目录
cd xiaozhi-esp32
# 例如我使用的板子是esp32s3，所以设置编译目标为esp32s3，如果你的板子是其他型号，请替换成对应的型号
idf.py set-target esp32s3
# 进入菜单配置
idf.py menuconfig
```

进入菜单配置后，再进入`Xiaozhi Assistant`，将`BOARD_TYPE`设置你板子的具体型号
保存退出，回到终端命令行。

## 第5步 编译固件

```
idf.py build
```

## 第6步 打包bin固件

```
cd scripts
python release.py
```

上面的打包命令执行完成后，会在项目根目录下的`build`目录下生成固件文件`merged-binary.bin`。
这个`merged-binary.bin`就是要烧录到硬件上的固件文件。

注意：如果执行到第二命令后，报了“zip”相关的错误，请忽略这个错误，只要`build`目录下生成固件文件`merged-binary.bin`
，对你没有太大影响，请继续。

# Xrobot-docs

## 安装

```shell
npm install
```

## 调试

```shell
npm run docs:dev
```

浏览器打开 <http://localhost:5173>

## 部署

```shell
npm run docs:build
```

本地预览，执行下列命令后，生成一个本地静态 Web 服务 <http://localhost:4173>，该服务以 .vitepress/dist 作为源文件

```shell
npm run docs:preview
```

# docker 部署
构建docker
```shell
cd $PROJECT_ROOT_PATH
docker build -t xrobot-docs:$TAG .
```

停止现有的文档 docker服务
```
docker stop xrobot-docs
docker rm xrobot-docs

运行新的docker服务
```shell
docker run -d -p 4173:4173 xrobot-docs
```


# 使用 Node.js 官方镜像作为基础镜像
FROM registry-kubesphere-hd.qiniu.io/miku-aigc/node:20

# 设置工作目录
WORKDIR /app

# 复制项目文件
COPY . .

# 安装依赖
RUN npm install

# 构建 VitePress 文档
RUN npm run docs:build

# 暴露服务端口
EXPOSE 4173

# 启动本地静态 Web 服务
CMD ["npm", "run", "docs:preview"]
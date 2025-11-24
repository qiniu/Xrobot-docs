#!/bin/bash
# 脚本名称：deploy_xrobot_docs.sh
# 功能描述：自动化构建xrobot-docs镜像、重启容器并清理旧镜像

# ==============================================
# 1. 基础配置与参数检查
# ==============================================
PROJECT_ROOT_PATH="/disk1/Xrobot-docs"
TARGET_PORT="4173"
IMAGE_NAME="xrobot-docs"

# 检查项目根路径是否存在
if [ ! -d "$PROJECT_ROOT_PATH" ]; then
    echo -e "\033[31m错误：项目根路径 $PROJECT_ROOT_PATH 不存在，请检查配置！\033[0m"
    exit 1
fi

# ==============================================
# 2. 动态获取最新版本号
# ==============================================
echo -e "\033[34m正在获取最新版本号...\033[0m"

手动输入版本号
read -p "请输入待编译镜像 xrobot-docs 的版本号（如1.0.3）：" TAG

if [ -z "$TAG" ]; then
    echo -e "\033[31m错误：版本号获取失败！\033[0m"
    exit 1
fi
echo -e "\033[32m成功获取版本号：$TAG\033[0m"

# ==============================================
# 3. 切换到项目根路径并构建Docker镜像
# ==============================================
echo -e "\033[34m正在切换到项目根路径：$PROJECT_ROOT_PATH\033[0m"
cd "$PROJECT_ROOT_PATH" || {
    echo -e "\033[31m错误：无法切换到项目根路径！\033[0m"
    exit 1
}

echo -e "\033[34m开始构建Docker镜像：$IMAGE_NAME:$TAG\033[0m"
docker build -t "$IMAGE_NAME:$TAG" .
if [ $? -ne 0 ]; then
    echo -e "\033[31m错误：Docker镜像构建失败！\033[0m"
    exit 1
fi
echo -e "\033[32mDocker镜像构建成功！\033[0m"

# ==============================================
# 4. 停止并删除旧容器
# ==============================================
echo -e "\033[34m正在清理旧容器...\033[0m"
OLD_CONTAINER_ID=$(docker ps -aq -f name=$IMAGE_NAME)
if [ -n "$OLD_CONTAINER_ID" ]; then
    # 记录正在使用的旧镜像
    OLD_IMAGE=$(docker inspect -f '{{.Config.Image}}' "$OLD_CONTAINER_ID" 2>/dev/null)
    
    echo -e "\033[34m停止旧容器...\033[0m"
    docker stop "$IMAGE_NAME"
    
    echo -e "\033[34m删除旧容器...\033[0m"
    docker rm "$IMAGE_NAME"
    if [ $? -ne 0 ]; then
        echo -e "\033[31m错误：删除旧容器失败！\033[0m"
        exit 1
    fi
else
    echo -e "\033[32m未检测到旧容器，无需清理\033[0m"
    OLD_IMAGE=""
fi

# ==============================================
# 5. 启动新的Docker容器
# ==============================================
echo -e "\033[34m正在启动新容器...\033[0m"
docker run --name "$IMAGE_NAME" -d -p "$TARGET_PORT:$TARGET_PORT" --restart=always "$IMAGE_NAME:$TAG"
if [ $? -ne 0 ]; then
    echo -e "\033[31m错误：新容器启动失败！\033[0m"
    exit 1
fi

# ==============================================
# 6. 删除旧镜像（如果存在且与新镜像不同）
# ==============================================
if [ -n "$OLD_IMAGE" ] && [ "$OLD_IMAGE" != "$IMAGE_NAME:$TAG" ]; then
    echo -e "\033[34m正在删除旧镜像：$OLD_IMAGE\033[0m"
    docker rmi "$OLD_IMAGE"
    if [ $? -eq 0 ]; then
        echo -e "\033[32m旧镜像 $OLD_IMAGE 已成功删除\033[0m"
    else
        echo -e "\033[33m警告：旧镜像 $OLD_IMAGE 删除失败，可能被其他容器引用\033[0m"
    fi
fi

# ==============================================
# 7. 验证部署结果
# ==============================================
echo -e "\033[34m正在验证部署结果...\033[0m"
sleep 3
CONTAINER_STATUS=$(docker inspect -f '{{.State.Status}}' "$IMAGE_NAME" 2>/dev/null)

if [ "$CONTAINER_STATUS" = "running" ]; then
    echo -e "\033[32m==============================================\033[0m"
    echo -e "\033[32m部署成功！\033[0m"
    echo -e "\033[32m容器名称：$IMAGE_NAME\033[0m"
    echo -e "\033[32m镜像版本：$IMAGE_NAME:$TAG\033[0m"
    echo -e "\033[32m访问地址：http://localhost:$TARGET_PORT\033[0m"
    echo -e "\033[32m==============================================\033[0m"
else
    echo -e "\033[31m部署失败：容器状态异常\033[0m"
    exit 1
fi

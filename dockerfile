# 最佳 node lts 镜像
# ref → https://juejin.cn/post/7175883730140004407#heading-13
FROM node:lts-bullseye-slim

# 设置工作目录
WORKDIR /app

# 复制文件到工作目录
COPY . .

# 安装项目的依赖
RUN npm install

# nuxt 打包
RUN npx nuxt build

# 暴露端口，可以根据需要修改端口号
ENV PORT=3000
EXPOSE 3000

# 运行 Nuxt 3 项目
CMD ["node", ".output/server/index.mjs"]

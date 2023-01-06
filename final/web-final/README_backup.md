### Web Programming Final Project - 音樂創作者交流平台
1. **前端安裝**
在 web-final 底下執行：
```bash=
create-react-app frontend
cd frontend
yarn add axios react-rating-stars-component react-icons react-router-dom
```
* 註: create-react-app 5.0 之後的指令是 `npx create-react-app frontend`


2. **後端安裝**
在 web-final 底下執行：
```bash=
mkdir backend
cd backend
yarn init -y
yarn add cors dotenv express mongoose nodemon
yarn add -D @babel/cli @babel/core @babel/node @babel/preset-env
```

3. 在 `web-final/backend` 內依照下面的內容執行:
```bash=
// 增加一個 .babelrc 的設定檔，內容如下：
{
  "presets": [
    "@babel/preset-env"
  ]
}

// 修改 package.json，新增底下設定:
"scripts": {
    "server": "nodemon src/server.js --ext js --exec babel-node"
},
```

###### tags: `Web_Programming`

# Online Music Platform: MUSTOPIA

This is an online music platform implemented with [React](https://reactjs.org/) and [MongoDB](https://www.mongodb.com/).  

Mustopia is a full-service creative platfom, built to connect potential artists like me and you. Unlike most job-seeking platforms or social networks, Mustopia is dedicated to support aspiring artists, freelancers, start-ups, hobbists like you and me. Veteran or layerman, professional or not, we believe everyone has something to bring to the table.

## Clone Project

1. 在 `final` 底下，執行：
```bash=
git clone ${git_url}
```

## Install Packages
1. **前端安裝**  
    在 `final` 底下，執行：
```bash=
cd frontend
yarn install
```
2. **後端安裝**  
    在 `final` 底下，執行：
```bash=
cd backend
yarn install
```

## 有關.env以及.env.default
.env.defaults的內容如下
```
MONGO_URL=
CLIENT_ID=
MODE=
AXIOS_PORT=
WSS_PORT=
```
- MONGO_URL:用來存取mongodb，請在[MongoDB Atlas](https://www.mongodb.com/atlas/database)申請帳號並存取URL
    - `MONGO_URL=mongodb+srv://<user_name>:<password>@<cluster_name>.kut62cp.mongodb.net/?retryWrites=true&w=majority`
- CLIENT_ID:程式碼中有將圖片上傳至[imgur](https://imgur.com/)並獲取圖片URL的功能，請至[imgur sign up](https://imgur.com/register?redirect=%2F)並獲取[id](https://api.imgur.com/)
    - :warning: [imgur sign up](https://imgur.com/register?redirect=%2F)的網頁似乎不支援台灣的手機號碼
    - 如果真的有獲取client id的困難，可使用`CLIENT_ID=6a5400948b3b376`，但僅限測試時使用
- MODE:用來決定程式一開始是否reset mongodb database，如果需要reset，請將mode設定為`MODE=RESET`
- AXIOS_PORT:用來決定`backend`server的AXIOS PORT位置
    - :warning: 預設值為4000，如果設定成4000以外的port number請在`frontend/src/container/instance.js`中一併更改port number
- WSS_PORT:用來決定`backend`server的WSS PORT位置

## localhost端測試
1. **開啟前端**  
    在 `final` 底下，執行`yarn start`
2. **開啟後端**  
    在 `final` 底下，執行`yarn server`

:warning: 圖片上傳至[imgur](https://imgur.com/)的功能在hostname=localhost時會被擋掉，如要測試此功能，請手動將網頁由localhost:3000切換至127.0.0.1:3000

## 實現的功能
1. Sign up and log in
    - 相關檔案: SignUp.js, LogIn.js, useUser.js, Reg.js
    - 功能描述: 
      - 當使用者未sign up時，navigation bar只會出現Browse以及MUSTOPIA分頁
      - 當使用者未sign up後，navigation bar會額外出現HubPage, User分頁
      - 使用者在sign up時，需填寫sign up表單，並將資料送至後端(Reg.js)檢查user使否存在，如果已經存在相同名字，則不新增user;反之，則將新的user加入database中
      - sign up表單包含username, email, password, password_confirmation, personal_icon等部分，其中username, password, password_confirmation為必填資訊，email與personal_icon為非必填資訊
      - 有關password與password_confirmation檢查： password與password_confirmation必須相同才會通過檢查
      - 有關email格式檢查: 如果user有填寫email資訊，則必須包含\@以及.com或.net或.org才會通過檢查
      - 有關personal_icon: user在sign up時可選擇是否上傳圖片，此圖片會先送至[imgur](https://imgur.com/)儲存後轉換為url，再將此url儲存於後端  
      :warning: 如果必須上傳圖片，須將網址由localhost:3000改成127.0.0.1:3000再進行上傳，如果是[deploy網頁](https://mustopia.up.railway.app/)則不會有此問題  
      :warning: 圖片上傳需要一段時間(20~30秒)，有進行async/await處理，不過如果sign up並上傳圖片後，馬上log in，server需要一段時間處理
      - 密碼hash處理： user在sign up表單中輸入的密碼將會經過SHA-256加密後傳至後端的database，因此真正的密碼只有user自己知道
3. Browse
    - 功能描述:
        - 支援未sign up的使用者以及已經sign up的user
        - user可以在這個tab中根據不同需求進行篩選
            - Music(如不同的樂器種類)
            - Artist(如彈奏不同樂器的演奏者)
            - Opportunities(如尋找特定的薪水以上的職缺)
        - 按下Search篩選後會出現符合篩選條件的user
        - 點選出現的項目可以瀏覽該user的CV(有關CV的描述請見User)
5. HubPage
    - 功能描述:
        - 支援已經sign up的user
        - 在HubPage頁面可瀏覽
            - Hubs(詳情請見Hub): 可看到該user目前有哪些已經加入的hub
            - Invitations: 可看到目前該user有收到哪些加入hub的邀請
        - 在HubPage頁面中也可以決定進入/離開某個已經加入的Hub，接受/拒絕某個Invitaion
6. Hub
    - 功能描述:
        - 當user在HubPage頁面中點擊進入Hub時會切換至此頁
        - 在Hub頁面中user可選擇
            - 編輯/刪除某個已經存在的post
            - 在已經存在的post中留下comment
            - 新增額外的post
            - note: delete相關功能僅在前端實現
        - 其中post以及comment的內容支援markdown語法
            - 舉例: # heading 會被視為\<h1\>heading\</h1\>並以h1字體顯示於畫面中
            - 支援的markdown語法包含但不限於:
                - heading
                - blockquote
                - bold and italic
                - code formating
                - lists
                - link
                - images
            - 實現方式: 使用[showdown](https://github.com/showdownjs/showdown)將markdown語法轉成html string後，使用[html-react-parser](https://www.npmjs.com/package/html-react-parser)將其轉成react components並render在畫面中
8. User(呈現該使用者的CV)
    - 功能描述:
        - 呈現分作兩種模式:
            1. Me: user 為 CV 擁有者本人，user 擁有新增、刪除、更動資料之權限
            2. They: user 並非 CV 擁有者，僅有瀏覽權限
        - 頁面呈現資料一上而下分別為
            1. User Name
            2. Tags
            3. Introduction
            4. CV
            5. Musics
            6. Collaboration Opportunities 
            7. Contact
        - 點擊 Music 及 Opportunity 方塊時跳出詳細資料 Modal
        -  Me 模式之限定功能:
            - 雙擊現存 Tags, Introduction, CV, Contact 介面，待字體轉為黃色後可直接打字更動資料
            - 點擊 Introduction, CV, Musics, Collaboration Opportunities 處 '+' 鍵可以新增資料
            - 點擊 Introduction, CV, Musics, Collaboration Opportunities 處 'delete' 按鈕或字樣可刪除資料
            - Opportunities 分為招募(open)及關閉(closed)兩種模式，點籍open/closed字樣可切換模式
        - They 模式之限定功能:
            - 在 Opportunity Modal中，若該 Opportunity 為招募模式 (open) 可點擊 apply/unapply 按鍵，將使用者資訊傳及招募者進行連絡
        - delete相關功能僅在前端實現
9. Mustopia(MainPage)
    - 呈現網站故事, How we connect, OUR VISION, Credits

## deploy網站
最終deploy的[結果網站](https://mustopia.up.railway.app/)

## demo影片
demo[影片連結](https://vimeo.com/786570764/9435ede72e)

## 各個組員的分工 
- 顏柏傑 b08901198
    - Planned and directed the completion of the project.
    - Connected frontend and backend files to ensure the executability of the website as a whole.
    - Designed model files and their passings to optimize the speed and performance of the website.
- 邱品誠 b07901190
    - Directed, reviewed, and analyzed to optimize team workflow.
    - Researched potential resources and implemented them for makrdown language and file-uploading features.
    - Developed hub features to support inter-team reactions among users.
- 胡雅晴 b08901201
    - Setting and scehduling phased tasks to align expectations.
    - Envisioned, devised, and built personal profile framework for intuitive user building, reading, and updating.
    - Drafted and executed Css styling files for optimizied user experience.


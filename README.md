# ProjectPicker_FE


---

### 리액트 프로젝트 시작하기

1. nodejs 설치
2. create-react-app 설치 (최초1번)
```
$ npm install -g create-react-app
```

3. react프로젝트 생성
```
$ npx create-react-app 프로젝트이름
```

4. react 프로젝트 실행
```
$ cd 프로젝트폴더
$ npm start
```
- http://localhost:3000 에서 프론트엔드 서버 실행

5. 추가 라이브러리
```
$ npm install react-icons classnames
$ npm install reactstrap bootstrap
$ npm install @mui/material @emotion/react @emotion/styled
$ npm install @mui/icons-material
$ npm install react-router-dom
```


react icons - 아이콘 사용[https://react-icons.github.io/react-icons]

사용법 예시
```
import{ MdDone, MdDelete } from 'react-icons/md';

<MdDone/>
<MdDelete/>
```


---
### 디렉터리

post
 ㄴ css
      ㄴ post.css
 ㄴ CommentsItem.js : 댓글 
 ㄴ PostDetail.js : 게시글 내부 
 ㄴ PostItem.js : 게시판 리스트, 해시태그
 ㄴ PostList.js: 게시판 리스트 ( PostItem 가져와서 사용)
 ㄴ PostMain : 게시판(/post) 에서의 게시판 리스트 (PostList 가져와서 사용)
 ㄴ PostSearch.js : 게시글 검색 (헤더 가져오고, PostList 가져와서 사용)
 ㄴ PostWrite.js : 게시글 등록 ( 헤더 가져와서 사용)


---
### manifest.json
웹앱 매니페스트란 앱에 대한 정보를 담고 JSON 파일이다. 배경색은 어떠한 색인지, 앱의 이름은 무엇인지, 홈스크린 화면에 추가할 때 아이콘은 어떤 것인지 등의 정보를 담고 있다. 웹앱 매니페스트는 manifest.json 파일명을 대부분 사용한다.

short_name : 사용자 홈 화면에서 아이콘 이름으로 사용

name : 웹앱 설치 배너에 사용

icons : 홈 화면에 추가할때 사용할 이미지

start_url : 웹앱 실행시 시작되는 URL 주소

display : 디스플레이 유형(fullscreen, 

standalone, browser 중 설정)

theme_color : 상단 툴바의 색상

background_color : 스플래시 화면 배경 색상

orientation : 특정 방향을 강제로 지정

(landscape, portrait 중 설정)


---
## 단축키!

rafce : 자동 완성

shift + alt + 방향키(위아래) : 복사


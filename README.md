# Skully

1. npm 설치

2. 서버 실행
  - `$ npm install`
  - `$ npm run start`

3. pytorch backend와 연결 방법
  - `/src/pages/Home/index.js` 43번째 줄에 url 수정 필요
  - skull_estimation backend는 ec2 혹은 local 배포 후 ngrok 으로 url 생성
  - 그 이후 43번째 줄에 url 변경하여 입력 후 테스트 해보기

4. 서버 배포 방법
  - `$ npm run build`
  - build 완료 시 `/build` 폴더 생성되었을 것
  - 해당 파일 내용을 aws s3나 호스팅 사이트에 업로드 하면 완료
  - 혹은 그냥 npm run start 상태로 배포해도 ok
  - 아니면 main 푸시하면 자동으로 s3에 배포됨
  - 수정 이후 main에 푸시하고 action 확인 후 아래 링크 확인하는걸 추천
  - `http://skully.com.s3-website.ap-northeast-2.amazonaws.com/`

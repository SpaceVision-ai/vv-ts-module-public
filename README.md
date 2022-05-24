# vv-ts-module-public

VV팀에서 사용하는 typescript public node 모듈 저장소

# lerna
* mono repo multi package 관리 도구 [링크](https://github.com/lerna/lerna)
* npmjs registry에 배포한다 (https://www.npmjs.com/package/vv-schedule-parser)

## 기본 세팅
* root의 package.json에 작성된 dependencies는 모든 패키지에서 공통으로 사용된다
* lerna bootstrap 명령어를 통해 공통 모듈과 packages 안의 모든 패키지의 모듈을 npm install 한다
* --hoist 옵션은 공통 모듈을 root 디렉토리에 설치한다
```
$ npm install -g lerna
$ lerna bootstrap --hoist
```

## 기존 package 신규 버전 publish
* lerna run 명령어는 모든 패키지의 script를 수행한다
* lerna publish 명령어를 통해 패키지를 배포한다
```
$ lerna run test
$ lerna run tsc
$ lerna publish
```

## 신규 package 생성
* packages 디렉토리 아래 신규 모듈을 생성한다
```
$ lerna create {package name}
```
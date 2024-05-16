## ts-node에서 module빌드 시 체크사항
 - 모듈 빌드 시 package.json에 <mark>type:"module"</mark>를 설정하면 .ts 확장자를 인식하지 못하는 버그 발생.
 - package.json에 type은 무시하고 <mark>webpack.config</mark>에 output옵션만 설정하면됨.
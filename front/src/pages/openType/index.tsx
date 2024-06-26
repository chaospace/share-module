import React from 'react';
import { H } from '@/components/elements/Typography';

import WarpText from '@/components/warpText';

/**
 * openType.js을 이용한 폰트 제어 스터디
 * 오랫만에 다시 파공공식 참고
 * https://codepen.io/jaromvogel/pen/jWjWqN
 */

function OPenTypeApp() {
  return (
    <React.Fragment>
      <H variant='subTitle1'>openType을 이용한 폰트 표현</H>
      <WarpText text='한글 뭐야!' width='400' animate />
    </React.Fragment>
  );
}

export default OPenTypeApp;

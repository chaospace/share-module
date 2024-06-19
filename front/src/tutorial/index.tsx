import { VBox } from '@/components/elements/Box';
import Button from '@/components/elements/Button';
import Typography from '@/components/elements/Typography';
import SimpleModal from '@/components/modal';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

function ModalApp() {
  const [portaOpen, setPortalOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);

  const portalModalClose = (info?: boolean) => {
    // console.log('portal-close', info);
    if (info) {
      //다음모달을 추가로 더 열어본다.
      setSecondOpen(true);
      return;
    }
    setPortalOpen(false);
  };

  const secondModalClose = (info?: boolean) => {
    console.log('close-test', info);
    setSecondOpen(false);
  };

  return (
    <React.Fragment>
      <VBox width='500px' height='400px' overflow='hidden' clipPath='inset(0)'>
        <Typography variant='title'>포탈을 이용한 모달생성 비교</Typography>
        <Typography>
          position fixed를 적용한 모달인 경우 컨테이너에 clip-path를 설정해야 overflow가 동작한다.
        </Typography>
        <Button disableBackground>아웃라인 버튼</Button>
        <Button variant='info' onClick={() => setPortalOpen(true)}>
          포탈 모달 호출(createPortal)
        </Button>
        {portaOpen &&
          createPortal(
            <SimpleModal onClose={portalModalClose}>
              <React.Fragment>
                <Typography>
                  As a CSS utility component, the Typography component supports all system
                  properties. You can use them as prop directly on the component. For example,
                  here's how you'd add a margin-top
                </Typography>
                <Typography>
                  아크시스템웍스 아시아지점은 qureate사의 연애 어드벤처 게임 Nintendo Switch™
                  『버니 가든』의 정식 한국어화 제작이 결정되었다고 발표하며, 게임 정보를 공개했다
                </Typography>
                <Typography>
                  As a CSS utility component, the Typography component supports all system
                  properties. You can use them as prop directly on the component. For example,
                  here's how you'd add a margin-top
                </Typography>
                <Typography>
                  아크시스템웍스 아시아지점은 qureate사의 연애 어드벤처 게임 Nintendo Switch™
                  『버니 가든』의 정식 한국어화 제작이 결정되었다고 발표하며, 게임 정보를 공개했다
                </Typography>
              </React.Fragment>
            </SimpleModal>,
            document.body
          )}
      </VBox>
      {secondOpen &&
        createPortal(
          <SimpleModal okLabel='저장' onClose={secondModalClose}>
            <React.Fragment>
              두번째 모달!
              <Typography>
                As a CSS utility component, the Typography component supports all system properties.
                You can use them as prop directly on the component. For example, here's how you'd
                add a margin-top
              </Typography>
            </React.Fragment>
          </SimpleModal>,
          document.body
        )}
    </React.Fragment>
  );
}

export default ModalApp;

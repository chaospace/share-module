import { VBox } from '@/components/elements/Box';
import Button from '@/components/elements/Button';
import Typography from '@/components/elements/Typography';
import SimpleModal from '@/components/modal';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

const modalData = {
  name: 'chaos',
  age: 30
};
type Data = typeof modalData;

const protalData = {
  date: 12033,
  job: 'magician'
};

function TutorialApp() {
  const [modalOpen, setModalOpen] = useState(false);
  const [portaOpen, setPortalOpen] = useState(false);

  const modalClose = (info?: Data) => {
    console.log('modal-data', info);
    setModalOpen(false);
  };

  const portalModalClose = (info?: typeof protalData) => {
    console.log('portal-close', info);
    setPortalOpen(false);
  };

  return (
    <React.Fragment>
      <SimpleModal />
      <VBox width='500px' height='400px' overflow='hidden' clipPath='inset(0)'>
        <Typography variant='title'>포탈을 이용한 모달생성 비교</Typography>
        <Typography>
          position fixed를 적용한 모달인 경우 컨테이너에 clip-path를 설정해야 overflow가 동작한다.
        </Typography>
        <Button onClick={() => setModalOpen(true)}>모달 호출</Button>
        <Button variant='info' onClick={() => setPortalOpen(true)}>
          포탈 모달 호출(createPortal)
        </Button>
        {modalOpen && <SimpleModal<Data> data={modalData} onClose={modalClose} />}
        {portaOpen &&
          createPortal(
            <SimpleModal<typeof protalData> data={protalData} onClose={portalModalClose} />,
            document.body
          )}
      </VBox>
    </React.Fragment>
  );
}

export default TutorialApp;

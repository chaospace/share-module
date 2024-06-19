import Button from '@/components/elements/Button';
import { Container } from '@/components/elements/Container';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface PuzzleProps {
  blockSize?: number;
  rows?: number;
}

const Piece = styled(Container).attrs(_ => ({
  position: 'absolute',
  left: _.left ?? undefined,
  top: _.top ?? undefined
}))`
  transition: all 100ms linear;
`;

const PuzzleContainer = styled(Container)`
  --blockSize: 80px;
  --rows: 6;
  width: calc(var(--blockSize) * var(--rows) + 1px);
  height: calc(var(--blockSize) * var(--rows) + 1px);
  background-color: #333;
  ${Piece} {
    position: absolute;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(var(--blockSize) - 1px);
    height: calc(var(--blockSize) - 1px);
    background-color: #eee;
    font-weight: bold;
    user-select: none;
    &.space {
      color: white;
      background-color: white;
    }
  }
`;

interface PuzzleVO {
  x: number;
  y: number;
  isSpace: boolean;
  label: number;
}

const PieceItem = React.memo(
  ({ x, y, label, isSpace, onClick }: PuzzleVO & { onClick: React.MouseEventHandler }) => {
    const className = isSpace ? 'space' : '';
    return (
      <Piece className={className} left={`${x}px`} top={`${y}px`} onClick={onClick}>
        {label}
      </Piece>
    );
  },
  (prev, next) => prev.x === next.x && prev.y === next.y && prev.isSpace === next.isSpace
);

const createPieces = (blockSize: number, rows: number) => {
  const max = rows * rows;
  const pieces = Array.from({ length: max }).map((_, idx) => idx + 1);
  const emptyIndex = ~~(Math.random() * max) + 1;
  pieces.sort(() => (Math.random() > 0.4 ? 1 : -1));
  return pieces.map((o, idx) => {
    const isSpace = o === emptyIndex;
    const col = idx % rows;
    const row = ~~(idx / rows);
    const px = col * blockSize + 1;
    const py = row * blockSize + 1;
    return { x: px, y: py, isSpace, label: emptyIndex > o ? o : o - 1 };
  });
};

function SlidingPuzzle({ blockSize = 80, rows = 4 }: PuzzleProps) {
  // const containerRef = useRef<HTMLDivElement>(null);
  const [pieces, setPieces] = useState<PuzzleVO[]>(createPieces(blockSize, rows));
  // const deferredPieces = useDeferredValue(pieces);
  const [complete, setComplete] = useState(false);
  const reset = () => {
    setPieces(createPieces(blockSize, rows));
  };

  /**
   * 여기서 선택할 사항은 2가지
   * pos만 변경해 애니메이션을 적용.
   * pieces를 갱신해 리랜더링을 적용.
   * @param selectIdx
   */
  const onClickPiece = (selectIdx: number) => {
    const current = pieces[selectIdx];
    const ty = current.y;
    const tx = current.x;
    const spaceIndex = pieces.findIndex(o => o.isSpace === true)!;
    const spaceBlock = pieces[spaceIndex];
    const cx = spaceBlock.x;
    const cy = spaceBlock.y;
    //상하좌우 체크
    if (
      ((cx - blockSize === tx || cx + blockSize === tx) && ty === cy) ||
      ((cy - blockSize === ty || cy + blockSize === ty) && tx === cx)
    ) {
      const temp = pieces.concat();
      temp[selectIdx].x = cx;
      temp[selectIdx].y = cy;
      temp[spaceIndex].x = tx;
      temp[spaceIndex].y = ty;
      setPieces(temp);
    }
  };

  //변경 후 완료여부 체크
  useEffect(() => {
    //내용을 x, y순으로 정렬 후 확인해봐야 한다.
    const gridList = [...pieces].sort((a, b) => {
      if (a.y < b.y) {
        return -1;
      } else if (a.y === b.y) {
        return a.x > b.x ? 1 : -1;
      } else if (a.x === b.x) {
        return a.y > b.y ? 1 : -1;
      }
      return 1;
    });

    let compleate = true;
    for (let i = 1; i < gridList.length - 1; i++) {
      if (gridList[i - 1].label + 1 !== gridList[i].label) {
        compleate = false;
        break;
      }
    }
    if (compleate) {
      setComplete(true);
    }
  }, [pieces]);

  useEffect(() => {
    if (complete) {
      alert('성공!');
    }
  }, [complete]);

  return (
    <React.Fragment>
      <PuzzleContainer
        // @ts-ignore
        style={{ '--blockSize': `${blockSize}px`, '--rows': rows }}>
        {pieces.map((o, idx) => {
          const { x, y, label, isSpace } = o;
          const key = `${x}-${y}-${label}`;
          return (
            <PieceItem
              key={key}
              x={x}
              y={y}
              label={label}
              isSpace={isSpace}
              onClick={() => onClickPiece(idx)}
            />
          );
        })}
      </PuzzleContainer>
      {complete && (
        <Button variant='success' onClick={reset}>
          재시작
        </Button>
      )}
    </React.Fragment>
  );
}

export default SlidingPuzzle;

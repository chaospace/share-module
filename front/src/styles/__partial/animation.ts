import { css } from 'styled-components';

const loading = css`
  @keyframes loading {
    to {
      transform: rotate(360deg);
    }
  }
`;

const scaleBottomUp = css`
  @keyframes scaleBottomUp {
    from {
      transform: scale3d(0, 0, 0) translate(0, -100%);
    }
    to {
      transform: scale3d(1, 1, 1) translate(0, 0);
    }
  }
`;

const scaleTopDown = css`
  @keyframes scaleTopDown {
    from {
      transform: scale3d(0, 0, 0) translate(0, 100%);
    }
    to {
      transform: scale3d(1, 1, 1) translate(0, 0);
    }
  }
`;

export { loading, scaleTopDown, scaleBottomUp };

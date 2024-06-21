/**
 * v에서 t값으로 부드러운 전환 linear전환 처리
 * @param t : 목표 값
 * @param v : 현재 값
 * @param r : 비율
 * @returns
 */
const lerp = (t: number, v: number, r: number = 0.82) => (1 - r) * t + v * r;

/**
 * min~max구간에 v가 가지는 비율 반환
 * @param v
 * @param min
 * @param max
 * @returns
 */
const rate = (v: number, min: number, max: number) => (v - min) / (max - min);
/**
 * min~max 구간 값 v를 min2~max2구간 값으로 맵핑 후 반환.
 * @param v
 * @param min
 * @param max
 * @param min2
 * @param max2
 */
const mapValue = (v: number, min: number, max: number, min2: number, max2: number) => {
  return rate(v, min, max) * (max2 - min2) + min2;
};

export { mapValue, lerp, rate };

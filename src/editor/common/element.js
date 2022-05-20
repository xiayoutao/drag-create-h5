import { DESIGN_DRAFT_WIDTH, angleList } from './constants';

/**
 * 将 px 转换为 rem
 * @param {Number} px
 */
function px2Rem(px) {
	const number = Math.pow(10, 6);
	const val = (px / (DESIGN_DRAFT_WIDTH / 10)) * number;
	const rem = Math.round(val) / number + 'rem';
	return rem;
}

/**
 *
 * @param {Number} px 元素的某个属性的像素值，比如 height
 * @param {Boolean} isToRem 是否将 px 转换为 rem
 */
export function parsePx(px, isRem = false) {
	if (isRem) return px2Rem(px);
	return `${px}px`;
}

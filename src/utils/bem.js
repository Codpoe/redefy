/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b('text', 'disabled') // 'button__text--disabled'
 * b(['disabled', 'primary']) // 'button--disabled button--primary'
 *
 * https://github.com/youzan/vant/blob/dev/packages/utils/use/bem.ts
 */

const ELEMENT_SYMBOL = '__';
const MODIFY_SYMBOL = '--';

const combine = (name, el, symbol) => (el ? `${name}${symbol}${el}` : name);

const prefix = name => (el, symbol) => combine(name, el, symbol);

const bem = name => (el, mods) => {
  if (el && typeof el !== 'string') {
    mods = el;
    el = '';
  }

  el = combine(name, el, ELEMENT_SYMBOL);

  let res = [];
  const join = prefix(el);

  if (typeof mods === 'string') {
    res = [join(mods, MODIFY_SYMBOL)];
  } else if (Array.isArray(mods)) {
    res = res.concat(mods.map(mod => join(mod, MODIFY_SYMBOL)));
  } else {
    res = [el];
  }

  return res.join(' ');
};

export default bem;

/**
 * test
 */

// const b = bem('button');

// // eslint-disable-next-line no-console
// console.log(`
//   ${b() === 'button'}
//   ${b('text') === 'button__text'}
//   ${b('text', 'disabled') === 'button__text--disabled'}
//   ${b(['disabled', 'primary']) === 'button--disabled button--primary'}
// `);

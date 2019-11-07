/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b('text', 'disabled') // 'button__text--disabled'
 * b(['disabled', 'primary']) // 'button--disabled button--primary'
 *
 * https://github.com/youzan/vant/blob/dev/packages/utils/use/bem.ts
 */

interface Bem {
  (el?: string): string;
  (el: string, mods: string | (string | undefined)[]): string;
  (mods: (string | undefined)[]): string;
}

const ELEMENT_SYMBOL = '__';
const MODIFY_SYMBOL = '--';

const combine = (name: string, el: string, symbol: string) =>
  el ? `${name}${symbol}${el}` : name;

const prefix = (name: string) => (el: string, symbol: string) =>
  combine(name, el, symbol);

const bem: (name: string) => Bem = (name: string) => (
  el?: string | string[],
  mods?: string | string[]
) => {
  if (typeof el === 'undefined') {
    el = '';
  }

  if (typeof el !== 'string') {
    mods = el;
    el = '';
  }

  el = combine(name, el, ELEMENT_SYMBOL);

  let res: string[] = [];
  const join = prefix(el);

  if (typeof mods === 'string') {
    res = [join(mods, MODIFY_SYMBOL)];
  } else if (Array.isArray(mods)) {
    res = mods.map(mod => join(mod, MODIFY_SYMBOL));
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

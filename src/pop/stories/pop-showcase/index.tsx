import React from 'react';
import bem from '../../../utils/bem';
import './style.css';

const b = bem('demo-pop-showcase');

const PopShowcase: React.SFC<{}> = (props: React.PropsWithChildren<{}>) => {
  const popList = React.Children.toArray(props.children);

  return (
    <div className={b()}>
      <div className={b(['top'])}>{popList.slice(0, 3)}</div>
      <div className={b(['left'])}>{popList.slice(3, 6)}</div>
      <div className={b(['right'])}>{popList.slice(6, 9)}</div>
      <div className={b(['bottom'])}>{popList.slice(9, 12)}</div>
    </div>
  );
};

export default PopShowcase;

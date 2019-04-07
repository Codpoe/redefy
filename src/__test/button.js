import React from 'react';
import { shallow } from 'enzyme';

import Button from '../button/';

describe('Button test', () => {
  it('default', () => {
    const z = shallow(
      <Button>TEST</Button>
    );
    expect(z.type()).toBe('button');
    expect(z.hasClass('z-button')).toBeTruthy();
    expect(z.hasClass('z-button--default')).toBeTruthy();
    expect(z.childAt(0).text()).toBe('TEST');
  });

  it('type', () => {
    const z = shallow(
      <Button type="primary">TEST</Button>
    );
    expect(z.hasClass('z-button--primary')).toBeTruthy();
  });

  it('size', () => {
    const z = shallow(
      <Button size="large">TEST</Button>
    );
    expect(z.hasClass('z-button--large')).toBeTruthy();
  });

  it('text', () => {
    const z = shallow(
      <Button text>TEST</Button>
    );
    expect(z.hasClass('z-button--text')).toBeTruthy();
  });

  it('outline', () => {
    const z = shallow(
      <Button outline>TEST</Button>
    );
    expect(z.hasClass('z-button--outline')).toBeTruthy();
  });

  it('flat', () => {
    const z = shallow(
      <Button flat>TEST</Button>
    );
    expect(z.hasClass('z-button--flat')).toBeTruthy();
  });

  it('round', () => {
    const z = shallow(
      <Button round>TEST</Button>
    );
    expect(z.hasClass('z-button--round')).toBeTruthy();
  });

  it('block', () => {
    const z = shallow(
      <Button block>TEST</Button>
    );
    expect(z.hasClass('z-button--block')).toBeTruthy();
  });

  it('disabled', () => {
    const z = shallow(
      <Button disabled>TEST</Button>
    );
    expect(z.hasClass('z-button--disabled')).toBeTruthy();
  });

  it('loading', () => {
    const z = shallow(
      <Button loading>TEST</Button>
    );
    expect(z.hasClass('z-button--loading')).toBeTruthy();
  });

  it('a', () => {
    const z = shallow(
      <Button href="https://youzan.com">TEST</Button>
    );
    expect(z.type()).toBe('a');
  });

  it('click', () => {
    const fn = jest.fn();
    const z = shallow(
      <Button onClick={fn}>TEST</Button>
    );
    z.simulate('click');
    expect(fn.mock.calls.length).toBe(1);
  });
});

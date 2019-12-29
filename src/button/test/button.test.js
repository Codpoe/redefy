import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Button from '../button/';

describe('Button test', () => {
  it('snapshot', () => {
    const button = renderer.create(<Button>TEST</Button>);
    const tree = button.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('default', () => {
    const button = shallow(<Button>TEST</Button>);
    expect(button.type()).toBe('button');
    expect(button.hasClass('rdf-button')).toBeTruthy();
    expect(button.hasClass('rdf-button--default')).toBeTruthy();
    expect(button.childAt(0).text()).toBe('TEST');
  });

  it('type', () => {
    const jm = shallow(<Button type="primary">TEST</Button>);
    expect(jm.hasClass('rdf-button--primary')).toBeTruthy();
  });

  it('size', () => {
    const jm = shallow(<Button size="large">TEST</Button>);
    expect(jm.hasClass('rdf-button--large')).toBeTruthy();
  });

  it('text', () => {
    const jm = shallow(<Button text>TEST</Button>);
    expect(jm.hasClass('rdf-button--text')).toBeTruthy();
  });

  it('outline', () => {
    const jm = shallow(<Button outline>TEST</Button>);
    expect(jm.hasClass('rdf-button--outline')).toBeTruthy();
  });

  it('flat', () => {
    const jm = shallow(<Button flat>TEST</Button>);
    expect(jm.hasClass('rdf-button--flat')).toBeTruthy();
  });

  it('round', () => {
    const jm = shallow(<Button round>TEST</Button>);
    expect(jm.hasClass('rdf-button--round')).toBeTruthy();
  });

  it('block', () => {
    const jm = shallow(<Button block>TEST</Button>);
    expect(jm.hasClass('rdf-button--block')).toBeTruthy();
  });

  it('disabled', () => {
    const jm = shallow(<Button disabled>TEST</Button>);
    expect(jm.hasClass('rdf-button--disabled')).toBeTruthy();
  });

  it('loading', () => {
    const jm = shallow(<Button loading>TEST</Button>);
    expect(jm.hasClass('rdf-button--loading')).toBeTruthy();
  });

  it('a', () => {
    const jm = shallow(<Button href="https://youzan.com">TEST</Button>);
    expect(jm.type()).toBe('a');
  });

  it('click', () => {
    const fn = jest.fn();
    const jm = shallow(<Button onClick={fn}>TEST</Button>);
    jm.simulate('click');
    expect(fn.mock.calls.length).toBe(1);
  });
});

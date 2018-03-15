import React from 'react';
import { shallow, mount } from 'enzyme';

import Radio from '../radio/';

describe('Radio test', () => {
    it('checked', () => {
        const w = shallow(
            <Radio.Group value="1">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
            </Radio.Group>
        );
        expect(w.find(Radio).at(0).prop('checked')).toBeTruthy();
        expect(w.find(Radio).at(1).prop('checked')).toBeFalsy();
    });

    it('group disabled', () => {
        const w = shallow(
            <Radio.Group value="1" disabled>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
            </Radio.Group>
        );
        expect(w.find(Radio).at(0).prop('disabled')).toBeTruthy();
        expect(w.find(Radio).at(1).prop('disabled')).toBeTruthy();
    });

    it('partial disabled', () => {
        const w = shallow(
            <Radio.Group value="1">
                <Radio value="1" disabled>1</Radio>
                <Radio value="2">2</Radio>
            </Radio.Group>
        );
        expect(w.find(Radio).at(0).prop('disabled')).toBeTruthy();
        expect(w.find(Radio).at(1).prop('disabled')).toBeFalsy();
    });

    it('vertical', () => {
        const w = shallow(
            <Radio.Group value="1" vertical>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
            </Radio.Group>
        );
        expect(w.hasClass('z-radio-group--vertical')).toBeTruthy();
    });

    it('change', () => {
        const fn = jest.fn();
        const w = mount(
            <Radio.Group value="1" onChange={fn}>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
            </Radio.Group>
        );
        w.find('input').at(1).simulate('change');
        expect(fn.mock.calls[0][0].target.value).toBe("2");
    });
})
import React from 'react';
import Input from '../index';
import renderer from 'react-test-renderer';

test('Input should be change', () => {
    const component = renderer.create(
        <Input>姓名</Input>
    );
    let input = component.toJSON();
    console.log(input);
    expect(input).toMatchSnapshot();

});

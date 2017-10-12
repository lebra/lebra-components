import React from 'react';
import Input from '../index';
import renderer from 'react-test-renderer';

test('Input should be change', () => {
    const component = renderer.create(
        <Input>姓名</Input>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    tree.props.onMouseEnter();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    tree.props.onMouseLeave();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

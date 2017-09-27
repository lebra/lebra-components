import React from 'react';
import Input from '../index';
import renderer from 'react-test-renderer';

test('Input should be change', () => {
    const component = renderer.create(
        <Nav>姓名</Nav>
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

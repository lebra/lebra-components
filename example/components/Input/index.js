import { Component } from 'react';
import Input from 'components/Input';

console.log(Input);

export default class InputDemo extends Component{
	render() {
		return (
			<div className="input-demo">
				<Input >姓名</Input>
			</div>
		)
	}
}

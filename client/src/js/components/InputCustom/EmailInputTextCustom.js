/**
 * This component uses inputTextFieldCustom to validate the email format
 *
 * @author Magno Jr <is.magnojr@gmail.com>
 */

import React from "react"
import ReactDOM from "react-dom"
import InputTextCustom from "./InputTextCustom"

export default class EmailInputTextCustom extends React.Component {
	constructor() {
		super();
		this.validaEmail = this.validaEmail.bind(this);
	}

    IsEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}

    validaEmail(text) {
		var result = false
		if (this.IsEmail(text)) {
			result =  true;
		} else {
			result = false;
		}

		this.props.change(text, result);
		return result;
	}

    render() {
		return(
			<InputTextCustom campo="Email" valida={this.validaEmail} valor={this.props.valor} msgErro={this.props.msgErro} exibe_erro={this.props.exibe_erro} foi_submetido={this.props.foi_submetido}/>
		);
	}
}

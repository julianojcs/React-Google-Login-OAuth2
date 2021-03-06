import React, {Component} from 'react';
import { Control } from 'react-redux-form';
import '../App.css';
import { minLength, maxLength } from '../shared';

class InputPassword extends Component {  
    constructor(props) {
        super(props);
        
        this.state = {
            show: "password-off",
            inputType: "password"
        };

        this.onClick = this.onClick.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onClick(event) {
        var type = this.state.inputType;
        this.setState({ inputType: type === 'password' ? 'text' : 'password' });
        this.setState({ show: type === 'password' ? 'password-on' : 'password-off' });
    }

    onChange(event) {
        if (this.props.onChange && event != null) {
            this.props.onChange(event.value);
        }        
    }

    render() {
        return (
            <>
                <div className="input-group field-password-container align-items-center">
                    {   /**
                         * To create a Component with the prepend icon, inform the props 'icon' without any value
                         * To create a Component without the prepend icon, just omit the props 'icon'
                         */
                        this.props.icon !== undefined 
                        ? (
                            <div className="input-group-prepend align-self-stretch">
                                <span className="input-group-text prepend">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-lock-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.5 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9z"/>
                                        <path fillRule="evenodd" d="M4.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"/>
                                    </svg>
                                </span>
                            </div>
                        ) 
                        : ''
                    }

                    <Control.text 
                        model={this.props.model || ".password"}
                        type={this.state.inputType}
                        name={this.props.name || "password"}
                        id={this.props.id || "password"}
                        className={`field form-control ${ (this.props.icon ? 'icon' : '') } ${ (this.props.className ? this.props.className : '') }`}
                        placeholder={this.props.placeholder || "Informe sua senha"}
                        ref={this.props.ref}
                        autoComplete={this.props.autoComplete || "off"} 
                        onChange={(event) => this.onChange(event)}
                        validators={this.props.validators || {
                            minLength: minLength(6), maxLength: maxLength(32)
                        }} 
                    />
                    <div
                        type="button" 
                        className={`field-password-view ${ this.state.show }`}
                        aria-label="Mostrar senha"
                        onClick={ event => this.onClick(event) } >
                    </div>
                </div>
 
            </>
        );
    }
}

export default InputPassword;
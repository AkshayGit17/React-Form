import React, { Component } from 'react';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import { checkValidity, updateObject } from '../../Shared/utility';
import classes from './Form.module.css';

export class Form extends Component {
  state = {
    form: {
      //different form controls
      name: {
        //control
        elementType: 'input', //control type
        elementConfig: {
          //control attributes
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '', //control value
        validation: {
          //control validation rules
          required: true,
        },
        valid: false, //control validity
        touched: false, //whether the control is touched or not
        errorMessage: 'Please enter a valid name!', //control error message
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Mail',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
        errorMessage: 'Please enter a valid email!',
      },
      'zip-code': {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 4,
          maxLength: 7,
          isNumeric: true,
        },
        valid: false,
        touched: false,
        errorMessage: 'Please enter a valid ZIP CODE!',
      },
      country: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'india', displayValue: 'India' },
            { value: 'japan', displayValue: 'Japan' },
          ],
        },
        value: 'india',
        valid: true,
      },
    },
    isFormValid: false,
  };

  formSubmitHandler = (event) => {
    event.preventDefault();
    //clearing data
    const nameControl = updateObject(this.state.form.name, {
      value: '',
      valid: false,
      touched: false,
    });
    const emailControl = updateObject(this.state.form.email, {
      value: '',
      valid: false,
      touched: false,
    });
    const zipCodeControl = updateObject(this.state.form['zip-code'], {
      value: '',
      valid: false,
      touched: false,
    });
    const countryControl = updateObject(this.state.form.country, {
      value: 'india',
    });

    const form = updateObject(this.state.form, {
      name: nameControl,
      email: emailControl,
      'zip-code': zipCodeControl,
      country: countryControl,
    });

    this.setState({ form: form, isFormValid: false });
  };

  inputChangedHandler = (event, controlName) => {
    const formControl = updateObject(this.state.form[controlName], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(
        event.target.value,
        this.state.form[controlName]['validation']
      ),
    });
    const form = updateObject(this.state.form, {
      [controlName]: formControl,
    });

    let formValid = true;

    for (let control in form) {
      console.log(control, form[control], form[control]['valid']);
      formValid = form[control]['valid'] && formValid;
    }

    this.setState({ form: form, isFormValid: formValid });
  };

  render() {
    return (
      <div className={classes.Form}>
        <h4>Enter your Data</h4>
        <form onSubmit={this.formSubmitHandler}>
          {Object.keys(this.state.form).map((control) => {
            //to render form controls
            return (
              <Input
                elementType={this.state.form[control].elementType}
                elementConfig={this.state.form[control].elementConfig}
                value={this.state.form[control].value}
                key={control}
                changed={(event) => {
                  this.inputChangedHandler(event, control);
                }}
                valid={this.state.form[control].valid}
                shouldValidate={this.state.form[control]['validation']}
                touched={this.state.form[control]['touched']}
                errorMessage={this.state.form[control]['errorMessage']}
              />
            );
          })}
          <Button disabled={!this.state.isFormValid} btnType='Success'>
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}

export default Form;

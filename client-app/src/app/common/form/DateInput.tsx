import React from "react";
import { FieldRenderProps } from "react-final-form";
import { DatePicker } from "react-widgets";
import { Form, FormFieldProps, Label } from "semantic-ui-react";


interface IProps extends FieldRenderProps<Date, HTMLElement>,
FormFieldProps {}


export const DateInput: React.FC<IProps> = (
    {
    input,
    width,
    placeholder,
    meta:touched,
    error,
    ...rest}) => {
    return(

        <Form.Field error={touched && !!error}  width={width}>
           <DatePicker placeholder={placeholder} 
           onBlur={input.onBlur} 
           onKeyDown = {(e : any)=> e.preventDefault()}
           value={input.value || null}
           onChange={input.onChange} 
           {...rest}
           />
            {touched && error &&(
                <Label basic color='red'>
                    {error}
                </Label>
            )
            }
            
        </Form.Field>
        
    )
}
export default DateInput

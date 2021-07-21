import React from "react";
import { FieldRenderProps } from "react-final-form";
import { TimeInput } from "react-widgets";
import { Form, FormFieldProps, Label } from "semantic-ui-react";


interface IProps extends FieldRenderProps<Date, HTMLElement>,
FormFieldProps {}


export const Time : React.FC<IProps> = (
    {
    input,
    width,
    placeholder,
    meta:touched,
    error,
    ...rest}) => {
    return(

        <Form.Field error={touched && !!error}  width={width}>
           <TimeInput  placeholder={placeholder} 
           value={input.value || null}
           onChange={input.onChange} 
           onBlur={input.onBlur} 
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
export default Time

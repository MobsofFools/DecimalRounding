import React from "react";
import { ChangeEvent, FocusEvent, useState } from "react";
import { IInputs } from "./generated/ManifestTypes";

export type IDecimalControlProps = {
    onChange:(numberData: number|undefined) => void;
    context?:ComponentFramework.Context<IInputs>;
}
const DecimalControl = (props:IDecimalControlProps) => {
    const {onChange, context} = props;
    const [controlValue, setControlValue] = useState<number|string>(context?.parameters.boundField.raw!);
    const roundDirection = context?.parameters.roundDirection.raw!;
    function numberRounding (number:number,direction?:string) {
        if(direction === "up"){
            return Math.ceil(number)
        }
        else{
            return Math.floor(number)
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setControlValue(e.currentTarget.value);
        console.log(e.currentTarget.value)
    }
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        if(typeof controlValue === 'string')
        {
            const result = numberRounding(Number.parseFloat(controlValue),roundDirection)
            setControlValue(result);
            onChange(result)
        }
    }
    return(
        <div className="pa-bc flexbox">
            <input className="pa-bc" value={controlValue} onChange={handleChange} onBlur={handleBlur} tabIndex={0} placeholder="---"></input>
        </div>
    )
}
export default DecimalControl
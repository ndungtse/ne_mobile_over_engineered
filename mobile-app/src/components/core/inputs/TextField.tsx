import React from 'react'
import { TextInput, TextInputProps, TextStyle } from 'react-native'
import { getStyles } from '../../../utils/funcs/components'

export interface InputTextProps extends TextInputProps {
    type?: 'text' | 'password' | 'secure-text'
}

// ! styles Probably works with nativeWind only
const InputText = (props: InputTextProps) => {
    const { type, placeholderTextColor, style, autoCapitalize, className, ...rest } = props
    const _style = getStyles(style)
    const fontSize = _style.find((style) => style.hasOwnProperty('fontSize'))?.fontSize
    
    return (
        <>
            <TextInput
                style={[{
                    fontSize: fontSize ?? 16,
                }, ..._style]}
                autoCapitalize={autoCapitalize ?? 'none'}
                placeholderTextColor={placeholderTextColor ?? 'gray'}
                secureTextEntry={type === 'password' || type === 'secure-text'}
                {...rest}
            />
        </>
    )
}

export default InputText
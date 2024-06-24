import { StyleProp } from "react-native";

/**
 * Gets styles from props of a component. useful if you passed className prop
 */
export const getStyles = <T = any>(style: StyleProp<T>) => {
    const { ...oStyles } = (style ?? {}) as { [key: string]: T }
    const styles = Object.keys(oStyles).map((key) => {
        if (!isNaN(Number(key))) {
            return oStyles[key]
        }
        return {} as T
    })
    const _style = styles.filter((style) => Object.keys(style as any).length > 0)
    return _style
}
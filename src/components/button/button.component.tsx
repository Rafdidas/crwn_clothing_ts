import { FC, ButtonHTMLAttributes } from "react";

import {
  BaseButton,
  GoogleSignInbutton,
  InvertedButton,
  ButtonSpinner,
} from "./button.styles";

export enum BUTTON_TYPES_CLASSES {
    base = 'base',
    google = 'google-sign-in',
    inverted = 'inverted',
};

const getButton = (buttonType = BUTTON_TYPES_CLASSES.base) => 
    ({
        [BUTTON_TYPES_CLASSES.base]: BaseButton,
        [BUTTON_TYPES_CLASSES.google]: GoogleSignInbutton,
        [BUTTON_TYPES_CLASSES.inverted]: InvertedButton,
    }[buttonType] as typeof BaseButton);

export type ButtonProps = {
    buttonType?: BUTTON_TYPES_CLASSES;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton disabled={isLoading} {...otherProps}>
            {isLoading ? <ButtonSpinner /> : children}
        </CustomButton>
    );
}

export default Button;
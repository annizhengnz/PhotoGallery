import React, { ReactNode } from 'react';

type ButtonProps = {
    btnClickHandler: (e:React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => void,
    children: ReactNode | string,
    className: string
}
const Button = ({btnClickHandler, children, className}:ButtonProps) => {

    return (
        <button className={className} onClick={btnClickHandler}>
            {children}
        </button>
    );
};

export default Button;
const Button = ({text, onButtonClick, classNames}) => <button className={"button" + classNames} onClick={onButtonClick}>{text}</button>

export default Button;
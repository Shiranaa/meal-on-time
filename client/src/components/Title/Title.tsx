interface Props {
    text: string;
    children?: React.ReactNode;
}

function Title(props: Props) {
    return (
        <h1 className="text-center m-3">
            {props.text}
            {props.children}
        </h1>
    );
}

export default Title;
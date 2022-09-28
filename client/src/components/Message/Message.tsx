interface Props {
  fileName: string;
  handleClick: Function;
}

function Message(props: Props) {
  return (
    <div className="alert alert-info alert-dismissible" role="alert">
      New file exported: {props.fileName}
      <button
        onClick={() => props.handleClick()}
        type="button"
        className="btn-close"
        aria-label="Close"
      ></button>
    </div>
  );
}

export default Message;

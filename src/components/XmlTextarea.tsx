import {
  DetailedHTMLProps,
  TextareaHTMLAttributes,
  forwardRef,
  useCallback,
  useContext,
} from "react";
import NodeContext from "../contexts/Node.context";

type XmlTextareaFieldProps = {} & DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

const XmlTextarea = forwardRef<HTMLTextAreaElement, XmlTextareaFieldProps>(
  (props, textareaRef) => {
    const { currentNode, level } = useContext(NodeContext);

    const onChange = useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (props.onChange) {
          props.onChange(event);
        }
        if (currentNode) currentNode.textContent = event.target.value;
      },
      [currentNode]
    );

    return (
      <textarea
        {...props}
        ref={textareaRef}
        className={
          props.className ? `rxml__textarea ${props.className}` : "rxml__textarea"
        }
        onChange={onChange}
        defaultValue={currentNode?.textContent ?? undefined}
        data-level={level}
      />
    );
  }
);

XmlTextarea.displayName = "XmlTextarea";

export default XmlTextarea;

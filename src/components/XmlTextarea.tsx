import {
  DetailedHTMLProps,
  TextareaHTMLAttributes,
  forwardRef,
  useCallback,
  useContext,
} from "react";
import { NodeContext } from "../contexts/Node.context";

type XmlTextareaFieldProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

const XmlTextarea = forwardRef<HTMLTextAreaElement, XmlTextareaFieldProps>(
  ({ className, onChange, ...rest }, textareaRef) => {
    const { currentNode, level } = useContext(NodeContext);

    const handleOnChange = useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
          onChange(event);
        }
        if (currentNode) currentNode.textContent = event.target.value;
      },
      [currentNode, onChange],
    );

    return (
      <textarea
        {...rest}
        ref={textareaRef}
        className={className ? `rxml__textarea ${className}` : "rxml__textarea"}
        onChange={handleOnChange}
        defaultValue={currentNode?.textContent ?? undefined}
        data-level={level}
      />
    );
  },
);

XmlTextarea.displayName = "XmlTextarea";

export default XmlTextarea;

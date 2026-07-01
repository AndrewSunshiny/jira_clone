import { forwardRef } from 'react';
import { type Ref } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import StyledTextarea from './styles';

interface Props {
  className?: string;
  invalid?: boolean;
  minRows?: number;
  value?: string;
  onChange?: (...params: any) => any;
}
const Textarea = (
  {
    className = undefined,
    invalid = false,
    value = undefined,
    minRows = 2,
    onChange = () => {},
    ...textareaProps
  }: Props,
  ref: Ref<HTMLTextAreaElement>,
) => (
  <StyledTextarea className={className} $invalid={invalid}>
    <TextareaAutosize
      {...textareaProps}
      onChange={(event) => onChange(event, event.target.value)}
      ref={ref}
    />
  </StyledTextarea>
);

export default forwardRef(Textarea);

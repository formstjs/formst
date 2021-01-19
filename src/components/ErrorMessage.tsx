import React, { ReactChildren, useContext } from 'react';
import { FormContext } from './MstForm';

type PropType = {
  component?: string;
  children?: ReactChildren;
  name: string;
};

export default function ErrorMessage(props: PropType) {
  const formInstance = useContext(FormContext);
  if (!formInstance) {
    throw new Error('Form instance prop is required in MstForm');
  }
  const ErrorComponent = props.component ? props.component : 'div';

  return React.createElement(
    ErrorComponent,
    {
      ...props,
    },
    [
      <span>
        {// @ts-ignore
        formInstance.errors[props.name] &&
          // @ts-ignore
          formInstance.touched[props.name] &&
          // @ts-ignore
          formInstance.errors[props.name]}
      </span>,
    ]
  );
}

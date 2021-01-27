import { observer } from 'mobx-react-lite';
import React, { HTMLAttributes, ReactChildren, useContext } from 'react';
import { FormContext } from './MSTForm';

type PropType = {
  component?: React.ComponentClass<any> | string;
  children?: ReactChildren;
  name: string;
} & HTMLAttributes<any>;

const ErrorMessage = observer((props: PropType) => {
  const { component, name, ...rest } = props;
  const formInstance: any = useContext(FormContext);
  if (!formInstance) {
    throw new Error('Form instance prop is required in MstForm');
  }
  const ErrorComponent = props.component ? props.component : 'div';
  const style = { display: 'block' };

  return React.createElement(
    ErrorComponent,
    {
      style: style,
      ...rest,
    },
    [
      <span>
        {formInstance.errors[props.name] &&
          formInstance.touched[props.name] &&
          formInstance.errors[props.name]}
      </span>,
    ]
  );
});

export default ErrorMessage;

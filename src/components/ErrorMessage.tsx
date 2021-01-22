import { observer } from 'mobx-react-lite';
import React, { ReactChildren, useContext } from 'react';
import { FormContext } from './MstForm';

type PropType = {
  component?: any;
  children?: ReactChildren;
  name: string;
};

const ErrorMessage = observer((props: PropType) => {
  const formInstance: any = useContext(FormContext);
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
        {formInstance.errors[props.name] &&
          formInstance.touched[props.name] &&
          formInstance.errors[props.name]}
      </span>,
    ]
  );
});

export default ErrorMessage;

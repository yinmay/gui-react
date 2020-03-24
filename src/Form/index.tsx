import React, { useState, Fragment } from 'react';
import { Form, IFormValue } from './form';

interface IProps {
  /**
   * Text for the FormExample
   */
  text: string;
}

export const FormExample = (props: IProps) => {
  const [formData, setFormData] = useState<IFormValue>({
    password: '',
    username: ''
  });
  // 渲染字段
  const [fields] = useState([
    { name: 'username', label: 'username', input: { type: 'text' } },
    { name: 'password', label: 'password', input: { type: 'password' } }
  ]);
  return (
    <div>
      {JSON.stringify(formData)}
      <Form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          // tslint:disable-next-line:no-console
          console.log(formData);
        }}
        onChange={(value) => setFormData(value)}
        value={formData}
        fields={fields}
        buttons={
          <Fragment>
            <button type='submit'>submit</button>
          </Fragment>
        }
      />
    </div>
  );
};

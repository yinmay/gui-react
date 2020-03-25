import React, { useState, Fragment } from 'react';
import { Form, IFormValue } from './form';
import { validator } from './validator';
import { ExampleButton as Button } from '../ExampleButton/button';

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
  const [errors, setErrors] = useState({});
  return (
    <div>
      {JSON.stringify(formData)}
      <Form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          const rules = [
            { key: 'username', required: true },
            {
              key: 'username',
              minLength: 2
            },
            {
              key: 'username',
              pattern: /^[a-zA-Z0-9]+$/
            },
            { key: 'password', required: true },
            {
              key: 'password',
              maxLength: 16,
              minLength: 6
            }
          ];
          const error = validator(formData, rules);
          setErrors(error);
        }}
        onChange={(value) => setFormData(value)}
        value={formData}
        fields={fields}
        errors={errors}
        buttons={
          <Fragment>
            <Button type='submit' level='important'>
              submit
            </Button>
            <Button type='submit' level='normal'>
              cancel
            </Button>
          </Fragment>
        }
      />
    </div>
  );
};

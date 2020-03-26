import React, { useState, Fragment } from 'react';
import { Form, IFormValue } from './form';
import { validator, noError } from './validator';
import { ExampleButton as Button } from '../ExampleButton/button';

interface IProps {
  text: string;
}

const usernames = ['cc', 'bb'];
const checkUsername = (
  username: string,
  succeed: () => void,
  fail: () => void
) => {
  setTimeout(() => {
    if (usernames.includes(username)) {
      return succeed();
    }
    return fail();
  }, 3000);
};

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

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    const rules = [
      { key: 'username', required: true },
      {
        key: 'username',
        minLength: 2
      },
      {
        key: 'username',
        validate: {
          name: 'unique',
          validator: (username: string) => {
            return new Promise<void>((resolve, reject) => {
              checkUsername(username, resolve, reject);
            });
          }
        }
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
    if (noError(error)) {
      // console.log()
    }
  };
  return (
    <div>
      {JSON.stringify(formData)}
      <Form
        onSubmit={submit}
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

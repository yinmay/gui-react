import React, { ReactFragment } from 'react';
import { Input } from '../Input/index';

export interface IFormValue {
  [k: string]: any;
}

interface IProps {
  value: IFormValue;
  fields: Array<{ name: string; label: string; input: { type: string } }>;
  buttons: ReactFragment;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChange: (value: IFormValue) => void;
  errors: { [k: string]: string[] };
}

export const Form = (props: IProps) => {
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    props.onSubmit(e);
  };
  const onInputChange = (name: string, value: string) => {
    const newFormValue = { ...props.value, [name]: value };
    props.onChange(newFormValue);
  };
  return (
    <form onSubmit={onSubmit}>
      {props.fields.map((f) => {
        const name = f && f.name;
        return (
          <div key={name}>
            {f.label}
            <Input
              type={f.input.type}
              value={props.value[name]}
              onChange={(e) => onInputChange(name, e.target.value)}
            />
            <div>{props.errors[name]}</div>
          </div>
        );
      })}
      <div>{props.buttons}</div>
    </form>
  );
};

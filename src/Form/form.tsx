import React, { ReactFragment } from 'react';

export interface IFormValue {
  [k: string]: any;
}

interface IProps {
  value: IFormValue;
  fields: Array<{ name: string; label: string; input: { type: string } }>;
  buttons: ReactFragment;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChange: (value: IFormValue) => void;
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
      {props.fields.map((f) => (
        <div key={f.name}>
          {f.label}
          <input
            type={f.input.type}
            value={props.value[f.name]}
            onChange={(e) => onInputChange(f.name, e.target.value)}
          />
        </div>
      ))}
      <div>{props.buttons}</div>
    </form>
  );
};

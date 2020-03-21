interface IProps {
  extra: string | undefined;
}

const getScpoedClass = (prefix?: string) => {
  return (name?: string, options?: IProps) => {
    const result = [prefix, name].filter(Boolean).join('-');
    if (options && options.extra) {
      return [result, options.extra].filter((v) => v).join(' ');
    }
    return result;
  };
};

export { getScpoedClass };

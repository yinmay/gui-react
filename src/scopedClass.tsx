const getScpoedClass = (prefix?: string) => {
  return (name?: string) => [prefix, name].filter(Boolean).join('-');
};

export { getScpoedClass };

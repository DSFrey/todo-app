import { useState, useEffect } from 'react';

const useForm = (callback, defaultValues = {}) => {

  const [values, setValues] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    callback({...values});
  };

  const handleChange = (event) => {
    let name, value
    console.log(typeof event)
    if (typeof event === 'object') {
      name = event.target.name
      value = event.target.value
    } else {
      name = 'difficulty';
      value = event;
    }

    if (parseInt(value)) {
      value = parseInt(value);
    }

    setValues(values => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    setValues(defaultValues);
  }, [defaultValues]);

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;

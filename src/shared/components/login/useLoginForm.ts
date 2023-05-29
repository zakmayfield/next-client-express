import React, { FormEvent, useState } from 'react';
import axios from 'axios';

interface LoginFormValues {
  username: string;
  password: string;
}

export const useLoginForm = () => {
  const defaultFormValues = {
    username: '',
    password: '',
  };

  const [formValues, setFormValues] =
    useState<LoginFormValues>(defaultFormValues);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    await axios
      .post('http://localhost:3000/api/auth/login', formValues)
      .then((response) => {
        setIsLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setFormError(error);
        setIsLoading(false);
      });
  };

  return { onSubmit, onChange, formError, formValues, isLoading };
};

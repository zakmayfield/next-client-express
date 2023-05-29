import { useMemo } from 'react';
import { useLoginForm } from './useLoginForm';

export default function LoginForm() {
  const { onChange, onSubmit, formError, formValues, isLoading } =
    useLoginForm();

  const loginFormInputs = useMemo(
    () => [
      { label: 'Username', name: 'username', value: formValues.username },
      { label: 'Password', name: 'password', value: formValues.password },
    ],
    [formValues.username, formValues.password]
  );

  return (
    <div>
      <div>Login Form</div>

      <form onSubmit={onSubmit}>
        {loginFormInputs.map((input) => (
          <div key={input.name}>
            <label htmlFor={input.name}>{input.label}</label>
            <input
              type={input.name === 'password' ? 'password' : 'text'}
              name={input.name}
              placeholder={input.name === 'username' ? 'jonsnow' : ''}
              value={input.value}
              onChange={onChange}
            />
          </div>
        ))}
        {formError && <p className='text-orange-400'>{formError}</p>}
        <button type='submit' disabled={isLoading}>
          Submit
        </button>
      </form>
    </div>
  );
}

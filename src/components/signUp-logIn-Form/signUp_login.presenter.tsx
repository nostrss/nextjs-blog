import { IPropsRegisterFormUI } from '@/interfaces';

export default function SignUpOrLogInUI({
  emailInputId,
  passwordInputId,
  passwordConfirmInputId,
  onChangeUseInput,
  onSubmitCreatAccount,
  path,
  onSubmitLogin,
}: IPropsRegisterFormUI) {
  return (
    <div>
      {path === 'signup' ? <h1>Sign Up</h1> : <h1>Log In</h1>}
      <fieldset>
        <legend>Sign up</legend>
        <form
          method="post"
          onSubmit={path === 'signup' ? onSubmitCreatAccount : onSubmitLogin}
        >
          <ul>
            <li>
              <label htmlFor={emailInputId}>
                Email
                <input
                  type="email"
                  id={emailInputId}
                  name="email"
                  placeholder="email"
                  onChange={onChangeUseInput}
                />
              </label>
            </li>
            <li>
              <label htmlFor={passwordInputId}>
                PassWord
                <input
                  type="password"
                  id={passwordInputId}
                  name="password"
                  placeholder="password"
                  onChange={onChangeUseInput}
                />
              </label>
            </li>
            {path === 'signup' && (
              <li>
                <label htmlFor={passwordConfirmInputId}>
                  PassWord
                  <input
                    type="password"
                    id={passwordConfirmInputId}
                    name="passwordConfirm"
                    placeholder="password"
                    onChange={onChangeUseInput}
                  />
                </label>
              </li>
            )}
          </ul>
          <button type="submit">
            {path === 'signup' ? 'Sign Up' : 'login'}
          </button>
        </form>
      </fieldset>
    </div>
  );
}

export default function Login() {
  // const onSubmit = (event: any) => {
  //   event?.preventDefault;
  // };

  return (
    <div>
      <h2>로그인</h2>
      <fieldset>
        <legend>이메일로그인</legend>
        <form method="post" action="#">
          <label htmlFor="email">
            Email
            <input type="email" id="email" name="email" placeholder="email" />
          </label>
          <label htmlFor="password">
            PassWord
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </fieldset>
    </div>
  );
}

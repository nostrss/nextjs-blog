export default function Login() {
  const onSubmit = (event: any) => {
    event?.preventDefault;
  };

  return (
    <div>
      <h2>로그인</h2>
      <fieldset>
        <legend>이메일로그인</legend>
        <form method="post" action="#" onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="email" />
          <label htmlFor="password">PassWord</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
          />
          <button type="submit">Submit</button>
        </form>
      </fieldset>
    </div>
  );
}

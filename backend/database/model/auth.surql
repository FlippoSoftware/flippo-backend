DEFINE ACCESS user ON DATABASE TYPE RECORD
  SIGNUP(
    CREATE user CONTENT {
      name = $name;
      surname = $surname;
      patronymic = $patronymic;
      email = $email;
      password = crypto::argon2::generate($password)
    }
  )
  SIGNIN(
    SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(password, $password)
  )
  DURATION FOR TOKEN 15m FOR SESSION 1w
;
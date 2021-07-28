const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password){
      return res.status(400).json('Incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      console.log("db: ", db);
      trx.insert({
          hash: hash,
          email: email
        })
        .into("login")
        .returning("email")
        .then(loginEmail => {
          console.log("loginEmail: ", loginEmail);
          return trx("users")
            .returning("*")
            .insert({
              email: loginEmail[0],
              name: name,
              joined: new Date()
            })
            .then((user) => {
              res.json(user[0]);
              console.log("user: ", user);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
        console.log("trx: ", trx, " email: ", email, " name: ", name, " password: ", password);
    })
    .catch(err => res.status(400).json("unable to register, sorry mate"));
}

module.exports = {
    handleRegister: handleRegister
}
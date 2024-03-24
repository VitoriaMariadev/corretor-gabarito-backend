import pool from "../database/db.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// --------------------- GET --------------------

const ShowAllUser = async (req, res) => {
    try {
      const users = await pool.query("SELECT name FROM users");
  
      if (users.rows.length === 0) {
        return res
          .status(200)
          .json({ mensagem: "Não há usuários cadastrados.", status: 400 });
      }
  
      res.status(200).json(users.rows);
    } catch (erro) {
      res.status(500).json({ mensagem: erro.message });
    }
  };

// --------------------- POST -------------------

const CreateUser = async (req, res) => {
  try {
    const { name, password, confirmPassword } = req.body;

    if (!name || !password || !confirmPassword) {
      return res
        .status(200)
        .json({ Mensagem: "Há campo(s) vazio(s).", status: 400 });
    } else {
      // const newUser = primeiraLetraMaiuscula(name);
      const newPassword = password.trim();
      const newConfirmPassword = confirmPassword.trim();

      if (newPassword.length < 6) {
        return res.status(200).json({
          Mensagem: "A password precisa ter no minimo 6 caracteres.",
          status: 400,
        });
      } else {
        if (newPassword != newConfirmPassword) {
          return res
            .status(200)
            .json({ Mensagem: "As password estão diferentes.", status: 400 });
        } else {
          const checkUser = await pool.query(
            "SELECT * FROM users WHERE name = $1",
            [name]
          );
          if (checkUser.rows.length > 0) {
            return res
              .status(200)
              .json({ Mensagem: "Usuário já existe", status: 400 });
          } else {
            const passwordEncrypted = await bcrypt.hash(newPassword, 10);

            const registeringUser = await pool.query(
              "INSERT INTO users (name, password) VALUES ($1, $2)",
              [name, passwordEncrypted]
            );
            if (!registeringUser) {
              res
                .status(200)
                .json({ Mensagem: "Erro na criação do usuario.", status: 400 });
            } else {
              res.status(201).json({
                user: {
                  name: registeringUser.name,
                },
                Mensagem: "Usuario cadastrada com sucesso.",
              });
            }
          }
        }
      }
    }
  } catch (erro) {
    res.status(500).json({ Mensagem: erro.Mensagem });
  }
};


const Login = async (req, res) => {

  console.log('entrei na função')
  try {
    const { name, password } = req.body;

    console.log(name, password)

    if (!name || !password) {
      return res
        .status(200)
        .json({ Mensagem: "Há campo(s) vazio(s).", status: 400 });
    }

    // const newUser = primeiraLetraMaiuscula(name);
    // const newPassword = password.trim();

    const checkUser = await pool.query(
      "SELECT * FROM users WHERE name = $1",
      [name]
    );
    const passwordValid = bcrypt.compareSync(
      password,
      checkUser.rows[0].password
    );

    if (!passwordValid) {
      return res
        .status(200)
        .json({ Mensagem: "Usuário ou password incorretos.", status: 400 });
    }

    // const usuarioId = checkUser.rows[0].id_usuario;
    const userPassword = checkUser.rows[0].password;

    const token = jwt.sign(
      { users: checkUser.rows[0].name },
      "AluW4ok65cOK0iLdZbP6600b88ab4b30",
      { expiresIn: 86400 }
    );

    console.log('passei no token')

    // const verificaUsuarioAdm = await pool.query(
    //   `SELECT u.id_usuario, u.name 
    //     FROM usuario u 
    //     inner join administrador a on a.id_usuario = u.id_usuario
    //     where a.id_usuario = $1`,
    //   [usuarioId]
    // );

    // if (verificaUsuarioAdm.rows.length > 0) {
    //   res.cookie("token", token, { httpOnly: true });
    //   res
    //     .status(200)
    //     .json({
    //       token,
    //       usuarioId,
    //       newUser,
    //       userPassword,
    //       tipoUsuario: admin,
    //     });
    // }

    res.cookie("token", token, { httpOnly: true });

    res
      .status(200)
      .json({ token, name, password});

  } catch (erro) {
      return res.status(500).json({ Mensagem: erro.Mensagem });
    
  }
};
// --------------------- DELETE -----------------

// --------------------- PATCH ------------------

// --------------------- EXPORT -----------------

export {
  ShowAllUser,
  CreateUser,
  Login
};

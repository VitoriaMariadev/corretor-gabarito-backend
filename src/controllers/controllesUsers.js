import pool from "../database/db.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// --------------------- GET --------------------

const ShowAllUser = async (req, res) => {
    try {
      const usuarios = await pool.query("SELECT name FROM users");
  
      if (usuarios.rows.length === 0) {
        return res
          .status(200)
          .json({ mensagem: "Não há usuários cadastrados.", status: 400 });
      }
  
      res.status(200).json(usuarios.rows);
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
      // const novoUsuario = primeiraLetraMaiuscula(name);
      const newPassword = password.trim();
      const newConfirmPassword = confirmPassword.trim();

      if (newPassword.length < 6) {
        return res.status(200).json({
          Mensagem: "A senha precisa ter no minimo 6 caracteres.",
          status: 400,
        });
      } else {
        if (newPassword != newConfirmPassword) {
          return res
            .status(200)
            .json({ Mensagem: "As senha estão diferentes.", status: 400 });
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

// --------------------- DELETE -----------------

// --------------------- PATCH ------------------

// --------------------- EXPORT -----------------

export {
  ShowAllUser,
  CreateUser,
};

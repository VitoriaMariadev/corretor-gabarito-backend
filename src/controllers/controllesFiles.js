import pool from "../database/db.js"

const ShowAllFilesByFolder = async (req, res) => {
  try {
    const {id} = req.params 
    
    const files = await pool.query(`SELECT * FROM files WHERE folder_id = ${id}`);

    if (files.rows.length === 0) {
      return res
        .status(200)
        .json({ mensagem: "Não há arquivos cadastrados.", status: 400 });
    }

    res.status(200).json(files.rows);
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
};

const CreateFile = async (req, res) => {
  try {
    const { name, folder_id } = req.body;

    console.log(name, folder_id);

    if (!name) {
      return res.status(400).json({ mensagem: "Insira um nome." });
    }

    const createFile = await pool.query(
      `INSERT INTO files (folder_id, name) VALUES (${folder_id}, '${name}')`
    );

    return res.status(200).json({ mensagem: "Arquivo cadastrado com sucesso." });
  } catch (erro) {
    return res.status(500).json({ mensagem: "Ocorreu um erro interno no servidor." });
  }
};


export {
    ShowAllFilesByFolder,
    CreateFile
  };
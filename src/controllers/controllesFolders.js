import pool from "../database/db.js"

const ShowAllFoldersByUser = async (req, res) => {

    const id_user = req.body.id_user;
    console.log(id_user)

    try {
      const folders = await pool.query(`SELECT * FROM folders WHERE user_id = ${id_user}`);
  
      if (folders.rows.length === 0) {
        return res
          .status(200)
          .json({ mensagem: "Não há pastas cadastrados.", status: 400 });
      }

      console.log('aqui')
  
      res.status(200).json(folders.rows);
    } catch (erro) {
      res.status(500).json({ mensagem: erro.message });
    }
  };

const ShowFolderById = async (req, res) => {
  const {id} = req.params
  console.log(id);

  try {
      const folder = await pool.query(`SELECT * FROM folders WHERE id = ${id}`);
      
      if (folder.rows.length === 0) {
          return res.status(400).json({ mensagem: "Pasta não encontrada.", status: 400 });
      }

      const folderName = folder.rows[0].name; // Supondo que o nome da pasta está armazenado na coluna "nome"
      
      res.status(200).json({ nome: folderName });
  } catch (erro) {
      res.status(500).json({ mensagem: erro.message });
  }
};


const CreateFolders = async (req, res) => {

    try{
        const {name, id_user} = req.body

        console.log(name, id_user)

        if (!name) {
            return res
            .status(200)
            .json({ Mensagem: "Insira um nome.", status: 400 });
        }

        const createFolder = await pool.query(
            `INSERT INTO folders (user_id, name) VALUES (${id_user}, '${name}');
            `
        );
    
        return res
            .status(200)
            .json({ Mensagem: "Pasta cadastrada com sucesso." });
    } catch (erro) {
      return res
        .status(500)
        .json({ Mensagem: "Ocorreu um erro interno no servidor." });
    }

}

export {
    ShowAllFoldersByUser,
    ShowFolderById,
    CreateFolders,
    
  };
//configs:
const express = require('express')
require('dotenv').config()
//importando do arquivo do banco de dados
const db = require('./database')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
//-------------------------------------------
app.get('/', (req, res) => {
    res.json({ message: "API CRUD com Express e MySQL" })
})

// CRUD DO USUÁRIO
app.get('/usuarios', async (req, res) => {
    try {
        const [usuarios] = await db.query('SELECT * FROM usuarios ORDER BY id DESC')
        res.json(usuarios)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar usuários' })
    }
})

app.get('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [usuarios] = await db.query(
            'SELECT * FROM usuarios WHERE id = ?', [id]
        )

        if (usuarios.length === 0) {
            return res.status(404).json({ message: 'Erro ao buscar usuario' })
        }

        res.json(usuarios[0])
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar usuarios' })
    }
})

app.post('/usuarios', async (req, res) => {
    try {
        const { nome, email  } = req.body

        if (!nome || !email) {
            return res.status(400).json({ message: 'Nome e email são obrigatórios' })
        }

        const [resultado] = await db.query(
            'INSERT INTO usuarios (nome, email) VALUES (?, ?)', [nome, email || null]
        )

        res.status(201).json({
            id: resultado.insertId,
            nome,
            email
            
        })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar usuário' })
    }
})

app.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { nome, email } = req.body

        if (!nome || !email) {
            return res.status(400).json({ message: 'Nome e email são obrigatórios' })
        }

        const [resultado] = await db.query(
            'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?', [nome, email || null, id]
        )

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        res.json({ id, nome, email })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar usuário' })
    }
})

app.delete('/usuarios/:id', async (req, res) => {
    try{
        const { id } = req.params
        const [resultado] = await db.query(
            'DELETE FROM usuarios WHERE id = ?', [id]
        )

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        res.status(204).send()
    } catch(error) {
        res.status(500).json({ message: 'Erro ao cadastrar usuário' })
    }
})
//TERMINOU O CRUD DO USUÁRIO


// CRUD DO CADASTRO
app.get('/cadastro', async (req, res) => {
    try {
        const [cadastro] = await db.query('SELECT * FROM cadastro ORDER BY id DESC')
        res.json(cadastro)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar cadastro' })
    }
})

app.get('/cadastro/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [cadastro] = await db.query(
            'SELECT * FROM cadastro WHERE id = ?', [id]
        )

        if (cadastro.length === 0) {
            return res.status(404).json({ message: 'Erro ao buscar cadastro' })
        }

        res.json(cadastro[0])
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar cadastro' })
    }
})

app.post('/cadastro', async (req, res) => {
    try {
        const { nome, sobrenome,  email, cpf, telefone, senha  } = req.body

        if (!nome || !sobrenome || !email || !cpf || !telefone || !senha) {
            return res.status(400).json({ message: 'Nome, sobrenome, email, cpf, telefone e senha são obrigatórios' })
        }

        const [resultado] = await db.query(
            'INSERT INTO cadastro (nome, sobrenome, email, cpf, telefone, senha) VALUES (?, ?, ?, ?, ?, ?)', [nome, sobrenome, email, cpf, telefone, senha || null]
        )

        res.status(201).json({
            id: resultado.insertId,
            nome,
            sobrenome,
            email,
            cpf, 
            telefone,
            senha,

            
        })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao realizar o cadastro' })
    }
})

app.put('/cadastro/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { nome, sobrenome,  email, cpf, telefone, senha } = req.body

    

        const [resultado] = await db.query(
            'UPDATE cadastro SET nome = ?, sobrenome = ?, email = ?, cpf = ?, telefone = ?, senha = ? WHERE id = ?', [nome, sobrenome, email, cpf, telefone, senha || null, id]
        )

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Cadastro não encontrado' })
        }

        res.json({ nome, sobrenome, email, cpf, telefone, senha })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao realizar o cadastro', error })
    }
})

app.delete('/cadastro/:id', async (req, res) => {
    try{
        const { id } = req.params
        const [resultado] = await db.query(
            'DELETE FROM cadastro WHERE id = ?', [id]
        )

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Cadastro não encontrado' })
        }

        res.status(204).send()
    } catch(error) {
        res.status(500).json({ message: 'Erro ao realizar o cadastro' })
    }
})
// TERMINOU O CRUD DO CADASTRO


app.listen(port, () => {
    console.log(`Server rodando em http://localhost:${port}`);    
})
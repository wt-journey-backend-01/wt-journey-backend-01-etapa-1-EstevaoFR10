const express = require('express')
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

let ultimoContato = null;
let ultimaSugestao = null;

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Rota para exibir o formulário de contato
app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

// Rota para API de lanches
app.get('/api/lanches', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'data', 'lanches.json'));
});

app.get('/not-found', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '404.html'));
});

// Rota para processar o cadastro de lanche
app.post('/', (req, res) => {
    ultimaSugestao = req.body;
    res.redirect('/sugestao');
});

// Rota para exibir agradecimento pela sugestão
app.get('/sugestao', (req, res) => {
    if (!ultimaSugestao) {
        return res.redirect('/not-found');
    }

    const { nome, ingredientes } = ultimaSugestao;
    
    const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <title>Obrigado pela sugestão</title>
    </head>
    <body>
        <h1>Obrigado pela sua sugestão!</h1>
        <h2>Dados recebidos:</h2>
        <p><strong>Nome do Lanche:</strong> ${nome}</p>
        <p><strong>Ingredientes:</strong> ${ingredientes}</p>
        <p>Sua sugestão foi recebida com sucesso!</p>
        <a href="/">Voltar ao início</a>
    </body>
    </html>
    `;
    
    res.send(html);
});

app.post('/contato', (req, res) => {
    ultimoContato = req.body;
    res.redirect('/contato-recebido');
});

app.get('/contato-recebido', (req, res) => {
    if (!ultimoContato) {
        return res.redirect('/not-found');
    }

    const { nome, email, assunto, mensagem } = ultimoContato;
    
    const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <title>Obrigado pelo contato</title>
    </head>
    <body>
        <h1>Obrigado pelo seu contato!</h1>
        <h2>Dados recebidos:</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${assunto}</p>
        <p><strong>Mensagem:</strong> ${mensagem}</p>
        <p>Sua mensagem foi recebida com sucesso!</p>
        <a href="/">Voltar ao início</a>
    </body>
    </html>
    `;
    
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});
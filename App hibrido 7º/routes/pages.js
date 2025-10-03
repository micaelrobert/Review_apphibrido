const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Página Inicial' });
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.get('/cadastro', (req, res) => {
    res.render('cadastro', { title: 'Cadastro' });
});

router.get('/tarefas', (req, res) => {
    res.render('tarefas', {
        title: 'Gerenciador de Tarefas',
        description: 'Gerencie suas tarefas de forma eficiente'
    });
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        title: 'Dashboard de Tarefas',
        description: 'Estatísticas e progresso do seu projeto'
    });
});

module.exports = router;
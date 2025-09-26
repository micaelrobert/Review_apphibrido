/**
 * ROTAS DE PÁGINAS
 * * Este arquivo contém todas as rotas relacionadas às páginas HTML
 * da nossa aplicação. Aqui você pode adicionar novas páginas facilmente.
 */

const express = require('express');
const router = express.Router();

// Dados de exemplo (agora gerenciados no servidor)
let tasks = [
    { id: 1, title: 'Configurar ambiente', description: 'Instalar Node.js e dependências.', priority: 'alta', completed: true },
    { id: 2, title: 'Criar rotas', description: 'Definir as rotas da aplicação.', priority: 'media', completed: true },
    { id: 3, title: 'Implementar funcionalidades', description: 'Codificar as features principais.', priority: 'alta', completed: false },
    { id: 4, title: 'Estilizar o frontend', description: 'Aplicar o novo tema visual roxo.', priority: 'baixa', completed: false }
];
let nextTaskId = 5;

/**
 * PÁGINA INICIAL
 * =============
 * Rota: GET /
 * Descrição: Página principal do aplicativo
 */
router.get('/', (req, res) => {
    res.redirect('/tarefas');
});

/**
 * PÁGINA DE TAREFAS
 * =================
 * Rota: GET /tarefas
 * Descrição: Página para gerenciar tarefas
 */
router.get('/tarefas', (req, res) => {
    console.log('📋 Acessando página de tarefas...');
    
    const pageData = {
        title: 'Gerenciador de Tarefas',
        description: 'Gerencie suas tarefas de forma eficiente',
        tasks: tasks,
        completedTasks: tasks.filter(t => t.completed).length
    };
    
    res.render('tarefas', pageData);
});

/**
 * ADICIONAR NOVA TAREFA
 * =====================
 * Rota: POST /tarefas/add
 * Descrição: Adiciona uma nova tarefa
 */
router.post('/tarefas/add', (req, res) => {
    const { title, description, priority } = req.body;

    if (!title || !description || !priority) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    const newTask = {
        id: nextTaskId++,
        title,
        description,
        priority,
        completed: false
    };

    tasks.push(newTask);
    res.redirect('/tarefas');
});

/**
 * ATUALIZAR STATUS DA TAREFA
 * ==========================
 * Rota: POST /tarefas/toggle/:id
 * Descrição: Marca uma tarefa como concluída/pendente
 */
router.post('/tarefas/toggle/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
    }
    res.redirect('/tarefas');
});


/**
 * EXCLUIR TAREFA
 * ===============
 * Rota: POST /tarefas/delete/:id
 * Descrição: Exclui uma tarefa
 */
router.post('/tarefas/delete/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    tasks = tasks.filter(t => t.id !== taskId);
    res.redirect('/tarefas');
});

/**
 * PÁGINA DO DASHBOARD
 * ===================
 * Rota: GET /dashboard
 * Descrição: Página com estatísticas do projeto
 */
router.get('/dashboard', (req, res) => {
    console.log('📊 Acessando página de dashboard...');

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionPercentage = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(0) : 0;
    const last5Tasks = [...tasks].reverse().slice(0, 5);

    const pageData = {
        title: 'Dashboard de Tarefas',
        description: 'Estatísticas e progresso do seu projeto',
        stats: {
            total: totalTasks,
            completed: completedTasks,
            pending: pendingTasks,
            percentage: completionPercentage
        },
        last5Tasks: last5Tasks
    };
    
    res.render('dashboard', pageData);
});

module.exports = router;
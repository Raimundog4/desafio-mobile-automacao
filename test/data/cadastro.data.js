export const cadastroData = {
    
    sucesso: {
        email: () => `teste${Date.now()}@mail.com`,
        senha: '12345678'
    },

    invalido: {
        email: 'rf.com',
        senha: '123',
        confirmacao: '456',
        mensagens: [
            'Please enter a valid email address',
            'Please enter at least 8 characters',
            'Please enter the same password'
        ]
    }
};
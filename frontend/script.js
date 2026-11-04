
    const equipamento = document.getElementById('equipamento');
    const paginacao = document.getElementById('paginacao');
    const selecaomarca = document.getElementById('selecaomarca')
    const selecaodisponivel = document.getElementById('selecaodisponivel')

    let paginaAtual = 1;
    const equipamentosPorPagina = 6;
    let todosEquipamentos = [];
   
    function filtrarEquipamentos(){

          
    const pesquisa = buscarEquipamentos.value.toLowerCase().trim();
    const listamarca = selecaomarca.value.toLowerCase().trim();
    const listadisponivel = selecaodisponivel.value.toLowerCase().trim();
     

    const equipamentosFiltrados = todosEquipamentos.filter(function(item) {

         

        const equipamentosPesquisa =
        ((item.marca || '').toLowerCase().includes(pesquisa) ||
         (item.modelo || '').toLowerCase().includes(pesquisa) || 
        (item.patrimonio || '').toLowerCase().includes(pesquisa))

        const MarcaPesquisa = 
            
            listamarca === '' ||
    (item.marca || '').toLowerCase() === listamarca;

     const DisponivelPesquisa = 

        listadisponivel === '' ||
        (item.status || '').toLowerCase() === listadisponivel;


        return  equipamento.innerHTML = '', equipamentosPesquisa && MarcaPesquisa && DisponivelPesquisa


       
    });

     
        
  
    paginaAtual = 1;
    mostrarEquipamentos(equipamentosFiltrados);
    mostrarPaginacao();
        
}

buscarEquipamentos.addEventListener('input', filtrarEquipamentos);
selecaomarca.addEventListener('change', filtrarEquipamentos);
selecaodisponivel.addEventListener('change', filtrarEquipamentos);

    
 


    function mostrarEquipamentos(listaequipamentos) {

        const inicio = (paginaAtual - 1) * equipamentosPorPagina;
        const fim = inicio + equipamentosPorPagina;
        let totalPaginas = 0;

        listaequipamentos.slice(inicio, fim).forEach(listaequipamentos => {
                    const item = document.createElement('div');
                    const BotaoEditar = document.createElement('button');
                    BotaoEditar.textContent = 'Editar';
                    const BotaoExcluir = document.createElement('button');
                    BotaoExcluir.textContent = 'Excluir';
            

                    BotaoExcluir.addEventListener('click', function() {

                    if (!confirm('Tem certeza que deseja excluir este equipamento?')) {
                        return;
                    }

                    fetch(`http://localhost:3000/api/equipamentos/${listaequipamentos.id}`, {
                        method: 'DELETE'
                    })
                    .then(resposta => {
                        if (!resposta.ok) {
                            throw new Error('Não foi possível excluir o equipamento.');
                        }

                        return resposta.json();
                    })
                    .then(dados => {
                        carregarEquipamentos();
                    })
                    .catch(erro => {
                        console.error('Erro ao excluir:', erro);
                    });
                });

                   
                BotaoEditar.addEventListener('click', function() {
                    equipamentoEditandoId = listaequipamentos.id;

                    document.getElementById('patrimonio').value = listaequipamentos.patrimonio;
                    document.getElementById('tipo').value = listaequipamentos.tipo;
                    document.getElementById('marca').value = listaequipamentos.marca;
                    document.getElementById('modelo').value = listaequipamentos.modelo;
                    document.getElementById('numero_serie').value = listaequipamentos.numero_serie;
                    document.getElementById('status').value = listaequipamentos.status;
                    document.getElementById('localizacao').value = listaequipamentos.localizacao;
                });


                    item.innerHTML = `${listaequipamentos.marca} ${listaequipamentos.modelo} ${listaequipamentos.status}--- Patrimonio: ${listaequipamentos.patrimonio} `;

                    equipamento.appendChild(item);
                    item.appendChild(BotaoExcluir);
                    item.appendChild(BotaoEditar);
                });
            }
           

    
            carregarEquipamentos();

    function carregarEquipamentos() {
        equipamento.innerHTML = '';

        fetch('http://localhost:3000/api/equipamentos')
            .then(respostaDoServidor => respostaDoServidor.json())
            .then(dados => {
                todosEquipamentos = dados;

                 totalPaginas = Math.ceil(todosEquipamentos.length / equipamentosPorPagina)

                mostrarEquipamentos(todosEquipamentos);
                mostrarPaginacao();
                
            })
        
        .catch(erro => {
            console.error('Erro ao carregar equipamentos:', erro);
        });
    }

    
    

     function mostrarPaginacao () {
        paginacao.innerHTML = '';
                

    
                const botaoProximo = document.createElement('button');
                botaoProximo.textContent = 'Próximo';
                botaoProximo.disabled = paginaAtual >= totalPaginas;

                 const botaoVoltar = document.createElement('button');
                     botaoVoltar.textContent = 'Voltar';
                     botaoVoltar.disabled = paginaAtual === 1;


                botaoProximo.addEventListener('click', function(){
                     
                    if (paginaAtual < totalPaginas){

                    paginaAtual++;
                    carregarEquipamentos();
                    console.log('Página atual:', paginaAtual, 'Total:', totalPaginas);
                    }
                    
                    
                });

                 botaoVoltar.addEventListener('click', function(){

                        if (paginaAtual > 1) {

                            paginaAtual--;
                            carregarEquipamentos();
                        }
                        

                    })

                    
            paginacao.appendChild(botaoProximo);
            paginacao.appendChild(botaoVoltar);
            };
        


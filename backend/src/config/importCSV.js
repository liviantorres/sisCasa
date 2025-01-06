const fs = require('fs');
const csv = require('csv-parser');
const Atividade = require('../models/AtividadeTabela'); 
const Categoria = require('../models/Categoria'); 

async function importCSV(caminhoDoArquivo) {
  const resultados = [];

  fs.createReadStream(caminhoDoArquivo)
    .pipe(csv())
    .on('data', (row) => {
      resultados.push(row);
    })
    .on('end', async () => {
      console.log('Arquivo CSV lido com sucesso! Processando dados...');

      let categoriaAtual = null;

      for (const linha of resultados) {
        const categoriaNome = linha['Itens de cada categoria']?.trim();
        const atividadeNome = linha['ATIVIDADES (Definição das Atividades no link: https://eideia.ufc.br/wp-content/uploads/2024/03/casa-programa-de-formacao-em-docencia-do-ensino-superior-070324.pdf)']?.trim();
        const horasAutorizadas = parseFloat(linha['Teto autorizado para cada atividade/ação docente (h)']?.trim());
        const horasSubmetidas = linha['Horas submetidas'] !== '#REF!' ? parseInt(linha['Horas submetidas']?.trim()) : null;
        const horasConsideradas = linha['Horas consideradas'] !== '#REF!' ? parseInt(linha['Horas consideradas']?.trim()) : null;
        const metrica = linha['Metrica']?.trim();

        if (categoriaNome && !atividadeNome) {
          const match = categoriaNome.match(/CATEGORIA (\w+)\s*[-–]\s*(.*)/); 
          if (match) {
            const categoriaNumero = match[1].trim(); 
            const categoriaDescricao = match[2].trim();

            try {
              categoriaAtual = await Categoria.findOne({ where: { nome: categoriaNumero } });

              if (!categoriaAtual) {
                categoriaAtual = await Categoria.create({
                  nome: categoriaNumero,
                  descricao: categoriaDescricao
                });
                console.log(`Categoria '${categoriaNumero}' criada com sucesso.`);
              } else {
                console.log(`Categoria '${categoriaNumero}' já existe.`);
              }
            } catch (error) {
              console.error(`Erro ao processar a categoria '${categoriaNumero}': ${error.message}`);
            }
          } else {
            console.log(`Formato de categoria inválido na linha: ${JSON.stringify(linha)}`);
          }
        }

        if (atividadeNome && categoriaAtual) {
          const codigoAtividade = categoriaNome.trim(); 

          try {
        
            const atividadeExistente = await Atividade.findOne({ where: { nome: atividadeNome, categoriaId: categoriaAtual.id } });

            if (atividadeExistente) {
         
              await Atividade.update(
                {
                  codigo: codigoAtividade,  
                  nome: atividadeNome,  
                  metrica: metrica, 
                  teto_autorizado: horasAutorizadas,
                  horas_submetidas: horasSubmetidas,
                  horas_consideradas: horasConsideradas,
                },
                {
                  where: { id: atividadeExistente.id }
                }
              );
              console.log(`Atividade '${atividadeNome}' já existe. Dados atualizados.`);
            } else {
         
              await Atividade.create({
                codigo: codigoAtividade,  
                nome: atividadeNome,  
                metrica: metrica, 
                teto_autorizado: horasAutorizadas,
                horas_submetidas: horasSubmetidas,
                horas_consideradas: horasConsideradas,
                categoriaId: categoriaAtual.id, 
              });
              console.log(`Atividade '${atividadeNome}' associada à categoria '${categoriaAtual.nome}' criada com sucesso.`);
            }
          } catch (error) {
            console.error(`Erro ao associar a atividade '${atividadeNome}' à categoria '${categoriaAtual.nome}': ${error.message}`);
          }
        } else if (atividadeNome && !categoriaAtual) {
          console.log(`Atividade '${atividadeNome}' sem categoria definida. Verifique os dados do CSV.`);
        }
      }

      console.log('Importação concluída!');
    });
}

module.exports = importCSV;

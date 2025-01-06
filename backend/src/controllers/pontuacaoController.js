const User = require('../models/User');
const AtividadeTabela = require('../models/AtividadeTabela');
const Participacao = require('../models/Participacao');
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');  // Caminho do diretório onde o arquivo será armazenado
  },
  filename: (req, file, cb) => {
    // Define um nome fixo para o arquivo, por exemplo, 'dados.csv'
    cb(null, 'dados.csv');  
  },
});

const upload = multer({ storage: storage });

const atualizarCsv = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('Nenhum arquivo foi enviado.');
    }

    // Caminho do arquivo antigo
    const caminhoAntigo = path.join(__dirname, 'uploads', 'dados.csv');
    
    // Verifica se o arquivo antigo existe e remove antes de salvar o novo
    if (fs.existsSync(caminhoAntigo)) {
      fs.unlinkSync(caminhoAntigo);  // Remove o arquivo antigo
      console.log('Arquivo antigo removido.');
    }

    const dadosCsv = [];
    const caminhoDoArquivo = req.file.path;

    fs.createReadStream(caminhoDoArquivo)
      .pipe(csv())
      .on('data', (row) => {
        dadosCsv.push(row);
      })
      .on('end', async () => {
        console.log('Arquivo CSV lido com sucesso! Processando dados...');

        // Deleta os dados existentes no banco antes de atualizar
        await AtividadeTabela.destroy({
          where: {}, // Se quiser apagar todas as entradas ou se precisar filtrar, adicione a condição
        });

        // Atualiza as atividades com os dados do novo CSV
        for (const linha of dadosCsv) {
          const atividadeTabelaId = linha['atividadeTabelaId'];
          const horasSubmetidas = linha['horasSubmetidas'];
          const horasConsideradas = linha['horasConsideradas'];

          await AtividadeTabela.create({
            atividadeTabelaId: atividadeTabelaId,
            horas_submetidas: horasSubmetidas,
            horas_consideradas: horasConsideradas,
          });
        }

        res.status(200).send('Dados atualizados com sucesso!');
      })
      .on('error', (error) => {
        console.error('Erro ao ler o arquivo CSV:', error);
        res.status(500).send('Erro ao processar o arquivo CSV.');
      });
  } catch (error) {
    console.error('Erro ao atualizar os dados do CSV:', error);
    res.status(500).send('Erro ao processar os dados');
  }
};



const atualizarPontuacao = async (req, res) => {
  const { usuarioId, atividadeCodigo } = req.params;
  const { horasSubmetidas, horasConsideradas } = req.body;

  try {
    const usuario = await User.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const atividade = await AtividadeTabela.findOne({
      where: { codigo: atividadeCodigo },
    });

    if (!atividade) {
      return res.status(404).json({ message: 'Atividade não encontrada' });
    }

    let pontuacao = await Pontuacao.findOne({
      where: { userId: usuarioId, atividadeTabelaId: atividade.id },
    });

    if (!pontuacao) {
      pontuacao = await Pontuacao.create({
        userId: usuarioId,
        atividadeTabelaId: atividade.id,
        horasSubmetidas: horasSubmetidas || 0, 
        horasConsideradas: horasConsideradas || 0,
      });
      return res.status(201).json({ message: 'Pontuação criada com sucesso', pontuacao });
    }

    pontuacao.horasSubmetidas = horasSubmetidas || pontuacao.horasSubmetidas;
    pontuacao.horasConsideradas = horasConsideradas || pontuacao.horasConsideradas;

    await pontuacao.save();

    return res.status(200).json({ message: 'Pontuação atualizada com sucesso', pontuacao });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar ou criar pontuação', error });
  }
};

const atualizarHorasAtividades = async (req, res) => {
  try {
    const { codigo, userId, horasSubmetidas, horasConsideradas } = req.body;

    const atividade = await AtividadeTabela.findOne({ where: { codigo } });

    if (!atividade) {
      return res.status(404).json({ message: 'Atividade não encontrada' });
    }

    const tetoAutorizado = atividade.teto_autorizado;

    let horasSubmetidasFinal = Number(horasSubmetidas) || 0;
    let horasConsideradasFinal = Number(horasConsideradas) || 0;

    if (horasConsideradasFinal > tetoAutorizado) {
      horasConsideradasFinal = tetoAutorizado;
    }

    let participacao = await Participacao.findOne({
      where: {
        atividadeTabelaId: atividade.id,
        userId: userId
      }
    });

    if (!participacao) {
      participacao = await Participacao.create({
        atividadeTabelaId: atividade.id,
        userId: userId,
        horasSubmetidas: horasSubmetidasFinal,
        horasConsideradas: horasConsideradasFinal
      });

      participacao.atividadeId = atividade.id;
      await participacao.save();

      await atualizarHorasConcluidas(userId);

      return res.status(201).json({
        message: 'Participação criada com sucesso!',
        participacao
      });
    }

    participacao.horasSubmetidas += horasSubmetidasFinal;
    participacao.horasConsideradas += horasConsideradasFinal;

  
    if (participacao.horasConsideradas > tetoAutorizado) {
      participacao.horasConsideradas = tetoAutorizado;
    }

    await participacao.save();

    await atualizarHorasConcluidas(userId);

    return res.status(200).json({ message: 'Horas atualizadas com sucesso!', participacao });
  } catch (error) {
    console.error('Erro ao atualizar horas:', error);
    return res.status(500).json({ message: 'Erro ao atualizar as horas', error: error.message });
  }
};

const atualizarHorasConcluidas = async (userId) => {
  try {
  
    const participacoes = await Participacao.findAll({
      where: { userId },
      include: [{ model: AtividadeTabela }] 
    });


    const totalHoras = participacoes.reduce((sum, participacao) => {
      return sum + participacao.horasConsideradas;
    }, 0);

    
    await User.update({ horasConcluidas: totalHoras }, { where: { id: userId } });
  } catch (error) {
    console.error('Erro ao atualizar horas concluídas do usuário:', error);
  }
};

const buscarParticipacao = async (req, res) =>{
  try {
    const { userId } = req.params;
    if(!userId){
      return res.status(400).json({ message: 'O campo userId é obrigatório.' });
    }

    const participacoes = await Participacao.findAll({ where: {userId}})
    return res.status(200).json(participacoes);
  } catch (error) {
    console.error('Erro ao buscar participaçao: ', error);
    return res.status(500).json({message: 'Erroa ao buscar participaçoes', error: error.message});
  }
}



module.exports = {
  atualizarPontuacao,atualizarHorasAtividades, buscarParticipacao, atualizarCsv
};

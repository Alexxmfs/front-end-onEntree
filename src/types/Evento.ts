interface Evento {
    id_evento: number;
    nome: string;
    data_evento: string;
    horario_evento: string;
    tipo: string;
    id_local: number;
    data_atualizacao: string;
    local: {
      nome: string;
      endereco: string;
      portões: string;
    };
  }

export default Evento;
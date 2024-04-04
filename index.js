let participantes = [
  {
    nome: "Layon Martins",
    email: "layon@gmail.com",
    dataInscricao: new Date(2024, 3, 2, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Maria Silva",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 3, 5, 11, 30),
    dataCheckIn: new Date(2024, 3, 3, 11,10)
  },
  {
    nome: "João Pereira",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 3, 6, 15, 45),
    dataCheckIn: null
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 3, 7, 10, 20),
    dataCheckIn: new Date(2024, 3, 3, 11,30)
  },
  {
    nome: "Pedro Oliveira",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 3, 8, 18, 10),
    dataCheckIn: new Date(2024, 3, 3, 11,40)
  },
  {
    nome: "Carla Santos",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 3, 9, 9, 0),
    dataCheckIn: new Date(2024, 3, 3, 11,50)
  },
  {
    nome: "Rafaela Lima",
    email: "rafaela@gmail.com",
    dataInscricao: new Date(2024, 3, 10, 16, 20),
    dataCheckIn: new Date(2024, 3, 3, 12,0)
  },
  {
    nome: "Lucas Costa",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 3, 11, 12, 15),
    dataCheckIn: new Date(2024, 3, 3, 12,10)
  },
  {
    nome: "Mariana Almeida",
    email: "mariana@gmail.com",
    dataInscricao: new Date(2024, 3, 12, 20, 30),
    dataCheckIn: new Date(2024, 3, 3, 12,20)
  }
];
const criarNovoParticipante = (participante) => {

  const dataInscricao  = dayjs(Date.now()).to(participante.dataInscricao);
  let dataCheckIn    = dayjs(Date.now()).to(participante.dataCheckIn);

  if(participante.dataCheckIn == null){
      dataCheckIn = `
        <button
          data-email="${participante.email}"
          onclick="fazerCheckIn(event)"
        >
        Confirmar check-in
        </button>
      `
  }

  return `
    <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
        
  `
}

const atualizarLista = (participantes) =>{
    let output = ""
    for(let participante of participantes){
      output = output + criarNovoParticipante(participante);
    }
    document.querySelector('tbody').innerHTML= output;
}

atualizarLista(participantes);

const adicionarParticipante = (event) =>{

  event.preventDefault();

  const dadosInscricao = new FormData(event.target);

  const participante = {
    nome: dadosInscricao.get("nome"),
    email: dadosInscricao.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  );

  if(participanteExiste){
    alert("Email já cadastrado");
    return
  }

  participantes = [participante, ...participantes];

  atualizarLista(participantes);
  event.target.querySelector('[name="nome"]').value = "";
  event.target.querySelector('[name="email"]').value = "";

}

const fazerCheckIn = (event) => {

  const mensagemConfirmacao = "Tem certeza que deseja fazer o check-in?"; 

  if (confirm(mensagemConfirmacao) == false){
    return
  }
    
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email;
  });

  participante.dataCheckIn = new Date();

  atualizarLista(participantes);
}
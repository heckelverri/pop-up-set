console.log ("funcinando");

// Substitua com sua chave de API e Audience ID
const apiKey = 'ca5df9a34286a210c75699356751f2a9-us17';
const audienceId = 'SEU_AUDIENCE_ID';
const serverPrefix = 'us17'; // Exemplo: 'us19'

// Função para enviar email via API do Mailchimp
async function subscribeUser(email) {
  const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/`;

  const data = {
      email_address: email,
      status: 'subscribed' // Pode ser 'pending' para confirmação de email
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `apikey ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const result = await response.json();
    console.log('Usuário inscrito com sucesso:', result);
    document.getElementById('success-message').style.display = 'block'; // Mostra a mensagem de sucesso
  } else {
    const error = await response.json();
    console.error('Erro ao inscrever usuário:', error);
  }
}

// Captura o evento de envio do formulário
document.getElementById('mc-embedded-subscribe-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o comportamento padrão do formulário
  const email = document.getElementById('mce-EMAIL').value;
  subscribeUser(email);
});

// Função para fechar o pop-up ao clicar fora do conteúdo
document.getElementById('popup-container').addEventListener('click', function(event) {
  if (!document.getElementById('popup-content').contains(event.target)) {
    document.getElementById('popup-container').style.display = 'none'; // Esconde o pop-up
  }
});
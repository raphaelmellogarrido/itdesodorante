import "./Legal.css";

function PoliticaPrivacidade() {
  return (
    <section className="legal container">
      <div className="legal-cabecalho">
        <h1>Política de Privacidade</h1>
        <p className="legal-atualizado">Última atualização: julho de 2026</p>
      </div>

      <div className="legal-secao">
        <p>
          Esta Política de Privacidade explica como a IT desodorante coleta, usa,
          armazena e protege os seus dados pessoais, em conformidade com a Lei
          Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD). Ao usar nosso
          site e criar uma conta, você concorda com as práticas descritas aqui.
        </p>
      </div>

      <div className="legal-secao">
        <h2>1. Quem somos</h2>
        <p>
          A IT desodorante é operada por Raphael Silva, CNPJ 00.000.000/0001-00,
          com endereço na Rua Exemplo, 123, Centro, Rio de Janeiro/RJ, CEP
          20000-000, responsável pelo tratamento dos dados pessoais coletados
          através do site itdesodorante.com.br.
        </p>
      </div>

      <div className="legal-secao">
        <h2>2. Quais dados coletamos</h2>
        <p>Coletamos os seguintes dados quando você cria uma conta ou faz uma compra:</p>
        <ul>
          <li>Nome completo e e-mail</li>
          <li>CPF e data de nascimento</li>
          <li>Telefone</li>
          <li>Endereço completo (CEP, endereço, número, complemento, bairro, cidade e estado)</li>
          <li>Itens do carrinho e histórico de pedidos (produtos comprados, valores e status de entrega)</li>
          <li>Senha, armazenada de forma criptografada — nunca temos acesso a ela em texto simples</li>
        </ul>
      </div>

      <div className="legal-secao">
        <h2>3. Para que usamos seus dados</h2>
        <ul>
          <li>Criar e gerenciar sua conta</li>
          <li>Processar e entregar seus pedidos</li>
          <li>Enviar e-mails transacionais, como confirmação de cadastro, confirmação de pedido e recuperação de senha</li>
          <li>Cumprir obrigações legais e fiscais</li>
          <li>Melhorar a experiência de compra no site</li>
        </ul>
        <p>
          Não usamos seus dados para publicidade paga ou compartilhamos com
          terceiros para fins de marketing.
        </p>
      </div>

      <div className="legal-secao">
        <h2>4. Com quem compartilhamos dados</h2>
        <p>Compartilhamos dados apenas com prestadores de serviço estritamente necessários para operar o site:</p>
        <ul>
          <li><strong>Hostinger</strong> — hospedagem do site e do banco de dados</li>
          <li><strong>Brevo</strong> — envio de e-mails transacionais (confirmação de cadastro, recuperação de senha, confirmação de pedido)</li>
          <li>
            <strong>Mercado Pago</strong> — quando o pagamento online for
            ativado, será usado para processar pagamentos. Não armazenamos
            dados de cartão de crédito em nossos servidores.
          </li>
        </ul>
        <p>Não vendemos nem alugamos seus dados pessoais a terceiros.</p>
      </div>

      <div className="legal-secao">
        <h2>5. Armazenamento e segurança</h2>
        <p>
          Seus dados são armazenados em um banco de dados protegido, com
          conexão criptografada (HTTPS) em todas as páginas do site. Sua senha
          é armazenada com hash criptográfico, não em texto legível.
        </p>
      </div>

      <div className="legal-secao">
        <h2>6. Armazenamento local no navegador</h2>
        <p>
          Usamos o armazenamento local do seu navegador (localStorage) para
          manter você conectado e para guardar o carrinho de compras quando
          você não está logado. Não usamos cookies de rastreamento ou
          publicidade.
        </p>
      </div>

      <div className="legal-secao">
        <h2>7. Seus direitos</h2>
        <p>De acordo com a LGPD, você tem direito a:</p>
        <ul>
          <li>Confirmar a existência de tratamento dos seus dados</li>
          <li>Acessar e corrigir seus dados (diretamente na página "Meu perfil")</li>
          <li>Solicitar a exclusão da sua conta e dos seus dados</li>
          <li>Solicitar a portabilidade dos seus dados</li>
          <li>Revogar o consentimento a qualquer momento</li>
        </ul>
        <p>
          Para exercer qualquer um desses direitos, entre em contato pelo
          e-mail{" "}
          <a href="mailto:contato@itdesodorante.com.br">contato@itdesodorante.com.br</a>.
        </p>
      </div>

      <div className="legal-secao">
        <h2>8. Retenção de dados</h2>
        <p>
          Mantemos seus dados enquanto sua conta estiver ativa. Dados de
          pedidos podem ser mantidos por período adicional para cumprir
          obrigações fiscais e legais, mesmo após a exclusão da conta.
        </p>
      </div>

      <div className="legal-secao">
        <h2>9. Alterações nesta política</h2>
        <p>
          Podemos atualizar esta Política de Privacidade periodicamente. A
          data da última atualização estará sempre indicada no topo desta
          página.
        </p>
      </div>

      <div className="legal-secao">
        <h2>10. Contato</h2>
        <p>
          Dúvidas sobre esta política ou sobre o tratamento dos seus dados
          podem ser enviadas para{" "}
          <a href="mailto:contato@itdesodorante.com.br">contato@itdesodorante.com.br</a>.
        </p>
      </div>
    </section>
  );
}

export default PoliticaPrivacidade;

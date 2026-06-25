import React from 'react';
import { ReceiptData } from '../utils/mockDb';
import { Logo } from './Logo';
import { moeda } from '../utils/formatters';

interface ReceiptPreviewProps {
  data: ReceiptData;
}

export const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({ data }) => {
  // Pad the items to make the table look complete (like the original which has 6 fixed rows)
  const itemsToRender = [...data.items];
  const maxRows = 6;
  while (itemsToRender.length < maxRows) {
    itemsToRender.push({
      quantity: '',
      description: '',
      unitValue: '',
      totalValue: ''
    });
  }

  // Formatting date for BRL
  const formatDateBR = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const calculateGrandTotal = () => {
    return data.items.reduce((sum, item) => {
      const qty = Number(item.quantity) || 0;
      const unit = parseFloat(item.unitValue.replace(/[^0-9,-]/g, '').replace(',', '.')) || 0;
      return sum + (qty >= 1 && unit > 0 ? qty * unit : 0);
    }, 0);
  };

  return (
    <div className="pagina" id="preview-recibo-folha">
      {/* HEADER */}
      <header className="recibo-cabecalho">
        <div className="recibo-marca flex items-center gap-3 justify-center md:justify-start">
          <div className="flex-shrink-0 flex items-center justify-center">
            <Logo size={85} />
          </div>
          <div className="text-left">
            <h1 className="text-slate-800 font-bold uppercase tracking-tight leading-tight">
              AR CONDICIONADO<br />
              & CONSTRUÇÃO JMS
            </h1>
            <p className="text-slate-500 text-[9px] mt-0.5 font-semibold">
              Serviços de ar condicionado, construção e manutenção.
            </p>
          </div>
        </div>

        <div className="recibo-dados text-left">
          <div className="recibo-linha-titulo">
            <span className="recibo-titulo">RECIBO</span>
            <span className="recibo-numero">
              Nº <span className="font-mono border-b border-slate-800 px-2 min-w-[60px] inline-block text-center font-bold text-slate-800">{data.number || '______'}</span>
            </span>
          </div>

          <div className="recibo-data">
            <span>Data de emissão:</span>
            <span className="border-b border-slate-800 px-2 flex-grow min-w-[80px] font-bold text-slate-800">
              {formatDateBR(data.date) || '____/____/______'}
            </span>
          </div>

          <div className="recibo-fiscal font-medium text-slate-600">
            CNPJ 20.881.634/0001-08 • Inscr. CCM 41553
          </div>

          <div className="recibo-campo-linha">
            <span>Natureza da operação:</span>
            <span className="border-b border-slate-800 flex-grow px-1 text-slate-800 font-medium truncate">
              {data.nature || '____________________________________'}
            </span>
          </div>

          <div className="recibo-campo-linha">
            <span>Prestação de serviço:</span>
            <span className="border-b border-slate-800 flex-grow px-1 text-slate-800 font-medium truncate">
              {data.serviceType || '____________________________________'}
            </span>
          </div>
        </div>
      </header>

      {/* SEÇÃO: DADOS DO CLIENTE */}
      <section className="secao">
        <h2 className="faixa">Dados do cliente</h2>
        <table className="dados-cliente w-full border-collapse">
          <tbody>
            <tr>
              <td className="rotulo w-[12%] text-left font-bold text-slate-700">Nome</td>
              <td colSpan={5} className="text-left font-medium text-slate-800 px-2 truncate">
                {data.clientName || ''}
              </td>
            </tr>
            <tr>
              <td className="rotulo text-left font-bold text-slate-700">Endereço</td>
              <td colSpan={5} className="text-left font-medium text-slate-800 px-2 truncate">
                {data.clientAddress || ''}
              </td>
            </tr>
            <tr>
              <td className="rotulo text-left font-bold text-slate-700">Cidade</td>
              <td className="text-left font-medium text-slate-800 px-2 truncate w-[30%]">
                {data.clientCity || ''}
              </td>
              <td className="rotulo text-center font-bold text-slate-700 w-[8%]">UF</td>
              <td className="text-center font-mono font-medium text-slate-800 px-1 w-[10%]">
                {data.clientUF || ''}
              </td>
              <td className="rotulo text-center font-bold text-slate-700 w-[10%]">CEP</td>
              <td className="text-left font-mono font-medium text-slate-800 px-2 w-[30%]">
                {data.clientCEP || ''}
              </td>
            </tr>
            <tr>
              <td className="rotulo text-left font-bold text-slate-700">CNPJ/CPF</td>
              <td colSpan={3} className="text-left font-mono font-medium text-slate-800 px-2">
                {data.clientDoc || ''}
              </td>
              <td className="rotulo text-center font-bold text-slate-700">Fone</td>
              <td className="text-left font-mono font-medium text-slate-800 px-2">
                {data.clientPhone || ''}
              </td>
            </tr>
            <tr>
              <td className="rotulo text-left font-bold text-slate-700">CCM</td>
              <td className="text-left font-mono font-medium text-slate-800 px-2">
                {data.clientCCM || ''}
              </td>
              <td className="rotulo rotulo-condicao text-center font-bold text-slate-700" colSpan={3}>
                Condição de pagamento
              </td>
              <td className="text-left font-medium text-slate-800 px-2">
                {data.paymentCondition || ''}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* SEÇÃO: DESCRIÇÃO DO SERVIÇO */}
      <section className="secao">
        <h2 className="faixa">Descrição do serviço e/ou produtos</h2>
        <table className="itens w-full border-collapse">
          <thead>
            <tr>
              <th className="qtd font-bold text-slate-800 bg-slate-50 w-[10%] border border-slate-300 text-center">Quant.</th>
              <th className="descricao font-bold text-slate-800 bg-slate-50 w-[58%] border border-slate-300 text-left px-2">Descrição</th>
              <th className="moeda font-bold text-slate-800 bg-slate-50 w-[16%] border border-slate-300 text-right px-2">Valor Unit.</th>
              <th className="moeda font-bold text-slate-800 bg-slate-50 w-[16%] border border-slate-300 text-right px-2">Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {itemsToRender.map((item, index) => {
              const isFilled = item.quantity || item.description || item.unitValue;
              return (
                <tr key={index} className={!isFilled ? 'linha-vazia' : ''}>
                  <td className="qtd text-center font-mono font-medium text-slate-800 border border-slate-300 py-1">
                    {item.quantity}
                  </td>
                  <td className="descricao text-left text-slate-800 border border-slate-300 px-2 py-1 align-top text-xs leading-normal whitespace-pre-wrap break-words">
                    {item.description}
                  </td>
                  <td className="moeda text-right font-mono font-medium text-slate-800 border border-slate-300 px-2 py-1">
                    {item.unitValue}
                  </td>
                  <td className="moeda valor-total text-right font-mono font-bold text-slate-900 border border-slate-300 px-2 py-1 bg-slate-50/50">
                    {isFilled ? item.totalValue : ''}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* VALOR TOTAL GERAL */}
        <table className="total-geral ml-auto border-collapse mt-3 w-[43%]">
          <tbody>
            <tr>
              <td className="rotulo-total bg-[#123d6a] text-white font-bold text-center py-2 px-3 text-[11px] uppercase tracking-wider w-[40%]">
                VALOR TOTAL
              </td>
              <td className="valor-geral text-right font-mono font-extrabold text-[#123d6a] border border-[#123d6a] py-1 px-3 text-base">
                {moeda(calculateGrandTotal())}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* SEÇÃO: DECLARAÇÃO */}
      <p className="declaracao text-left text-slate-700 leading-relaxed border border-slate-300 p-2.5 rounded text-[10px] mt-4">
        Recebi(emos) de <strong className="border-b border-slate-500 px-2 inline-block min-w-[200px] text-slate-850 text-center font-bold">{data.receivedFrom || '________________________'}</strong> a importância acima discriminada, referente aos serviços descritos neste recibo, para os devidos fins.
      </p>

      {/* SEÇÃO: ASSINATURAS */}
      <div className="assinaturas grid grid-cols-2 gap-x-12 mt-12 text-center text-[10px]">
        <div className="assinatura border-t border-slate-800 pt-1 text-slate-700 font-bold uppercase tracking-wider">
          RESPONSÁVEL - JMS
        </div>
        <div className="assinatura border-t border-slate-800 pt-1 text-slate-700 font-bold uppercase tracking-wider">
          CLIENTE
        </div>
      </div>

      {/* ACEITES DIGITAIS */}
      <div className="assinaturas-digitais grid grid-cols-2 gap-x-12 mt-4 text-[9px] text-slate-500 text-left">
        <div className="flex gap-1.5 items-center">
          <span className="font-bold text-slate-600 shrink-0">Responsável JMS:</span>
          <span className="border-b border-slate-300 flex-grow px-1 italic font-semibold text-slate-800 truncate">
            {data.respJmsSignature || '________________________'}
          </span>
        </div>
        <div className="flex gap-1.5 items-center">
          <span className="font-bold text-slate-600 shrink-0">Cliente:</span>
          <span className="border-b border-slate-300 flex-grow px-1 italic font-semibold text-slate-800 truncate">
            {data.clientSignature || '________________________'}
          </span>
        </div>
      </div>

      {/* RODAPÉ */}
      <footer className="rodape border-t border-slate-300 pt-2 text-[7.5px] text-slate-500 text-center leading-normal mt-6">
        AR CONDICIONADO & CONSTRUÇÃO JMS - Recibo de prestação de serviços
        <br />
        Documento emitido digitalmente. A confirmação pode ser feita por assinatura física, aceite por mensagem ou comprovante de pagamento.
      </footer>
    </div>
  );
};

import React from 'react';
import { ReportData } from '../utils/mockDb';
import { Logo } from './Logo';

interface ReportPreviewProps {
  data: ReportData;
}

export const ReportPreview: React.FC<ReportPreviewProps> = ({ data }) => {
  // Format date for BRL
  const formatDateBR = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="rel-pagina" id="preview-relatorio-folha">
      {/* CABEÇALHO */}
      <table className="rel-cabecalho w-full border-collapse">
        <tbody>
          <tr>
            <td className="rel-marca w-[50%] p-3 text-left">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 flex items-center justify-center">
                  <Logo size={80} />
                </div>
                <div>
                  <h1 className="text-[#123d6a] font-bold text-lg leading-tight uppercase">
                    AR CONDICIONADO<br />
                    & CONSTRUÇÃO JMS
                  </h1>
                  <p className="text-[#405264] text-[8.5px] mt-1">
                    Estrada Antônio Jorge - Nº 862, Bairro Cidade Edson Suzano
                  </p>
                  <p className="text-[#405264] text-[8.5px]">
                    Suzano - SP, CEP 08666-151
                  </p>
                  <p className="text-[#405264] text-[8.5px] font-bold">
                    CNPJ 20.881.634/0001-08
                  </p>
                </div>
              </div>
            </td>
            <td className="p-3 align-middle text-right">
              <div className="rel-titulo text-[#123d6a] font-black text-xl tracking-wider leading-none">
                RELATÓRIO DE SERVIÇOS
              </div>
              <div className="rel-data mt-2 font-bold text-slate-800 text-[10px] uppercase">
                DATA:{' '}
                <span className="border-b border-slate-700 px-3 inline-block min-w-[90px] text-center">
                  {formatDateBR(data.date) || '___/___/_____'}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* SEÇÃO: DADOS DO ATENDIMENTO */}
      <h2 className="rel-faixa mt-2">Dados do atendimento</h2>
      <table className="rel-table w-full border-collapse">
        <tbody>
          <tr>
            <td className="rel-rotulo font-bold text-slate-700 bg-slate-50/50">Aparelho</td>
            <td className="px-2 text-left font-medium text-slate-800 w-[34%] truncate">
              {data.appliance || ''}
            </td>
            <td className="rel-rotulo font-bold text-slate-700 bg-slate-50/50">Local atendido</td>
            <td className="px-2 text-left font-medium text-slate-800 w-[34%] truncate">
              {data.location || ''}
            </td>
          </tr>
          <tr>
            <td className="rel-rotulo font-bold text-slate-700 bg-slate-50/50">Solicitante</td>
            <td className="px-2 text-left font-medium text-slate-800 truncate">
              {data.requester || ''}
            </td>
            <td className="rel-rotulo font-bold text-slate-700 bg-slate-50/50">Homem</td>
            <td className="px-2 text-left font-medium text-slate-800 truncate">
              {data.helper || ''}
            </td>
          </tr>
          <tr>
            <td className="rel-rotulo font-bold text-slate-700 bg-slate-50/50">Hora chamado</td>
            <td className="px-2 text-left font-mono font-medium text-slate-800">
              {data.callTime || ''}
            </td>
            <td className="rel-rotulo font-bold text-slate-700 bg-slate-50/50">Início atendimento</td>
            <td className="px-2 text-left font-mono font-medium text-slate-800">
              {data.startTime || ''}
            </td>
          </tr>
          <tr>
            <td className="rel-rotulo font-bold text-slate-700 bg-slate-50/50">Fim atendimento</td>
            <td className="px-2 text-left font-mono font-medium text-slate-800">
              {data.endTime || ''}
            </td>
            <td className="rel-rotulo font-bold text-slate-700 bg-slate-50/50">Hora término</td>
            <td className="px-2 text-left font-mono font-medium text-slate-800">
              {data.completionTime || ''}
            </td>
          </tr>
        </tbody>
      </table>

      {/* SEÇÃO: DIAGNÓSTICO E SERVIÇO */}
      <h2 className="rel-faixa mt-2">Diagnóstico e serviço</h2>
      <table className="rel-table w-full border-collapse">
        <tbody>
          <tr>
            <td className="rel-rotulo font-bold text-slate-700 bg-slate-50/50 h-auto py-2">
              Sintomas apresentados
            </td>
            <td className="px-2 py-2 text-left text-slate-800 text-[10px] leading-relaxed whitespace-pre-wrap break-words">
              {data.symptoms || ''}
            </td>
          </tr>
          <tr>
            <td className="rel-rotulo font-bold text-slate-700 bg-slate-50/50 h-auto py-2">
              Serviços executados
            </td>
            <td className="px-2 py-2 text-left text-slate-800 text-[10px] leading-relaxed whitespace-pre-wrap break-words">
              {data.services || ''}
            </td>
          </tr>
          <tr>
            <td className="rel-rotulo font-bold text-slate-700 bg-slate-50/50">Funcionando</td>
            <td className="px-2 text-left font-bold text-slate-800">
              {data.functioning || '---'}
            </td>
          </tr>
        </tbody>
      </table>

      {/* SEÇÃO: MEDIÇÕES TÉCNICAS */}
      <h2 className="rel-faixa mt-2">Medições técnicas</h2>
      <table className="rel-table rel-medidas w-full border-collapse">
        <thead>
          <tr className="bg-slate-50/50">
            <th className="font-bold text-slate-800 text-left px-3 py-1.5 w-[38%] border border-slate-350">MEDIÇÃO</th>
            <th className="font-bold text-slate-800 text-center py-1.5 w-[31%] border border-slate-350">CIRCUITO 1</th>
            <th className="font-bold text-slate-800 text-center py-1.5 w-[31%] border border-slate-350">CIRCUITO 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="rel-rotulo font-bold text-slate-700 text-left px-3 py-1 bg-slate-50/20">Pressão alta</td>
            <td className="text-center font-mono text-slate-850 px-2 py-1 border border-slate-350">
              {data.measurements.highPressureCirc1 || '---'}
            </td>
            <td className="text-center font-mono text-slate-850 px-2 py-1 border border-slate-350">
              {data.measurements.highPressureCirc2 || '---'}
            </td>
          </tr>
          <tr>
            <td className="rel-rotulo font-bold text-slate-700 text-left px-3 py-1 bg-slate-50/20">Pressão baixa</td>
            <td className="text-center font-mono text-slate-850 px-2 py-1 border border-slate-350">
              {data.measurements.lowPressureCirc1 || '---'}
            </td>
            <td className="text-center font-mono text-slate-850 px-2 py-1 border border-slate-350">
              {data.measurements.lowPressureCirc2 || '---'}
            </td>
          </tr>
          <tr>
            <td className="rel-rotulo font-bold text-slate-700 text-left px-3 py-1 bg-slate-50/20">Corrente motor/compressor</td>
            <td className="text-center font-mono text-slate-850 px-2 py-1 border border-slate-350">
              {data.measurements.motorCompCirc1 || '---'}
            </td>
            <td className="text-center font-mono text-slate-850 px-2 py-1 border border-slate-350">
              {data.measurements.motorCompCirc2 || '---'}
            </td>
          </tr>
          <tr>
            <td className="rel-rotulo font-bold text-slate-700 text-left px-3 py-1 bg-slate-50/20">Corrente motor/ventilador</td>
            <td className="text-center font-mono text-slate-850 px-2 py-1 border border-slate-350">
              {data.measurements.motorVentCirc1 || '---'}
            </td>
            <td className="text-center font-mono text-slate-850 px-2 py-1 border border-slate-350">
              {data.measurements.motorVentCirc2 || '---'}
            </td>
          </tr>
        </tbody>
      </table>

      {/* SEÇÃO: MATERIAIS UTILIZADOS */}
      <h2 className="rel-faixa mt-2">Materiais utilizados</h2>
      <table className="rel-table rel-materiais w-full border-collapse">
        <thead>
          <tr className="bg-slate-50/50">
            <th className="rel-item font-bold text-slate-800 text-center py-1.5 w-[10%] border border-slate-350">Item</th>
            <th className="rel-qtd font-bold text-slate-800 text-center py-1.5 w-[13%] border border-slate-350">Quantidade</th>
            <th className="font-bold text-slate-800 text-left px-3 py-1.5 border border-slate-350">Descrição do material</th>
          </tr>
        </thead>
        <tbody>
          {data.materials.map((mat, index) => (
            <tr key={mat.id}>
              <td className="rel-item text-center font-bold text-slate-600 font-mono py-1 border border-slate-350">
                {index + 1}
              </td>
              <td className="rel-qtd text-center font-mono text-slate-800 py-1 border border-slate-350">
                {mat.quantity || ''}
              </td>
              <td className="text-left text-slate-800 px-3 py-1 border border-slate-350 truncate">
                {mat.description}
              </td>
            </tr>
          ))}
          {/* Pad table with empty rows up to at least 3 rows to look full and nice */}
          {data.materials.length < 3 &&
            Array.from({ length: 3 - data.materials.length }).map((_, i) => (
              <tr key={`empty-mat-${i}`}>
                <td className="rel-item text-center font-bold text-slate-300 font-mono py-1 border border-slate-350">
                  {data.materials.length + i + 1}
                </td>
                <td className="rel-qtd text-center text-slate-300 py-1 border border-slate-350"></td>
                <td className="text-left text-slate-300 px-3 py-1 border border-slate-350"></td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* SEÇÃO: OBSERVAÇÕES */}
      <h2 className="rel-faixa mt-2">Observações</h2>
      <table className="rel-table w-full border-collapse">
        <tbody>
          <tr>
            <td className="p-2.5 text-left text-slate-800 text-[10px] leading-relaxed whitespace-pre-wrap break-words min-h-[50px] align-top border border-slate-350">
              {data.observations || ''}
            </td>
          </tr>
        </tbody>
      </table>

      {/* QUALIDADE E AVALIAÇÃO */}
      <table className="rel-table w-full border-collapse mt-2">
        <tbody>
          <tr>
            <td className="rel-rotulo font-bold text-slate-700 bg-slate-50/50 w-[24%]">
              Qualidade do atendimento
            </td>
            <td className="p-2 text-left align-middle font-medium text-slate-800">
              <div className="flex items-center gap-6">
                {['Bom', 'Regular', 'Ruim'].map((q) => (
                  <span key={q} className="flex items-center gap-1.5 text-[10px]">
                    <span
                      className={`inline-block w-3.5 h-3.5 rounded-full border border-slate-500 mr-1 flex items-center justify-center text-[7px] font-bold ${
                        data.quality === q ? 'bg-[#123d6a] border-[#123d6a] text-white' : ''
                      }`}
                    >
                      {data.quality === q ? '✓' : ''}
                    </span>
                    <span className={data.quality === q ? 'font-bold text-[#123d6a]' : 'text-slate-600'}>
                      {q}
                    </span>
                  </span>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ASSINATURAS */}
      <div className="rel-assinaturas grid grid-cols-2 gap-x-12 mt-12 text-center text-[10px] font-bold text-slate-700">
        <div className="rel-assinatura">
          <span className="border-b border-slate-500 px-3 italic font-semibold text-slate-900 min-w-[200px] inline-block pb-0.5">
            {data.respJmsName || ''}
          </span>
          <div className="rel-assinatura-linha border-t border-[#334454] mt-1.5 mb-1"></div>
          JMS AR CONDICIONADO & CONSTRUÇÃO
        </div>
        <div className="rel-assinatura">
          <span className="border-b border-slate-500 px-3 italic font-semibold text-slate-900 min-w-[200px] inline-block pb-0.5">
            {data.clientName || ''}
          </span>
          <div className="rel-assinatura-linha border-t border-[#334454] mt-1.5 mb-1"></div>
          CLIENTE (Assinatura legível - Data)
        </div>
      </div>

      {/* RODAPÉ */}
      <footer className="rel-rodape text-[7.5px] text-slate-500 text-center leading-normal mt-8 pt-2 border-t border-slate-300">
        Estrada Antônio Jorge - Nº 862, Bairro Cidade Edson Suzano, Suzano - SP, CEP 08666-151 - CNPJ 20.881.634/0001-08
      </footer>
    </div>
  );
};

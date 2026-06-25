import React, { useState } from 'react';
import { DocumentRecord, ReceiptData, ReportData } from '../utils/mockDb';
import { Search, FileText, Wrench, Edit3, Copy, Trash2, Calendar, FileQuestion, Plus } from 'lucide-react';
import { moeda } from '../utils/formatters';

interface HistoryListProps {
  records: DocumentRecord[];
  onSelect: (record: DocumentRecord) => void;
  onDuplicate: (record: DocumentRecord) => void;
  onDelete: (id: string) => void;
  onNewReceipt: () => void;
  onNewReport: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  records,
  onSelect,
  onDuplicate,
  onDelete,
  onNewReceipt,
  onNewReport
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'receipt' | 'report'>('all');

  const formatDateBR = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const calculateReceiptTotal = (record: ReceiptData) => {
    return record.items.reduce((sum, item) => {
      const qty = Number(item.quantity) || 0;
      const unit = parseFloat(item.unitValue.replace(/[^0-9,-]/g, '').replace(',', '.')) || 0;
      return sum + (qty >= 1 && unit > 0 ? qty * unit : 0);
    }, 0);
  };

  // Filter records
  const filteredRecords = records.filter((rec) => {
    // Type Filter
    if (typeFilter !== 'all' && rec.type !== typeFilter) return false;

    // Search Term Filter
    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase();
    const matchesClient =
      rec.type === 'receipt'
        ? rec.clientName.toLowerCase().includes(term)
        : rec.requester.toLowerCase().includes(term);

    const matchesNumber =
      rec.type === 'receipt'
        ? rec.number.includes(term)
        : 'relatorio'.includes(term) || 'serviço'.includes(term);

    const matchesDetail =
      rec.type === 'receipt'
        ? rec.nature.toLowerCase().includes(term) || rec.serviceType.toLowerCase().includes(term)
        : rec.appliance.toLowerCase().includes(term) || rec.location.toLowerCase().includes(term);

    return matchesClient || matchesNumber || matchesDetail;
  });

  return (
    <div className="space-y-6">
      {/* HEADER E AÇÕES RÁPIDAS */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-5 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-lg font-black text-slate-800">Histórico de Documentos</h2>
          <p className="text-slate-400 text-xs mt-0.5">Gerencie os recibos e relatórios de atendimentos passados.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onNewReceipt}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-750 px-3.5 py-2 rounded-lg shadow-sm shadow-sky-500/10 hover:shadow-sky-500/20 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Novo Recibo
          </button>
          <button
            onClick={onNewReport}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-650 hover:bg-emerald-700 px-3.5 py-2 rounded-lg shadow-sm shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Novo Relatório
          </button>
        </div>
      </div>

      {/* FILTROS E BUSCA */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Abas de Tipo */}
        <div className="flex bg-slate-100 p-1 rounded-lg w-full md:w-auto">
          <button
            onClick={() => setTypeFilter('all')}
            className={`flex-1 md:flex-initial text-xs font-bold px-4 py-1.5 rounded-md transition-all ${
              typeFilter === 'all' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setTypeFilter('receipt')}
            className={`flex-1 md:flex-initial text-xs font-bold px-4 py-1.5 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              typeFilter === 'receipt' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-750'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Recibos
          </button>
          <button
            onClick={() => setTypeFilter('report')}
            className={`flex-1 md:flex-initial text-xs font-bold px-4 py-1.5 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              typeFilter === 'report' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-750'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            Relatórios
          </button>
        </div>

        {/* Barra de Busca */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por cliente, número, aparelho..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* LISTA DE REGISTROS */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {filteredRecords.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredRecords.map((rec) => {
              const isReceipt = rec.type === 'receipt';
              const receipt = rec as ReceiptData;
              const report = rec as ReportData;

              const clientName = isReceipt ? receipt.clientName : report.requester;
              const dateVal = isReceipt ? receipt.date : report.date;
              const numberOrTitle = isReceipt ? `Recibo Nº ${receipt.number || '---'}` : 'Relatório de Serviço';
              const summaryText = isReceipt
                ? receipt.nature
                : `${report.appliance || 'Equipamento'} (${report.location || 'Sem local'})`;

              return (
                <div key={rec.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                  {/* Informações Principais */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl border shrink-0 ${
                        isReceipt
                          ? 'bg-sky-50 border-sky-100 text-sky-600'
                          : 'bg-emerald-50 border-emerald-100 text-emerald-600'
                      }`}
                    >
                      {isReceipt ? <FileText className="w-6 h-6" /> : <Wrench className="w-6 h-6" />}
                    </div>
                    <div className="space-y-1 text-left">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-800 text-sm">{numberOrTitle}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDateBR(dateVal)}
                        </span>
                      </div>
                      <h4 className="text-slate-600 font-semibold text-xs leading-none">
                        Cliente: <span className="text-slate-800">{clientName || 'Consumidor Final'}</span>
                      </h4>
                      <p className="text-slate-400 text-xs max-w-lg truncate">{summaryText}</p>
                    </div>
                  </div>

                  {/* Valor (Se Recibo) / Status e Ações */}
                  <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0">
                    {isReceipt && (
                      <div className="text-left md:text-right font-mono">
                        <span className="text-[10px] text-slate-400 block font-sans font-bold uppercase leading-none mb-0.5">Total</span>
                        <span className="font-extrabold text-slate-800 text-base">
                          {moeda(calculateReceiptTotal(receipt))}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 ml-auto md:ml-0">
                      <button
                        onClick={() => onSelect(rec)}
                        title="Editar / Visualizar"
                        className="p-2 rounded-lg text-slate-500 hover:text-sky-600 hover:bg-sky-50 transition-all border border-transparent hover:border-sky-100"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDuplicate(rec)}
                        title="Duplicar (Criar Cópia)"
                        className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(rec.id)}
                        title="Excluir Registro"
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center flex flex-col items-center justify-center text-slate-400">
            <FileQuestion className="w-12 h-12 text-slate-300 mb-3" />
            <h3 className="font-bold text-slate-700 text-sm">Nenhum documento encontrado</h3>
            <p className="text-xs text-slate-400 max-w-sm mt-1">
              {records.length === 0
                ? 'Nenhum recibo ou relatório foi criado ainda. Comece criando um novo!'
                : 'Nenhum registro corresponde aos filtros selecionados. Tente outra busca.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

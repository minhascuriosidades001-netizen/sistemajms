import React, { useState } from 'react';
import { ReceiptData, ReceiptItem } from '../utils/mockDb';
import {
  formatarCEP,
  formatarDocumento,
  formatarTelefone,
  formatarUF,
  moeda,
  numeroBR
} from '../utils/formatters';
import {
  FileText,
  User,
  MapPin,
  Calendar,
  DollarSign,
  Plus,
  Trash2,
  Settings,
  CreditCard,
  UserCheck
} from 'lucide-react';

interface ReceiptFormProps {
  data: ReceiptData;
  onChange: (newData: ReceiptData) => void;
}

export const ReceiptForm: React.FC<ReceiptFormProps> = ({ data, onChange }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');

  const updateField = (field: keyof ReceiptData, value: any) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const updateClientField = (field: keyof ReceiptData, value: string) => {
    let formattedValue = value;
    if (field === 'clientCEP') formattedValue = formatarCEP(value);
    if (field === 'clientDoc') formattedValue = formatarDocumento(value);
    if (field === 'clientPhone') formattedValue = formatarTelefone(value);
    if (field === 'clientUF') formattedValue = formatarUF(value);

    // If clientName changes, receivedFrom can change too if it matches
    if (field === 'clientName') {
      onChange({
        ...data,
        clientName: value,
        receivedFrom: data.receivedFrom === data.clientName || !data.receivedFrom ? value : data.receivedFrom
      });
    } else {
      onChange({
        ...data,
        [field]: formattedValue
      });
    }
  };

  const handleItemChange = (index: number, field: keyof ReceiptItem, value: string) => {
    const newItems = [...data.items];
    const item = { ...newItems[index] };

    if (field === 'quantity') {
      const cleanQty = value.replace(/\D/g, '').slice(0, 5);
      item.quantity = cleanQty === '0' ? '' : cleanQty;
    } else {
      item[field] = value;
    }

    // Recalculate item total if quantity and unitValue are set
    const qty = Number(item.quantity) || 0;
    const unit = numeroBR(item.unitValue);
    const total = qty >= 1 && unit > 0 ? qty * unit : 0;
    item.totalValue = moeda(total);

    newItems[index] = item;
    updateField('items', newItems);
  };

  const handleUnitValueFocus = (index: number) => {
    setEditingIndex(index);
    const rawVal = data.items[index].unitValue;
    if (rawVal) {
      // Strip currency symbols for easy editing
      setEditingValue(moeda(numeroBR(rawVal)).replace('R$', '').trim());
    } else {
      setEditingValue('');
    }
  };

  const handleUnitValueBlur = (index: number) => {
    setEditingIndex(null);
    const newItems = [...data.items];
    const item = { ...newItems[index] };

    if (editingValue.trim() !== '') {
      const num = numeroBR(editingValue);
      item.unitValue = moeda(num);
    } else {
      item.unitValue = '';
    }

    // Set default quantity to '1' if description and unitValue are filled but quantity is empty
    if (!item.quantity && item.description.trim() && item.unitValue) {
      item.quantity = '1';
    }

    const qty = Number(item.quantity) || 0;
    const unit = numeroBR(item.unitValue);
    const total = qty >= 1 && unit > 0 ? qty * unit : 0;
    item.totalValue = moeda(total);

    newItems[index] = item;
    updateField('items', newItems);
  };

  const addItem = () => {
    const newItems = [...data.items, { quantity: '', description: '', unitValue: '', totalValue: 'R$ 0,00' }];
    updateField('items', newItems);
  };

  const removeItem = (index: number) => {
    const newItems = data.items.filter((_, i) => i !== index);
    updateField('items', newItems);
  };

  // Calculate receipt grand total
  const calculateGrandTotal = () => {
    return data.items.reduce((sum, item) => {
      const qty = Number(item.quantity) || 0;
      const unit = numeroBR(item.unitValue);
      return sum + (qty >= 1 && unit > 0 ? qty * unit : 0);
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* 1. DADOS DO RECIBO */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
          <FileText className="w-5 h-5 text-sky-600" />
          <h3 className="font-bold text-slate-800">Dados do Recibo</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nº Recibo</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-mono"
              placeholder="000001"
              value={data.number}
              onChange={(e) => updateField('number', e.target.value.replace(/\D/g, '').slice(0, 8))}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Data de Emissão</label>
            <div className="relative">
              <input
                type="date"
                className="w-full rounded-lg border border-slate-200 pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                value={data.date}
                onChange={(e) => updateField('date', e.target.value)}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Natureza da Operação</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              placeholder="Prestação de serviços, venda, etc."
              value={data.nature}
              onChange={(e) => updateField('nature', e.target.value)}
            />
          </div>
          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Prestação de Serviços de</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              placeholder="Ex: Instalação e manutenção de ar condicionado"
              value={data.serviceType}
              onChange={(e) => updateField('serviceType', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 2. DADOS DO CLIENTE */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
          <User className="w-5 h-5 text-sky-600" />
          <h3 className="font-bold text-slate-800">Dados do Cliente</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nome / Razão Social</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              placeholder="Nome completo ou Razão Social do cliente"
              value={data.clientName}
              onChange={(e) => updateClientField('clientName', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">CNPJ / CPF</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-mono"
              placeholder="00.000.000/0000-00"
              value={data.clientDoc}
              onChange={(e) => updateClientField('clientDoc', e.target.value)}
            />
          </div>

          <div className="md:col-span-6">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Endereço Completo</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              placeholder="Rua, número, complemento, bairro"
              value={data.clientAddress}
              onChange={(e) => updateClientField('clientAddress', e.target.value)}
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Cidade</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              placeholder="Cidade"
              value={data.clientCity}
              onChange={(e) => updateClientField('clientCity', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">UF</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-mono uppercase"
              placeholder="SP"
              value={data.clientUF}
              onChange={(e) => updateClientField('clientUF', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">CEP</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-mono"
              placeholder="00000-000"
              value={data.clientCEP}
              onChange={(e) => updateClientField('clientCEP', e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Telefone</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-mono"
              placeholder="(00) 00000-0000"
              value={data.clientPhone}
              onChange={(e) => updateClientField('clientPhone', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Inscr. CCM</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-mono"
              placeholder="Cadastro Municipal"
              value={data.clientCCM}
              onChange={(e) => updateField('clientCCM', e.target.value.replace(/\D/g, '').slice(0, 10))}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Condição de Pagamento</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              placeholder="À vista, PIX, Boleto..."
              value={data.paymentCondition}
              onChange={(e) => updateField('paymentCondition', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 3. ITENS DE SERVIÇO E PRODUTOS */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-sky-600" />
            <h3 className="font-bold text-slate-800">Serviços e Materiais</h3>
          </div>
          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-2.5 py-1.5 rounded-lg transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Adicionar Item
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold text-xs uppercase">
                <th className="py-2 px-1 w-16 text-center">Qtd.</th>
                <th className="py-2 px-2">Descrição do Serviço / Material</th>
                <th className="py-2 px-2 w-36 text-right">Val. Unitário</th>
                <th className="py-2 px-2 w-36 text-right">Val. Total</th>
                <th className="py-2 px-1 w-12 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.items.map((item, index) => (
                <tr key={index} className="group">
                  <td className="py-3 px-1 text-center">
                    <input
                      type="text"
                      className="w-12 text-center bg-slate-50 group-hover:bg-white border border-transparent group-hover:border-slate-200 rounded px-1.5 py-1 text-sm focus:bg-white focus:border-sky-500 focus:outline-none font-mono"
                      placeholder="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    />
                  </td>
                  <td className="py-3 px-2">
                    <textarea
                      rows={1}
                      className="w-full resize-y bg-slate-50 group-hover:bg-white border border-transparent group-hover:border-slate-200 rounded px-2 py-1 text-sm focus:bg-white focus:border-sky-500 focus:outline-none line-height-relaxed"
                      placeholder="Descrição do serviço executado ou material fornecido..."
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    />
                  </td>
                  <td className="py-3 px-2 text-right">
                    <input
                      type="text"
                      className="w-full text-right bg-slate-50 group-hover:bg-white border border-transparent group-hover:border-slate-200 rounded px-2 py-1 text-sm focus:bg-white focus:border-sky-500 focus:outline-none font-mono"
                      placeholder="R$ 0,00"
                      value={editingIndex === index ? editingValue : item.unitValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      onFocus={() => handleUnitValueFocus(index)}
                      onBlur={() => handleUnitValueBlur(index)}
                    />
                  </td>
                  <td className="py-3 px-2 text-right font-mono font-semibold text-slate-700">
                    {item.totalValue || 'R$ 0,00'}
                  </td>
                  <td className="py-3 px-1 text-center">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      disabled={data.items.length <= 1}
                      className="text-slate-400 hover:text-rose-500 disabled:opacity-30 disabled:hover:text-slate-400 p-1 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* VALOR TOTAL GERAL */}
        <div className="flex justify-end mt-4 pt-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-6">
            <span className="text-xs font-bold text-slate-500 uppercase">Valor Total Geral</span>
            <span className="text-xl font-black text-sky-800 font-mono">
              {moeda(calculateGrandTotal())}
            </span>
          </div>
        </div>
      </div>

      {/* 4. DECLARAÇÃO E ASSINATURAS */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
          <UserCheck className="w-5 h-5 text-sky-600" />
          <h3 className="font-bold text-slate-800">Declaração e Assinaturas</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Recebi(emos) de</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              placeholder="Nome do cliente ou empresa que pagou"
              value={data.receivedFrom}
              onChange={(e) => updateField('receivedFrom', e.target.value)}
            />
            <span className="text-[11px] text-slate-400 block mt-1">
              Texto da declaração: "Recebi(emos) de <strong>{data.receivedFrom || '[Nome do Cliente]'}</strong> a importância acima discriminada..."
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Responsável JMS (Aceite Digital)</label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                placeholder="Ex: Jeová M. Silva ou Aceite por Mensagem"
                value={data.respJmsSignature}
                onChange={(e) => updateField('respJmsSignature', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Cliente (Aceite Digital)</label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                placeholder="Ex: Nome do cliente ou Assinado via WhatsApp"
                value={data.clientSignature}
                onChange={(e) => updateField('clientSignature', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

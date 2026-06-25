import React from 'react';
import { ReportData, MaterialItem } from '../utils/mockDb';
import {
  FileText,
  Thermometer,
  Wrench,
  Clock,
  Plus,
  Trash2,
  ThumbsUp,
  UserCheck,
  Building
} from 'lucide-react';

interface ReportFormProps {
  data: ReportData;
  onChange: (newData: ReportData) => void;
}

export const ReportForm: React.FC<ReportFormProps> = ({ data, onChange }) => {
  const updateField = (field: keyof ReportData, value: any) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const updateMeasurement = (key: keyof ReportData['measurements'], value: string) => {
    onChange({
      ...data,
      measurements: {
        ...data.measurements,
        [key]: value
      }
    });
  };

  const handleMaterialChange = (index: number, field: keyof MaterialItem, value: string) => {
    const newMaterials = [...data.materials];
    const material = { ...newMaterials[index] };

    if (field === 'quantity') {
      const cleanQty = value.replace(/\D/g, '').slice(0, 5);
      material.quantity = cleanQty === '0' ? '' : cleanQty;
    } else {
      material[field] = value;
    }

    newMaterials[index] = material;
    updateField('materials', newMaterials);
  };

  const addMaterial = () => {
    const newMaterials = [
      ...data.materials,
      { id: `mat-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`, quantity: '', description: '' }
    ];
    updateField('materials', newMaterials);
  };

  const removeMaterial = (index: number) => {
    const newMaterials = data.materials.filter((_, i) => i !== index);
    updateField('materials', newMaterials);
  };

  return (
    <div className="space-y-6">
      {/* 1. DADOS DO ATENDIMENTO */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
          <Clock className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-slate-800">Dados do Atendimento</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Aparelho / Equipamento</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              placeholder="Ex: Ar Condicionado Split Carrier 18k BTUs"
              value={data.appliance}
              onChange={(e) => updateField('appliance', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Local Atendido</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              placeholder="Ex: Sala de Reunião, Consultório 1"
              value={data.location}
              onChange={(e) => updateField('location', e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Solicitante (Cliente)</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              placeholder="Nome da empresa ou cliente"
              value={data.requester}
              onChange={(e) => updateField('requester', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Técnico Responsável / Ajudante</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              placeholder="Nome do técnico"
              value={data.helper}
              onChange={(e) => updateField('helper', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Data do Serviço</label>
            <input
              type="date"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              value={data.date}
              onChange={(e) => updateField('date', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Hora do Chamado</label>
            <input
              type="time"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              value={data.callTime}
              onChange={(e) => updateField('callTime', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Início do Atendimento</label>
            <input
              type="time"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              value={data.startTime}
              onChange={(e) => updateField('startTime', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Fim do Atendimento</label>
            <input
              type="time"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              value={data.endTime}
              onChange={(e) => updateField('endTime', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Hora Término</label>
            <input
              type="time"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              value={data.completionTime}
              onChange={(e) => updateField('completionTime', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 2. DIAGNÓSTICO E SERVIÇO */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
          <Wrench className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-slate-800">Diagnóstico e Serviço</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Sintomas Apresentados</label>
            <textarea
              rows={2}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              placeholder="Descreva o estado inicial relatado pelo cliente ou encontrado..."
              value={data.symptoms}
              onChange={(e) => updateField('symptoms', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Serviços Executados</label>
            <textarea
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              placeholder="Escreva detalhadamente as ações tomadas para conserto ou manutenção..."
              value={data.services}
              onChange={(e) => updateField('services', e.target.value)}
            />
          </div>

          <div className="w-full md:w-1/3">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Equipamento Funcionando?</label>
            <select
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white"
              value={data.functioning}
              onChange={(e) => updateField('functioning', e.target.value)}
            >
              <option value=""></option>
              <option value="SIM">SIM</option>
              <option value="NÃO">NÃO</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. MEDIÇÕES TÉCNICAS */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
          <Thermometer className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-slate-800">Medições Técnicas</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 font-bold text-xs uppercase bg-slate-50">
                <th className="py-2.5 px-3">Medição</th>
                <th className="py-2.5 px-3 text-center w-40">Circuito 1</th>
                <th className="py-2.5 px-3 text-center w-40">Circuito 2</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-700">Pressão de Alta (PSI)</td>
                <td className="py-2 px-3 text-center">
                  <input
                    type="text"
                    className="w-full text-center border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono"
                    placeholder="Ex: 320 PSI"
                    value={data.measurements.highPressureCirc1}
                    onChange={(e) => updateMeasurement('highPressureCirc1', e.target.value)}
                  />
                </td>
                <td className="py-2 px-3 text-center">
                  <input
                    type="text"
                    className="w-full text-center border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono"
                    placeholder="Ex: --"
                    value={data.measurements.highPressureCirc2}
                    onChange={(e) => updateMeasurement('highPressureCirc2', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-700">Pressão de Baixa (PSI)</td>
                <td className="py-2 px-3 text-center">
                  <input
                    type="text"
                    className="w-full text-center border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono"
                    placeholder="Ex: 125 PSI"
                    value={data.measurements.lowPressureCirc1}
                    onChange={(e) => updateMeasurement('lowPressureCirc1', e.target.value)}
                  />
                </td>
                <td className="py-2 px-3 text-center">
                  <input
                    type="text"
                    className="w-full text-center border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono"
                    placeholder="Ex: --"
                    value={data.measurements.lowPressureCirc2}
                    onChange={(e) => updateMeasurement('lowPressureCirc2', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-700">Corrente Motor / Compressor (A)</td>
                <td className="py-2 px-3 text-center">
                  <input
                    type="text"
                    className="w-full text-center border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono"
                    placeholder="Ex: 7.8 A"
                    value={data.measurements.motorCompCirc1}
                    onChange={(e) => updateMeasurement('motorCompCirc1', e.target.value)}
                  />
                </td>
                <td className="py-2 px-3 text-center">
                  <input
                    type="text"
                    className="w-full text-center border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono"
                    placeholder="Ex: --"
                    value={data.measurements.motorCompCirc2}
                    onChange={(e) => updateMeasurement('motorCompCirc2', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-700">Corrente Motor / Ventilador (A)</td>
                <td className="py-2 px-3 text-center">
                  <input
                    type="text"
                    className="w-full text-center border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono"
                    placeholder="Ex: 0.6 A"
                    value={data.measurements.motorVentCirc1}
                    onChange={(e) => updateMeasurement('motorVentCirc1', e.target.value)}
                  />
                </td>
                <td className="py-2 px-3 text-center">
                  <input
                    type="text"
                    className="w-full text-center border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono"
                    placeholder="Ex: --"
                    value={data.measurements.motorVentCirc2}
                    onChange={(e) => updateMeasurement('motorVentCirc2', e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. MATERIAIS UTILIZADOS */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-800">Materiais Utilizados</h3>
          </div>
          <button
            type="button"
            onClick={addMaterial}
            className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Adicionar Material
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold text-xs uppercase">
                <th className="py-2 px-1 w-16 text-center">Item</th>
                <th className="py-2 px-2 w-28 text-center">Quantidade</th>
                <th className="py-2 px-3">Descrição do Material</th>
                <th className="py-2 px-1 w-12 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.materials.map((mat, index) => (
                <tr key={mat.id} className="group">
                  <td className="py-3 px-1 text-center font-bold text-slate-500 font-mono">
                    {index + 1}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <input
                      type="text"
                      className="w-full text-center bg-slate-50 group-hover:bg-white border border-transparent group-hover:border-slate-200 rounded px-1.5 py-1 text-sm focus:bg-white focus:border-emerald-500 focus:outline-none font-mono"
                      placeholder="Qtd"
                      value={mat.quantity}
                      onChange={(e) => handleMaterialChange(index, 'quantity', e.target.value)}
                    />
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="text"
                      className="w-full bg-slate-50 group-hover:bg-white border border-transparent group-hover:border-slate-200 rounded px-2 py-1 text-sm focus:bg-white focus:border-emerald-500 focus:outline-none"
                      placeholder="Descrição do material..."
                      value={mat.description}
                      onChange={(e) => handleMaterialChange(index, 'description', e.target.value)}
                    />
                  </td>
                  <td className="py-3 px-1 text-center">
                    <button
                      type="button"
                      onClick={() => removeMaterial(index)}
                      className="text-slate-400 hover:text-rose-500 p-1 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {data.materials.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-slate-400 text-xs italic">
                    Nenhum material adicionado. Use o botão no topo para inserir.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. OBSERVAÇÕES, QUALIDADE E ASSINATURAS */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
          <UserCheck className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-slate-800">Observações e Avaliação</h3>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Observações do Serviço</label>
            <textarea
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              placeholder="Escreva recomendações técnicas ou observações adicionais..."
              value={data.observations}
              onChange={(e) => updateField('observations', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Qualidade do Atendimento</label>
            <div className="flex items-center gap-6">
              {['Bom', 'Regular', 'Ruim'].map((q) => (
                <label key={q} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-650 cursor-pointer">
                  <input
                    type="radio"
                    name="qualidade"
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500/20 border-slate-200 cursor-pointer"
                    value={q}
                    checked={data.quality === q}
                    onChange={() => updateField('quality', q)}
                  />
                  <span>{q}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Técnico JMS (Assinatura/Nome)</label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                placeholder="Ex: Jeová M. Silva"
                value={data.respJmsName}
                onChange={(e) => updateField('respJmsName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Cliente (Assinatura/Nome)</label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                placeholder="Ex: Dra. Mariana Souza"
                value={data.clientName}
                onChange={(e) => updateField('clientName', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

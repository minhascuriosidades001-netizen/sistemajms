import React, { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Logo } from './components/Logo';
import { ReceiptForm } from './components/ReceiptForm';
import { ReceiptPreview } from './components/ReceiptPreview';
import { ReportForm } from './components/ReportForm';
import { ReportPreview } from './components/ReportPreview';
import { HistoryList } from './components/HistoryList';
import {
  ReceiptData,
  ReportData,
  DocumentRecord,
  INITIAL_RECEIPTS,
  INITIAL_REPORTS
} from './utils/mockDb';
import {
  FileText,
  Wrench,
  History,
  Settings as SettingsIcon,
  ChevronRight,
  Printer,
  Save,
  ArrowLeft,
  RefreshCw,
  Home,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';

interface CompanySettings {
  companyName: string;
  subtitle: string;
  cnpj: string;
  ccm: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  uf: string;
  cep: string;
  defaultTechnician: string;
}

const DEFAULT_SETTINGS: CompanySettings = {
  companyName: 'AR CONDICIONADO & CONSTRUÇÃO JMS',
  subtitle: 'Serviços de ar condicionado, construção e manutenção.',
  cnpj: '20.881.634/0001-08',
  ccm: '41553',
  addressLine1: 'Estrada Antônio Jorge - Nº 862, Bairro Cidade Edson Suzano',
  addressLine2: 'Suzano - SP, CEP 08666-151',
  city: 'Suzano',
  uf: 'SP',
  cep: '08666-151',
  defaultTechnician: 'Jeová M. Silva'
};

export default function App() {
  // Navigation & view states
  const [activeView, setActiveView] = useState<'history' | 'receipt' | 'report' | 'settings'>('history');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Storage for records
  const [records, setRecords] = useLocalStorage<DocumentRecord[]>('jms_records', [
    ...INITIAL_RECEIPTS,
    ...INITIAL_REPORTS
  ]);

  // Storage for settings
  const [settings, setSettings] = useLocalStorage<CompanySettings>('jms_settings', DEFAULT_SETTINGS);

  // Active documents being edited
  const [activeReceipt, setActiveReceipt] = useState<ReceiptData | null>(null);
  const [activeReport, setActiveReport] = useState<ReportData | null>(null);

  // Notification feedback
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Auto-increment receipt number
  const getNextReceiptNumber = () => {
    const receiptRecords = records.filter((r) => r.type === 'receipt') as ReceiptData[];
    if (receiptRecords.length === 0) return '000001';
    
    // Parse numbers, get max and increment
    const numbers = receiptRecords.map((r) => parseInt(r.number, 10)).filter((n) => !isNaN(n));
    const maxNum = numbers.length > 0 ? Math.max(...numbers) : 0;
    return String(maxNum + 1).padStart(6, '0');
  };

  // Initialize new receipt
  const initNewReceipt = () => {
    const today = new Date().toISOString().split('T')[0];
    const newReceipt: ReceiptData = {
      id: `rec-${Date.now()}`,
      type: 'receipt',
      number: getNextReceiptNumber(),
      date: today,
      nature: 'Prestação de Serviço de Climatização',
      serviceType: 'Prestação de serviços de refrigeração e elétrica',
      clientName: '',
      clientAddress: '',
      clientCity: '',
      clientUF: '',
      clientCEP: '',
      clientDoc: '',
      clientPhone: '',
      clientCCM: '',
      paymentCondition: 'À vista',
      items: [
        { quantity: '1', description: '', unitValue: '', totalValue: 'R$ 0,00' }
      ],
      receivedFrom: '',
      respJmsSignature: settings.defaultTechnician,
      clientSignature: '',
      createdAt: new Date().toISOString()
    };
    setActiveReceipt(newReceipt);
    setActiveView('receipt');
  };

  // Initialize new report
  const initNewReport = () => {
    const today = new Date().toISOString().split('T')[0];
    const newReport: ReportData = {
      id: `rep-${Date.now()}`,
      type: 'report',
      date: today,
      appliance: '',
      location: '',
      requester: '',
      helper: settings.defaultTechnician,
      callTime: '',
      startTime: '',
      endTime: '',
      completionTime: '',
      symptoms: '',
      services: '',
      functioning: 'SIM',
      measurements: {
        highPressureCirc1: '',
        highPressureCirc2: '',
        lowPressureCirc1: '',
        lowPressureCirc2: '',
        motorCompCirc1: '',
        motorCompCirc2: '',
        motorVentCirc1: '',
        motorVentCirc2: ''
      },
      materials: [
        { id: `mat-${Date.now()}-1`, quantity: '', description: '' }
      ],
      observations: '',
      quality: 'Bom',
      respJmsName: settings.defaultTechnician,
      clientName: '',
      createdAt: new Date().toISOString()
    };
    setActiveReport(newReport);
    setActiveView('report');
  };

  // Save current receipt to mock database
  const saveReceipt = () => {
    if (!activeReceipt) return;
    
    // Validation
    if (!activeReceipt.clientName.trim()) {
      showNotification('Por favor, informe o nome do cliente antes de salvar.', 'info');
      return;
    }

    setRecords((prev) => {
      const idx = prev.findIndex((r) => r.id === activeReceipt.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = activeReceipt;
        return updated;
      } else {
        return [activeReceipt, ...prev];
      }
    });

    showNotification('Recibo salvo com sucesso!');
  };

  // Save current report to mock database
  const saveReport = () => {
    if (!activeReport) return;
    
    // Validation
    if (!activeReport.requester.trim()) {
      showNotification('Por favor, informe o solicitante (cliente) antes de salvar.', 'info');
      return;
    }

    setRecords((prev) => {
      const idx = prev.findIndex((r) => r.id === activeReport.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = activeReport;
        return updated;
      } else {
        return [activeReport, ...prev];
      }
    });

    showNotification('Relatório de serviço salvo com sucesso!');
  };

  // Select document from list to edit
  const selectDocument = (doc: DocumentRecord) => {
    if (doc.type === 'receipt') {
      setActiveReceipt(doc as ReceiptData);
      setActiveReport(null);
      setActiveView('receipt');
    } else {
      setActiveReport(doc as ReportData);
      setActiveReceipt(null);
      setActiveView('report');
    }
  };

  // Duplicate document
  const duplicateDocument = (doc: DocumentRecord) => {
    const today = new Date().toISOString().split('T')[0];
    const newId = `${doc.type === 'receipt' ? 'rec' : 'rep'}-${Date.now()}`;
    
    if (doc.type === 'receipt') {
      const dup: ReceiptData = {
        ...(doc as ReceiptData),
        id: newId,
        number: getNextReceiptNumber(),
        date: today,
        createdAt: new Date().toISOString()
      };
      setRecords((prev) => [dup, ...prev]);
      showNotification(`Recibo duplicado! Cópia Nº ${dup.number} criada.`);
    } else {
      const dup: ReportData = {
        ...(doc as ReportData),
        id: newId,
        date: today,
        createdAt: new Date().toISOString()
      };
      setRecords((prev) => [dup, ...prev]);
      showNotification('Relatório duplicado com sucesso!');
    }
  };

  // Delete document
  const deleteDocument = (id: string) => {
    if (!confirm('Deseja realmente excluir este documento do histórico?')) return;
    setRecords((prev) => prev.filter((r) => r.id !== id));
    showNotification('Documento excluído do histórico.', 'info');
  };

  // Clear fields
  const clearReceiptFields = () => {
    if (!activeReceipt || !confirm('Limpar todos os campos do recibo?')) return;
    setActiveReceipt({
      ...activeReceipt,
      clientName: '',
      clientAddress: '',
      clientCity: '',
      clientUF: '',
      clientCEP: '',
      clientDoc: '',
      clientPhone: '',
      clientCCM: '',
      paymentCondition: 'À vista',
      items: [{ quantity: '1', description: '', unitValue: '', totalValue: 'R$ 0,00' }],
      receivedFrom: '',
      clientSignature: ''
    });
  };

  const clearReportFields = () => {
    if (!activeReport || !confirm('Limpar todos os campos do relatório?')) return;
    setActiveReport({
      ...activeReport,
      appliance: '',
      location: '',
      requester: '',
      callTime: '',
      startTime: '',
      endTime: '',
      completionTime: '',
      symptoms: '',
      services: '',
      functioning: 'SIM',
      measurements: {
        highPressureCirc1: '', highPressureCirc2: '',
        lowPressureCirc1: '', lowPressureCirc2: '',
        motorCompCirc1: '', motorCompCirc2: '',
        motorVentCirc1: '', motorVentCirc2: ''
      },
      materials: [{ id: `mat-${Date.now()}`, quantity: '', description: '' }],
      observations: '',
      quality: 'Bom',
      clientName: ''
    });
  };

  // Trigger Print PDF
  const triggerPrint = (type: 'receipt' | 'report') => {
    // Add layout class to body
    document.body.classList.add(type === 'receipt' ? 'print-recibo' : 'print-relatorio');
    
    // Set document title temporarily so filename is correct in Save PDF dialog
    const originalTitle = document.title;
    if (type === 'receipt' && activeReceipt) {
      document.title = `Recibo_JMS_N_${activeReceipt.number}_${activeReceipt.clientName.replace(/\s+/g, '_')}`;
    } else if (type === 'report' && activeReport) {
      document.title = `Relatorio_Servico_JMS_${activeReport.requester.replace(/\s+/g, '_')}`;
    }

    // Small delay to let React layout update if printing classes affect elements
    setTimeout(() => {
      window.print();
      
      // Cleanup
      document.body.classList.remove('print-recibo', 'print-relatorio');
      document.title = originalTitle;
    }, 150);
  };

  // Sync printing fallback for system-wide CTRL+P
  useEffect(() => {
    const handleBeforePrint = () => {
      if (document.body.classList.contains('print-recibo') || document.body.classList.contains('print-relatorio')) return;
      if (activeView === 'receipt') {
        document.body.classList.add('print-recibo');
      } else if (activeView === 'report') {
        document.body.classList.add('print-relatorio');
      }
    };
    
    const handleAfterPrint = () => {
      document.body.classList.remove('print-recibo', 'print-relatorio');
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [activeView]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row antialiased font-sans text-slate-700">
      
      {/* ALERTA DE TOAST */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-lg shadow-xl shadow-slate-950/20 border border-slate-800 animate-slide-in">
          <CheckCircle2 className={`w-4 h-4 ${notification.type === 'success' ? 'text-emerald-400' : 'text-sky-400'}`} />
          <span>{notification.message}</span>
        </div>
      )}

      {/* SIDEBAR NAVIGATION (NO-PRINT) */}
      <aside className="w-full md:w-64 bg-slate-900 text-white shrink-0 shadow-xl border-b md:border-b-0 md:border-r border-slate-950 no-print flex flex-col">
        {/* Brand */}
        <div className="p-4 md:p-6 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <Logo size={40} light />
            </div>
            <div className="text-left">
              <h1 className="font-extrabold text-sm leading-none tracking-wide text-slate-100">JMS REFRIGERAÇÃO</h1>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block mt-1">Painel Emissor</span>
            </div>
          </div>
          
          {/* Botão de Menu para Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Items */}
        <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col flex-1`}>
          <nav className="flex-1 p-4 space-y-1.5">
            <button
              onClick={() => {
                setActiveView('history');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all ${
                activeView === 'history'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <History className="w-4 h-4" />
                <span>Histórico de Registros</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeView === 'history' ? 'rotate-90 text-white/50' : 'text-slate-600'}`} />
            </button>

            <div className="pt-4 pb-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Emissão rápida
            </div>

            <button
              onClick={() => {
                initNewReceipt();
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all ${
                activeView === 'receipt' && !activeReceipt?.id.startsWith('saved')
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4" />
                <span>Criar Novo Recibo</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            </button>

            <button
              onClick={() => {
                initNewReport();
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all ${
                activeView === 'report' && !activeReport?.id.startsWith('saved')
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Wrench className="w-4 h-4" />
                <span>Criar Novo Relatório</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            </button>

            <div className="pt-4 pb-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Ajustes do Painel
            </div>

            <button
              onClick={() => {
                setActiveView('settings');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all ${
                activeView === 'settings'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <SettingsIcon className="w-4 h-4" />
                <span>Dados da Empresa</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-950 text-slate-500 text-[10px] font-medium text-center">
            V1.0 - TypeScript / React
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="flex-1 flex flex-col min-w-0 md:max-h-screen md:overflow-y-auto">
        
        {/* VIEW: HISTÓRICO */}
        {activeView === 'history' && (
          <div className="p-6 max-w-5xl mx-auto w-full no-print">
            <HistoryList
              records={records}
              onSelect={selectDocument}
              onDuplicate={duplicateDocument}
              onDelete={deleteDocument}
              onNewReceipt={initNewReceipt}
              onNewReport={initNewReport}
            />
          </div>
        )}

        {/* VIEW: CONFIGURAÇÕES DA EMPRESA */}
        {activeView === 'settings' && (
          <div className="p-6 max-w-3xl mx-auto w-full no-print">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-6">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <SettingsIcon className="w-6 h-6 text-sky-600" />
                <div>
                  <h2 className="text-lg font-black text-slate-800">Dados Padrão da Empresa</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Estes dados preencherão automaticamente o cabeçalho de novos recibos e relatórios.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="md:col-span-4">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nome da Empresa</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-semibold"
                    value={settings.companyName}
                    onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">CNPJ</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-mono"
                    value={settings.cnpj}
                    onChange={(e) => setSettings({ ...settings, cnpj: e.target.value })}
                  />
                </div>

                <div className="md:col-span-4">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Subtítulo / Ramo</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                    value={settings.subtitle}
                    onChange={(e) => setSettings({ ...settings, subtitle: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Inscrição CCM</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-mono"
                    value={settings.ccm}
                    onChange={(e) => setSettings({ ...settings, ccm: e.target.value })}
                  />
                </div>

                <div className="md:col-span-6">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Endereço Linha 1 (Rua, Número, Bairro)</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                    value={settings.addressLine1}
                    onChange={(e) => setSettings({ ...settings, addressLine1: e.target.value })}
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Cidade / Estado / CEP (Linha 2)</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                    value={settings.addressLine2}
                    onChange={(e) => setSettings({ ...settings, addressLine2: e.target.value })}
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Técnico Padrão</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                    value={settings.defaultTechnician}
                    onChange={(e) => setSettings({ ...settings, defaultTechnician: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => {
                    showNotification('Dados padrão salvos com sucesso!');
                    setActiveView('history');
                  }}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 py-2.5 rounded-lg shadow-sm text-xs transition-colors"
                >
                  Salvar Configurações
                </button>
              </div>
            </div>
          </div>
        )}

        {/* WORKSPACE: EDITING/CREATING RECIBO */}
        {activeView === 'receipt' && activeReceipt && (
          <div className="flex-1 flex flex-col h-full">
            {/* Formulário */}
            <div className="flex-1 p-6 max-w-4xl w-full no-print space-y-4">
              {/* Menu Superior de Ações */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-900 text-white p-3 sm:px-5 sm:py-3 rounded-xl shadow-md gap-3">
                <button
                  onClick={() => setActiveView('history')}
                  className="bg-transparent flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-bold transition-colors w-fit"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </button>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={clearReceiptFields}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold px-3 py-2 rounded-lg transition-all"
                  >
                    Limpar
                  </button>
                  <button
                    onClick={saveReceipt}
                    className="bg-emerald-650 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Salvar Rascunho
                  </button>
                  <button
                    onClick={() => {
                      saveReceipt();
                      triggerPrint('receipt');
                    }}
                    className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-md shadow-sky-500/10 transition-all"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Imprimir / PDF
                  </button>
                </div>
              </div>

              {/* Receipt Form */}
              <ReceiptForm data={activeReceipt} onChange={setActiveReceipt} />
            </div>

            {/* Apenas para Impressora Física/PDF */}
            <div className="hidden print:block print-preview-holder">
              <ReceiptPreview data={activeReceipt} />
            </div>
          </div>
        )}

        {/* WORKSPACE: EDITING/CREATING RELATÓRIO */}
        {activeView === 'report' && activeReport && (
          <div className="flex-1 flex flex-col h-full">
            {/* Formulário */}
            <div className="flex-1 p-6 max-w-4xl w-full no-print space-y-4">
              {/* Menu Superior de Ações */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-900 text-white p-3 sm:px-5 sm:py-3 rounded-xl shadow-md gap-3">
                <button
                  onClick={() => setActiveView('history')}
                  className="bg-transparent flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-bold transition-colors w-fit"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </button>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={clearReportFields}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold px-3 py-2 rounded-lg transition-all"
                  >
                    Limpar
                  </button>
                  <button
                    onClick={saveReport}
                    className="bg-emerald-650 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Salvar Rascunho
                  </button>
                  <button
                    onClick={() => {
                      saveReport();
                      triggerPrint('report');
                    }}
                    className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-md shadow-sky-500/10 transition-all"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Imprimir / PDF
                  </button>
                </div>
              </div>

              {/* Report Form */}
              <ReportForm data={activeReport} onChange={setActiveReport} />
            </div>

            {/* Apenas para Impressora Física/PDF */}
            <div className="hidden print:block print-preview-holder">
              <ReportPreview data={activeReport} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

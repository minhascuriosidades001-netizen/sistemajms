export interface ReceiptItem {
  quantity: string;
  description: string;
  unitValue: string;
  totalValue: string;
}

export interface ReceiptData {
  id: string;
  type: 'receipt';
  number: string;
  date: string;
  nature: string;
  serviceType: string;
  clientName: string;
  clientAddress: string;
  clientCity: string;
  clientUF: string;
  clientCEP: string;
  clientDoc: string;
  clientPhone: string;
  clientCCM: string;
  paymentCondition: string;
  items: ReceiptItem[];
  receivedFrom: string;
  respJmsSignature: string;
  clientSignature: string;
  createdAt: string;
}

export interface MaterialItem {
  id: string;
  quantity: string;
  description: string;
}

export interface TechnicalMeasurements {
  highPressureCirc1: string;
  highPressureCirc2: string;
  lowPressureCirc1: string;
  lowPressureCirc2: string;
  motorCompCirc1: string;
  motorCompCirc2: string;
  motorVentCirc1: string;
  motorVentCirc2: string;
}

export interface ReportData {
  id: string;
  type: 'report';
  date: string;
  appliance: string;
  location: string;
  requester: string;
  helper: string;
  callTime: string;
  startTime: string;
  endTime: string;
  completionTime: string;
  symptoms: string;
  services: string;
  functioning: string; // 'SIM' | 'NÃO' | ''
  measurements: TechnicalMeasurements;
  materials: MaterialItem[];
  observations: string;
  quality: string; // 'Bom' | 'Regular' | 'Ruim' | ''
  respJmsName: string;
  clientName: string;
  createdAt: string;
}

export type DocumentRecord = ReceiptData | ReportData;

export const INITIAL_RECEIPTS: ReceiptData[] = [
  {
    id: 'rec-1',
    type: 'receipt',
    number: '000001',
    date: '2026-06-20',
    nature: 'Prestação de Serviço de Climatização',
    serviceType: 'Manutenção Preventiva e Corretiva',
    clientName: 'Condomínio Solar das Flores',
    clientAddress: 'Av. das Nações, 1500 - Bloco B',
    clientCity: 'Suzano',
    clientUF: 'SP',
    clientCEP: '08674-010',
    clientDoc: '12.345.678/0001-99',
    clientPhone: '(11) 98765-4321',
    clientCCM: '998877',
    paymentCondition: 'Boleto bancário - 15 dias',
    items: [
      {
        quantity: '2',
        description: 'Manutenção corretiva em aparelhos de ar condicionado Split 18000 BTU (limpeza de filtros, verificação de carga de gás, higienização)',
        unitValue: 'R$ 350,00',
        totalValue: 'R$ 700,00'
      },
      {
        quantity: '1',
        description: 'Substituição de capacitor de partida 35uF 440VAC',
        unitValue: 'R$ 120,00',
        totalValue: 'R$ 120,00'
      },
      {
        quantity: '1',
        description: 'Carga de gás refrigerante R-410A (carga parcial)',
        unitValue: 'R$ 250,00',
        totalValue: 'R$ 250,00'
      }
    ],
    receivedFrom: 'Condomínio Solar das Flores',
    respJmsSignature: 'Jeová M. Silva',
    clientSignature: 'Carlos Eduardo (Síndico)',
    createdAt: '2026-06-20T14:30:00.000Z'
  },
  {
    id: 'rec-2',
    type: 'receipt',
    number: '000002',
    date: '2026-06-24',
    nature: 'Instalação de Ar Condicionado',
    serviceType: 'Prestação de serviços de infraestrutura e montagem',
    clientName: 'Clínica Odonto Riso',
    clientAddress: 'Rua Benjamin Constant, 452 - Centro',
    clientCity: 'Suzano',
    clientUF: 'SP',
    clientCEP: '08674-000',
    clientDoc: '98.765.432/0001-11',
    clientPhone: '(11) 4748-9900',
    clientCCM: '112233',
    paymentCondition: 'À vista via PIX',
    items: [
      {
        quantity: '1',
        description: 'Instalação completa de Ar Condicionado Hi-Wall 12000 BTU Inverter (inclui tubulação de cobre isolada 3m, suporte de condensadora, fixação de evaporadora)',
        unitValue: 'R$ 800,00',
        totalValue: 'R$ 800,00'
      }
    ],
    receivedFrom: 'Clínica Odonto Riso',
    respJmsSignature: 'Jeová M. Silva',
    clientSignature: 'Dra. Mariana Souza',
    createdAt: '2026-06-24T18:00:00.000Z'
  }
];

export const INITIAL_REPORTS: ReportData[] = [
  {
    id: 'rep-1',
    type: 'report',
    date: '2026-06-22',
    appliance: 'Split Hi-Wall Carrier 18000 BTUs',
    location: 'Consultório Principal',
    requester: 'Clínica Odonto Riso',
    helper: 'Marcos Santos',
    callTime: '09:00',
    startTime: '10:00',
    endTime: '11:30',
    completionTime: '11:45',
    symptoms: 'Aparelho não resfria o ambiente e apresenta ruído na unidade condensadora externa.',
    services: 'Realizado diagnóstico técnico. Detectado desgaste no capacitor de partida do compressor. Efetuada a substituição do capacitor antigo por um novo de 35uF. Verificada a pressão de trabalho do gás refrigerante, constatando-se estabilidade de carga. Realizada limpeza geral dos filtros de ar da evaporadora e higienização da carcaça.',
    functioning: 'SIM',
    measurements: {
      highPressureCirc1: '320 PSI',
      highPressureCirc2: '',
      lowPressureCirc1: '125 PSI',
      lowPressureCirc2: '',
      motorCompCirc1: '7.8 A',
      motorCompCirc2: '',
      motorVentCirc1: '0.6 A',
      motorVentCirc2: ''
    },
    materials: [
      { id: 'mat-1', quantity: '1', description: 'Capacitor de Partida 35uF 440VAC' },
      { id: 'mat-2', quantity: '1', description: 'Spray Higienizador Bactericida' }
    ],
    observations: 'Equipamento operando dentro dos parâmetros nominais do fabricante após a intervenção. Sugere-se limpeza preventiva trimestral devido ao fluxo de pacientes no consultório.',
    quality: 'Bom',
    respJmsName: 'Jeová M. Silva',
    clientName: 'Dra. Mariana Souza',
    createdAt: '2026-06-22T12:00:00.000Z'
  }
];

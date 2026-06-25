export function apenasDigitos(valor: string, limite?: number): string {
  const digitos = String(valor || '').replace(/\D/g, '');
  return limite ? digitos.slice(0, limite) : digitos;
}

export function numeroBR(valor: string | number): number {
  if (typeof valor === 'number') return valor;
  let texto = String(valor || '').trim().replace(/R\$\s?/g, '').replace(/\s/g, '');
  if (!texto) return 0;
  if (texto.includes(',') && texto.includes('.')) {
    texto = texto.replace(/\./g, '').replace(',', '.');
  } else if (texto.includes(',')) {
    texto = texto.replace(',', '.');
  }
  const numero = Number(texto);
  return Number.isFinite(numero) ? numero : 0;
}

export function moeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0);
}

export function decimalBR(valor: number): string {
  return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(valor || 0);
}

export function formatarCEP(valor: string): string {
  const digitos = apenasDigitos(valor, 8);
  if (digitos.length > 5) {
    return `${digitos.slice(0, 5)}-${digitos.slice(5)}`;
  }
  return digitos;
}

export function formatarDocumento(valor: string): string {
  const digitos = apenasDigitos(valor, 14);
  if (digitos.length <= 11) {
    // CPF: 000.000.000-00
    return digitos
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    // CNPJ: 00.000.000/0000-00
    return digitos
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }
}

export function formatarTelefone(valor: string): string {
  const digitos = apenasDigitos(valor, 11);
  if (digitos.length === 0) return '';
  if (digitos.length <= 2) return `(${digitos}`;
  if (digitos.length <= 6) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  if (digitos.length <= 10) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
  }
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
}

export function formatarUF(valor: string): string {
  return String(valor || '')
    .replace(/[^a-zA-Z]/g, '')
    .slice(0, 2)
    .toUpperCase();
}

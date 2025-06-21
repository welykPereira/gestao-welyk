// Gestão do Welyk - Aplicação PWA
// Configuração para GitHub Pages

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((registration) => {
        console.log('SW registrado com sucesso: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Configuração de localStorage com fallback
const STORAGE_KEY = 'gestaoWelyk';

// Dados padrão da aplicação
const defaultData = {
  bills: [],
  categories: [
    { id: 1, name: 'Alimentação', icon: '🍕', color: '#FF6B6B' },
    { id: 2, name: 'Transporte', icon: '🚗', color: '#4ECDC4' },
    { id: 3, name: 'Moradia', icon: '🏠', color: '#45B7D1' },
    { id: 4, name: 'Saúde', icon: '⚕️', color: '#96CEB4' },
    { id: 5, name: 'Educação', icon: '📚', color: '#FECA57' },
    { id: 6, name: 'Lazer', icon: '🎮', color: '#FF9FF3' },
    { id: 7, name: 'Outros', icon: '📦', color: '#95A5A6' }
  ],
  salary: {},
  settings: {
    currency: 'BRL',
    notifications: true,
    darkMode: false
  }
};

// Funções utilitárias
function getStorageData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : defaultData;
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    return defaultData;
  }
}

function setStorageData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
  }
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount);
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-BR');
}

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', () => {
  console.log('Gestão do Welyk carregado!');
  
  // Verificar se é PWA
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('Executando como PWA');
  }
});

// Exportar para uso global
window.GestaoWelyk = {
  getStorageData,
  setStorageData,
  formatCurrency,
  formatDate,
  defaultData
};
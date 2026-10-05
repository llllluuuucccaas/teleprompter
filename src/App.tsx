import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  Type,
  Gauge,
  Maximize,
  Minimize,
  ArrowLeft,
  Eye,
  EyeOff,
  Copy,
  Download,
  Check,
  Keyboard,
  SlidersHorizontal,
  Sparkles,
  Clock,
  FileText,
  AlignLeft,
  ChevronUp,
  ChevronDown,
  Volume2,
  Code
} from 'lucide-react';

// Preset scripts for rapid onboarding and demonstration
const PRESET_SCRIPTS = [
  {
    title: 'Apresentação em Vídeo / YouTube',
    text: `Olá a todos e sejam muito bem-vindos ao meu canal!

No vídeo de hoje, vamos explorar uma das ferramentas mais essenciais para quem grava vídeos, produz conteúdo ou faz apresentações ao vivo: o Teleprompter.

Você já reparou como os grandes apresentadores de televisão conseguem falar diretamente para a câmera com naturalidade e confiança, sem nunca desviar o olhar nem esquecer uma única linha do roteiro?

O segredo por trás disso é uma superfície reflexiva posicionada exatamente na frente da lente da câmera, que reflete o texto espelhado enquanto a câmera filma através do vidro sem capturar o reflexo.

Com este Teleprompter, você tem controle total da velocidade com o teclado ou mouse, pode espelhar o texto para o seu espelho ou usar diretamente na tela do seu computador ou tablet.

Respire fundo, mantenha a calma, sorria para a lente e conte a sua história com autoridade!

Muito obrigado por assistir, deixe seu like e até a próxima gravação!`
  },
  {
    title: 'Pitch de Negócios / Pitch Deck',
    text: `Bom dia a todos os presentes e investidores.

Hoje estou aqui para apresentar uma solução que transforma a forma como equipes criam e distribuem valor no mercado digital.

O nosso maior desafio nunca foi a falta de ideias inovadoras, mas sim a velocidade e a clareza na execução. 

No último trimestre, nós testamos este modelo com mais de 500 clientes piloto, alcançando um índice de retenção superior a 85% e uma redução de custos de mais de 40%.

Estamos construindo o futuro da produtividade, e hoje convidamos vocês a fazerem parte dessa jornada conosco.

Obrigado pelo seu tempo e estamos abertos para perguntas!`
  },
  {
    title: 'Noticiário / Podcast',
    text: `Edição extraordinária das 20 horas.

Principais destaques do dia: avanços recentes na tecnologia impulsionam produtores de mídia independente em todo o mundo.

Especialistas em comunicação apontam que o contato visual constante com o público aumenta a retenção de atenção em até 70% durante transmissões de vídeo.

Fique conosco para a cobertura completa dos temas em destaque após o breve intervalo.`
  }
];

// Single file standalone HTML generator
function generateStandaloneHtml(initialText: string, speed: number, fontSize: number, isMirrored: boolean, color: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Teleprompter Pessoal e Gratuito</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background-color: #000000;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      overflow-x: hidden;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
    }
    
    /* Config / Setup Screen */
    #setup-screen {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 24px;
      max-width: 900px;
      margin: 0 auto;
    }
    .header-box {
      text-align: center;
      margin-bottom: 24px;
      width: 100%;
    }
    .badge {
      display: inline-block;
      font-size: 12px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #facc15;
      font-weight: 700;
      margin-bottom: 8px;
    }
    h1 {
      font-size: 32px;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 8px;
      color: #ffffff;
    }
    p.subtitle {
      font-size: 14px;
      color: #a3a3a3;
    }
    .editor-card {
      width: 100%;
      background: #0d0d0d;
      border: 1px solid #262626;
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.8);
    }
    textarea {
      width: 100%;
      height: 320px;
      background: #000000;
      color: #f5f5f5;
      border: 1px solid #333333;
      border-radius: 12px;
      padding: 16px;
      font-size: 16px;
      line-height: 1.6;
      resize: vertical;
      outline: none;
      font-family: inherit;
    }
    textarea:focus {
      border-color: #facc15;
    }
    .meta-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 12px;
      font-size: 13px;
      color: #737373;
    }
    .btn-row {
      display: flex;
      gap: 12px;
      margin-top: 20px;
      flex-wrap: wrap;
    }
    button {
      cursor: pointer;
      font-family: inherit;
      font-weight: 600;
      border-radius: 10px;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .btn-primary {
      background: #facc15;
      color: #000000;
      border: none;
      padding: 14px 28px;
      font-size: 16px;
      font-weight: 700;
      flex: 1;
      min-width: 220px;
    }
    .btn-primary:hover {
      background: #eab308;
      transform: translateY(-1px);
    }
    .btn-secondary {
      background: #171717;
      color: #e5e5e5;
      border: 1px solid #262626;
      padding: 12px 18px;
      font-size: 14px;
    }
    .btn-secondary:hover {
      background: #262626;
      color: #ffffff;
    }

    /* Teleprompter Screen */
    #prompter-screen {
      display: none;
      position: fixed;
      inset: 0;
      background: #000000;
      overflow-y: scroll;
      overflow-x: hidden;
      scroll-behavior: auto;
    }
    #prompter-screen::-webkit-scrollbar {
      display: none;
    }
    #prompter-screen {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    /* Reading Content */
    #prompter-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 40vh 32px 60vh 32px;
      transition: transform 0.2s ease;
      will-change: transform;
    }
    #prompter-text {
      white-space: pre-wrap;
      word-break: break-word;
      line-height: 1.6;
      font-weight: 600;
    }

    /* Mirroring Classes */
    .mirror-x {
      transform: scaleX(-1);
    }

    /* Reading Marker (Eye-line Indicator) */
    #eye-guide {
      position: fixed;
      top: 35%;
      left: 0;
      right: 0;
      height: 60px;
      pointer-events: none;
      border-top: 2px dashed rgba(250, 204, 21, 0.4);
      border-bottom: 2px dashed rgba(250, 204, 21, 0.4);
      background: rgba(250, 204, 21, 0.05);
      z-index: 40;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
    }
    .guide-arrow {
      color: #facc15;
      font-size: 24px;
      font-weight: bold;
      opacity: 0.8;
    }

    /* Floating HUD Controls */
    #hud-panel {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(18, 18, 18, 0.94);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 9999px;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 50;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.8);
      transition: opacity 0.25s ease, transform 0.25s ease;
      max-width: 95vw;
      overflow-x: auto;
    }
    #hud-panel.hidden {
      opacity: 0;
      transform: translate(-50%, 40px);
      pointer-events: none;
    }

    .hud-btn {
      background: #262626;
      color: #ffffff;
      border: 1px solid #404040;
      padding: 8px 14px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
    }
    .hud-btn:hover {
      background: #333333;
    }
    .hud-btn.active {
      background: #facc15;
      color: #000000;
      border-color: #facc15;
    }
    .hud-btn-main {
      background: #facc15;
      color: #000000;
      border: none;
      padding: 10px 20px;
      border-radius: 9999px;
      font-size: 15px;
      font-weight: 700;
    }
    .hud-btn-main:hover {
      background: #eab308;
    }

    .control-group {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0 6px;
      border-left: 1px solid #333;
    }
    .control-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #a3a3a3;
      white-space: nowrap;
    }
    input[type=range] {
      accent-color: #facc15;
      cursor: pointer;
      height: 6px;
      border-radius: 3px;
      background: #333;
      outline: none;
    }
    .val-display {
      font-size: 12px;
      font-variant-numeric: tabular-nums;
      color: #ffffff;
      min-width: 28px;
    }

    /* Toggle HUD Visibility Button */
    #toggle-hud-btn {
      position: fixed;
      top: 16px;
      right: 16px;
      background: rgba(23, 23, 23, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #ffffff;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 12px;
      z-index: 60;
      backdrop-filter: blur(8px);
    }
    #toggle-hud-btn:hover {
      background: rgba(38, 38, 38, 0.9);
    }

    /* Exit Button */
    #exit-btn {
      position: fixed;
      top: 16px;
      left: 16px;
      background: rgba(23, 23, 23, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #ffffff;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 13px;
      z-index: 60;
      backdrop-filter: blur(8px);
    }
    #exit-btn:hover {
      background: #dc2626;
      border-color: #ef4444;
    }

    /* Countdown Overlay */
    #countdown-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 70;
      font-size: 120px;
      font-weight: 900;
      color: #facc15;
    }
  </style>
</head>
<body>

  <!-- 1. ETAPA DE CONFIGURAÇÃO / CONFIRMAÇÃO -->
  <div id="setup-screen">
    <div class="header-box">
      <span class="badge">Teleprompter Gratuito & Offline</span>
      <h1>Teleprompter Pessoal</h1>
      <p class="subtitle">Cole seu texto, ajuste as opções e confirme para iniciar a leitura suave</p>
    </div>

    <div class="editor-card">
      <label for="script-input" style="display:block; font-size: 13px; font-weight: 600; margin-bottom: 8px; color: #d4d4d4;">Roteiro de Leitura</label>
      <textarea id="script-input" placeholder="Digite ou cole aqui o seu roteiro..."></textarea>
      
      <div class="meta-bar">
        <span id="char-word-count">0 palavras · 0 caracteres</span>
        <span id="reading-time-est">Tempo estimado: ~0 min</span>
      </div>

      <div class="btn-row">
        <button id="btn-sample" class="btn-secondary" type="button">📄 Carregar Texto Exemplo</button>
        <button id="btn-clear" class="btn-secondary" type="button">🗑️ Limpar</button>
        <button id="btn-confirm" class="btn-primary" type="button">▶ Confirmar e Carregar Texto</button>
      </div>
    </div>
  </div>

  <!-- 2. TELA DE LEITURA DO TELEPROMPTER -->
  <div id="prompter-screen">
    <button id="exit-btn" type="button">← Voltar / Editar</button>
    <button id="toggle-hud-btn" type="button">Controles (H)</button>

    <!-- Linha de Guia / Olhar -->
    <div id="eye-guide">
      <span class="guide-arrow">▶</span>
      <span class="guide-arrow">◀</span>
    </div>

    <!-- Conteúdo do Roteiro -->
    <div id="prompter-container">
      <div id="prompter-text"></div>
    </div>

    <!-- HUD de Controles Flutuante -->
    <div id="hud-panel">
      <!-- Play/Pause -->
      <button id="hud-play-btn" class="hud-btn-main" type="button">▶ Iniciar (Espaço)</button>
      
      <!-- Reiniciar -->
      <button id="hud-restart-btn" class="hud-btn" type="button" title="Voltar ao início">↺ Reiniciar</button>

      <!-- Velocidade -->
      <div class="control-group">
        <span class="control-label">Velocidade</span>
        <input type="range" id="speed-slider" min="1" max="10" step="1" value="${speed}">
        <span id="speed-val" class="val-display">${speed}x</span>
      </div>

      <!-- Tamanho da Fonte -->
      <div class="control-group">
        <span class="control-label">Tamanho</span>
        <input type="range" id="font-slider" min="24" max="96" step="2" value="${fontSize}">
        <span id="font-val" class="val-display">${fontSize}px</span>
      </div>

      <!-- Espelhar Horizontal -->
      <button id="hud-mirror-btn" class="hud-btn" type="button">⇄ Espelhar (M)</button>

      <!-- Cor do Texto -->
      <button id="hud-color-btn" class="hud-btn" type="button">🎨 Cor</button>

      <!-- Guia Visual -->
      <button id="hud-guide-btn" class="hud-btn active" type="button">👁 Guia</button>
    </div>
  </div>

  <!-- Countdown Overlay -->
  <div id="countdown-overlay">3</div>

  <script>
    // Estado da Aplicação
    const state = {
      isPlaying: false,
      speed: ${speed}, // 1 a 10
      fontSize: ${fontSize},
      isMirrored: ${isMirrored},
      textColor: '${color}',
      showGuide: true,
      scrollAccumulator: 0,
      animationFrameId: null
    };

    // Elementos DOM
    const setupScreen = document.getElementById('setup-screen');
    const prompterScreen = document.getElementById('prompter-screen');
    const scriptInput = document.getElementById('script-input');
    const prompterText = document.getElementById('prompter-text');
    const prompterContainer = document.getElementById('prompter-container');
    const btnConfirm = document.getElementById('btn-confirm');
    const btnSample = document.getElementById('btn-sample');
    const btnClear = document.getElementById('btn-clear');
    const exitBtn = document.getElementById('exit-btn');
    const toggleHudBtn = document.getElementById('toggle-hud-btn');
    const hudPanel = document.getElementById('hud-panel');
    const hudPlayBtn = document.getElementById('hud-play-btn');
    const hudRestartBtn = document.getElementById('hud-restart-btn');
    const hudMirrorBtn = document.getElementById('hud-mirror-btn');
    const hudColorBtn = document.getElementById('hud-color-btn');
    const hudGuideBtn = document.getElementById('hud-guide-btn');
    const eyeGuide = document.getElementById('eye-guide');
    const speedSlider = document.getElementById('speed-slider');
    const speedVal = document.getElementById('speed-val');
    const fontSlider = document.getElementById('font-slider');
    const fontVal = document.getElementById('font-val');
    const charWordCount = document.getElementById('char-word-count');
    const readingTimeEst = document.getElementById('reading-time-est');
    const countdownOverlay = document.getElementById('countdown-overlay');

    // Texto de exemplo inicial
    const sampleText = \`${initialText.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
    scriptInput.value = sampleText;
    updateCounts();

    function updateCounts() {
      const txt = scriptInput.value.trim();
      const words = txt ? txt.split(/\\s+/).length : 0;
      const chars = txt.length;
      charWordCount.textContent = \`\${words} palavras · \${chars} caracteres\`;
      const minutes = (words / 130).toFixed(1);
      readingTimeEst.textContent = \`Tempo estimado: ~\${minutes} min\`;
    }

    scriptInput.addEventListener('input', updateCounts);

    btnSample.addEventListener('click', () => {
      scriptInput.value = sampleText;
      updateCounts();
    });

    btnClear.addEventListener('click', () => {
      scriptInput.value = '';
      updateCounts();
      scriptInput.focus();
    });

    // 1. CONFIRMAÇÃO: Transição para a tela de leitura
    btnConfirm.addEventListener('click', () => {
      const text = scriptInput.value.trim();
      if (!text) {
        alert('Por favor, digite ou cole um roteiro antes de continuar.');
        return;
      }
      prompterText.textContent = text;
      applyStyles();
      setupScreen.style.display = 'none';
      prompterScreen.style.display = 'block';
      prompterScreen.scrollTop = 0;
      state.scrollAccumulator = 0;
    });

    // Voltar para a tela de edição
    exitBtn.addEventListener('click', () => {
      pausePrompter();
      prompterScreen.style.display = 'none';
      setupScreen.style.display = 'flex';
    });

    // Alternar exibição do HUD
    toggleHudBtn.addEventListener('click', () => {
      hudPanel.classList.toggle('hidden');
    });

    // 2. CONTROLE PLAY / PAUSE
    function togglePlay() {
      if (state.isPlaying) {
        pausePrompter();
      } else {
        startPrompterWithCountdown();
      }
    }

    function startPrompterWithCountdown() {
      countdownOverlay.style.display = 'flex';
      let count = 3;
      countdownOverlay.textContent = count;
      
      const timer = setInterval(() => {
        count--;
        if (count > 0) {
          countdownOverlay.textContent = count;
        } else {
          clearInterval(timer);
          countdownOverlay.style.display = 'none';
          playPrompter();
        }
      }, 700);
    }

    function playPrompter() {
      state.isPlaying = true;
      hudPlayBtn.textContent = '⏸ Pausar (Espaço)';
      hudPlayBtn.style.background = '#ef4444';
      hudPlayBtn.style.color = '#ffffff';

      let lastTime = performance.now();
      
      function scrollStep(currentTime) {
        if (!state.isPlaying) return;
        const delta = (currentTime - lastTime) / 1000;
        lastTime = currentTime;

        // Velocidade suave em pixels por segundo
        const pixelsPerSecond = state.speed * 28;
        state.scrollAccumulator += pixelsPerSecond * delta;

        if (state.scrollAccumulator >= 1) {
          const toScroll = Math.floor(state.scrollAccumulator);
          prompterScreen.scrollTop += toScroll;
          state.scrollAccumulator -= toScroll;
        }

        // Verifica se chegou ao fim
        if (prompterScreen.scrollTop + prompterScreen.clientHeight >= prompterScreen.scrollHeight - 5) {
          pausePrompter();
          return;
        }

        state.animationFrameId = requestAnimationFrame(scrollStep);
      }

      state.animationFrameId = requestAnimationFrame(scrollStep);
    }

    function pausePrompter() {
      state.isPlaying = false;
      if (state.animationFrameId) {
        cancelAnimationFrame(state.animationFrameId);
      }
      hudPlayBtn.textContent = '▶ Iniciar (Espaço)';
      hudPlayBtn.style.background = '#facc15';
      hudPlayBtn.style.color = '#000000';
    }

    hudPlayBtn.addEventListener('click', togglePlay);

    // Botão Reiniciar
    hudRestartBtn.addEventListener('click', () => {
      pausePrompter();
      prompterScreen.scrollTop = 0;
      state.scrollAccumulator = 0;
    });

    // Slider de Velocidade
    speedSlider.addEventListener('input', (e) => {
      state.speed = parseInt(e.target.value, 10);
      speedVal.textContent = state.speed + 'x';
    });

    // Slider de Tamanho da Fonte
    fontSlider.addEventListener('input', (e) => {
      state.fontSize = parseInt(e.target.value, 10);
      fontVal.textContent = state.fontSize + 'px';
      prompterText.style.fontSize = state.fontSize + 'px';
    });

    // 3. RECURSO DE ESPELHAMENTO
    function toggleMirror() {
      state.isMirrored = !state.isMirrored;
      applyMirror();
    }

    function applyMirror() {
      if (state.isMirrored) {
        prompterContainer.classList.add('mirror-x');
        hudMirrorBtn.classList.add('active');
      } else {
        prompterContainer.classList.remove('mirror-x');
        hudMirrorBtn.classList.remove('active');
      }
    }

    hudMirrorBtn.addEventListener('click', toggleMirror);

    // Alternar Cores de Alto Contraste
    const colors = ['#ffffff', '#facc15', '#4ade80', '#38bdf8'];
    let colorIdx = 0;
    hudColorBtn.addEventListener('click', () => {
      colorIdx = (colorIdx + 1) % colors.length;
      state.textColor = colors[colorIdx];
      prompterText.style.color = state.textColor;
    });

    // Alternar Guia Visual
    hudGuideBtn.addEventListener('click', () => {
      state.showGuide = !state.showGuide;
      eyeGuide.style.display = state.showGuide ? 'flex' : 'none';
      hudGuideBtn.classList.toggle('active', state.showGuide);
    });

    function applyStyles() {
      prompterText.style.fontSize = state.fontSize + 'px';
      prompterText.style.color = state.textColor;
      applyMirror();
    }

    // Atalhos de Teclado
    window.addEventListener('keydown', (e) => {
      if (prompterScreen.style.display === 'block') {
        if (e.code === 'Space') {
          e.preventDefault();
          togglePlay();
        } else if (e.code === 'KeyM') {
          e.preventDefault();
          toggleMirror();
        } else if (e.code === 'KeyR' || e.code === 'Home') {
          e.preventDefault();
          pausePrompter();
          prompterScreen.scrollTop = 0;
        } else if (e.code === 'ArrowUp') {
          e.preventDefault();
          if (state.speed < 10) {
            state.speed++;
            speedSlider.value = state.speed;
            speedVal.textContent = state.speed + 'x';
          }
        } else if (e.code === 'ArrowDown') {
          e.preventDefault();
          if (state.speed > 1) {
            state.speed--;
            speedSlider.value = state.speed;
            speedVal.textContent = state.speed + 'x';
          }
        } else if (e.code === 'KeyH') {
          e.preventDefault();
          hudPanel.classList.toggle('hidden');
        } else if (e.code === 'Escape') {
          e.preventDefault();
          pausePrompter();
          prompterScreen.style.display = 'none';
          setupScreen.style.display = 'flex';
        }
      }
    });
  </script>
</body>
</html>`;
}

export default function App() {
  // App view mode: 'setup' | 'reading'
  const [mode, setMode] = useState<'setup' | 'reading'>('setup');
  
  // Script content
  const [scriptText, setScriptText] = useState<string>(PRESET_SCRIPTS[0].text);
  
  // Reading & playback configurations
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(3); // 1 to 10 scale
  const [fontSize, setFontSize] = useState<number>(42); // 24px to 96px
  const [lineHeight, setLineHeight] = useState<number>(1.6);
  const [isMirroredX, setIsMirroredX] = useState<boolean>(false);
  const [isMirroredY, setIsMirroredY] = useState<boolean>(false);
  const [isUppercase, setIsUppercase] = useState<boolean>(false);
  const [textColor, setTextColor] = useState<string>('#FFFFFF');
  const [fontFamily, setFontFamily] = useState<'sans' | 'mono' | 'serif'>('sans');
  const [containerWidth, setContainerWidth] = useState<'narrow' | 'medium' | 'wide' | 'full'>('medium');
  const [showEyeGuide, setShowEyeGuide] = useState<boolean>(true);
  const [guidePosition, setGuidePosition] = useState<number>(35); // 25% to 50%
  const [isHudVisible, setIsHudVisible] = useState<boolean>(true);
  const [useCountdown, setUseCountdown] = useState<boolean>(true);
  const [countdownValue, setCountdownValue] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  
  // Modals & export
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // References
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const scrollRemainderRef = useRef<number>(0);
  const timerIntervalRef = useRef<any>(null);

  // Word & character stats
  const wordCount = scriptText.trim() ? scriptText.trim().split(/\s+/).length : 0;
  const charCount = scriptText.length;
  // Average speaking pace ~130 words/minute
  const estimatedMinutes = Math.max(0.1, wordCount / 130);
  const estimatedTimeFormatted = `${Math.floor(estimatedMinutes)}m ${Math.round((estimatedMinutes % 1) * 60)}s`;

  // Format elapsed time (mm:ss)
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Fullscreen toggle handler
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  }, []);

  // Update fullscreen state on native change
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Smooth scroll loop using requestAnimationFrame
  const scrollStep = useCallback((currentTime: number) => {
    if (!scrollerRef.current) return;

    if (!lastTimeRef.current) {
      lastTimeRef.current = currentTime;
    }

    const delta = (currentTime - lastTimeRef.current) / 1000;
    lastTimeRef.current = currentTime;

    // Convert speed (1-10) to px/sec (e.g. 1 -> 25px/s, 5 -> 125px/s, 10 -> 250px/s)
    const pixelsPerSecond = speed * 26;
    scrollRemainderRef.current += pixelsPerSecond * delta;

    if (scrollRemainderRef.current >= 1) {
      const scrollAmount = Math.floor(scrollRemainderRef.current);
      scrollerRef.current.scrollTop += scrollAmount;
      scrollRemainderRef.current -= scrollAmount;
    }

    // Check if reached bottom
    const el = scrollerRef.current;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 4) {
      setIsPlaying(false);
      return;
    }

    animationFrameRef.current = requestAnimationFrame(scrollStep);
  }, [speed]);

  // Handle play / pause animation lifecycle
  useEffect(() => {
    if (isPlaying && mode === 'reading') {
      lastTimeRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(scrollStep);

      // Start elapsed timer
      timerIntervalRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isPlaying, mode, scrollStep]);

  // Toggle play with optional 3-second countdown
  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (useCountdown) {
        setCountdownValue(3);
        let current = 3;
        const interval = setInterval(() => {
          current--;
          if (current > 0) {
            setCountdownValue(current);
          } else {
            clearInterval(interval);
            setCountdownValue(null);
            setIsPlaying(true);
          }
        }, 700);
      } else {
        setIsPlaying(true);
      }
    }
  }, [isPlaying, useCountdown]);

  // Reset scroll to top
  const handleRestart = useCallback(() => {
    setIsPlaying(false);
    setElapsedSeconds(0);
    scrollRemainderRef.current = 0;
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = 0;
    }
  }, []);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing inside textarea or inputs
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) {
        // Allow Ctrl+Enter or Cmd+Enter to confirm and load script
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && mode === 'setup') {
          e.preventDefault();
          handleConfirm();
        }
        return;
      }

      if (mode === 'reading') {
        if (e.code === 'Space') {
          e.preventDefault();
          handleTogglePlay();
        } else if (e.code === 'KeyM') {
          e.preventDefault();
          setIsMirroredX((prev) => !prev);
        } else if (e.code === 'KeyR' || e.code === 'Home') {
          e.preventDefault();
          handleRestart();
        } else if (e.code === 'ArrowUp') {
          e.preventDefault();
          setSpeed((prev) => Math.min(10, prev + 1));
        } else if (e.code === 'ArrowDown') {
          e.preventDefault();
          setSpeed((prev) => Math.max(1, prev - 1));
        } else if (e.code === 'ArrowLeft') {
          e.preventDefault();
          if (scrollerRef.current) {
            scrollerRef.current.scrollTop -= 80;
          }
        } else if (e.code === 'ArrowRight') {
          e.preventDefault();
          if (scrollerRef.current) {
            scrollerRef.current.scrollTop += 80;
          }
        } else if (e.code === 'KeyH') {
          e.preventDefault();
          setIsHudVisible((prev) => !prev);
        } else if (e.code === 'KeyF') {
          e.preventDefault();
          toggleFullscreen();
        } else if (e.code === 'Escape') {
          e.preventDefault();
          setIsPlaying(false);
          setMode('setup');
        }
      } else if (mode === 'setup') {
        if (e.code === 'KeyF') {
          e.preventDefault();
          toggleFullscreen();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, handleTogglePlay, handleRestart, toggleFullscreen]);

  // Confirmation transition from setup to reading mode
  const handleConfirm = () => {
    if (!scriptText.trim()) {
      return;
    }
    setMode('reading');
    setIsPlaying(false);
    setElapsedSeconds(0);
    scrollRemainderRef.current = 0;
    setTimeout(() => {
      if (scrollerRef.current) {
        scrollerRef.current.scrollTop = 0;
      }
    }, 50);
  };

  // Standalone code for export
  const standaloneHtmlString = generateStandaloneHtml(scriptText, speed, fontSize, isMirroredX, textColor);

  const handleDownloadStandalone = () => {
    const blob = new Blob([standaloneHtmlString], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'teleprompter.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyStandalone = () => {
    navigator.clipboard.writeText(standaloneHtmlString).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    });
  };

  // Font family class helper
  const getFontFamilyStyle = () => {
    switch (fontFamily) {
      case 'mono':
        return 'font-mono tracking-tight';
      case 'serif':
        return 'font-serif';
      case 'sans':
      default:
        return 'font-sans';
    }
  };

  // Max width container helper
  const getMaxWidthClass = () => {
    switch (containerWidth) {
      case 'narrow':
        return 'max-w-xl'; // ~576px
      case 'wide':
        return 'max-w-5xl'; // ~1024px
      case 'full':
        return 'max-w-full px-6';
      case 'medium':
      default:
        return 'max-w-3xl'; // ~768px - optimal eye tracking
    }
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col font-sans select-none">
      {/* =========================================================================
          1. ETAPA DE CONFIGURAÇÃO / CONFIRMAÇÃO (Setup View)
         ========================================================================= */}
      {mode === 'setup' && (
        <div className="flex-1 flex flex-col items-center justify-start p-4 md:p-8 max-w-5xl mx-auto w-full">
          {/* Top Bar Header */}
          <header className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-3 mb-6 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-400 text-black flex items-center justify-center font-black text-lg shadow-md shadow-amber-400/20">
                TP
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  Teleprompter Profissional
                  <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-800 text-amber-400 font-semibold border border-neutral-700">
                    Gratuito & Offline
                  </span>
                </h1>
                <p className="text-xs text-neutral-400">
                  Rolagem suave automática, espelhamento para vidro refletor e controle em tempo real
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowShortcutsModal(true)}
                className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs font-medium text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
                title="Atalhos de teclado"
              >
                <Keyboard className="w-3.5 h-3.5 text-amber-400" />
                <span>Atalhos</span>
              </button>

              <button
                type="button"
                onClick={() => setShowExportModal(true)}
                className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs font-medium text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
                title="Exportar como arquivo HTML único"
              >
                <Code className="w-3.5 h-3.5 text-amber-400" />
                <span>Exportar HTML Único</span>
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white transition-colors"
                title="Tela Cheia (F)"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          </header>

          {/* Main Card with Textarea and Confirmation */}
          <main className="w-full flex flex-col gap-6">
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 md:p-6 shadow-2xl relative">
              {/* Presets and Actions Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <label htmlFor="script-textarea" className="text-sm font-semibold text-neutral-200 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  Roteiro de Leitura
                </label>

                {/* Quick Presets */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs text-neutral-500 mr-1 hidden sm:inline">Exemplos:</span>
                  {PRESET_SCRIPTS.map((preset, index) => (
                    <button
                      key={preset.title}
                      type="button"
                      onClick={() => setScriptText(preset.text)}
                      className="px-2.5 py-1 text-xs rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
                    >
                      {preset.title.split('/')[0].trim()}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setScriptText('')}
                    className="px-2.5 py-1 text-xs rounded-md bg-neutral-900 hover:bg-red-950/40 text-neutral-400 hover:text-red-400 border border-neutral-800 hover:border-red-900/50 transition-colors"
                    title="Limpar texto"
                  >
                    Limpar
                  </button>
                </div>
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  id="script-textarea"
                  value={scriptText}
                  onChange={(e) => setScriptText(e.target.value)}
                  placeholder="Digite ou cole aqui o roteiro da sua apresentação, discurso ou vídeo..."
                  rows={13}
                  className="w-full bg-black border border-neutral-800 focus:border-amber-400/80 rounded-xl p-4 text-base md:text-lg text-neutral-100 placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition-all font-sans leading-relaxed resize-y min-h-[260px]"
                />
              </div>

              {/* Text Metadata (Words, Characters, Estimated Duration) */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-neutral-900 text-xs text-neutral-400">
                <div className="flex items-center gap-4">
                  <span>
                    <strong className="text-neutral-200 font-mono tabular-nums">{wordCount}</strong> palavras
                  </span>
                  <span className="text-neutral-600">·</span>
                  <span>
                    <strong className="text-neutral-200 font-mono tabular-nums">{charCount}</strong> caracteres
                  </span>
                </div>

                <div className="flex items-center gap-2 text-neutral-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Duração estimada de fala: <strong className="text-amber-400 font-mono">{estimatedTimeFormatted}</strong> (~130 ppm)</span>
                </div>
              </div>

              {/* Pre-configuration Bar */}
              <div className="mt-6 pt-5 border-t border-neutral-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Initial Speed */}
                <div className="flex flex-col gap-1.5 bg-neutral-900/70 p-3 rounded-xl border border-neutral-800/60">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-400 flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-amber-400" /> Velocidade Inicial
                    </span>
                    <span className="font-mono text-amber-400 font-semibold">{speed}x</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="accent-amber-400 w-full h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Initial Font Size */}
                <div className="flex flex-col gap-1.5 bg-neutral-900/70 p-3 rounded-xl border border-neutral-800/60">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-400 flex items-center gap-1.5">
                      <Type className="w-3.5 h-3.5 text-amber-400" /> Tamanho da Fonte
                    </span>
                    <span className="font-mono text-amber-400 font-semibold">{fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min={24}
                    max={84}
                    step={2}
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="accent-amber-400 w-full h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Text Color Selection */}
                <div className="flex flex-col gap-1.5 bg-neutral-900/70 p-3 rounded-xl border border-neutral-800/60">
                  <span className="text-xs text-neutral-400">Cor de Alto Contraste</span>
                  <div className="flex items-center gap-2">
                    {[
                      { hex: '#FFFFFF', name: 'Branco Puro' },
                      { hex: '#FACC15', name: 'Amarelo Estúdio' },
                      { hex: '#4ADE80', name: 'Verde Neon' },
                      { hex: '#38BDF8', name: 'Ciano' }
                    ].map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => setTextColor(c.hex)}
                        title={c.name}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          textColor === c.hex ? 'border-white scale-110 shadow-sm' : 'border-neutral-700 opacity-60 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* Mirroring Options */}
                <div className="flex items-center justify-between bg-neutral-900/70 p-3 rounded-xl border border-neutral-800/60">
                  <div>
                    <span className="text-xs text-neutral-300 block font-medium">Espelhamento (Vidro)</span>
                    <span className="text-[11px] text-neutral-500">Inverte para teleprompter</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMirroredX(!isMirroredX)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                      isMirroredX
                        ? 'bg-amber-400 text-black border-amber-400 font-bold'
                        : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white'
                    }`}
                  >
                    <FlipHorizontal className="w-3.5 h-3.5" />
                    <span>{isMirroredX ? 'Ativado' : 'Desativado'}</span>
                  </button>
                </div>
              </div>

              {/* Primary Action Button: "Confirmar / Carregar Texto" */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs text-neutral-400">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useCountdown}
                      onChange={(e) => setUseCountdown(e.target.checked)}
                      className="accent-amber-400 rounded w-4 h-4"
                    />
                    <span>Contagem regressiva de 3s ao iniciar</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isUppercase}
                      onChange={(e) => setIsUppercase(e.target.checked)}
                      className="accent-amber-400 rounded w-4 h-4"
                    />
                    <span>Converter para MAIÚSCULAS</span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={!scriptText.trim()}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-base shadow-lg shadow-amber-400/25 transition-all transform active:scale-98 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2.5"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Confirmar / Carregar Texto</span>
                  <span className="text-xs font-normal opacity-75 hidden md:inline">(Enter)</span>
                </button>
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-neutral-400 text-xs">
              <div className="bg-neutral-950/60 border border-neutral-900 rounded-xl p-4 flex gap-3">
                <FlipHorizontal className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-neutral-200 text-sm mb-1">Pronto para Espelho Refletor</h2>
                  <p>Inversão horizontal em tempo real com tecla de atalho 'M'. Perfeito para pedestais, tablets e kits de teleprompter para câmeras DSLR/Mirrorless.</p>
                </div>
              </div>

              <div className="bg-neutral-950/60 border border-neutral-900 rounded-xl p-4 flex gap-3">
                <Gauge className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-neutral-200 text-sm mb-1">Rolagem Fluida 60 FPS</h2>
                  <p>Rolagem sub-pixel calculada por tempo real, garantindo leitura suave sem saltos ou engasgos na tela.</p>
                </div>
              </div>

              <div className="bg-neutral-950/60 border border-neutral-900 rounded-xl p-4 flex gap-3">
                <Download className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-neutral-200 text-sm mb-1">Totalmente Gratuito & 100% Offline</h2>
                  <p>Exportável em um arquivo HTML único e autossuficiente para você salvar no seu pen drive e abrir em qualquer navegador sem internet.</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}

      {/* =========================================================================
          2. TELA DE LEITURA DO TELEPROMPTER (Reading View)
         ========================================================================= */}
      {mode === 'reading' && (
        <div className="fixed inset-0 bg-black text-white overflow-hidden select-none">
          {/* Top Quick Status & Back Button */}
          <div
            className={`fixed top-0 left-0 right-0 z-40 p-4 flex items-center justify-between pointer-events-none transition-opacity duration-300 ${
              isHudVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Back to Edit Button */}
            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setMode('setup');
              }}
              className="pointer-events-auto px-4 py-2 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700/80 backdrop-blur-md shadow-lg flex items-center gap-2 text-sm font-medium transition-all"
              title="Voltar para tela de edição (Esc)"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar / Editar</span>
            </button>

            {/* Reading Timer & Speed Indicator */}
            <div className="pointer-events-auto flex items-center gap-2 bg-neutral-900/90 border border-neutral-800/80 px-4 py-1.5 rounded-full backdrop-blur-md text-xs font-mono text-neutral-300 shadow-lg">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span className="tabular-nums font-bold text-white">{formatTime(elapsedSeconds)}</span>
              </span>
              <span className="text-neutral-600">|</span>
              <span className="text-amber-400 font-semibold">{speed}x</span>
              <span className="text-neutral-600">|</span>
              <span className="text-neutral-400">{fontSize}px</span>
            </div>

            {/* HUD Toggle & Fullscreen */}
            <div className="pointer-events-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsHudVisible((prev) => !prev)}
                className="p-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 backdrop-blur-md transition-colors"
                title="Ocultar / Exibir Controles (H)"
              >
                {isHudVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 backdrop-blur-md transition-colors"
                title="Tela Cheia (F)"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Reading Eye Guide Marker / Line Ruler */}
          {showEyeGuide && (
            <div
              className="fixed left-0 right-0 pointer-events-none z-20 flex items-center justify-between px-6 transition-all duration-200"
              style={{ top: `${guidePosition}%`, transform: 'translateY(-50%)' }}
            >
              <div className="flex items-center gap-2 text-amber-400/90">
                <div className="w-3 h-3 border-t-2 border-r-2 border-amber-400 rotate-45" />
                <span className="text-[10px] font-mono tracking-widest uppercase opacity-75 hidden sm:inline">OLHAR</span>
              </div>
              <div className="flex-1 h-[2px] mx-4 bg-gradient-to-r from-amber-400/50 via-amber-400/20 to-amber-400/50" />
              <div className="flex items-center gap-2 text-amber-400/90">
                <span className="text-[10px] font-mono tracking-widest uppercase opacity-75 hidden sm:inline">OLHAR</span>
                <div className="w-3 h-3 border-b-2 border-l-2 border-amber-400 rotate-45" />
              </div>
            </div>
          )}

          {/* 3-Second Countdown Overlay */}
          {countdownValue !== null && (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center pointer-events-none">
              <div className="text-8xl md:text-9xl font-black text-amber-400 animate-ping">
                {countdownValue}
              </div>
            </div>
          )}

          {/* Main Scrollable Viewport */}
          <div
            ref={scrollerRef}
            className="w-full h-full overflow-y-auto no-scrollbar scroll-smooth"
            style={{
              paddingTop: `${guidePosition}vh`,
              paddingBottom: '60vh',
            }}
          >
            <div
              className={`mx-auto px-4 md:px-8 text-center transition-transform duration-200 ${getMaxWidthClass()} ${getFontFamilyStyle()}`}
              style={{
                transform: `${isMirroredX ? 'scaleX(-1)' : ''} ${isMirroredY ? 'scaleY(-1)' : ''}`.trim() || undefined,
              }}
            >
              <div
                className="teleprompter-text font-bold leading-normal whitespace-pre-wrap tracking-wide transition-all"
                style={{
                  fontSize: `${fontSize}px`,
                  lineHeight: lineHeight,
                  color: textColor,
                  textTransform: isUppercase ? 'uppercase' : 'none',
                }}
              >
                {scriptText}
              </div>
            </div>
          </div>

          {/* Discreet Floating HUD Controls Bar (Bottom) */}
          <div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 max-w-[96vw] ${
              isHudVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
            }`}
          >
            <div className="bg-neutral-900/95 border border-neutral-700/80 rounded-2xl md:rounded-full px-4 py-3 shadow-2xl backdrop-blur-xl flex flex-wrap items-center justify-center gap-3 text-sm text-neutral-200">
              {/* PLAY / PAUSE BUTTON */}
              <button
                type="button"
                onClick={handleTogglePlay}
                className={`px-5 py-2.5 rounded-full font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 ${
                  isPlaying
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-amber-400 hover:bg-amber-300 text-black'
                }`}
                title="Play / Pause (Barra de Espaço)"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5 fill-current" />
                    <span>Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    <span>Iniciar</span>
                  </>
                )}
                <span className="text-xs font-normal opacity-80">(Espaço)</span>
              </button>

              {/* REINICIAR (Reset) BUTTON */}
              <button
                type="button"
                onClick={handleRestart}
                className="px-3.5 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 flex items-center gap-1.5 transition-colors"
                title="Retornar ao início do roteiro (R / Home)"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reiniciar</span>
              </button>

              <div className="h-6 w-[1px] bg-neutral-700 mx-1 hidden sm:block" />

              {/* VELOCIDADE (Speed Control) */}
              <div className="flex items-center gap-2 bg-neutral-800/80 border border-neutral-700/60 px-3 py-1.5 rounded-full">
                <span className="text-xs text-neutral-400 flex items-center gap-1 font-medium">
                  <Gauge className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden md:inline">Velocidade:</span>
                </span>
                <button
                  type="button"
                  onClick={() => setSpeed((prev) => Math.max(1, prev - 1))}
                  className="w-5 h-5 rounded bg-neutral-700 hover:bg-neutral-600 flex items-center justify-center font-bold text-xs"
                >
                  -
                </button>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-16 md:w-20 accent-amber-400 h-1.5 bg-neutral-700 rounded-lg cursor-pointer"
                  title="Ajuste a velocidade de rolagem"
                />
                <button
                  type="button"
                  onClick={() => setSpeed((prev) => Math.min(10, prev + 1))}
                  className="w-5 h-5 rounded bg-neutral-700 hover:bg-neutral-600 flex items-center justify-center font-bold text-xs"
                >
                  +
                </button>
                <span className="font-mono text-amber-400 font-bold text-xs w-6 text-center">{speed}x</span>
              </div>

              {/* TAMANHO DA FONTE (Font Size Control) */}
              <div className="flex items-center gap-2 bg-neutral-800/80 border border-neutral-700/60 px-3 py-1.5 rounded-full">
                <span className="text-xs text-neutral-400 flex items-center gap-1 font-medium">
                  <Type className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden md:inline">Fonte:</span>
                </span>
                <button
                  type="button"
                  onClick={() => setFontSize((prev) => Math.max(20, prev - 2))}
                  className="w-5 h-5 rounded bg-neutral-700 hover:bg-neutral-600 flex items-center justify-center font-bold text-xs"
                >
                  -
                </button>
                <input
                  type="range"
                  min={20}
                  max={96}
                  step={2}
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-16 md:w-20 accent-amber-400 h-1.5 bg-neutral-700 rounded-lg cursor-pointer"
                  title="Ajuste o tamanho do texto"
                />
                <button
                  type="button"
                  onClick={() => setFontSize((prev) => Math.min(96, prev + 2))}
                  className="w-5 h-5 rounded bg-neutral-700 hover:bg-neutral-600 flex items-center justify-center font-bold text-xs"
                >
                  +
                </button>
                <span className="font-mono text-amber-400 font-bold text-xs w-8 text-center">{fontSize}</span>
              </div>

              <div className="h-6 w-[1px] bg-neutral-700 mx-1 hidden sm:block" />

              {/* ESPELHAMENTO HORIZONTAL (Mirror X) */}
              <button
                type="button"
                onClick={() => setIsMirroredX(!isMirroredX)}
                className={`px-3 py-2 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isMirroredX
                    ? 'bg-amber-400 text-black border-amber-400 font-bold'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700'
                }`}
                title="Espelhar texto horizontalmente para vidro refletor (M)"
              >
                <FlipHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Espelhar (M)</span>
              </button>

              {/* COR DO TEXTO (Color Toggle) */}
              <div className="flex items-center gap-1">
                {[
                  { hex: '#FFFFFF', title: 'Branco' },
                  { hex: '#FACC15', title: 'Amarelo' },
                  { hex: '#4ADE80', title: 'Verde' }
                ].map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => setTextColor(c.hex)}
                    title={c.title}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${
                      textColor === c.hex ? 'border-white scale-110' : 'border-neutral-700 opacity-60'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>

              {/* GUIA DE LEITURA (Eye Guide) */}
              <button
                type="button"
                onClick={() => setShowEyeGuide(!showEyeGuide)}
                className={`p-2 rounded-full border transition-colors ${
                  showEyeGuide
                    ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                    : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                }`}
                title="Linha guia para o olhar da câmera"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: ATALHOS DE TECLADO
         ========================================================================= */}
      {showShortcutsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-amber-400" />
                Atalhos de Teclado
              </h3>
              <button
                type="button"
                onClick={() => setShowShortcutsModal(false)}
                className="text-neutral-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="divide-y divide-neutral-800 text-sm mt-4">
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-300">Play / Pause</span>
                <kbd className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 font-mono text-xs text-amber-300">Espaço</kbd>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-300">Espelhar Texto (Vidro)</span>
                <kbd className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 font-mono text-xs text-amber-300">M</kbd>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-300">Reiniciar Rolagem</span>
                <kbd className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 font-mono text-xs text-amber-300">R ou Home</kbd>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-300">Aumentar Velocidade</span>
                <kbd className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 font-mono text-xs text-amber-300">Seta Cima (↑)</kbd>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-300">Diminuir Velocidade</span>
                <kbd className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 font-mono text-xs text-amber-300">Seta Baixo (↓)</kbd>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-300">Avançar / Voltar Manualmente</span>
                <kbd className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 font-mono text-xs text-amber-300">← / →</kbd>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-300">Ocultar / Mostrar Controles</span>
                <kbd className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 font-mono text-xs text-amber-300">H</kbd>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-300">Tela Cheia</span>
                <kbd className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 font-mono text-xs text-amber-300">F</kbd>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-300">Voltar para Edição</span>
                <kbd className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 font-mono text-xs text-amber-300">Esc</kbd>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowShortcutsModal(false)}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: EXPORTAR ARQUIVO HTML ÚNICO
         ========================================================================= */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 max-w-xl w-full shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-amber-400" />
                  Teleprompter em Arquivo HTML Único
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  100% autossuficiente (HTML + CSS + JS embutidos), pronto para rodar offline em qualquer navegador.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="text-neutral-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="my-4 flex-1 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-neutral-400">Código gerado com seu texto e ajustes atuais:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyStandalone}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 flex items-center gap-1.5 transition-colors"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-green-400">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Código</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadStandalone}
                    className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar .html</span>
                  </button>
                </div>
              </div>

              <div className="bg-black border border-neutral-800 rounded-xl p-3 overflow-auto flex-1 font-mono text-xs text-neutral-300 max-h-64">
                <pre>{standaloneHtmlString.slice(0, 1500)}...</pre>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800 flex justify-between items-center text-xs text-neutral-500">
              <span>Arquivo: teleprompter.html (~14 KB)</span>
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

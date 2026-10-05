import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  FlipHorizontal,
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
  Clock,
  FileText,
  Code,
  Smartphone,
  Sparkles,
  HelpCircle,
  Sun
} from 'lucide-react';

// Preset sample scripts for testing
const PRESET_SCRIPTS = [
  {
    title: 'Apresentação em Vídeo / YouTube',
    text: `Olá a todos e sejam muito bem-vindos ao meu canal!

No vídeo de hoje, vamos explorar uma das ferramentas mais essenciais para quem grava vídeos, produz conteúdo ou faz apresentações ao vivo: o Teleprompter.

Você já reparou como os grandes apresentadores de televisão conseguem falar diretamente para a câmera com naturalidade e confiança, sem nunca desviar o olhar nem esquecer uma única linha do roteiro?

O segredo por trás disso é uma superfície reflexiva posicionada exatamente na frente da lente da câmera, que reflete o texto espelhado enquanto a câmera filma através do vidro sem capturar o reflexo.

Com este Teleprompter, você tem controle total da velocidade com o teclado ou touch no celular, pode espelhar o texto para o seu espelho ou usar diretamente na tela do seu computador ou tablet.

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
    title: 'Noticiário / Podcast Rápido',
    text: `Edição extraordinária das 20 horas.

Principais destaques do dia: avanços recentes na tecnologia impulsionam produtores de mídia independente em todo o mundo.

Especialistas em comunicação apontam que o contato visual constante com o público aumenta a retenção de atenção em até 70% durante transmissões de vídeo.

Fique conosco para a cobertura completa dos temas em destaque após o breve intervalo.`
  }
];

// Single file standalone HTML generator
function generateStandaloneHtml(initialText: string, speed: number, fontSize: number, isMirrored: boolean, color: string): string {
  const safeText = initialText.replace(/`/g, '\\`').replace(/\$/g, '\\$');
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Teleprompter Pessoal e Gratuito</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }
    body, html {
      background-color: #000000;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      overflow-x: hidden;
      height: 100%;
      touch-action: manipulation;
      -webkit-font-smoothing: antialiased;
    }
    
    /* Config Screen */
    #setup-screen {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
      max-width: 900px;
      margin: 0 auto;
    }
    .header-box {
      text-align: center;
      margin-bottom: 20px;
      width: 100%;
    }
    .badge {
      display: inline-block;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #facc15;
      font-weight: 700;
      margin-bottom: 8px;
      background: #1c1917;
      padding: 4px 10px;
      border-radius: 9999px;
      border: 1px solid #292524;
    }
    h1 {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 6px;
      color: #ffffff;
    }
    p.subtitle {
      font-size: 13px;
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
    .textarea-label-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    label {
      font-size: 13px;
      font-weight: 600;
      color: #d4d4d4;
    }
    .sample-btn {
      background: #171717;
      color: #a3a3a3;
      border: 1px solid #262626;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
    }
    .sample-btn:hover {
      color: #ffffff;
      background: #262626;
    }
    textarea {
      width: 100%;
      height: 280px;
      background: #000000;
      color: #f5f5f5;
      border: 1px solid #333333;
      border-radius: 12px;
      padding: 14px;
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
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid #1c1c1c;
      font-size: 12px;
      color: #737373;
    }
    .btn-row {
      display: flex;
      gap: 10px;
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
      user-select: none;
      touch-action: manipulation;
    }
    .btn-primary {
      background: #facc15;
      color: #000000;
      border: none;
      padding: 16px 28px;
      font-size: 16px;
      font-weight: 700;
      flex: 2;
      min-width: 200px;
      box-shadow: 0 4px 20px rgba(250, 204, 21, 0.3);
    }
    .btn-primary:active {
      transform: scale(0.98);
      background: #eab308;
    }
    .btn-secondary {
      background: #171717;
      color: #e5e5e5;
      border: 1px solid #262626;
      padding: 14px 18px;
      font-size: 14px;
      flex: 1;
    }

    /* Reading Screen */
    #prompter-screen {
      display: none;
      position: fixed;
      inset: 0;
      background: #000000;
      overflow-y: scroll;
      overflow-x: hidden;
      scroll-behavior: auto !important;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: contain;
      touch-action: pan-y;
      z-index: 10;
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
      max-width: 820px;
      margin: 0 auto;
      padding: 35vh 20px 100vh 20px;
      min-height: 150vh;
      text-align: center;
      transition: transform 0.2s ease;
      will-change: transform;
    }
    #prompter-text {
      white-space: pre-wrap;
      word-break: break-word;
      line-height: 1.6;
      font-weight: 700;
      color: ${color};
      font-size: ${fontSize}px;
    }

    /* Mirroring */
    .mirror-x {
      transform: scaleX(-1);
    }

    /* Eye Line Guide */
    #eye-guide {
      position: fixed;
      top: 35%;
      left: 0;
      right: 0;
      height: 44px;
      pointer-events: none;
      border-top: 2px dashed rgba(250, 204, 21, 0.4);
      border-bottom: 2px dashed rgba(250, 204, 21, 0.4);
      background: rgba(250, 204, 21, 0.05);
      z-index: 30;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
    }
    .guide-marker {
      color: #facc15;
      font-size: 18px;
      font-weight: 900;
      opacity: 0.8;
    }

    /* Mobile Quick Tap Hint */
    #tap-hint {
      position: fixed;
      top: 60px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(23, 23, 23, 0.7);
      backdrop-filter: blur(8px);
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 11px;
      color: #a3a3a3;
      pointer-events: none;
      z-index: 40;
      transition: opacity 0.5s ease;
    }

    /* HUD Bar */
    #hud-panel {
      position: fixed;
      bottom: max(16px, env(safe-area-inset-bottom, 16px));
      left: 50%;
      transform: translateX(-50%);
      background: rgba(20, 20, 20, 0.95);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 9999px;
      padding: 6px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      z-index: 50;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.9);
      transition: opacity 0.2s ease, transform 0.2s ease;
      max-width: 95vw;
      overflow-x: auto;
    }
    #hud-panel.hidden {
      opacity: 0;
      transform: translate(-50%, 60px);
      pointer-events: none;
    }

    .hud-btn {
      background: #262626;
      color: #ffffff;
      border: 1px solid #404040;
      padding: 8px 12px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
      min-height: 40px;
    }
    .hud-btn:active {
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
      font-size: 14px;
      font-weight: 700;
      min-height: 42px;
      box-shadow: 0 2px 10px rgba(250, 204, 21, 0.3);
    }
    .hud-btn-main:active {
      transform: scale(0.96);
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
      width: 70px;
    }
    .val-display {
      font-size: 11px;
      font-variant-numeric: tabular-nums;
      color: #facc15;
      font-weight: 700;
      min-width: 26px;
    }

    #exit-btn {
      position: fixed;
      top: max(12px, env(safe-area-inset-top, 12px));
      left: 14px;
      background: rgba(23, 23, 23, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #ffffff;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 12px;
      z-index: 60;
      backdrop-filter: blur(8px);
    }

    #toggle-hud-btn {
      position: fixed;
      top: max(12px, env(safe-area-inset-top, 12px));
      right: 14px;
      background: rgba(23, 23, 23, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #ffffff;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 11px;
      z-index: 60;
      backdrop-filter: blur(8px);
    }
  </style>
</head>
<body>

  <!-- CONFIG SCREEN -->
  <div id="setup-screen">
    <div class="header-box">
      <span class="badge">Teleprompter Gratuito & Offline</span>
      <h1>Teleprompter Pessoal</h1>
      <p class="subtitle">Cole seu texto, ajuste as opções e confirme para iniciar a leitura</p>
    </div>

    <div class="editor-card">
      <div class="textarea-label-row">
        <label for="script-input">Roteiro de Leitura</label>
        <button id="btn-sample" class="sample-btn" type="button">Carregar Exemplo</button>
      </div>

      <textarea id="script-input" placeholder="Digite ou cole aqui o seu roteiro..."></textarea>
      
      <div class="meta-bar">
        <span id="char-word-count">0 palavras · 0 caracteres</span>
        <span id="reading-time-est">Tempo estimado: ~0 min</span>
      </div>

      <div class="btn-row">
        <button id="btn-clear" class="btn-secondary" type="button">Limpar</button>
        <button id="btn-confirm" class="btn-primary" type="button">▶ Confirmar e Carregar Texto</button>
      </div>
    </div>
  </div>

  <!-- READING SCREEN -->
  <div id="prompter-screen">
    <button id="exit-btn" type="button">← Voltar</button>
    <button id="toggle-hud-btn" type="button">Controles (H)</button>
    <div id="tap-hint">Toque na tela para Pausar/Iniciar</div>

    <div id="eye-guide">
      <span class="guide-marker">▶</span>
      <span class="guide-marker">◀</span>
    </div>

    <div id="prompter-container">
      <div id="prompter-text"></div>
    </div>

    <div id="hud-panel">
      <button id="hud-play-btn" class="hud-btn-main" type="button">▶ Iniciar</button>
      <button id="hud-restart-btn" class="hud-btn" type="button">↺ Início</button>

      <div class="control-group">
        <span class="control-label">Velocidade</span>
        <input type="range" id="speed-slider" min="1" max="10" step="1" value="${speed}">
        <span id="speed-val" class="val-display">${speed}x</span>
      </div>

      <div class="control-group">
        <span class="control-label">Fonte</span>
        <input type="range" id="font-slider" min="24" max="96" step="2" value="${fontSize}">
        <span id="font-val" class="val-display">${fontSize}px</span>
      </div>

      <button id="hud-mirror-btn" class="hud-btn" type="button">⇄ Espelho</button>
      <button id="hud-color-btn" class="hud-btn" type="button">🎨 Cor</button>
      <button id="hud-guide-btn" class="hud-btn active" type="button">👁 Guia</button>
    </div>
  </div>

  <script>
    const state = {
      isPlaying: false,
      speed: ${speed},
      fontSize: ${fontSize},
      isMirrored: ${isMirrored},
      textColor: '${color}',
      showGuide: true,
      scrollAccumulator: 0,
      animationFrameId: null,
      wakeLock: null
    };

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
    const tapHint = document.getElementById('tap-hint');

    const defaultScript = \`${safeText}\`;
    scriptInput.value = defaultScript;
    updateCounts();

    function updateCounts() {
      const txt = scriptInput.value.trim();
      const words = txt ? txt.split(/\\s+/).length : 0;
      const chars = txt.length;
      charWordCount.textContent = words + ' palavras · ' + chars + ' caracteres';
      const minutes = (words / 130).toFixed(1);
      readingTimeEst.textContent = 'Tempo estimado: ~' + minutes + ' min';
    }

    scriptInput.addEventListener('input', updateCounts);
    btnSample.addEventListener('click', () => { scriptInput.value = defaultScript; updateCounts(); });
    btnClear.addEventListener('click', () => { scriptInput.value = ''; updateCounts(); scriptInput.focus(); });

    // Request wake lock to prevent mobile screen sleeping
    async function requestWakeLock() {
      try {
        if ('wakeLock' in navigator) {
          state.wakeLock = await navigator.wakeLock.request('screen');
        }
      } catch (err) {}
    }

    function releaseWakeLock() {
      if (state.wakeLock) {
        state.wakeLock.release().catch(() => {});
        state.wakeLock = null;
      }
    }

    // Confirmation
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
      
      // Auto hide hint after 4s
      setTimeout(() => {
        if (tapHint) tapHint.style.opacity = '0';
      }, 4000);
    });

    exitBtn.addEventListener('click', () => {
      pausePrompter();
      prompterScreen.style.display = 'none';
      setupScreen.style.display = 'flex';
    });

    toggleHudBtn.addEventListener('click', () => {
      hudPanel.classList.toggle('hidden');
    });

    // Tap anywhere on the reading viewport to Play / Pause (Mobile Friendly!)
    prompterScreen.addEventListener('click', (e) => {
      if (e.target.closest('#hud-panel, #exit-btn, #toggle-hud-btn')) {
        return;
      }
      togglePlay();
    });

    // Play / Pause Logic
    function togglePlay() {
      if (state.isPlaying) {
        pausePrompter();
      } else {
        playPrompter();
      }
    }

    function playPrompter() {
      if (state.isPlaying) return;
      state.isPlaying = true;
      requestWakeLock();

      hudPlayBtn.textContent = '⏸ Pausar';
      hudPlayBtn.style.background = '#ef4444';
      hudPlayBtn.style.color = '#ffffff';

      let lastTime = performance.now();

      function scrollLoop(currentTime) {
        if (!state.isPlaying) return;
        const delta = (currentTime - lastTime) / 1000;
        lastTime = currentTime;

        // Clamp delta to prevent huge jumps on tab switch / lag spike
        const safeDelta = Math.min(delta, 0.05);

        // Pixels per second calculation
        const pxPerSec = state.speed * 26 + 10;
        state.scrollAccumulator += pxPerSec * safeDelta;

        if (state.scrollAccumulator >= 1) {
          const toScroll = Math.floor(state.scrollAccumulator);
          prompterScreen.scrollTop += toScroll;
          state.scrollAccumulator -= toScroll;
        }

        // Check if reached bottom ONLY if we actually have room to scroll AND scrolled past 50px
        const maxScroll = prompterScreen.scrollHeight - prompterScreen.clientHeight;
        if (maxScroll > 60 && prompterScreen.scrollTop >= maxScroll - 6) {
          pausePrompter();
          return;
        }

        state.animationFrameId = requestAnimationFrame(scrollLoop);
      }

      state.animationFrameId = requestAnimationFrame(scrollLoop);
    }

    function pausePrompter() {
      state.isPlaying = false;
      releaseWakeLock();
      if (state.animationFrameId) {
        cancelAnimationFrame(state.animationFrameId);
        state.animationFrameId = null;
      }
      hudPlayBtn.textContent = '▶ Iniciar';
      hudPlayBtn.style.background = '#facc15';
      hudPlayBtn.style.color = '#000000';
    }

    hudPlayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });

    hudRestartBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      pausePrompter();
      prompterScreen.scrollTop = 0;
      state.scrollAccumulator = 0;
    });

    speedSlider.addEventListener('input', (e) => {
      state.speed = parseInt(e.target.value, 10);
      speedVal.textContent = state.speed + 'x';
    });

    fontSlider.addEventListener('input', (e) => {
      state.fontSize = parseInt(e.target.value, 10);
      fontVal.textContent = state.fontSize + 'px';
      prompterText.style.fontSize = state.fontSize + 'px';
    });

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

    hudMirrorBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMirror();
    });

    const colors = ['#ffffff', '#facc15', '#4ade80', '#38bdf8'];
    let colorIdx = 0;
    hudColorBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      colorIdx = (colorIdx + 1) % colors.length;
      state.textColor = colors[colorIdx];
      prompterText.style.color = state.textColor;
    });

    hudGuideBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      state.showGuide = !state.showGuide;
      eyeGuide.style.display = state.showGuide ? 'flex' : 'none';
      hudGuideBtn.classList.toggle('active', state.showGuide);
    });

    function applyStyles() {
      prompterText.style.fontSize = state.fontSize + 'px';
      prompterText.style.color = state.textColor;
      applyMirror();
    }

    // Keyboard Shortcuts
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
  const [useCountdown, setUseCountdown] = useState<boolean>(false); // Instant play by default for mobile reliability
  const [countdownValue, setCountdownValue] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showTapHint, setShowTapHint] = useState<boolean>(true);
  
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
  const countdownTimerRef = useRef<any>(null);
  const wakeLockRef = useRef<any>(null);

  // Word & character stats
  const wordCount = scriptText.trim() ? scriptText.trim().split(/\s+/).length : 0;
  const charCount = scriptText.length;
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

  // Screen Wake Lock API to prevent device from dimming / sleeping while reading
  const requestWakeLock = useCallback(async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
      }
    } catch {
      // Wake lock can fail in battery saver mode or unsupported browsers
    }
  }, []);

  const releaseWakeLock = useCallback(() => {
    if (wakeLockRef.current) {
      wakeLockRef.current.release().catch(() => {});
      wakeLockRef.current = null;
    }
  }, []);

  // Ultra-Smooth Scroll Loop using requestAnimationFrame
  const scrollStep = useCallback((currentTime: number) => {
    if (!scrollerRef.current) return;

    if (!lastTimeRef.current) {
      lastTimeRef.current = currentTime;
    }

    const delta = (currentTime - lastTimeRef.current) / 1000;
    lastTimeRef.current = currentTime;

    // Safety clamp delta to 50ms maximum to prevent massive jumps on lag spikes
    const safeDelta = Math.min(delta, 0.05);

    // Calculate speed in px/sec (speed 1: ~36px/s, speed 5: ~140px/s, speed 10: ~270px/s)
    const pixelsPerSecond = speed * 26 + 10;
    scrollRemainderRef.current += pixelsPerSecond * safeDelta;

    if (scrollRemainderRef.current >= 1) {
      const scrollAmount = Math.floor(scrollRemainderRef.current);
      scrollerRef.current.scrollTop += scrollAmount;
      scrollRemainderRef.current -= scrollAmount;
    }

    // Check if reached bottom ONLY IF we actually have scrollable content AND scrolled past 50px
    const el = scrollerRef.current;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll > 60 && el.scrollTop >= maxScroll - 6) {
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
      requestWakeLock();

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
      releaseWakeLock();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      releaseWakeLock();
    };
  }, [isPlaying, mode, scrollStep, requestWakeLock, releaseWakeLock]);

  // Toggle play / pause with instant execution (or optional countdown)
  const handleTogglePlay = useCallback(() => {
    // If a countdown is in progress, skip it and play immediately!
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
      setCountdownValue(null);
      setIsPlaying(true);
      return;
    }

    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (useCountdown) {
        setCountdownValue(3);
        let count = 3;
        countdownTimerRef.current = setInterval(() => {
          count--;
          if (count > 0) {
            setCountdownValue(count);
          } else {
            clearInterval(countdownTimerRef.current);
            countdownTimerRef.current = null;
            setCountdownValue(null);
            setIsPlaying(true);
          }
        }, 600);
      } else {
        setIsPlaying(true);
      }
    }
  }, [isPlaying, useCountdown]);

  // Reset scroll to top
  const handleRestart = useCallback(() => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
      setCountdownValue(null);
    }
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
    setShowTapHint(true);
    setTimeout(() => {
      if (scrollerRef.current) {
        scrollerRef.current.scrollTop = 0;
      }
    }, 50);

    // Auto fade hint after 4s
    setTimeout(() => {
      setShowTapHint(false);
    }, 4500);
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
        return 'max-w-xl';
      case 'wide':
        return 'max-w-5xl';
      case 'full':
        return 'max-w-full px-4';
      case 'medium':
      default:
        return 'max-w-3xl';
    }
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col font-sans select-none touch-manipulation">
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
                    Mobile & Tablet Ready
                  </span>
                </h1>
                <p className="text-xs text-neutral-400">
                  Rolagem suave automática, toque na tela, espelhamento para vidro e offline
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
                <span className="hidden sm:inline">Atalhos</span>
              </button>

              <button
                type="button"
                onClick={() => setShowExportModal(true)}
                className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs font-medium text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
                title="Exportar como arquivo HTML único"
              >
                <Code className="w-3.5 h-3.5 text-amber-400" />
                <span>Exportar .html</span>
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
                  {PRESET_SCRIPTS.map((preset) => (
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
                  rows={12}
                  className="w-full bg-black border border-neutral-800 focus:border-amber-400/80 rounded-xl p-4 text-base md:text-lg text-neutral-100 placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition-all font-sans leading-relaxed resize-y min-h-[240px]"
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
                  <span>Duração estimada: <strong className="text-amber-400 font-mono">{estimatedTimeFormatted}</strong></span>
                </div>
              </div>

              {/* Pre-configuration Bar */}
              <div className="mt-6 pt-5 border-t border-neutral-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Initial Speed */}
                <div className="flex flex-col gap-1.5 bg-neutral-900/70 p-3 rounded-xl border border-neutral-800/60">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-400 flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-amber-400" /> Velocidade
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
                  <span className="text-xs text-neutral-400">Cor do Texto</span>
                  <div className="flex items-center gap-2">
                    {[
                      { hex: '#FFFFFF', name: 'Branco' },
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
                      className="accent-amber-400 rounded w-4 h-4 cursor-pointer"
                    />
                    <span>Contagem 3s ao iniciar</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isUppercase}
                      onChange={(e) => setIsUppercase(e.target.checked)}
                      className="accent-amber-400 rounded w-4 h-4 cursor-pointer"
                    />
                    <span>Texto em MAIÚSCULAS</span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={!scriptText.trim()}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-black font-bold text-base shadow-lg shadow-amber-400/25 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Confirmar / Carregar Texto</span>
                  <span className="text-xs font-normal opacity-75 hidden md:inline">(Enter)</span>
                </button>
              </div>
            </div>

            {/* Mobile / Tablet Guide Banner */}
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 flex items-center justify-between text-xs text-neutral-400">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-amber-400 shrink-0" />
                <span>
                  <strong className="text-white">Dica Mobile & Tablet:</strong> Na tela de leitura, basta <strong>tocar em qualquer lugar da tela</strong> para dar Play ou Pause instantaneamente.
                </span>
              </div>
            </div>
          </main>
        </div>
      )}

      {/* =========================================================================
          2. TELA DE LEITURA DO TELEPROMPTER (Reading View)
         ========================================================================= */}
      {mode === 'reading' && (
        <div className="fixed inset-0 bg-black text-white overflow-hidden select-none touch-manipulation">
          {/* Top Quick Status & Back Button */}
          <div
            className={`fixed top-0 left-0 right-0 z-40 p-3 md:p-4 flex items-center justify-between pointer-events-none transition-opacity duration-300 ${
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
              className="pointer-events-auto px-3.5 py-2 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 active:scale-95 text-neutral-200 hover:text-white border border-neutral-700/80 backdrop-blur-md shadow-lg flex items-center gap-1.5 text-xs md:text-sm font-medium transition-all"
              title="Voltar para tela de edição (Esc)"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>

            {/* Reading Timer & Speed Indicator */}
            <div className="pointer-events-auto flex items-center gap-2 bg-neutral-900/90 border border-neutral-800/80 px-3 md:px-4 py-1.5 rounded-full backdrop-blur-md text-xs font-mono text-neutral-300 shadow-lg">
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
                className="p-2 md:p-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 active:scale-95 text-neutral-300 hover:text-white border border-neutral-800 backdrop-blur-md transition-colors"
                title="Ocultar / Exibir Controles (H)"
              >
                {isHudVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-2 md:p-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 active:scale-95 text-neutral-300 hover:text-white border border-neutral-800 backdrop-blur-md transition-colors"
                title="Tela Cheia (F)"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Reading Eye Guide Marker / Line Ruler */}
          {showEyeGuide && (
            <div
              className="fixed left-0 right-0 pointer-events-none z-20 flex items-center justify-between px-4 md:px-6 transition-all duration-200"
              style={{ top: `${guidePosition}%`, transform: 'translateY(-50%)' }}
            >
              <div className="flex items-center gap-1.5 text-amber-400/90">
                <div className="w-2.5 h-2.5 border-t-2 border-r-2 border-amber-400 rotate-45" />
                <span className="text-[10px] font-mono tracking-widest uppercase opacity-75 hidden sm:inline">OLHAR</span>
              </div>
              <div className="flex-1 h-[2px] mx-3 bg-gradient-to-r from-amber-400/50 via-amber-400/20 to-amber-400/50" />
              <div className="flex items-center gap-1.5 text-amber-400/90">
                <span className="text-[10px] font-mono tracking-widest uppercase opacity-75 hidden sm:inline">OLHAR</span>
                <div className="w-2.5 h-2.5 border-b-2 border-l-2 border-amber-400 rotate-45" />
              </div>
            </div>
          )}

          {/* Mobile Tap Hint */}
          {showTapHint && (
            <div className="fixed top-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none bg-neutral-900/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-neutral-300 border border-neutral-800 shadow-lg animate-pulse">
              Toque na tela para Iniciar / Pausar
            </div>
          )}

          {/* 3-Second Countdown Overlay (tap to skip!) */}
          {countdownValue !== null && (
            <div
              onClick={() => {
                if (countdownTimerRef.current) {
                  clearInterval(countdownTimerRef.current);
                  countdownTimerRef.current = null;
                }
                setCountdownValue(null);
                setIsPlaying(true);
              }}
              className="fixed inset-0 z-50 bg-black/85 flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="text-8xl md:text-9xl font-black text-amber-400 animate-ping">
                {countdownValue}
              </div>
              <span className="text-xs text-neutral-400 mt-6 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">
                Toque para iniciar imediatamente
              </span>
            </div>
          )}

          {/* Main Scrollable Viewport (Click/Tap on reading area toggles Play/Pause) */}
          <div
            ref={scrollerRef}
            onClick={(e) => {
              // Ignore clicks if clicking directly inside HUD or top bar
              if ((e.target as HTMLElement).closest('#reading-hud-panel, button, input')) {
                return;
              }
              handleTogglePlay();
            }}
            className="prompter-viewport w-full h-full overflow-y-auto no-scrollbar cursor-pointer"
            style={{
              paddingTop: `${guidePosition}vh`,
              paddingBottom: '100vh',
            }}
          >
            <div
              className={`mx-auto px-4 md:px-8 text-center transition-transform duration-200 min-h-[140vh] ${getMaxWidthClass()} ${getFontFamilyStyle()}`}
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
            id="reading-hud-panel"
            className={`fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 max-w-[96vw] ${
              isHudVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
            }`}
          >
            <div className="bg-neutral-900/95 border border-neutral-700/80 rounded-2xl md:rounded-full px-3 md:px-4 py-2.5 shadow-2xl backdrop-blur-xl flex flex-wrap items-center justify-center gap-2 md:gap-3 text-xs md:text-sm text-neutral-200">
              {/* PLAY / PAUSE BUTTON */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTogglePlay();
                }}
                className={`px-4 md:px-5 py-2.5 rounded-full font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer min-h-[42px] ${
                  isPlaying
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-amber-400 hover:bg-amber-300 text-black'
                }`}
                title="Play / Pause (Barra de Espaço ou Toque)"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                    <span>Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                    <span>Iniciar</span>
                  </>
                )}
                <span className="text-[11px] font-normal opacity-80 hidden md:inline">(Espaço)</span>
              </button>

              {/* REINICIAR (Reset) BUTTON */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRestart();
                }}
                className="px-3 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-neutral-200 border border-neutral-700 flex items-center gap-1.5 transition-colors cursor-pointer min-h-[42px]"
                title="Retornar ao início do roteiro (R / Home)"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reiniciar</span>
              </button>

              <div className="h-5 w-[1px] bg-neutral-700 mx-0.5 hidden sm:block" />

              {/* VELOCIDADE (Speed Control) */}
              <div className="flex items-center gap-1.5 bg-neutral-800/80 border border-neutral-700/60 px-2.5 py-1.5 rounded-full min-h-[42px]">
                <span className="text-[11px] text-neutral-400 flex items-center gap-1 font-medium">
                  <Gauge className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden md:inline">Velocidade:</span>
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSpeed((prev) => Math.max(1, prev - 1));
                  }}
                  className="w-6 h-6 rounded-full bg-neutral-700 hover:bg-neutral-600 active:scale-90 flex items-center justify-center font-bold text-xs"
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
                  className="w-14 md:w-20 accent-amber-400 h-1.5 bg-neutral-700 rounded-lg cursor-pointer"
                  title="Ajuste a velocidade de rolagem"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSpeed((prev) => Math.min(10, prev + 1));
                  }}
                  className="w-6 h-6 rounded-full bg-neutral-700 hover:bg-neutral-600 active:scale-90 flex items-center justify-center font-bold text-xs"
                >
                  +
                </button>
                <span className="font-mono text-amber-400 font-bold text-xs w-5 text-center">{speed}x</span>
              </div>

              {/* TAMANHO DA FONTE (Font Size Control) */}
              <div className="flex items-center gap-1.5 bg-neutral-800/80 border border-neutral-700/60 px-2.5 py-1.5 rounded-full min-h-[42px]">
                <span className="text-[11px] text-neutral-400 flex items-center gap-1 font-medium">
                  <Type className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden md:inline">Fonte:</span>
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFontSize((prev) => Math.max(20, prev - 2));
                  }}
                  className="w-6 h-6 rounded-full bg-neutral-700 hover:bg-neutral-600 active:scale-90 flex items-center justify-center font-bold text-xs"
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
                  className="w-14 md:w-20 accent-amber-400 h-1.5 bg-neutral-700 rounded-lg cursor-pointer"
                  title="Ajuste o tamanho do texto"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFontSize((prev) => Math.min(96, prev + 2));
                  }}
                  className="w-6 h-6 rounded-full bg-neutral-700 hover:bg-neutral-600 active:scale-90 flex items-center justify-center font-bold text-xs"
                >
                  +
                </button>
                <span className="font-mono text-amber-400 font-bold text-xs w-7 text-center">{fontSize}</span>
              </div>

              <div className="h-5 w-[1px] bg-neutral-700 mx-0.5 hidden sm:block" />

              {/* ESPELHAMENTO HORIZONTAL (Mirror X) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMirroredX(!isMirroredX);
                }}
                className={`px-3 py-2 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer min-h-[42px] ${
                  isMirroredX
                    ? 'bg-amber-400 text-black border-amber-400 font-bold'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700'
                }`}
                title="Espelhar texto horizontalmente para vidro refletor (M)"
              >
                <FlipHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Espelho (M)</span>
              </button>

              {/* COR DO TEXTO */}
              <div className="flex items-center gap-1 px-1">
                {[
                  { hex: '#FFFFFF', title: 'Branco' },
                  { hex: '#FACC15', title: 'Amarelo' },
                  { hex: '#4ADE80', title: 'Verde' }
                ].map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTextColor(c.hex);
                    }}
                    title={c.title}
                    className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer ${
                      textColor === c.hex ? 'border-white scale-110' : 'border-neutral-700 opacity-60'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>

              {/* GUIA DE LEITURA (Eye Guide) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEyeGuide(!showEyeGuide);
                }}
                className={`p-2 rounded-full border transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center ${
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
                <kbd className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 font-mono text-xs text-amber-300">Espaço ou Toque</kbd>
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
                  100% autossuficiente (HTML + CSS + JS embutidos), pronto para rodar offline no desktop, celular ou iPad.
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
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 flex items-center gap-1.5 transition-colors cursor-pointer"
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
                    className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
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
              <span>Arquivo: teleprompter.html (~13 KB)</span>
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors cursor-pointer"
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

(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector("#theme-toggle");
  const themeColor = document.querySelector("#theme-color");
  const progressBar = document.querySelector(".reading-progress span");
  const chapters = [...document.querySelectorAll("[data-chapter]")];
  const chapterLinks = [...document.querySelectorAll("[data-chapter-link]")];
  const broadcastDemo = document.querySelector("#broadcast-demo");
  const broadcastButton = document.querySelector("#broadcast-button");
  const broadcastPreview = document.querySelector("#broadcast-preview");
  const broadcastStatus = document.querySelector("#broadcast-status");
  const broadcastSpeech = document.querySelector("#broadcast-speech");
  const voiceMeterFill = document.querySelector("#voice-meter-fill");
  const flockCount = document.querySelector("#flock-count");

  const createIcons = () => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  const renderThemeControl = () => {
    if (!themeToggle) return;

    const isDark = root.dataset.theme !== "light";
    themeToggle.setAttribute("aria-checked", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "切换为浅色主题" : "切换为深色主题",
    );
    themeToggle.innerHTML = `<i data-lucide="${isDark ? "sun" : "moon"}" aria-hidden="true"></i>`;

    if (themeColor) {
      themeColor.setAttribute("content", isDark ? "#0c0f0e" : "#f1eee7");
    }

    createIcons();
  };

  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = nextTheme;

    try {
      localStorage.setItem("story-theme", nextTheme);
    } catch (error) {
      // The theme still works when storage is unavailable.
    }

    renderThemeControl();
  });

  let scrollTicking = false;

  const updateActiveChapter = () => {
    if (!chapters.length) return;

    const readingLine = Math.min(window.innerHeight * 0.42, 360);
    let activeChapter = chapters[0];

    chapters.forEach((chapter) => {
      if (chapter.getBoundingClientRect().top <= readingLine) {
        activeChapter = chapter;
      }
    });

    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 8
    ) {
      activeChapter = chapters.at(-1);
    }

    chapterLinks.forEach((link) => {
      const isActive = link.dataset.chapterLink === activeChapter.id;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const updateReadingProgress = () => {
    if (!progressBar) return;

    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    updateActiveChapter();
    scrollTicking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (scrollTicking) return;
      scrollTicking = true;
      window.requestAnimationFrame(updateReadingProgress);
    },
    { passive: true },
  );

  window.addEventListener("resize", updateReadingProgress);

  let mediaStream;
  let audioContext;
  let analyser;
  let microphoneSource;
  let voiceFrame;
  let listeningTimer;
  let isListening = false;
  let peakLevel = 0;
  let voicedFrames = 0;
  const arrivalTimers = [];

  const setBroadcastLabel = (text) => {
    const label = broadcastButton?.querySelector("span");
    if (label) label.textContent = text;
  };

  const setVoiceLevel = (level) => {
    if (!voiceMeterFill) return;
    voiceMeterFill.style.setProperty(
      "--voice-level",
      String(Math.min(1, Math.max(0.04, level))),
    );
  };

  const clearArrivalTimers = () => {
    arrivalTimers.splice(0).forEach((timer) => window.clearTimeout(timer));
  };

  const resetFlock = () => {
    clearArrivalTimers();
    broadcastDemo?.classList.remove("is-active");
    if (flockCount) flockCount.textContent = "0 / 8";
  };

  const stopMicrophone = () => {
    isListening = false;
    window.cancelAnimationFrame(voiceFrame);
    window.clearTimeout(listeningTimer);
    voiceFrame = undefined;
    listeningTimer = undefined;

    microphoneSource?.disconnect();
    microphoneSource = undefined;
    analyser = undefined;

    mediaStream?.getTracks().forEach((track) => track.stop());
    mediaStream = undefined;

    const contextToClose = audioContext;
    audioContext = undefined;
    if (contextToClose && contextToClose.state !== "closed") {
      contextToClose.close().catch(() => {});
    }

    broadcastDemo?.classList.remove("is-listening");
    broadcastButton?.setAttribute("aria-pressed", "false");
    if (broadcastButton) broadcastButton.disabled = false;
    if (broadcastPreview) broadcastPreview.disabled = false;
    setVoiceLevel(0.04);
  };

  const runBroadcast = (source) => {
    stopMicrophone();
    resetFlock();
    if (!broadcastDemo || !broadcastStatus) return;

    void broadcastDemo.offsetWidth;
    broadcastDemo.classList.add("is-active");
    if (broadcastSpeech) broadcastSpeech.textContent = "回羊圈啦";
    setBroadcastLabel("再喊一次");
    broadcastStatus.textContent =
      source === "voice"
        ? "听见了。广播信号发出，羊群开始往羊圈走。"
        : "演示开始：广播信号发出，羊群开始往羊圈走。";

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      if (flockCount) flockCount.textContent = "8 / 8";
      broadcastStatus.textContent = "八只小羊都进羊圈了。";
      return;
    }

    for (let index = 1; index <= 8; index += 1) {
      const timer = window.setTimeout(
        () => {
          if (flockCount) flockCount.textContent = `${index} / 8`;
          if (index === 8) {
            broadcastStatus.textContent = "八只小羊都进羊圈了。";
          }
        },
        2050 + (index - 1) * 100,
      );
      arrivalTimers.push(timer);
    }
  };

  const finishListening = (heardVoice = peakLevel >= 0.028) => {
    stopMicrophone();

    if (heardVoice) {
      runBroadcast("voice");
      return;
    }

    setBroadcastLabel("再试一次");
    if (broadcastStatus) {
      broadcastStatus.textContent = "我没听清，再喊大声一点。";
    }
  };

  const startListening = async () => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const canUseMicrophone =
      window.isSecureContext &&
      navigator.mediaDevices?.getUserMedia &&
      AudioContextClass;

    if (!canUseMicrophone) {
      setBroadcastLabel("麦克风不可用");
      if (broadcastStatus) {
        broadcastStatus.textContent = "当前浏览器不能使用麦克风，请点播放键查看演示。";
      }
      return;
    }

    resetFlock();
    peakLevel = 0;
    voicedFrames = 0;
    setBroadcastLabel("正在开启");
    if (broadcastStatus) broadcastStatus.textContent = "正在开启麦克风。";
    if (broadcastButton) broadcastButton.disabled = true;
    if (broadcastPreview) broadcastPreview.disabled = true;

    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          autoGainControl: true,
          echoCancellation: true,
          noiseSuppression: true,
        },
        video: false,
      });

      audioContext = new AudioContextClass();
      await audioContext.resume();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.72;
      microphoneSource = audioContext.createMediaStreamSource(mediaStream);
      microphoneSource.connect(analyser);

      const samples = new Float32Array(analyser.fftSize);
      const startedAt = performance.now();
      isListening = true;
      broadcastDemo?.classList.add("is-listening");
      broadcastButton?.setAttribute("aria-pressed", "true");
      if (broadcastButton) broadcastButton.disabled = false;
      if (broadcastPreview) broadcastPreview.disabled = false;
      setBroadcastLabel("结束喊话");
      if (broadcastStatus) broadcastStatus.textContent = "正在听。";

      const readVoice = () => {
        if (!isListening || !analyser) return;

        analyser.getFloatTimeDomainData(samples);
        let energy = 0;
        for (const sample of samples) energy += sample * sample;
        const rms = Math.sqrt(energy / samples.length);
        peakLevel = Math.max(peakLevel, rms);
        setVoiceLevel(rms / 0.11);

        if (performance.now() - startedAt > 220 && rms > 0.035) {
          voicedFrames += 1;
        } else {
          voicedFrames = Math.max(0, voicedFrames - 1);
        }

        if (voicedFrames >= 4) {
          finishListening(true);
          return;
        }

        voiceFrame = window.requestAnimationFrame(readVoice);
      };

      readVoice();
      listeningTimer = window.setTimeout(() => finishListening(), 10000);
    } catch (error) {
      stopMicrophone();
      setBroadcastLabel("重试麦克风");
      if (broadcastStatus) {
        broadcastStatus.textContent =
          error?.name === "NotAllowedError"
            ? "没有获得麦克风权限，请点播放键查看演示。"
            : "麦克风暂时不可用，请点播放键查看演示。";
      }
    }
  };

  broadcastButton?.addEventListener("click", () => {
    if (isListening) {
      finishListening();
      return;
    }
    startListening();
  });

  broadcastPreview?.addEventListener("click", () => {
    runBroadcast("preview");
  });

  window.addEventListener("pagehide", stopMicrophone);

  renderThemeControl();
  updateReadingProgress();
})();

document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("loaded");

  const toggleDarkModeBtn = document.getElementById("toggle-dark-mode");

  function updateButtonText() {
    if (document.body.classList.contains("dark-mode")) {
      toggleDarkModeBtn.textContent = "☀️ Alternar Modo Claro";
    } else {
      toggleDarkModeBtn.textContent = "🌙 Alternar Modo Escuro";
    }
  }

  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }

  updateButtonText();

  toggleDarkModeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    updateButtonText();
  });

  const chatButton = document.getElementById("chatButton");
  const chatWindow = document.getElementById("chatWindow");
  const chatMessages = document.getElementById("chatMessages");

chatButton.addEventListener("click", function () {
  if (chatWindow.style.display === "flex") {
    chatWindow.style.display = "none";
  } else {
    chatWindow.style.display = "flex";
  }
});


  window.fillSuggestion = function (text) {
    addMessage("user", text);
    setTimeout(() => addMessage("bot", getBotResponse(text)), 500);
  };

  function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.className = sender;
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getBotResponse(input) {
    const responses = {
      'divulgar minha loja': 'Para impulsionar a divulgação da sua loja, utilize o formulário disponível na seção "Contato" do nosso menu para nos enviar as informações relevantes.',
      'enviar meu currículo': 'Para enviar seu currículo, acesse nosso portal de vagas: https://seusite.com/vagas',
      'currículo': 'Você pode enviar seu currículo para: recrutamento@seusite.com',
      'preço': 'Nossos planos começam a partir de R$ 49,90/mês.',
      'suporte': 'Nosso suporte está disponível por e-mail: suporte@seusite.com',
      'preciso de suporte': 'Nosso suporte está disponível por e-mail: suporte@seusite.com',
    };

    const cleanedInput = input.toLowerCase();

    for (const key in responses) {
      if (cleanedInput.includes(key)) {
        return responses[key];
      }
    }
    return "Desculpe, não entendi. Pode tentar outra pergunta?";
  }

  // ========== Funções do pop-up das lojas ==========
  let slideIndex = 0;
  let slideInterval;

  window.abrirPopup = function (titulo, info, imagens) {
    const popup = document.getElementById("popup");
    document.getElementById("popup-title").innerHTML = titulo;
    document.getElementById("popup-info").innerHTML = info;

    const slideshow = document.getElementById("popup-slideshow");
    slideshow.innerHTML = '';

    imagens.forEach((img, index) => {
      const image = document.createElement("img");
      image.src = img;
      image.className = index === 0 ? "active" : "";
      slideshow.appendChild(image);
    });

    slideIndex = 0;
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      const images = slideshow.querySelectorAll("img");
      images.forEach(img => img.classList.remove("active"));
      slideIndex = (slideIndex + 1) % images.length;
      images[slideIndex].classList.add("active");
    }, 3000);

    popup.style.display = "block";
  };

  window.fecharPopup = function () {
    document.getElementById("popup").style.display = "none";
    clearInterval(slideInterval);
  };

  // === Transição suave ao clicar em links internos ===
  document.addEventListener("click", function (e) {
    const link = e.target.closest("a");
    if (
      link &&
      link.href &&
      !link.target &&
      !link.href.startsWith("mailto:") &&
      link.origin === window.location.origin
    ) {
      e.preventDefault();
      document.body.classList.remove("loaded");
      setTimeout(() => {
        window.location.href = link.href;
      }, 400);
    }
  });

});

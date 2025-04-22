document.addEventListener("DOMContentLoaded", function () {
  // Array de imagens do portfólio com diferentes proporções
  const portfolioImages = [
    {
      src: "images/works/banner-loja-pet-comprar-agora-cachorro.png",
      alt: "Banner promocional para loja pet com cachorro",
      description: "Banner de call-to-action 'Comprar Agora' para loja pet, versão com cachorro",
      width: 1200,
      height: 628
    },
    {
      src: "images/works/banner-loja-pet-comprar-agora-gato.png",
      alt: "Banner promocional para loja pet com gato",
      description: "Banner de call-to-action 'Comprar Agora' para loja pet, versão com gato",
      width: 1200,
      height: 628
    },
    {
      src: "images/works/banner-loja-pet-desconto-desktop.png",
      alt: "Banner de desconto para loja pet, versão desktop",
      description: "Banner promocional de desconto para loja pet, formato desktop",
      width: 1200,
      height: 628
    },
    {
      src: "images/works/banner-loja-pet-desconto-celular.png",
      alt: "Banner de desconto para loja pet, versão mobile",
      description: "Banner promocional de desconto para loja pet, otimizado para dispositivos móveis",
      width: 600,
      height: 900
    },
    {
      src: "images/works/banner-loja-pet-frete-desktop.png",
      alt: "Banner de frete grátis para loja pet, versão desktop",
      description: "Banner promocional de frete grátis para loja pet, formato desktop",
      width: 1200,
      height: 628
    },
    {
      src: "images/works/banner-loja-pet-frete-celular.png",
      alt: "Banner de frete grátis para loja pet, versão mobile",
      description: "Banner promocional de frete grátis para loja pet, otimizado para dispositivos móveis",
      width: 600,
      height: 900
    },
    {
      src: "images/works/banner-desconto-desktop.png",
      alt: "Banner promocional de desconto, versão desktop",
      description: "Banner de campanha de desconto para e-commerce, formato desktop",
      width: 1200,
      height: 628
    },
    {
      src: "images/works/banner-desconto-celular.png",
      alt: "Banner promocional de desconto, versão mobile",
      description: "Banner de campanha de desconto para e-commerce, otimizado para dispositivos móveis",
      width: 600,
      height: 900
    },
    {
      src: "images/works/banner-frete-desktop.png",
      alt: "Banner de frete grátis, versão desktop",
      description: "Banner promocional de frete grátis para e-commerce, formato desktop",
      width: 1200,
      height: 628
    },
    {
      src: "images/works/banner-frete-celular.png",
      alt: "Banner de frete grátis, versão mobile",
      description: "Banner promocional de frete grátis para e-commerce, otimizado para dispositivos móveis",
      width: 600,
      height: 900
    }
  ]

  // Referência à galeria
  const gallery = document.getElementById("gallery")

  // Variável para acompanhar a imagem atual no modal
  let currentImageIndex = 0

  // Função para determinar proporção da imagem
  function determineImageType(width, height) {
    const ratio = width / height
    const result = {
      isWide: false,
      isTall: false
    }

    // Se a proporção é maior que 1.3, considere larga
    if (ratio > 1.3) {
      result.isWide = true
    }

    // Se a proporção é menor que 0.8, considere alta
    if (ratio < 0.8) {
      result.isTall = true
    }

    return result
  }

  // Função para embaralhar array (para evitar agrupamento de imagens similares)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  // Embaralha o array de imagens para melhor distribuição visual
  shuffleArray(portfolioImages)

  // Organiza as imagens para distribuir melhor as proporções
  function organizeImages(images) {
    // Separar imagens por tipo
    const tall = images.filter((img) => determineImageType(img.width, img.height).isTall)
    const wide = images.filter((img) => determineImageType(img.width, img.height).isWide)
    const square = images.filter((img) => {
      const type = determineImageType(img.width, img.height)
      return !type.isTall && !type.isWide
    })

    // Organizar para que uma coluna não tenha muitas imagens altas seguidas
    const organized = []
    // Primeiro algumas imagens largas e quadradas para estabelecer um bom começo
    const starters = [...wide.splice(0, 2), ...square.splice(0, 2)]
    shuffleArray(starters)
    organized.push(...starters)

    // Depois alternamos entre altas, largas e quadradas para equilíbrio
    while (tall.length || wide.length || square.length) {
      if (tall.length) organized.push(tall.shift())
      if (wide.length) organized.push(wide.shift())
      if (square.length) organized.push(square.shift())
    }

    return organized
  }

  // Organiza as imagens para melhor distribuição visual
  const organizedImages = organizeImages(portfolioImages)

  // Populando a galeria com as imagens
  organizedImages.forEach((image, index) => {
    const item = document.createElement("div")
    item.className = "gallery-item"

    // Determina a proporção da imagem automaticamente
    const imageType = determineImageType(image.width, image.height)

    // Adicionando classes para diferentes proporções
    if (imageType.isWide) item.classList.add("wide")
    if (imageType.isTall) item.classList.add("tall")

    const img = document.createElement("img")

    // Evento para quando a imagem terminar de carregar
    img.addEventListener("load", function () {
      // Adiciona a classe que remove o spinner de carregamento
      item.classList.add("loaded")
    })

    // Define os atributos da imagem
    img.src = image.src
    img.alt = image.alt
    img.title = image.description

    // Adiciona o atributo loading="lazy" para melhor performance
    img.setAttribute("loading", "lazy")

    // Adiciona dados de proporção como atributos no HTML para uso futuro
    img.setAttribute("data-width", image.width)
    img.setAttribute("data-height", image.height)
    img.setAttribute("data-index", index)

    item.appendChild(img)
    item.setAttribute("title", image.description)
    gallery.appendChild(item)

    // Adicionando evento de clique para abrir o modal
    item.addEventListener("click", function () {
      currentImageIndex = index
      openModal(image.src, image.alt, image.description)
    })
  })

  // Modal
  const modal = document.getElementById("modal")
  const modalImg = document.getElementById("modal-img")
  const closeBtn = document.querySelector(".close")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")

  // Função para abrir o modal
  function openModal(src, alt, description) {
    modal.style.display = "block"
    modalImg.src = src
    modalImg.alt = alt
    modalImg.title = description

    // Adiciona uma descrição ao modal se necessário
    const existingDesc = modal.querySelector(".modal-description")
    if (existingDesc) {
      existingDesc.textContent = description
    } else if (description) {
      const desc = document.createElement("div")
      desc.className = "modal-description"
      desc.textContent = description
      modal.querySelector(".modal-content").appendChild(desc)
    }

    // Atualiza visibilidade dos botões de navegação
    updateNavigationButtons()
  }

  // Função para atualizar a visibilidade dos botões de navegação
  function updateNavigationButtons() {
    // Se estiver na primeira imagem, esconde o botão anterior
    if (currentImageIndex === 0) {
      prevBtn.style.visibility = "hidden"
    } else {
      prevBtn.style.visibility = "visible"
    }

    // Se estiver na última imagem, esconde o botão próximo
    if (currentImageIndex === portfolioImages.length - 1) {
      nextBtn.style.visibility = "hidden"
    } else {
      nextBtn.style.visibility = "visible"
    }
  }

  // Função para navegar para a imagem anterior
  function showPreviousImage() {
    if (currentImageIndex > 0) {
      currentImageIndex--
      const image = portfolioImages[currentImageIndex]
      openModal(image.src, image.alt, image.description)
    }
  }

  // Função para navegar para a próxima imagem
  function showNextImage() {
    if (currentImageIndex < portfolioImages.length - 1) {
      currentImageIndex++
      const image = portfolioImages[currentImageIndex]
      openModal(image.src, image.alt, image.description)
    }
  }

  // Adiciona event listeners para os botões de navegação
  prevBtn.addEventListener("click", showPreviousImage)
  nextBtn.addEventListener("click", showNextImage)

  // Navegação por teclado
  window.addEventListener("keydown", function (event) {
    if (modal.style.display === "block") {
      if (event.key === "ArrowLeft") {
        showPreviousImage()
      } else if (event.key === "ArrowRight") {
        showNextImage()
      } else if (event.key === "Escape") {
        closeModal()
      }
    }
  })

  // Fechar o modal ao clicar no botão fechar
  closeBtn.addEventListener("click", function () {
    closeModal()
  })

  // Fechar o modal ao clicar fora da imagem
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal()
    }
  })

  // Função para fechar o modal
  function closeModal() {
    modal.style.display = "none"
    const description = modal.querySelector(".modal-description")
    if (description) {
      description.remove()
    }
  }

  // Botão de contato
  const contactBtn = document.querySelector(".contact-btn")
  contactBtn.addEventListener("click", function () {
    alert("Entre em contato pelo email: designer@exemplo.com.br")
  })

  // Animação suave de rolagem para os links de navegação
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: "smooth"
      })
    })
  })

  // Função para otimizar layout da galeria em diferentes tamanhos de tela
  function optimizeGalleryLayout() {
    const viewportWidth = window.innerWidth
    const galleryItems = document.querySelectorAll(".gallery-item")

    galleryItems.forEach((item) => {
      // Em telas menores, remover classes 'wide' para evitar problemas de layout
      if (viewportWidth < 768) {
        item.classList.remove("wide")
      }
    })
  }

  // Otimizar layout inicial
  optimizeGalleryLayout()

  // Reotimizar ao redimensionar tela
  window.addEventListener("resize", optimizeGalleryLayout)
})


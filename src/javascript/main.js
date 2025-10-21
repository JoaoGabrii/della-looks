//slide passa sozinho
const slidesItems = document.querySelector('.hero__content__items')
const slidesItem = document.querySelectorAll('.hero__content__items__item')
let currentIndex = 0
const radio = document.querySelectorAll('.hero__content__radios__radio')

function showNextSlide() {



    const viewportWidth = slidesItem[0].clientWidth //largura da página em tempo real

    currentIndex++; // adiciona + 1 na variavel a cada vez que passa

    if (currentIndex >= slidesItem.length) {
        currentIndex = 0; // transforma a variavel em 0, assim que chega no limite do length
    }

    const offset = -currentIndex * viewportWidth; // alterar para a largura da página em tempo real

    slidesItems.style.transform = `translateX(${offset}px)`;
    
}

setInterval(showNextSlide, 5000)







// navegação acompanha a rolagem da página. melhorar (adicionar uma variavel que junta altura do cabeçalho + altura do hero e jogar essa variavel ao invés da soma dos dois.)
const navbar = document.querySelector('#navbar')

window.addEventListener("scroll", () => {
    if (window.scrollY > 459) {
        navbar.classList.add('fixed')
    } else {
        navbar.classList.remove('fixed')
    }
})






// botões navegação escolha de roupa
const buttonsNavegacao = document.querySelectorAll('[data-target]')

buttonsNavegacao.forEach(buttonNavegacao => {
    buttonNavegacao.addEventListener('click', () => {

        const targetSelector = buttonNavegacao.getAttribute('data-target'); // resgata e guarda o nome do data-target= "#...", no caso ("#roupas-lista")
        const listaOpcoes = document.querySelector(targetSelector); // seleciona e guarda o resultado de targetSelector ("#roupas-lista") selecionando o id do ul para adicionar a classe lista-is--active
        const listaUl = document.querySelectorAll('.lista') // seleciona todos elementos que contém lista na classe (4ul)

        listaUl.forEach(l => {
            if (listaOpcoes === l) {
                if (l.classList.contains('lista-is--active')) {
                    l.classList.remove('lista-is--active')
                } else {
                    l.classList.add('lista-is--active')
                }
            }
        })
    })
})






// botão mostra a categoria de roupa selecionada
const buttonsLista = document.querySelectorAll('[data-tab-button]');

for (let i = 0; i < buttonsLista.length; i++) {

    buttonsLista[i].addEventListener('click', function (buttonLista) {

        const categoriaAlvo = buttonLista.target.dataset.tabButton

        const categoria = document.querySelector(`[data-tab-id=${categoriaAlvo}]`)

        escondeTodasAbas()

        categoria.classList.add('roupa--is-active')

        const listaUl = document.querySelectorAll('.lista')

        listaUl.forEach(l => {
            l.classList.remove('lista-is--active')
        })
    })
}

function escondeTodasAbas() {
    const tabsContainer = document.querySelectorAll('[data-tab-id]');

    for (let i = 0; i < tabsContainer.length; i++) {
        tabsContainer[i].classList.remove('roupa--is-active')
    }
}



// mobile 

//abrir e fechar menu

// mobile — abrir e fechar menu
const openButton = document.querySelector('.hamburguer');
const closeButton = document.querySelector('.button-fechar');
const menuAberto = document.querySelector('.navbar__nav__toggle');

// abrir o menu
openButton.addEventListener('click', () => {
  menuAberto.classList.add('navbar__nav__toggle--is-active');
});

// fechar o menu
closeButton.addEventListener('click', () => {
  menuAberto.classList.remove('navbar__nav__toggle--is-active');
});
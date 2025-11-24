document.addEventListener('DOMContentLoaded', () => {

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



    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('images--troca')) {

            const item = e.target.closest('.roupa__items__item');

            const imgDefault = item.querySelector('.roupa__items__item__imagem__img-default');
            const imgHover = item.querySelector('.roupa__items__item__imagem__img-hover');

            imgHover.classList.toggle('roupa__items__item__imagem__img-hover--desactive');
        }
    });


    // navegação acompanha a rolagem da página. melhorar
    const navbar = document.querySelector('#navbar')

    const alturaMenu = document.querySelector('.menu')
    const alturaHero = document.querySelector('.hero')

    const alturaMenuLimite = alturaMenu.offsetHeight
    const alturaHeroLimite = alturaHero.offsetHeight

    const menuHero = alturaMenuLimite

    window.addEventListener("scroll", () => {
        if (window.scrollY > menuHero) {
            navbar.classList.add('fixed')
        } else {
            navbar.classList.remove('fixed')
        }
    })



    //menu rola até blog ou sobre

    const buttonsBlog = document.querySelectorAll('.buttonBlogMenu')
    const blogDestino = document.querySelector('.blog')

    buttonsBlog.forEach(buttonBlog => {
        buttonBlog.addEventListener('click', () => {
            blogDestino.scrollIntoView({
                behavior: "smooth"
            })

        })
    })


    // botões navegação escolha de roupa
    const buttonsNavegacao = document.querySelectorAll('[data-target]')

    buttonsNavegacao.forEach(buttonNavegacao => {
        buttonNavegacao.addEventListener('click', () => {

            const targetSelector = buttonNavegacao.getAttribute('data-target'); // resgata e guarda o nome do data-target= "#...", no caso ("#roupas-lista")
            const listaOpcoes = document.querySelector(targetSelector); // seleciona e guarda o resultado de targetSelector ("#roupas-lista") selecionando o id do ul para adicionar a classe lista-is--active
            const listaUl = document.querySelectorAll('.lista') // seleciona todos elementos que contém lista na classe (4ul)

            const isActive = listaOpcoes.classList.contains('lista-is--active')

            listaUl.forEach(l => l.classList.remove('lista-is--active'))

            if (!isActive) {
                listaOpcoes.classList.toggle('lista-is--active')
            }
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







    //teste subir images polo json

    async function carregarCategoria(categoria) {
        const req = await fetch('/data/produtos.json');
        const data = await req.json();

        const produtos = data[categoria];

        // seleciona o UL dentro da aba específica
        const ul = document.querySelector(`[data-tab-id="${categoria}"] .roupa__items`);

        if (!ul) {
            console.error("UL da categoria não encontrado:", categoria);
            return;
        }

        ul.innerHTML = '';

        produtos.forEach(prod => {
            ul.innerHTML += criarItem(prod);
        });
    }




    function criarItem(prod) {
        return `
    <li class="roupa__items__item">
      <img class="images--troca roupa__items__item__imagem__img-default" 
           src="${prod.imgDefault}" 
           alt="${prod.nome}" />

      <img class="images--troca roupa__items__item__imagem__img-hover roupa__items__item__imagem__img-hover--desactive" 
           src="${prod.imgHover}" 
           alt="${prod.nome}" />

      <h3>${prod.nome}</h3>

      <div class="roupa__items__item__div">
        <span class="roupa__items__item__div__preco">R$${prod.preco}</span>
        <span class="roupa__items__item__div__parcela">${prod.parcela}</span>
      </div>

      <a target="_blank" href="${prod.link}">Compre agora</a>
    </li>
  `;
    }

    carregarCategoria("vestidos");
    carregarCategoria("calcas");



    //mostra 2º imagem da roupa ao clicar




})
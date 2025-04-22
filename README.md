# Portfólio para Designer

Este é um site de portfólio simples para designers que trabalham com arte digital em canvas. O site foi desenvolvido usando apenas HTML, CSS e JavaScript puro, sem dependências externas.

## Características

- Design responsivo que se adapta a diferentes tamanhos de tela
- Galeria de imagens que suporta diferentes proporções (horizontais, verticais e quadradas)
- Modal para visualização ampliada das imagens com navegação entre elas
- Rolagem suave para navegação entre seções
- Layout moderno e minimalista

## Como utilizar

1. Clone este repositório
2. Substitua as imagens de placeholder na pasta `images/` por suas próprias criações
3. Edite o arquivo `script.js` para atualizar o array `portfolioImages` com informações sobre suas imagens:
   - `src`: caminho para sua imagem
   - `alt`: texto alternativo descritivo
   - `description`: descrição do trabalho
   - `width`: largura da imagem em pixels
   - `height`: altura da imagem em pixels

O sistema determinará automaticamente se a imagem deve ser exibida como larga ou alta com base nas proporções.

## Personalizando

Você pode personalizar este portfólio alterando:

- As cores e fontes no arquivo `styles.css`
- O conteúdo das seções no arquivo `index.html`
- As informações de contato no arquivo `script.js`

## Estrutura de arquivos

```
portfolio/
│
├── index.html          # Estrutura da página
├── styles.css          # Estilos do site
├── script.js           # Lógica da galeria e interações
├── images/             # Pasta para suas imagens
│   └── (suas imagens)  # Adicione suas imagens aqui
└── README.md           # Este arquivo
```

## Adicionando suas próprias imagens

Para adicionar suas próprias imagens ao portfólio:

1. Coloque suas imagens na pasta `images/`
2. Edite o array `portfolioImages` no arquivo `script.js`
3. Para cada imagem, defina:
   - O caminho correto (`src`)
   - Um texto alternativo (`alt`)
   - Uma descrição do trabalho (`description`)
   - A largura da imagem (`width`)
   - A altura da imagem (`height`)

Exemplo:

```javascript
{
    src: 'images/minha-arte.jpg',
    alt: 'Minha Arte Digital',
    description: 'Projeto de design digital criado em canvas',
    width: 800,
    height: 600
}
```

## Suporte para visualização

O portfólio inclui:

- Modal para visualização ampliada das imagens
- Navegação entre imagens usando botões ou teclado (setas esquerda/direita)
- Visualização responsiva que se adapta a diferentes dispositivos
- Exibição de descrições ao passar o mouse sobre as imagens

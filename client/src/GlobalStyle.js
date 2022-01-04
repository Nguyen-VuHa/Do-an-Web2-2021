import { createGlobalStyle } from 'styled-components';
import { BlueGray, GrayWhite } from 'src/contants/cssContants';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@100;200;300;400;500;600;700;800;900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Encode+Sans+SC:wght@300&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Baloo+Tammudu+2:wght@400;500;600;700;800&display=swap');
    
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: ${BlueGray};
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
    }

    a {
        text-decoration: none;
    }

    img {
        user-select: none;
    }

    ::-webkit-scrollbar {
        background-color: ${BlueGray};
        width: 0.8rem;
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${GrayWhite};
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: ${GrayWhite};
    }
    ::-webkit-scrollbar-thumb:active {
        background-color: ${GrayWhite};
    }

    @keyframes floating {
        0% {
            transform: translate(0%, 0%);
            filter: hue-rotate(0deg);
        }
        65% {
            transform: translate(0%, 20%);
        }
        100% {
            transform: translate(0%, 0%);
            filter: hue-rotate(360deg);
        }
    }
`;

export default GlobalStyle;
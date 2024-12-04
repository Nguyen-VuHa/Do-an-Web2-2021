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
        
    @keyframes shimmer {
        100% {
            transform: translateX(100%);
        }
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

    @keyframes animateLeft {
        0% {
            left: -10%;
            filter: hue-rotate(0deg);
        }
        5% {
            left: 0%;
        }
        10% {
            width: 10%;
        }
        20% {
            width: 15%;
        }
        30% {
            width: 20%;
        }
        40% {
            width: 25%;
        }
        50% {
            width: 30%;
        }
        60% {
            // left: 45%;
        }
        100% {
            width: 50%;
            left: 100%;
            filter: hue-rotate(360deg);
        }
    }

    @keyframes animateRight {
        0% {
            right: -10%;
        }
        5% {
            right: 0%;
        }
        10% {
            right: 10%;
        }
        20% {
            right: 15%;
        }
        30% {
            right: 20%;
        }
        40% {
            right: 25%;
        }
        50% {
            right: 30%;
        }
        100% {
            width: 60%;
            right: 100%;
        }
    }

    
    @keyframes circular {
        0% {
            transform: rotate(0deg);
            filter: hue-rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
            filter: hue-rotate(360deg);
        }
    }

    @keyframes animate {
        0% {
            filter: hue-rotate(0deg);
        }
        100% {
            filter: hue-rotate(360deg);
        }
    }
`;

export default GlobalStyle;
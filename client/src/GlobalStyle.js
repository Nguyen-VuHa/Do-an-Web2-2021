import { createGlobalStyle } from 'styled-components';
import { BlueGray, GrayWhite, YellowGray } from 'src/contants/cssContants';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Encode+Sans+SC:wght@300&display=swap');
    
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

    ::-webkit-scrollbar {
        background-color: #1d2f58;
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
`;

export default GlobalStyle;
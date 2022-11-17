import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

window.gmShop = {
  ThemeAppExtension: class ThemeAppExtension {
    private arguments;

    constructor(args: any) {
      this.arguments = args;
    }

    mount() {
      const container = document.getElementById(this.arguments.containerId);
      if (!container) return;

      const root = ReactDOM.createRoot(container as HTMLElement);
      root.render(
        <React.StrictMode>
          <App serverArguments={this.arguments} />
        </React.StrictMode>,
      );
    }
  },
};

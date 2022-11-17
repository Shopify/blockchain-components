import './App.css';

interface AppProps {
  serverArguments?: any;
}
function App({serverArguments}: AppProps) {
  return (
    <>
      <div>The tokengate card would've been loaded here.</div>
      <div>
        <pre>${JSON.stringify(serverArguments, null, 2)}</pre>
      </div>
    </>
  );
}

export default App;

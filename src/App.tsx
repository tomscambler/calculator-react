import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import './Calculator/Calculator.css'


function evaluateCalculation(display:number, operation:string, operand:number|null):number{

  if(operand === null){
    return display;
  }
  if (operand === 0 && operation === '/'){
    alert("BEHAVE!");
    return 0;
  }
  if (operand === 0 && operation === '^' && display === 0){
    alert("BEHAVE!");
    return 0;
  }
  switch(operation){

    case '+':
      return display + operand;
      break;
    case '-':
      return display - operand;
      break;
    case '*':
      return display * operand;
      break;
    case '/':
      return display / operand;
      break;
    case '^':
      return Math.pow(display,operand);
      break;
    case '=':
      return display;
      break;
    default:
      return operand;
  }
}

function App() {

  const [display,   setDisplay  ] = useState<number>     (0 );
  const [operand,   setOperand  ] = useState<number|null>(null);
  const [operation, setOperation] = useState<string>     ('');

  const numberSymbols    = [1,2,3,4,5,6,7,8,9,0];
  const operationSymbols = ['+','-','*','/','^'];
  const powerSymbols     = ['=','C','AC','Del'];

  return (
    <div className="calculator">

      <div className="displayViewer">
        {display}
      </div>

      <div className="operationViewer">
        {operation}
      </div>

      <div className="operandViewer">
        {operand}
      </div>

      <div>
        {numberSymbols.map( numberSymbol => (
            <button className="numberButton" onClick={ () => {
              setOperand( (operand===null?0:operand)*10 + numberSymbol )
              }}>
                {numberSymbol}
            </button>
            )
        )}
      </div>

      <div>
        {operationSymbols.map( operationSymbol => (

            <button className="operationButton" onClick={ () => {
                setDisplay(evaluateCalculation(display,operation,operand));
                setOperation(operationSymbol);
                setOperand(null);
              }
            }>

              {operationSymbol}

            </button>
          )
        )}
      </div>

      <div>
        {powerSymbols.map( powerSymbol => (

            <button className="powerButton" onClick={ () => {
                switch(powerSymbol){
                  case  '=':
                    setDisplay(evaluateCalculation(display,operation,operand));
                    setOperation('=');
                    setOperand(null);
                    break;
                  case 'AC':
                    setOperand(null);
                    setDisplay(0);
                    setOperation('');
                    break;
                  case  'C':
                    setOperand(display);
                    setDisplay(0);
                    setOperation('');
                    break;
                  case  'Del':
                    setOperand(operand===null?null:parseFloat(operand.toString().slice(0,-1)));
                    break;
                }
              }
            }>

              {powerSymbol}

            </button>
          )
        )}
      </div>
      
    </div>

  );
}

export default App

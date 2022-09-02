import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


function unaryCalculation(display:number, unary:string){

  const PI = 3.141592653589793238462643383279502;

  if(unary==='sqrt' && display<0){
    alert("BEHAVE");
    return 0;
  }
  if(unary==='tan' && display%180===90){
    alert("Nice try, but still denied");
    return 0;
  }

  switch(unary){
    case 'sin':
      return Math.sin(2*PI*display/360);
      break;
    case 'cos':
      return Math.cos(2*PI*display/360);
      break;
    case 'tan':
      return Math.tan(2*PI*display/360);
      break;
    case 'sqrt':
      return Math.sqrt(display);
      break;
    default:
      return 0;
  }
}

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
  if (Math.floor(operand)!==operand && operation === '^' && display < 0){
    alert("SEE ME");
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
      return operand;
      break;
    default:
      return operand;
  }
}

function App() {

  const [display,   setDisplay  ] = useState <number>      ( 0  );
  const [operand,   setOperand  ] = useState <number|null> (null);
  const [operation, setOperation] = useState <string>      ( '' );
  const [ans,       setAns      ] = useState <number|null> (null);

  const numberSymbols    = [7,8,9,4,5,6,1,2,3,0     ];
  const operationSymbols = ['+','-','*','/','^'     ];
  const powerSymbols     = ['=','C','AC','Del','Ans'];
  const unarySymbols     = ['sin','cos','tan','sqrt'];

  return (
    <div className="calculator">

      <div className="viewers">

        <div className="displayViewer">
          Display: {display}
        </div>

        <div className="operationViewer">
          Operation: {operation}
        </div>

        <div className="operandViewer">
          Operand: {operand}
        </div>

        <div className="ansViewer">
          Ans: {ans}
        </div>
      </div>


      <div className="buttons">

        <div className="numberButtons">
          {numberSymbols.map( numberSymbol => (
              <button className="numberButton" onClick={ () => {
                setOperand( (operand===null?0:operand)*10 + ((operand===null?0:operand)>=0?1:-1)*numberSymbol )
                }}>
                  {numberSymbol}
              </button>
              )
          )}
        </div>


        <div className="operationButtons">
          {operationSymbols.map( operationSymbol => (
            <button className="operationButton" onClick={ () => {
                  if (operand!==null){
                    if (operation==='='){
                      setDisplay(operand);
                    }
                    else {
                      setDisplay(evaluateCalculation(display,operation,operand));
                    }
                  }
                  setOperation(operationSymbol);
                  setOperand(null);
                }
              }>
              {operationSymbol}
            </button>
            )
          )}
        </div>


        <div className="unaryButtons">
          {unarySymbols.map( unarySymbol => (
              <button className="unaryButton" onClick={ () => {
                setDisplay(unaryCalculation(display,unarySymbol));
                }}>
                  {unarySymbol}
              </button>
              )
          )}
        </div>


        <div className="powerButtons">
          {powerSymbols.map( powerSymbol => (
              <button className="powerButton" onClick={ () => {
                  switch(powerSymbol) {
                    case '=':
                      setAns(evaluateCalculation(display,operation,operand));
                      setDisplay(evaluateCalculation(display,operation,operand));
                      setOperation('=');
                      setOperand(null);
                      break;
                    case 'AC':
                      setOperand(null);
                      setDisplay(0);
                      setOperation('');
                      break;
                    case 'C':
                      setOperand(display);
                      setDisplay(0);
                      setOperation('');
                      break;
                    case 'Del':
                      setOperand(operand===null?null:parseFloat(operand.toString().slice(0,-1)));
                      break;
                    case 'Ans':
                      setOperand(ans);
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
    </div>
  );
}

export default App
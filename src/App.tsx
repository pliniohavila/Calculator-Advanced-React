import { useState, MouseEvent, KeyboardEvent, useEffect, useCallback  } from 'react'

import { Wrapper, Title, Display, ButtonsGroup, Button } from './styles/styles'

type CalcsAdvancedType = {
    [key: string]: (value: string) => number,
}

const calcsAdvanced: CalcsAdvancedType = {
    'x!': (value: string) => {
        let i, num, f;
        f = 1 
        num = Number(value)
        for (i = 1; i <= num; i++) {
            f = f*i
        }
        i = i - 1
        return f
    },
    'sin': (value: string) => {
        return Math.sin(Number(value))
    },
    'cos': (value: string) => {
        return Math.cos(Number(value))
    },
    'log': (value: string) => {
        return Math.log(Number(value))
    },
    'tan': (value: string) => {
        return Math.tan(Number(value))
    }
}

function calcWithPercentage(numberParameter1: string, operator: string, numberParameter2: string) {
    let number1 = Number(numberParameter1)
    let number2 = Number(numberParameter2)
    let returnCalc: number
    if (operator === "+" || operator === "-") {
        returnCalc =  operator == '+' ? number1 + (number1 * (number2 /100 )) : number1 - (number1 * (number2 /100 ))
    } else {
        returnCalc =  operator == '*' ? number1 * (number1 * (number2 /100 )) : number1 / (number1 * (number2 /100 ))
    }   
    return String(returnCalc)
}

function equation(toCalculate: string) {
    let match = toCalculate.match(/\*|\/|\+|\-|\^|e/gmsi) || []
    let flag = 0

    while(match.length > 0) {
        toCalculate = toCalculate.replace(/\((.*?)\)/gmsi,(_, subgroupParentheses) => {
			return String(equation(subgroupParentheses)) 
        })
        toCalculate = toCalculate.replace(/([0-9\.]+)e([0-9]+)/gmsi, (_, base, pow) => {
			return String(base * (Math.pow(10, pow)))
		})
        toCalculate = toCalculate.replace(/([0-9\.\-]+)\^([0-9\.\-]+)/gmsi, (_, number1, number2) => {
			return String(Math.pow(number1, number2))
		})
        // To calc with percentage
        toCalculate = toCalculate.replace(/([0-9\.\-]+)(\-|\+|\*|\/)([0-9\.]+(?=%))/gmsi,(_, number1, operator, number2)=>{
			return calcWithPercentage(number1, operator, number2)
		});
        toCalculate = toCalculate.replace(/([0-9\.\-]+)(\*|\/)([0-9\.\-]+)/gmsi,(_, number1, operator, number2) => {
            let returnCalc = operator == '*' ? Number(number1) * Number(number2) : Number(number1) / Number(number2)
			return String(returnCalc)
		})
        toCalculate = toCalculate.replace(/([0-9\.\-]+)(\-|\+)([0-9\.\-]+)/gmsi,(_, number1, operator, number2) => {
			let returnCalc = operator == '+' ? Number(number1) + Number(number2) : Number(number1) - Number(number2)
            return String(returnCalc)
		});

        match = toCalculate.match(/\*|\/|\+|\-|\^|e/gmsi) || []
        
        // To evite infinite loop. Execute only 50 loops while
        flag++
        if (flag >= 50) {
            return -1
        }
    }
    return toCalculate
}

function App() {
    const [input, setInput] = useState('')
    const [limitScreen, setLimitScreen] = useState(1)

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        let eventInputText = event.currentTarget.innerText

        // Clear display
        if (eventInputText === 'AC') {
            setInput('')
            setLimitScreen(1)
            return
        }

        // Limit number imputed
        if (limitScreen > 23) {
            return
        }

        if (eventInputText === 'x^y') {
            eventInputText = '^'
        }

        if (eventInputText === 'pi') {
            eventInputText = '3.14159'
        }

        if (/x!|sin|cos|log|tan|√/.test(eventInputText)) {
            let result: number = calcsAdvanced[eventInputText](input)
            if (!result) {
                setInput('Error')
            }
            setInput(String(result))
            return
        }

        // Not input , . 5 * % if no has number imputed
        if (/[,.+*%\/]/.test(eventInputText) && input.length === 0) {
            eventInputText = ''
        } 
        // Not input mores --
        else if (eventInputText === '-' && input[0] === '-' && input.length === 1){
            eventInputText = ''
        } 
        else if (eventInputText === 'CE') {
            const newInput = input.slice(0, -1) 
            setInput(newInput)
            setLimitScreen((limitScreen) => limitScreen - 1)
        }
        else if (eventInputText === '=') {
            let result  = equation(input)
            setInput(String(result))
        } 
        else {
            setInput(input + eventInputText)
            setLimitScreen((limitScreen) => limitScreen + 1)
        }
    }

    function handlerKeyPress(event: any) {
        event.preventDefault
        let eventInputKey = event.key
        
        if (eventInputKey === 'Backspace') {
            setInput((input) => input.slice(0, -1))
            setLimitScreen((limitScreen) => limitScreen - 1)
        }
        if (eventInputKey === 'Enter') {
            console.log(eventInputKey)
            console.log(equation(input))
            // let result  = equation('4*5')
            // console.log(result)
            // setInput(String(result))
            return
        }
        if (!(/[0-9]+|[,.+*%-\/]|\(|\)/.test(eventInputKey))) {
            eventInputKey = ''
        } 
        else {
            setInput((input) => input + eventInputKey)
            setLimitScreen((limitScreen) => limitScreen + 1)
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handlerKeyPress);
        return () => {
          window.removeEventListener('keydown', handlerKeyPress)
        };
      }, []);

    return (
        <Wrapper> 
                <Title>
                    Calculadora Científica
                </Title>
                <Display value={input}/>
            <ButtonsGroup>
                <div>
                    <Button onClick={handleClick} simple>CE</Button>
                    <Button onClick={handleClick}>x!</Button>
                    <Button onClick={handleClick}>(</Button>
                    <Button onClick={handleClick}>)</Button>
                    <Button onClick={handleClick}>%</Button>
                    <Button onClick={handleClick}>AC</Button>
                </div>
                <div>
                    <Button onClick={handleClick}>sin</Button>
                    <Button onClick={handleClick}>pi</Button>
                    <Button onClick={handleClick} simple>7</Button>
                    <Button onClick={handleClick} simple>8</Button>
                    <Button onClick={handleClick} simple>9</Button>
                    <Button onClick={handleClick} simple>/</Button>
                </div>
                <div>
                    <Button onClick={handleClick}>cos</Button>
                    <Button onClick={handleClick}>log</Button>
                    <Button onClick={handleClick} simple>4</Button>
                    <Button onClick={handleClick} simple>5</Button>
                    <Button onClick={handleClick} simple>6</Button>
                    <Button onClick={handleClick} simple>*</Button>
                </div>
                <div>
                    <Button onClick={handleClick}>tan</Button>
                    <Button onClick={handleClick}>√</Button>
                    <Button onClick={handleClick} simple>1</Button>
                    <Button onClick={handleClick} simple>2</Button>
                    <Button onClick={handleClick} simple>3</Button>
                    <Button onClick={handleClick} simple>-</Button>
                </div>
                <div>
                    <Button onClick={handleClick}>e</Button>
                    <Button onClick={handleClick}>x^y</Button>
                    <Button onClick={handleClick} simple>0</Button>
                    <Button onClick={handleClick} simple>.</Button>
                    <Button onClick={handleClick} simple>=</Button>
                    <Button onClick={handleClick} simple>+</Button>
                </div>
            </ButtonsGroup>
        </Wrapper>
  ) 
}

export default App

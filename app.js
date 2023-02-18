class Calculator{
    constructor(prevValue, currentValue){
        this.prevValue = prevValue
        this.currentValue = currentValue
        this.clear()
    }
    clear(){
        this.prevOperand = ''
        this.currentOperand = ''
        this.operator = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.'))return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operator){
        if(this.currentOperand === '')return
        if(this.prevOperand !== ''){
            this.compute()
        }
        this.operator = operator
        this.prevOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute(){
        let computation 
        const prev = parseFloat(this.prevOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current))return
        switch (this.operator) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default: 
                return
        }
        this.currentOperand = computation
        this.operator = undefined
        this.prevOperand = '' 

    } 
    updateDisplay(){
        this.prevValue.innerText = this.prevOperand
        this.currentValue.innerText = this.currentOperand
        if(this.operator != null){
            this.prevValue.innerText = `${this.prevOperand} ${this.operator}`
        }
        
    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const allClear = document.querySelector('[data-allclear]')
const deleteButton = document.querySelector('[data-delete]')


const prevValue = document.querySelector('[data-prevValue]')
const currentValue = document.querySelector('[data-currentValue]')



const calculator = new Calculator(prevValue, currentValue)

numberButtons.forEach((button)=>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach((button)=>{
    button.addEventListener('click', function(){
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay() 
    })
})


equalButton.addEventListener('click', function(){
        calculator.compute()
        calculator.updateDisplay()
})

allClear.addEventListener('click', function(){
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', function(){
    calculator.delete()
    calculator.updateDisplay()
})
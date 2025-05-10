import React, { useState } from 'react';
import '../App.css';

export default function Home() {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');

    const handleClick = (value) => {
        const lastChar = expression.slice(-1);

        if (expression.slice(-1) === '%' && value === '%') return;

        if (lastChar === '.' && ['+', '-', '×', '÷'].includes(value)) {
            setExpression(prev => prev + '0' + value);
            return;
        }

        if (expression.length === 0 && value === '%') return;
        if (expression.length === 0 && ['+', '×', '÷'].includes(value)) return;
        if (expression.length === 0 && value === '.') {
            setExpression('0.');
            return;
        }
        if (lastChar === '.' && value === '.') return;
        if (['+', '-', '×', '÷'].includes(lastChar) && value === '%') return;

        if (['+', '-', '×', '÷'].includes(lastChar) && value === '.') {
            setExpression(prev => prev + '0.');
            return;
        }

        if (['+', '-', '×', '÷'].includes(lastChar) && ['+', '-', '×', '÷'].includes(value)) return;

        // Auto-multiply when number followed by (
        if (value === '(' && /\d$/.test(expression)) {
            setExpression(prev => prev + '×(');
            setResult('');
            return;
        }

        setExpression(prev => prev + value);
        setResult('');
    };

    const handleCalculate = () => {
        if (expression === '') return;

        if (expression === '0÷0') {
            setResult('Khub pitbo! 😒');
            return;
        }

        if(expression === '143') {
            setResult('I Love You  🫣');
            return;
        }
        if(expression === '100') {
            setResult('Calling Police? 🙄');
            return;
        }

        try {
            let formattedExpression = expression
                .replace(/÷/g, '/')
                .replace(/×/g, '*')
                // .replace(/(\d+)%/g, '($1/100)');
                // .replace(/(\d+(\.\d+)?)%/g, '($1/100)')
                .replace(/(\([^)]+\)|\d+(\.\d+)?)%/g, '($1/100)')



            setResult(eval(formattedExpression).toString());
        } catch (error) {
            setResult('Format Error');
        }
    };

    const handleClear = () => {
        setExpression('');
        setResult('');
    };

    const handleClearOne = () => {
        setExpression(prev => prev.slice(0, -1));
        setResult('');
    };

    const handleparentheses = () => {
        const openCount = (expression.match(/\(/g) || []).length;
        const closeCount = (expression.match(/\)/g) || []).length;
        const lastChar = expression.slice(-1);

        if (
            expression === '' ||
            ['+', '-', '×', '÷', '('].includes(lastChar)
        ) {
            setExpression(prev => prev + '(');
        } else if (/\d|\)/.test(lastChar) && openCount > closeCount) {
            setExpression(prev => prev + ')');
        } else if (/\d/.test(lastChar)) {
            setExpression(prev => prev + '×(');
        } else {
            setExpression(prev => prev + '(');
        }

        setResult('');
    };

    return (
        <div className='w-screen h-screen bg-linear-to-r/hsl from-indigo-500 to-teal-400 flex justify-center items-center'>
            <div className="flex flex-col w-95 h-170 bg-black rounded-xl shadow-lg p-4">
                <div className="text-white text-left font-bold text-3xl mt-8 ml-2">The Basic Calculator</div>
                <p className='ml-4'>যোগ বিয়োগ গুন ভাগ</p>

                <input
                    type="text"
                    value={expression}
                    placeholder='0'
                    readOnly
                    className={`bg-gray-800 rounded ml-10 mr-10 mt-17 p-2 text-right ${result === 'Format Error' ? 'text-red-500' : 'text-white'} font-bold text-4xl focus:outline-none`}
                />

                <input
                    type="text"
                    value={result}
                    placeholder='উত্তর'
                    readOnly
                    className={`ml-10 mr-10 mt-5 p-2 text-right ${result === 'Format Error' ? 'text-red-500' : 'text-white'} font-bold text-3xl focus:outline-none`}
                />

                <div className="flex flex-col p-4 items-center mt-9">
                    <div className="div">
                        <button className='bg-gray-300 hover:bg-gray-200 m-2 text-black w-[70.5px] h-[40px] rounded-full active:bg-white active:rounded-2xl' onClick={handleClear}>AC</button>
                        <button className='bg-gray-300 hover:bg-gray-200 m-2 text-black w-[70.5px] h-[40px] rounded-full active:bg-white active:rounded-2xl' onClick={handleClearOne}>⌫</button>
                        <button className='bg-fuchsia-800 hover:bg-fuchsia-700 active:scale-95 transition transform duration-100 m-2 text-white w-[50.95px] h-[40px] rounded-lg' onClick={() => handleClick('÷')}>÷</button>
                        <button className='bg-fuchsia-800 hover:bg-fuchsia-700 active:scale-95 transition transform duration-100 m-2 text-white w-[50.95px] h-[40px] rounded-lg' onClick={() => handleClick('×')}>×</button>
                    </div>

                    <div className="div">
                        <button className='bg-green-800 hover:bg-green-700 m-2 text-white px-7 py-2 rounded-lg active:rounded-xl active:scale-95 transition transform duration-100' onClick={() => handleClick('7')}>7</button>
                        <button className='bg-green-800 hover:bg-green-700 m-2 text-white px-7 py-2 rounded-lg active:rounded-xl active:scale-95 transition transform duration-100' onClick={() => handleClick('8')}>8</button>
                        <button className='bg-green-800 hover:bg-green-700 m-2 text-white px-7 py-2 rounded-lg active:rounded-xl active:scale-95 transition transform duration-100' onClick={() => handleClick('9')}>9</button>
                        <button className='bg-fuchsia-800 hover:bg-fuchsia-700 active:scale-95 transition transform duration-100 m-2 text-white w-[50.95px] h-[40px] rounded-lg' onClick={() => handleClick('-')}>-</button>
                    </div>

                    <div className="div">
                        <button className='bg-green-800 hover:bg-green-700 m-2 text-white px-7 py-2 rounded-lg active:rounded-xl active:scale-95 transition transform duration-100' onClick={() => handleClick('4')}>4</button>
                        <button className='bg-green-800 hover:bg-green-700 m-2 text-white px-7 py-2 rounded-lg active:rounded-xl active:scale-95 transition transform duration-100' onClick={() => handleClick('5')}>5</button>
                        <button className='bg-green-800 hover:bg-green-700 m-2 text-white px-7 py-2 rounded-lg active:rounded-xl active:scale-95 transition transform duration-100' onClick={() => handleClick('6')}>6</button>
                        <button className='bg-fuchsia-800 hover:bg-fuchsia-700 active:scale-95 transition transform duration-100 m-2 text-white px-5 py-2 rounded-lg' onClick={() => handleClick('+')}>+</button>
                    </div>

                    <div className="div">
                        <button className='bg-green-800 hover:bg-green-700 m-2 text-white px-7 py-2 rounded-lg active:rounded-xl active:scale-95 transition transform duration-100' onClick={() => handleClick('1')}>1</button>
                        <button className='bg-green-800 hover:bg-green-700 m-2 text-white px-7 py-2 rounded-lg active:rounded-xl active:scale-95 transition transform duration-100' onClick={() => handleClick('2')}>2</button>
                        <button className='bg-green-800 hover:bg-green-700 m-2 text-white px-7 py-2 rounded-lg active:rounded-xl active:scale-95 transition transform duration-100' onClick={() => handleClick('3')}>3</button>
                        <button className='bg-fuchsia-800 hover:bg-fuchsia-700 active:scale-95 transition transform duration-100 m-2 text-white w-[50.95px] h-[40px] rounded-lg' onClick={() => handleClick('%')}>%</button>
                    </div>

                    <div className="div">
                        <button className='bg-green-800 hover:bg-green-700 m-2 text-white px-7 py-2 rounded-lg active:rounded-xl active:scale-95 transition transform duration-100' onClick={() => handleClick('0')}>0</button>
                        <button className='bg-green-800 hover:bg-green-700 m-2 text-white w-[64.63px] h-[40px] rounded-lg active:rounded-xl active:scale-95 transition transform duration-100' onClick={() => handleClick('.')}>.</button>
                        <button className='bg-green-800 hover:bg-green-700 m-2 text-white w-[64.63px] h-[40px] rounded-lg active:rounded-xl active:scale-95 transition transform duration-100' onClick={handleparentheses}>( )</button>
                        <button className='bg-blue-800 hover:bg-blue-600 m-2 text-white px-5 py-2 rounded-lg active:scale-95 transition transform duration-100' onClick={handleCalculate}>=</button>
                    </div>
                </div>
            </div>
        </div>
    );
}




const resultEl	  = document.getElementById('result');
const lengthEl 	  = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl   = document.getElementById('numbers');
const symbolsEl   = document.getElementById('symbols');
const generateEl  = document.getElementById('generate');
const clipboardEL = document.getElementById('clipboard');
		

	function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random()*26 + 65));		 	
	}			
	function getRandomLower() {				
	return String.fromCharCode(Math.floor(Math.random()*26 + 97));
	}
	function getRandomNo() {
	return Math.floor(Math.random()*10);			
	}
	function getRandomSymbol() {
	const syms = '!@#$%^&*()[]{}<>`~;:,.?/'
	return syms[Math.floor(Math.random()*syms.length)];
	}
		
	const getRandom = {
		upper : getRandomUpper,
		lower : getRandomLower,
		number : getRandomNo,
		symbol : getRandomSymbol
	}

	generateEl.addEventListener("click", function(){
			
			const conatainUpper = uppercaseEl.checked;
			const conatainLower = lowercaseEl.checked;
			const conatainNumber = numbersEl.checked;
			const conatainSymbol = symbolsEl.checked;

		resultEl.innerText = generatePass(conatainUpper,
										  conatainLower, 
										  conatainNumber,
										  conatainSymbol, 
										  lengthEl.value);		
	});

	function generatePass(upper,lower,number,symbol,length){
		let generatedPassword = '';
		const typeCount = upper+lower+number+symbol;
		if (typeCount == 0) { return '';}
			
			const typeArr = [{upper},{lower},{number},{symbol}].filter(function(item){
			return Object.values(item)[0];
		});
		
		for(let i=0; i<length; i+=typeCount){
			typeArr.forEach(function(type){
				const func = Object.keys(type)[0];
				generatedPassword += getRandom[func]();
			})
		}
		const FinalPass = generatedPassword.slice(0,length);
		return FinalPass;
	}

	clipboardEL.addEventListener("click",function(){
		const textArea = document.createElement('textarea');
		if(!resultEl.innerText){
			return;
		}
		textArea.value = resultEl.innerText;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand('copy');
		textArea.remove();
		alert('Copied!');
	})
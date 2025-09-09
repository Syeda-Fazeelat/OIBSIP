        document.addEventListener('DOMContentLoaded', function() {
            const temperatureInput = document.getElementById('temperature');
            const convertBtn = document.getElementById('convert-btn');
            const resultDisplay = document.getElementById('result');
            const errorMessage = document.getElementById('error-message');
            const fromUnitRadios = document.querySelectorAll('input[name="fromUnit"]');
            const toUnitRadios = document.querySelectorAll('input[name="toUnit"]');
            
            // Ensure "Convert To" is different from "Convert From" by default
            document.getElementById('toFahrenheit').checked = true;
            
            // Update "Convert To" options when "Convert From" changes
            fromUnitRadios.forEach(radio => {
                radio.addEventListener('change', function() {
                    // Reset result styling when unit changes
                    resultDisplay.className = 'result';
                    
                    // Auto-select a different "to" unit if the same is selected
                    const fromValue = this.value;
                    for (const toRadio of toUnitRadios) {
                        if (toRadio.value === fromValue && toRadio.checked) {
                            // Find the first different unit to select
                            for (const otherToRadio of toUnitRadios) {
                                if (otherToRadio.value !== fromValue) {
                                    otherToRadio.checked = true;
                                    break;
                                }
                            }
                            break;
                        }
                    }
                });
            });

            // Function to validate input
            function validateInput() {
                const value = temperatureInput.value.trim();
                if (value === '' || isNaN(value)) {
                    errorMessage.style.display = 'block';
                    temperatureInput.classList.add('shake');
                    setTimeout(() => {
                        temperatureInput.classList.remove('shake');
                    }, 500);
                    return false;
                } else {
                    errorMessage.style.display = 'none';
                    return true;
                }
            }

            // Function to convert temperature
            function convertTemperature() {
                // Validate input
                if (!validateInput()) {
                    return;
                }

                const temperature = parseFloat(temperatureInput.value);
                let fromUnit = '';
                let toUnit = '';
                
                // Find selected units
                for (const radio of fromUnitRadios) {
                    if (radio.checked) {
                        fromUnit = radio.value;
                        break;
                    }
                }
                
                for (const radio of toUnitRadios) {
                    if (radio.checked) {
                        toUnit = radio.value;
                        break;
                    }
                }
                
                // Check if from and to units are the same
                if (fromUnit === toUnit) {
                    resultDisplay.className = 'result';
                    resultDisplay.style.opacity = '0';
                    setTimeout(() => {
                        resultDisplay.innerHTML = `No conversion needed: ${temperature}°${fromUnit === 'celsius' ? 'C' : fromUnit === 'fahrenheit' ? 'F' : ''}${fromUnit === 'kelvin' ? 'K' : ''} is the same`;
                        resultDisplay.style.opacity = '1';
                    }, 150);
                    return;
                }

                let resultValue = 0;
                let resultClass = 'result';
                
                // Perform conversion based on selected units
                if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
                    resultValue = (temperature * 9/5) + 32;
                } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
                    resultValue = temperature + 273.15;
                } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
                    resultValue = (temperature - 32) * 5/9;
                } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
                    resultValue = (temperature - 32) * 5/9 + 273.15;
                } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
                    resultValue = temperature - 273.15;
                } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
                    resultValue = (temperature - 273.15) * 9/5 + 32;
                }

                // Format unit symbols
                const fromSymbol = fromUnit === 'celsius' ? '°C' : fromUnit === 'fahrenheit' ? '°F' : 'K';
                const toSymbol = toUnit === 'celsius' ? '°C' : toUnit === 'fahrenheit' ? '°F' : 'K';
                
                // Create result text
                let resultText = `${temperature}${fromSymbol} = <strong>${resultValue.toFixed(2)}${toSymbol}</strong>`;
                
                // Set background based on resulting temperature in Celsius for consistent experience
                let celsiusValue;
                if (toUnit === 'celsius') {
                    celsiusValue = resultValue;
                } else if (toUnit === 'fahrenheit') {
                    celsiusValue = (resultValue - 32) * 5/9;
                } else { // kelvin
                    celsiusValue = resultValue - 273.15;
                }
                
                if (celsiusValue > 25) {
                    resultClass = 'result warm';
                } else if (celsiusValue < 10) {
                    resultClass = 'result cool';
                }

                // Apply result with animation
                resultDisplay.className = resultClass;
                resultDisplay.style.opacity = '0';
                resultDisplay.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    resultDisplay.innerHTML = resultText;
                    resultDisplay.style.opacity = '1';
                    resultDisplay.style.transform = 'scale(1)';
                }, 150);
            }

            // Add event listeners
            convertBtn.addEventListener('click', convertTemperature);
            
            // Also convert on Enter key press
            temperatureInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    convertTemperature();
                }
            });

            // Real-time validation
            temperatureInput.addEventListener('input', function() {
                if (temperatureInput.value.trim() !== '' && !isNaN(temperatureInput.value)) {
                    errorMessage.style.display = 'none';
                }
            });
            
            // Add focus animation to input
            temperatureInput.addEventListener('focus', function() {
                this.parentElement.querySelector('label').style.color = 'var(--primary)';
            });
            
            temperatureInput.addEventListener('blur', function() {
                this.parentElement.querySelector('label').style.color = 'var(--dark)';
            });
        });
        
    
document.getElementById('loginBtn')
    .addEventListener('click', function() {
        // console.log('login btn');
        // 1. get the username
        const userInput = document.getElementById('userInput');
        const usernameInput = userInput.value;
        // console.log(usernameInput);
        // 2. get the password
        const userPin = document.getElementById('userPin');
        const userInputPin = userPin.value;
        // console.log(userInputPin);
        // 3. match username & pin
        if(usernameInput == 'admin' && userInputPin == 'admin123') {
            alert('Login Success');
            // replace home page
            window.location.assign('/home.html');
        } else {
            alert('Login Failed');
            return;
        }
    });
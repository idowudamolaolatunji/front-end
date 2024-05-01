'use strict';


const loginForm = document.querySelector('#login');
const spinner = document.querySelector('.spinner--overlay');
const signupform = document.querySelector('#signup');

console.log(signupform)


function hideAlert() {
    const el = document.querySelector('.alert');
    if(el) {
        el.remove()
    }
}

function showAlert (type, message) {
    // hideAlert()
    const markup = `
        <div class="alert alert-${type === 'success' ? 'success' : 'error'}">
            <p>${message}</p>
        </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', markup)
    setTimeout(function() {
        hideAlert()
    }, 3000)
}


// "beforebegin"
// Before the element. Only valid if the element is in the DOM tree and has a parent element.

// "afterbegin"
// Just inside the element, before its first child.

// "beforeend"
// Just inside the element, after its last child.

// "afterend"
// After the element. Only valid if the element is in the DOM tree and has a parent element.


if(loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        spinner.style.visibility = 'visible';

        const emailInput = document.querySelector('#email');
        const passwordInput = document.getElementById('password');

        console.log(emailInput.value, passwordInput.value);
        try {
            const res = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: emailInput.value, password: passwordInput.value })
            });

            console.log(res)
            if(!res.ok) {
                throw new Error('Something went wrong, check the data or internet connection');
            }

            const data = await res.json();
            console.log(data)

            if(data.status !== 'success') {
                throw new Error(data.message)
            }

            // alert('Login successful 😊')
            showAlert('success', 'Login successful 😊')
            const token = data.token;
            localStorage.setItem('userObj', data.data.user);
            localStorage.setItem('userToken', token);
            window.location.href = '/html/dashboard.html';

        } catch(err) {
            // alert(err.message)
            showAlert('error', err.message)
        } finally {
            spinner.style.visibility = 'hidden'
        }

    });
}

// then().catch().finally()

if(signupform) {
signupform.addEventListener('submit', async function(e) {
    e.preventDefault();

    spinner.style.visibility = 'visible';

    const fullname = document.querySelector('#fullname');
    const email = document.querySelector('#email');
    const role = document.querySelector('#role');
    const password = document.querySelector('#password');

    try {

        const res = await fetch('http://localhost:3000/api/users/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email.value,
                fullName: fullname.value,
                role: role.value,
                password: password.value,
                image: "https://test.tajify.com/asset/users/user-65d71e3b3476b3dbdef635b1-1708685675757.jpeg"
            }),
        });

        console.log(res);
        if(!res.ok) throw new Error('Something went wrong!!!!');
        const data = await res.json();
        if(data.status === "fail") {
            throw new Error(data.message)
        }

        showAlert('success', 'Signup successful 😊');

    } catch(err) {
        showAlert('fail', err.message);

    } finally {
        spinner.style.visibility = 'hidden';
    }
})
}
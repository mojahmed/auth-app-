// const apiUrl = 'http://localhost:5000'; 

// // Registration Form Submission
// document.getElementById('registerForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const firstName = document.getElementById('regFirstName').value;
//     const lastName = document.getElementById('regLastName').value;
//     const email = document.getElementById('regEmail').value;
//     const password = document.getElementById('regPassword').value;

//     try {
//         const response = await fetch(`${apiUrl}/register`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password }),
//         });

//         // Check if the response is OK
//         if (!response.ok) {
//             const errorText = await response.text(); // Get the response as text
//             console.error("Error response:", errorText);
//             throw new Error("Network response was not ok");
//         }

//         const data = await response.json();
//         alert(data.message);

//         // Store the access token if available
//         if (data.accessToken) {
//             localStorage.setItem('accessToken', data.accessToken);
//             alert('Registration successful!');
//         }
//     } catch (error) {
//         console.error("Fetch error:", error);
//         alert('There was a problem with your registration.');
//     }
// });

// // Login Form Submission
// document.getElementById('loginForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const email = document.getElementById('loginEmail').value;
//     const password = document.getElementById('loginPassword').value;

//     try {
//         const response = await fetch(`${apiUrl}/login`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, password }),
//         });

//         // Check if the response is OK
//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error("Error response:", errorText);
//             throw new Error("Network response was not ok");
//         }

//         const data = await response.json();
//         alert(data.message);

//         // Store the access token if available
//         if (data.accessToken) {
//             localStorage.setItem('accessToken', data.accessToken);
//             document.getElementById('postFormContainer').style.display = 'block'; // Show the post form
//             document.getElementById('welcomeMessage').innerText = `Welcome, ${data.first_name} ${data.last_name}!`;
//         }
//     } catch (error) {
//         console.error("Fetch error:", error);
//         alert('Login failed. Please check your credentials.');
//     }
// });

// // Post Form Submission
// document.getElementById('postForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const title = document.getElementById('postTitle').value;
//     const content = document.getElementById('postContent').value;

//     const accessToken = localStorage.getItem('accessToken');

//     try {
//         const response = await fetch(`${apiUrl}/posts`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${accessToken}`,
//             },
//             body: JSON.stringify({ title, content }),
//         });

//         // Check if the response is OK
//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error("Error response:", errorText);
//             throw new Error("Network response was not ok");
//         }

//         const data = await response.json();
//         alert(data.message);
//     } catch (error) {
//         console.error("Fetch error:", error);
//         alert('There was a problem posting your content.');
//     }
// });

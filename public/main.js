let authToken = '';

async function register() {
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  const response = await fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    alert('Registration successful!');
  } else {
    alert('Registration failed!');
  }
}

async function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    authToken = data.token;
    document.querySelector('.auth').style.display = 'none';
    document.querySelector('.upload').style.display = 'block';
    fetchImages();
  } else {
    alert('Login failed!');
  }
}

async function uploadImage() {
  const fileInput = document.getElementById('image-file');
  const formData = new FormData();
  formData.append('image', fileInput.files[0]);

  const response = await fetch('/upload', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${authToken}` },
    body: formData,
  });

  if (response.ok) {
    fetchImages();
  } else {
    alert('Image upload failed!');
  }
}

async function fetchImages() {
  const response = await fetch('/images', {
    headers: { 'Authorization': `Bearer ${authToken}` },
  });

  if (response.ok) {
    const images = await response.json();
    const gallery = document.getElementById('image-gallery');
    gallery.innerHTML = '';
    images.forEach((img) => {
      const imageElement = document.createElement('img');
      imageElement.src = img.image_url;
      gallery.appendChild(imageElement);
    });
  } else {
    alert('Failed to load images!');
  }
}

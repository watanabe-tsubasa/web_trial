window.addEventListener('DOMContentLoaded', () => {
  const myHeading = document.querySelector("h1");
  myHeading.addEventListener('click', () => {
    alert('title clicked');
  });

  const pElement = document.querySelector('p');
  pElement.addEventListener('click', () => {
    alert('p clicked');
  });

  const myImage = document.querySelector('img');
  myImage.addEventListener('click', () => {
    const mySrc = myImage.getAttribute('src');
    if (mySrc === './website-screenshot.png') {
      myImage.setAttribute('src', './1698596356410-nextjs-back-button.jpg')
    } else {
      myImage.setAttribute('src', './website-screenshot.png')
    }
  })

  const myButton = document.querySelector('button');
  const setUserName = () => {
    const myName = prompt('input your name');
    if(!myName) {
      setUserName();
    }
    localStorage.setItem('name', myName);
    myHeading.textContent = `Hello ${myName}`;
    localStorage.clear();
  }
  myButton.addEventListener('click', setUserName);
});

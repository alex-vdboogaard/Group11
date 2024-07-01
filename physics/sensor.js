//Tutorial is on YouTube(https://www.youtube.com/@moinsite)

function handleOrientation(event) {
    let alpha = event.alpha
    let beta = event.beta
    let gamma = event.gamma
  
    let cube = document.querySelector('.cube');
    cube.style.transform = 'rotateX(' + beta + 'deg) rotateY(' + gamma + 'deg) rotateZ(' + alpha + 'deg)';
  
  }
  
  
  async function requestDeviceOrientation() {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      //iOS 13+ devices
      try {
        const permissionState = await DeviceOrientationEvent.requestPermission()
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation)
        } else {
          alert('Permission was denied')
        }
      } catch (error) {
        alert(error)
      }
    } else if ('DeviceOrientationEvent' in window) {
      //non iOS 13+ devices
      console.log("not iOS");
      window.addEventListener('deviceorientation', handleOrientation)
    } else {
      //not supported
      alert('nicht unterstützt')
    }
  }
'use strict';

//https://restcountries.com/v2/

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const finder = obj => {
  const key = Object.keys(obj)[0];
  if (typeof obj[key] === 'object') {
    return finder(obj[key]);
  }
  return obj[key];
};

const renderError = msg => {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, type = 'country') {
  const html = `
    <article class="${type}">
      <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${finder(data.languages)}</p>
          <p class="country__row"><span>💰</span>${finder(data.currencies)}</p>
        </div>
      </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const request = fetch('https://restcountries.com/v3.1/name/portugal');
console.log(request);

// const getCountyData = country => {
//   const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(res => {
//       console.log(res);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data[0]);
//       renderCountry(data[0]);
//     });
// };

const getJSON = (url, errorMsg = 'Something went wrong') => {
  return fetch(url).then(res => {
    if (!res.ok) {
      throw new Error(`${errorMsg} ${res.status}`);
    }
    return res.json();
  });
};
/*
const getCountyData = country => {
  const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(res => {
      console.log(res);

      if (!res.ok) {
        throw new Error(`Country not found ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      console.log(data[0]);
      renderCountry(data[0]);

      const neighbour = data[0].borders?.[0]; // optional chaining for determining countries with no neighbours
      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥`);
      renderError(`Something went wrong 💥💥 ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
*/

const getCountyData = country => {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      console.log(data[0]);
      renderCountry(data[0]);

      const neighbour = data[0].borders?.[0]; // optional chaining for determining countries with no neighbours
      if (!neighbour) throw new Error('No neighbour found !');

      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥`);
      renderError(`Something went wrong 💥💥 ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', () => {
//   getCountyData('australia');
// });

//getCountyData('aaaa');

//////////////// Coding challenge 1////////////////
/*
const whereAmI = function (lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

  return fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Unable to load ${res.status}`);
      }
      return res.json();
    })
    .then(({ address }) => {
      //getCountyData(address.country);
      console.log(`Your are in ${address.country}`);

      return fetch(`https://restcountries.com/v3.1/name/${address.country}`);
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Unable to load ${res.status}`);
      }
      return res.json();
    })
    .then(data => renderCountry(data[0]))

    .catch(err => console.error('Fail', err.message))
    .finally(() => console.log('This is final'));
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);

*/
/*
// Event loop
console.log('Test start');
setTimeout(() => console.log('0 sec past'), 0);
Promise.resolve('Promise resolved 1').then(res => console.log(res));

const aaa = () => {
  for (let i = 0; i < 000000; i++) {
    console.log(i);
  }
};

const foo = cb => {
  cb();
  console.log('ready!!');
};

foo(aaa);

Promise.resolve('Promise resolved 12').then(res => {
  for (let i = 0; i < 10000000000; i++) {}
  console.log(res);
});
console.log('Test end');
*/

/*
const lotteryPromise = new Promise((resolve, reject) => {
  console.log('Lottery is happening');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You get the money');
    } else {
      reject(new Error('You lose'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisyfing setTimeout

const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};
wait(1)
  .then(() => {
    console.log('1 second past');
    return wait(2);
  })
  .then(() => {
    console.log('2 second past');
    wait(3);
  })
  .then(() => {
    console.log('3 seconds past');
    return wait(4);
  })
  .then(() => {
    console.log('4 seconds past');
  });
*/
// setTimeout(() => {
//   console.log('1 second past');
//   setTimeout(() => {
//     console.log('2 second past');
//     setTimeout(() => {
//       console.log('3 second past');
//       setTimeout(() => {
//         console.log('4 second past');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

const getPosition = () => {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

//getPosition().then(res => console.log(res));
/*

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lon } = pos.coords;
      console.log(lat, lon);

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

      return fetch(url);
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Unable to load ${res.status}`);
      }
      return res.json();
    })
    .then(({ address }) => {
      //getCountyData(address.country);
      console.log(`Your are in ${address.country}`);

      return fetch(`https://restcountries.com/v3.1/name/${address.country}`);
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Unable to load ${res.status}`);
      }
      return res.json();
    })
    .then(data => renderCountry(data[0]))

    .catch(err => console.error('Fail', err.message));
};

btn.addEventListener('click', whereAmI);
*/

///////////////////?Coding challenge 2////////////////
/*
const wait = timer => {
  return new Promise(resolve => {
    setTimeout(resolve, timer * 1000);
  });
};

const createImage = imgPath => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', () => {
      document.querySelector('.images').append(img);
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(new Error('Image not found'));
    });
  });
};

let currentImage;

createImage('img/img-1.jpg')
  .then(img => {
    console.log('1st image');
    currentImage = img;
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImage = img;
    console.log('2nd image');
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
  })
  .catch(err => console.log(err));
*/

/*
const whereAmI = async function (country) {
  try {
    // Geolocation
    const { coords } = await getPosition();
    const { latitude: lat, longitude: lon } = coords;
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    // Reverse geocoding
    const resGeo = await fetch(url);
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const { address: dataGeo } = await resGeo.json();
    //console.log(dataGeo);

    // Country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);

    return ` You are in ${dataGeo.country}, ${dataGeo.city}`;
  } catch (err) {
    //console.error(err.message);
    renderError(`Something went wrong ${err.message}`);

    // Reject promise returned from async function -> re throw arrow to be able catch after function return
    throw err;
  }

  // the same code..async/await is just syntax cygar
  // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res =>
  //   console.log(res)
  // );
};

console.log('1: will get location');
// const city = whereAmI();
// console.log(city); // Will not worked, because result of function doesn't fulfilled at the time it is called. Async/await return promise

// whereAmI()
//   .then(city => {
//     console.log(`2: ${city}`);
//   })
//   .catch(err => console.error(`2: ${err.message}💥`))
//   .finally(() => console.log('3: finished getting location'));

////////try..catch

// try {
//   let y = 3;
//   const x = 1;
//   x = 5;
// } catch (err) {
//   console.log(err.message);
// }

// IIFE - Immediately Invoced Function Expression
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message}💥`);
  }

  console.log('3: finished getting location');
})();
*/

///////////Promise All (will short circuit if one of the promises reject)
/*
const get3countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

    // console.log([...data1.capital, ...data2.capital, ...data3.capital]);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital).flat(1));
  } catch (err) {
    console.log(`${err.message} 💥✅`);
  }
};

get3countries('austria', 'germany', 'iceland');
*/

/*
// Promise.race - shirt circuit wherever one of the promises get settled - doesn't matter fullfield or reject
(async function () {
  const data = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/ukraine`),
    getJSON(`https://restcountries.com/v3.1/name/france`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
  ]);

  console.log(data[0]);
})();

const timeout = sec => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request took too long'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/mexico`),
  timeout(1),
])
  .then(res => console.log(res[0]))
  .catch(err => console.log(err));

// Promise.allSettled - all the result of all promises

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Succes one more'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Succes one more'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));

// Promise.any [ES2021] - return 1st fullfiled promise, reject is ignored

Promise.any([
  Promise.reject('Success'),
  Promise.reject('Error'),
  Promise.resolve('Succes one more'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));
*/

////////////////////Codding challenge 3//////////

const wait = timer => {
  return new Promise(resolve => {
    setTimeout(resolve, timer * 1000);
  });
};

const createImage = imgPath => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', () => {
      document.querySelector('.images').append(img);
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(new Error('Image not found'));
    });
  });
};

const loadNPause = async function () {
  try {
    // Load 1st image
    let img = await createImage('img/img-1.jpg');
    console.log('1st image');
    await wait(2);
    img.style.display = 'none';

    // Load 2nd image
    img = await createImage('img/img-2.jpg');
    console.log('2nd image');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.log(err);
  }
};
//loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = await Promise.all(
      imgArr.map(async img => await createImage(img))
    );
    imgs.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.log(`${err} 🚨`);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

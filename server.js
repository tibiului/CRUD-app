const BASE_URL = 'http://localhost:3000';

const server = {
    getCats() {
        const url = `${BASE_URL}/cats`;
        return fetch(url).then((res) => res.json())
    },
    getCat(id) {
        const url = `${BASE_URL}/cats/${id}`;
    
        return fetch(url).then((res) => res.json());
      },
    removeCat(id) {
        const url = `${BASE_URL}/cats/${id}`;
        return fetch(url, {
            method: 'DELETE',
        })
    },
    updateCat(payload, id) {
        const url = `${BASE_URL}/cats/${id}`;
        return fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',     // apare in documentatia json-server
              // ce va circula pe body sa fie transformat in json
            },
            body: JSON.stringify(payload),
          });
    },
   
    addCat(cat) {
        const url = `${BASE_URL}/cats`;
    
        return fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',     // apare in documentatia json-server
            // ce va circula pe body sa fie transformat in json
          },
          body: JSON.stringify(cat),
        });
      },






    filterByAdoptable() {
        const url = `${BASE_URL}/cats/?status=adoptable`;

        return fetch(url).then((res) => res.json());
    },
}
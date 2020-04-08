import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    let headers = new Headers({
       'Content-Type': 'application/json',
    })
    if(options.method === 'POST' && 
        (options.url.endsWith("/products")|| options.url.includes("/products/edit/"))){
        headers = new Headers({

        })
    }else{
        headers = new Headers({
            'Content-Type': 'application/json',
        })
    }

    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;

        })
    );
};

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/users/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/users",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}
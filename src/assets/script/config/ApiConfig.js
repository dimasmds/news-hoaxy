const Config = {
    baseURL: "https://api-hoaxy.p.rapidapi.com/",
    apiHost: "api-hoaxy.p.rapidapi.com",
    apiKey: "3106dbb8b5msh9a0215174e343dep1935a2jsn046ff166e992"
};

const Endpoint = {
    searchNews: (keyword) => `${Config.baseURL}/articles?query=${keyword}`
};

export {Config, Endpoint}
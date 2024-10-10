import axios from 'axios';
const TOKEN = "cs2jca9r01qk1hurmbc0cs2jca9r01qk1hurmbcg";

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN
}
})
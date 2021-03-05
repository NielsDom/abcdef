import axios from "axios"

const httpClient = axios.create({
  baseURL: "http://localhost:5000/api",
})

httpClient.interceptors.request.use((config) => {
  config.headers.Authorization =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTQ4OTE2OTR9.DV5QuzxD0iHPUfM07HjZ99JdVOhYBSJvy9mfdoHBHls"
  return config
})

export default httpClient

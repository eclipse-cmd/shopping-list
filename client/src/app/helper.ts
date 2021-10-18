export const
    fetchToken = () => {
        let data = localStorage.getItem("authUser") ?? null
        if (data) return JSON.parse(decodeURIComponent(data))
        return data
    },
    setToken = (data: any) => {
        localStorage.setItem("authUser", encodeURIComponent(JSON.stringify(data)))
    }
function proxyResponse(promise) {
    return promise.then(response => {
        if (!response.ok) {
            if (response.status == 500)
                return response.json().then(data => { throw data })

            throw {
                status: response.status, data: {}
            }
        }

        return response.json()
    });
}

export { proxyResponse }
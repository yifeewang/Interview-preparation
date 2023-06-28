
const xhr = new XMLHttpRequest()
xhr.open('GET', 'https://www.baidu.com', true)
xhr.send()
xhr.onreadystatychange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText)
    }
}
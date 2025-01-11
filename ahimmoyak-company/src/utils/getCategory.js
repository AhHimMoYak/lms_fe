import axios from 'axios';

const getCategory = async () => {
  let categorys =[]
  await axios.get('http://localhost:8080/v1/companies/courses/category')
      .then(response => {
        categorys = response.data;
      })
      .catch(error => {
        console.log('오류', error)
      })
  sessionStorage.setItem("category", categorys)
  return categorys;
}

export {getCategory};
const axios = require('axios');

const fetch = async (url)=>{
    try{
        const res = await axios.get(url);
        return res.data;
    } catch(error){
        throw new Error("error in fetching axios",error)
    }
}


module.exports = fetch;
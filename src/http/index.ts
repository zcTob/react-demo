import axios from './init'

export const getTopic = () => axios.get('/topic')
export const postLike = (id, like) => axios.post('/like', { id, like })

export default axios

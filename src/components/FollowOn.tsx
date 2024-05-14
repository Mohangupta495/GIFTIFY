import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

const FollowOn = () => {
  return (
    <div className='faded-text pt-2'>
      <span>Follow on:</span>
      <div className='flex gap-4 pt-3'>
        <a href='/'>
        <FaYoutube size={30}/>
        </a>
        <a href='/'>
        <FaInstagram size={30}/>
        </a>
        <a href='/'>
        <FaTwitter size={30}/>
        </a>
      </div>
    </div>
  )
}

export default FollowOn

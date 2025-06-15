import { useState } from 'react'
import FAQItem from './FAQItem'
import Loader from './Loader'

const faqData = [
  {id:1, question:"How can I track my order?", answere:"In three ways: by email (if you leave your email address), on our website (if your browser accepts cookies) or by viewing the transactions in the blockchain by the links from your order."},
  {id:2, question:"Why can I trust you?", answere:"No registration and no need to share your personal details. We don't hold your funds, all exchanges take place instantly in fully automatic mode."},
  {id:3, question:"Do you have hidden fees?", answere:"Honesty is our main priority, so we commit to full transparency and make all the fees clear:"},
]

const FAQ = () => {
  const [openId, setOpenId] = useState(null);
  const [expandAll, setExpandAll] = useState(false);

  const toggleItem = (id) =>{
    if(expandAll){
      setExpandAll(false)
    }

    setOpenId((prevId)=>{
      if(prevId === id){
        return null
      }
      return id
    })
  }

  const toggleExpandAll = ()=>{
    setExpandAll((prev)=> !prev);
    setOpenId(null);

  }
  return (
    <section className='flex flex-col gap-y-10'>
       <h2 className='font-binance-plex font-bold md:text-5xl text-center text-3xl text-textWhite'>Frequently Asked Questions</h2>
       <div className='flex flex-col gap-y-9'>
        {faqData.map((item) => (
          <FAQItem key={item.id} item={item} onClick={toggleItem} isOpen={expandAll || openId === item.id}/>
        ))}
       </div>
       {/* <Loader/> */}
    </section>
  )
}

export default FAQ